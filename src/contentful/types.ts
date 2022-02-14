import { Entry } from "contentful";
import { Document } from "@contentful/rich-text-types";
import { Asset, LinkReference } from "@mayd/ui-types";

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

export interface ContentfulBasePage {
    slug: string;
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
    pageTree: PageTreeNode;
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
}

export type ReferencesData = Record<string, Asset | LinkReference>;
