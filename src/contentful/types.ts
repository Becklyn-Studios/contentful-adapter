import { Entry } from "contentful";
import { Document } from "@contentful/rich-text-types";
import { Asset, LinkReference } from "@becklyn/ui-types";

export interface SlugPage {
    slug: string;
}

export interface PageForCache extends SlugPage {
    title: string;
}

export interface FindEntryOptions {
    contentType: string;
    select?: string[];
    where?: Record<string, string>;
    depth?: number;
    throwError?: boolean;
}

export interface FindEntriesOptions extends FindEntryOptions {
    limit?: number;
    skip?: number;
}

export interface FindEntryByIdsOptions extends FindEntryOptions {
    ids: string[];
}

export interface BaseContentfulEntry {
    sys: {
        id: string;
        type: string;
    };
}

export interface ContentfulBasePage {
    slug: string;
    title: string;
    childPages: BaseContentfulEntry[];
}

export interface ContentfulPage extends ContentfulBasePage {
    title: string;
    seo: Entry<ContentfulPageSeo>;
    content: Entry<Record<string, any>>;
}

export interface ContentfulPageSeo {
    title: string;
    description?: string;
}

export interface OriginalPageData {
    notFound?: boolean;
    redirect?: {
        destination: string;
        permanent: boolean;
    };
    page?: Entry<ContentfulPage>;
}

export interface RteData {
    json: Document;
    references: ReferencesData;
    entries: Record<string, any>;
}

export type ReferencesData = Record<string, Asset | LinkReference>;
