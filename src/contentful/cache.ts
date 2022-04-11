import { PageForCache } from "./types";
import { Entry } from "contentful";

export interface PageCache {
    getSlugOfPage: (id: string) => string;
    getTitleOfPage: (id: string) => string;
}

export const getPageCache = (pages: Entry<PageForCache>[]): PageCache => {
    const slugCache: Record<string, string> = {};
    const titleCache: Record<string, string> = {};
    pages.forEach(page => {
        let slug = page.fields.slug;

        if (slug && slug.startsWith("/")) {
            slug = slug.substring(1);
        }

        slugCache[page.sys.id] = slug;
        titleCache[page.sys.id] = page.fields.title;
    });

    const getSlugOfPage = (id: string): string => {
        return slugCache[id];
    };

    const getTitleOfPage = (id: string): string => {
        return titleCache[id];
    };

    return {
        getSlugOfPage,
        getTitleOfPage,
    };
};
