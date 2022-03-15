import { createClient, Environment } from "contentful-management";
import { ContentfulClientConfig } from "../config/types";
import { MIGRATIONS_MODEL_NAME } from "../migrations/migration";
import { Asset, ContentfulClientApi, Entry } from "contentful";
import { FindEntriesOptions, FindEntryByIdsOptions, FindEntryOptions } from "./types";
import { getContentfulSelectString, getContentfulWhereObject } from "./util";
import { createClient as createDeliveryClient } from "contentful";

export const connectToContentfulManagementApi = async (
    config: ContentfulClientConfig
): Promise<Environment> => {
    const client = createClient({ accessToken: config.management.accessToken });
    const space = await client.getSpace(config.spaceId);
    return await space.getEnvironment(config.environmentId);
};

export const getDefaultLocale = async (environment: Environment): Promise<string> => {
    const { items: locales } = await environment.getLocales();

    const defaultLocale = locales.find(locale => locale.default);

    return defaultLocale ? defaultLocale.code : "en-US";
};

export const getExecutedMigrations = async (
    environment: Environment,
    locale: string
): Promise<string[]> => {
    let isInitialMigration = false;

    await environment.getContentType(MIGRATIONS_MODEL_NAME).catch(() => {
        isInitialMigration = true;
    });

    if (isInitialMigration) {
        return [];
    }

    let allVersions: any[] = [];
    let total: number | null = null;
    let skip = 0;

    while (total === null || total > allVersions.length) {
        const { items: versions, total: newTotal } = await environment.getEntries({
            content_type: MIGRATIONS_MODEL_NAME,
            limit: 1000,
            skip,
        });

        total = newTotal;
        skip += versions.length;
        allVersions = [...allVersions, ...versions];
    }

    return allVersions.map(version => version.fields.version[locale]).filter(version => !!version);
};

export const connectToContentfulDeliveryApi = (
    config: ContentfulClientConfig,
    preview: boolean = false
): ContentfulClientApi => {
    return createDeliveryClient({
        space: config.spaceId,
        accessToken: preview ? config.delivery.previewAccessToken : config.delivery.accessToken,
        environment: config.environmentId,
        host: preview ? "preview.contentful.com" : undefined,
    });
};

export const findEntries = async <T>(
    client: ContentfulClientApi,
    { contentType, select, where, depth, limit }: FindEntriesOptions
): Promise<Entry<T>[]> => {
    const entries = await client.getEntries<T>({
        ...getContentfulWhereObject(where),
        content_type: contentType,
        select: getContentfulSelectString(select),
        include: depth ? depth : 0,
        limit,
    });

    return entries.items;
};

export const findOneEntry = async <T>(
    client: ContentfulClientApi,
    { contentType, select, where, depth, throwError }: FindEntryOptions
): Promise<Entry<T> | null> => {
    const entries = await client.getEntries<T>({
        ...getContentfulWhereObject(where),
        content_type: contentType,
        select: getContentfulSelectString(select),
        limit: 1,
        include: depth ? depth : 0,
    });

    if (0 === entries.items.length) {
        if (throwError) {
            throw new Error(`Could not find a single ${contentType}`);
        } else {
            return null;
        }
    }

    if (1 < entries.items.length && throwError) {
        throw new Error(`Found multiple ${contentType} entries`);
    }

    return entries.items[0];
};

export const findOneAsset = async <T>(
    assetId: string,
    client: ContentfulClientApi
): Promise<Asset | null> => {
    return await client.getAsset(assetId);
};

export const findOneEntryBySys = async <T>(
    sys: any,
    client: ContentfulClientApi,
    { select, where, depth }: Omit<Omit<FindEntryOptions, "contentType">, "throwError">
): Promise<Entry<T> | null> => {
    if (!sys) {
        return null;
    }

    return await client.getEntry<T>(sys.id, {
        ...getContentfulWhereObject(where),
        content_type: sys.contentType && sys.contentType.sys ? sys.contentType.sys.id : undefined,
        select: getContentfulSelectString(select),
        include: depth ? depth : 0,
    });
};

export const findEntriesByIds = async <T>(
    client: ContentfulClientApi,
    options: FindEntryByIdsOptions
): Promise<Entry<T>[]> => {
    return await findAllEntriesByIds(client, options);
};

const findAllEntriesByIds = async <T>(
    client: ContentfulClientApi,
    options: FindEntryByIdsOptions,
    skip: number = 0,
    foundEntries: Entry<T>[] = []
): Promise<Entry<T>[]> => {
    const { contentType, select, where, ids, depth } = options;
    const limit = 1000;

    const entries = await client.getEntries<T>({
        ...getContentfulWhereObject(where),
        content_type: contentType,
        select: getContentfulSelectString(select),
        "sys.id[in]": ids.join(","),
        limit,
        include: depth ? depth : 0,
    });

    foundEntries = [...foundEntries, ...entries.items];

    return foundEntries.length < entries.total
        ? findAllEntriesByIds(client, options, skip + limit, foundEntries)
        : foundEntries;
};
