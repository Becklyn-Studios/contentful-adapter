import { PageForCache } from "./types";
import { Entry } from "contentful";

export interface PageCache {
    getSlugOfPage: (id: string) => string;
    getTitleOfPage: (id: string) => string;
    getTitleOfPageBySlug: (slug: string) => string | null;
    getIdOfPageBySlug: (slug: string) => string | null;
    isSlugExisting: (slug: string) => boolean;
}

export const getPageCache = (pages: Entry<PageForCache>[]): PageCache => {
    const slugCache: Record<string, string> = {};
    const titleCache: Record<string, string> = {};
    pages.forEach(page => {
        let slug = page.fields.slug;

        if (slug && !slug.startsWith("/")) {
            slug = "/" + slug;
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

    const getTitleOfPageBySlug = (slug: string): string | null => {
        for (let id in slugCache) {
            const currentSlug = slugCache[id];

            if (currentSlug === slug) {
                return getTitleOfPage(id);
            }
        }

        return null;
    };

    const getIdOfPageBySlug = (slug: string): string | null => {
        for (let id in slugCache) {
            const currentSlug = slugCache[id];

            if (currentSlug === slug) {
                return id;
            }
        }

        return null;
    };

    const isSlugExisting = (slug: string): boolean => {
        for (let id in slugCache) {
            const currentSlug = slugCache[id];

            if (currentSlug === slug) {
                return true;
            }
        }

        return false;
    };

    return {
        getSlugOfPage,
        getTitleOfPage,
        getTitleOfPageBySlug,
        getIdOfPageBySlug,
        isSlugExisting,
    };
};
