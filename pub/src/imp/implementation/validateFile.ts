import * as pt from "pareto-core-types"
import * as pl from "pareto-core-lib"
import * as pa from "pareto-core-async"

import * as diff from "api-pareto-diff"

import * as api from "../../interface"


export function validateFile(
    $: api.ValidateFileData,
    $d: {
        fs: api.HandledFileSystemDependencies,
        diffData: diff.DiffData,
        startAsync: ($: pt.AsyncNonValue) => void
    }
): pt.AsyncValue<api.TTestElementResult> {
    const expectedFileName = `${$.expectedFile.fileName}.expected.${$.expectedFile.extension}`
    return pa.rewrite(
        $d.fs.readFile(
            {
                path: [$.expectedFile.path, expectedFileName]
            },
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
            if (pl.isNotNull(parts)) {
                $d.startAsync(
                    $d.fs.writeFile(
                        {
                            path: [$.expectedFile.path, actualFileName],
                            data: $.actual,
                            createContainingDirectories: true,
                        },
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
                    $d.fs.unlink(
                        {
                            path: [$.expectedFile.path, actualFileName]
                        },
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

