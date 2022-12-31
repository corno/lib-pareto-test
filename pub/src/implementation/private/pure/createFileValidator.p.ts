import * as pl from "pareto-core-lib"

import * as api from "../../../api"
import * as pd from "../../private_definitions"

export const icreateFileValidator: pd.CCreateFileValidator = ($c, $d) => {
    return ($) => {
        const expectedFileName = `${$.expectedFile.fileName}.expected.${$.expectedFile.extension}`
        return $d.readFile([$.expectedFile.path, expectedFileName]).map((expectedData) => {
            const actualFileName = `${$.expectedFile.fileName}.actual.${$.expectedFile.extension}`
            const parts = $d.diffData(
                {
                    originalData: expectedData,
                    changedData: $.actual,
                    newline: "\n",
                },
            )
            if (pl.isNotNull(parts)) {
                $d.writeFile(
                    {
                        path: [$.expectedFile.path, actualFileName],
                        data: $.actual,
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
                $d.unlink({
                    path: [$.expectedFile.path, actualFileName]
                })
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
        })
    }
}


