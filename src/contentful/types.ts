export interface PageTreeNode {
    id: string;
    slug: string | null;
    parent?: PageTreeNode;
    children: PageTreeNode[];
}

export interface FindEntryOptions {
    contentType: string;
    select?: string[];
    where?: Record<string, string>;
    depth?: number;
    throwError?: boolean;
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

export interface DetailedContentfulEntry<T> {
    sys: {
        id: string;
        type: string;
        createdAt: string;
        updatedAt: string;
        locale: string;
        contentType: BaseContentfulEntry;
    };
    fields: T;
}

export interface ContentfulEntry<T> extends BaseContentfulEntry {
    fields?: T;
}

export interface ContentfulBasePage {
    slug: string;
    childPages: BaseContentfulEntry[];
}

export interface ContentfulPage extends ContentfulBasePage {
    title: string;
    seo: DetailedContentfulEntry<ContentfulPageSeo>;
    content: DetailedContentfulEntry<Record<string, any>>;
}

export interface ContentfulPageSeo {
    title: string;
    description?: string;
}

export interface PageProps {
    pageTree: PageTreeNode;
    notFound?: boolean;
    redirect?: {
        destination: string;
        permanent: boolean;
    };
    page?: {
        id: string;
        path: string;
        publishState: "published" | string;
        timeCreated: string;
        slug: string | null;
        metaTitle: string | null;
        metaDescription: string | null;
        locale: string;
        name: string;
        headline: string | null;
        type: string;
        properties: PageProperties;
        content: PageContent;
    };
}

export interface PageProperties {
    [key: string]: any;
}

export interface PageContent {
    slots: Record<string, SlotData>;
}

export interface SlotData {
    blocks: BlockData[];
}

export interface BlockData {
    id: string;
    anchor: string;
    anchorLabel: string;
    type: string;
    timeCreated: string;
    timeModified: string;
    content: any;
    hidden: boolean;
}
