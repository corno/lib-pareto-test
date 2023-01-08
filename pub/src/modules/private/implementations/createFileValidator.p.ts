import * as pl from "pareto-core-lib"

import * as api from "../api"

import * as mpublic from "../../public"

export const icreateFileValidator: api.CcreateFileValidator = ($d) => {
    return ($) => {
        const expectedFileName = `${$.expectedFile.fileName}.expected.${$.expectedFile.extension}`
        return $d.freadFile([$.expectedFile.path, expectedFileName]).map((expectedData) => {
            const actualFileName = `${$.expectedFile.fileName}.actual.${$.expectedFile.extension}`
            const parts = $d.fdiffData(
                {
                    originalData: expectedData,
                    changedData: $.actual,
                    newline: "\n",
                },
            )
            if (pl.isNotNull(parts)) {
                $d.sewriteFile(
                    {
                        path: [$.expectedFile.path, actualFileName],
                        data: $.actual,
                    },
                )
                return pl.asyncValue<mpublic.TTestElementResult>({
                    type: ['test', {
                        success: false,
                        type: ['file string', {
                            fileLocation: `${$.expectedFile.path}/${expectedFileName}`,
                            parts: parts
                        }]
                    }]
                })

            } else {
                $d.seunlink({
                    path: [$.expectedFile.path, actualFileName]
                })
                return pl.asyncValue({
                    type: ['test', {
                        success: true,
                        type: ['file string', {
                            fileLocation: `${$.expectedFile.path}/${expectedFileName}`,
                            parts: pl.createEmptyArray()
                        }]
                    }]
                })
            }
        })
    }
}


