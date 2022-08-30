import * as pt from "pareto-core-types"
import * as pl from "pareto-core-lib"
import * as pa from "pareto-core-async"

import * as hfs from "api-pareto-handledfilesystem"
import * as diff from "api-pareto-diff"

import * as api from "../../interface"

export function validateFile(
    $: api.ValidateFileData,
    $d: api.ValidateFileDependencies
): pt.AsyncValue<api.TTestElementResult> {
    const expectedFileName = `${$.expectedFile.fileName}.expected.${$.expectedFile.extension}`
    return pa.rewrite(
        $d.file(
            {
                path: [$.expectedFile.path, expectedFileName]
            },
            {},
        ),

        (expectedData): pt.AsyncValue<api.TTestElementResult> => {
            const actualFileName = `${$.expectedFile.fileName}.actual.${$.expectedFile.extension}`

           const parts = $d.diffData(
                {
                    originalData: expectedData,
                    changedData: $.actual,
                    newline: "\n",
                },
            )
            if (parts !== null) {
                $d.startAsync(
                    $d.writeFile(
                        {
                            path: [$.expectedFile.path, actualFileName],
                            data: $.actual
                        },
                        {}
                    )
                )
                return pa.value<api.TTestElementResult>({
                    type: ["test", {
                        success: false,
                        type: ["file string", {
                            fileLocation: `${$.expectedFile.path}/${expectedFileName}`,
                            parts: parts
                        }]
                    }]
                })

            } else {
                $d.startAsync(
                    $d.unlink(
                        {
                            path: [$.expectedFile.path, actualFileName]
                        },
                        {}
                    )
                )
                return pa.value({
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

