import { Asset } from "@mayd/ui-types";
import { ContentfulNormalizerService } from "./service";
import { findOneAsset } from "../contentful/api";
import { getValueOfField } from "./util";

interface NormalizedAsset extends Asset {
    id?: string | null;
}

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

    const asset: NormalizedAsset = {
        contentType: fileFieldData.contentType ?? "",
        url: fileFieldData.url ?? "",
        title: getValueOfField(data.fields.title ?? "", service.locale),
        id: data.sys.id,
    };

    if (fileFieldData.details && fileFieldData.details.image) {
        const imageOptions = fileFieldData.details.image;

        asset.width = imageOptions.width;
        asset.height = imageOptions.height;
    }

    return asset;
};
