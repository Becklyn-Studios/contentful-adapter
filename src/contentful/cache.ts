import { SlugPage } from "./types";
import { Entry } from "contentful";

export interface PageCache {
    getSlugForPage: (id: string) => string;
}

export const getPageCache = (pages: Entry<SlugPage>[]): PageCache => {
    const cache: Record<string, string> = {};
    pages.forEach(page => (cache[page.sys.id] = page.fields.slug));

    const getSlugForPage = (id: string): string => {
        return cache[id];
    };

    return {
        getSlugForPage,
    };
};
