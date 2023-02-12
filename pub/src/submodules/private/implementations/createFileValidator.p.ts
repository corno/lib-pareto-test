import * as pl from 'pareto-core-lib'

import * as api from "../api"

import * as mpublic from "../../../main"

export const $$: api.CcreateFileValidator = ($d) => {
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
            const validateFileData = $
            if ( parts[0] === true) {

                $d.writeFile(
                    {
                        path: [validateFileData.expectedFile.path, actualFileName],
                        data: validateFileData.actual,
                        createContainingDirectories: true,
                    },
                )
                return pl.asyncValue<mpublic.T.TestElementResult>({
                    type: ['test', {
                        success: false,
                        type: ['file string', {
                            fileLocation: `${validateFileData.expectedFile.path}/${expectedFileName}`,
                            parts: parts[1]
                        }]
                    }]
                })
            } else {

                $d.unlink({
                    path: [validateFileData.expectedFile.path, actualFileName]
                })
                return pl.asyncValue({
                    type: ['test', {
                        success: true,
                        type: ['file string', {
                            fileLocation: `${validateFileData.expectedFile.path}/${expectedFileName}`,
                            parts: pl.createEmptyArray()
                        }]
                    }]
                })
            }
        })
    }
}


