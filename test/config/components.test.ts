import { getComponentDataConfig } from "../../src";
import { BaseComponentConfig } from "@becklyn/ui-types";

test("getComponentDataConfig should normalize correctly", () => {
    const config: BaseComponentConfig = {
        key: "job",
        data: {
            title: "string",
            descriptions: {
                multiple: true,
                data: [
                    { key: "jobDescription", data: { headline: "string", text: "rte" } },
                    { key: "jobDescriptionDepartment", data: { text: "rte" } },
                ],
            },
            type: {
                multiple: false,
                data: {
                    key: "jobType",
                    data: { title: "string" },
                },
            },
        },
    };

    const result = getComponentDataConfig([config]);

    expect(result).toStrictEqual([
        {
            key: "jobDescription",
            contentType: "jobDescription",
            data: { headline: "string", text: "rte" },
        },
        {
            key: "jobDescriptionDepartment",
            contentType: "jobDescriptionDepartment",
            data: { text: "rte" },
        },
        {
            key: "jobType",
            contentType: "jobType",
            data: { title: "string" },
        },
        {
            key: "job",
            contentType: "job",
            data: {
                title: "string",
                descriptions: {
                    multiple: true,
                    data: [
                        { key: "jobDescription", data: { headline: "string", text: "rte" } },
                        { key: "jobDescriptionDepartment", data: { text: "rte" } },
                    ],
                },
                type: {
                    multiple: false,
                    data: {
                        key: "jobType",
                        data: { title: "string" },
                    },
                },
            },
        },
    ]);
});
