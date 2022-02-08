import { Asset } from "@mayd/ui-types";
import { ContentfulNormalizerService } from "./service";
import { findOneAsset } from "../contentful/api";

export const normalizeAssetData = async (
    data: any,
    service: ContentfulNormalizerService
): Promise<Asset | null> => {
    if (!data || !data.sys) {
        return null;
    }

    if (!data.fields) {
        // load missing data
        data = await findOneAsset(data.sys.id, service.client);
    }

    if (!data || !data.fields || !data.fields.file) {
        return null;
    }

    const asset: Asset = {
        contentType: data.fields.file.contentType ?? "",
        url: data.fields.file.url ?? "",
        title: data.fields.title ?? "",
    };

    if (data.fields.file.details && data.fields.file.details.image) {
        const imageOptions = data.fields.file.details.image;

        asset.width = imageOptions.width;
        asset.height = imageOptions.height;
    }

    return asset;
};
