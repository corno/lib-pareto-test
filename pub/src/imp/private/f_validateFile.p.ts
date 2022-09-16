import * as pt from "pareto-core-types"
import * as pl from "pareto-core-lib"
import * as pa from "pareto-core-async"

import * as diff from "api-pareto-diff"

import * as api from "../../interface"


export function f_validateFile(
    $: api.TValidateFileData,
    $d: {
        fs: api.DHandledFileSystemDependencies,
        diffData: diff.FDiffData,
    },
    $a: pt.ProcessAsyncValue
): pt.AsyncValue<api.TTestElementResult> {
    const expectedFileName = `${$.expectedFile.fileName}.expected.${$.expectedFile.extension}`
    return $d.fs.readFile(
        {
            path: [$.expectedFile.path, expectedFileName]
        },
    ).map((expectedData): pt.AsyncValue<api.TTestElementResult> => {
        const actualFileName = `${$.expectedFile.fileName}.actual.${$.expectedFile.extension}`

        const parts = $d.diffData(
            {
                originalData: expectedData,
                changedData: $.actual,
                newline: "\n",
            },
        )
        if (pl.isNotNull(parts)) {
            $d.fs.writeFile(
                {
                    path: [$.expectedFile.path, actualFileName],
                    data: $.actual,
                    createContainingDirectories: true,
                },
            )
            return pl.asyncValue<api.TTestElementResult>({
                type: ["test", {
                    success: false,
                    type: ["file string", {
                        fileLocation: `${$.expectedFile.path}/${expectedFileName}`,
                        parts: parts
                    }]
                }]
            })

        } else {
            $d.fs.unlink(
                {
                    path: [$.expectedFile.path, actualFileName]
                },
            )
            return pl.asyncValue({
                type: ["test", {
                    success: true,
                    type: ["file string", {
                        fileLocation: `${$.expectedFile.path}/${expectedFileName}`,
                        parts: pl.createEmptyArray()
                    }]
                }]
            })
        }
    }
    )
}

