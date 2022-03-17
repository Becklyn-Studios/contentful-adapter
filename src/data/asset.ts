import { Asset } from "@mayd/ui-types";
import { ContentfulNormalizerService } from "./service";
import { findOneAsset } from "../contentful/api";
import { getValueOfField } from "./util";

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

    const fileFieldData = getValueOfField(data.fields.file, service.locale);

    if (!fileFieldData) {
        return null;
    }

    const asset: Asset = {
        contentType: fileFieldData.contentType ?? "",
        url: fileFieldData.url ?? "",
        title: getValueOfField(data.fields.title ?? "", service.locale),
    };

    if (fileFieldData.details && fileFieldData.details.image) {
        const imageOptions = fileFieldData.details.image;

        asset.width = imageOptions.width;
        asset.height = imageOptions.height;
    }

    return asset;
};
