import * as pm from 'pareto-core-map'
import * as pa from 'pareto-core-async'

import * as g_main from "../../../main"

import { A } from "../api.generated"

export const $$: A.validateFile = ($d, $se) => {
    return ($) => {
        const expectedFileName = `${$.expectedFile.fileName}.expected.${$.expectedFile.extension}`
        return $d.readFile({
            'path': [$.expectedFile.path, expectedFileName],
        }).map((expectedData) => {
            const actualFileName = `${$.expectedFile.fileName}.actual.${$.expectedFile.extension}`
            const parts = $d.diffData(
                {
                    'originalData': expectedData,
                    'changedData': $.actual,
                    'newline': "\n",
                },
            )
            const validateFileData = $
            if (parts[0] === true) {

                $se.writeFile(
                    {
                        'data': validateFileData.actual,
                        'settings': {
                            'path': [validateFileData.expectedFile.path, actualFileName],
                            'createContainingDirectories': true,
                        }
                    },
                )
                return pa.asyncValue<g_main.T.TestElementResult>({
                    'type': ['test', {
                        'success': false,
                        'type': ['file string', {
                            'fileLocation': `${validateFileData.expectedFile.path}/${expectedFileName}`,
                            'parts': parts[1]
                        }]
                    }]
                })
            } else {
                $se.unlink({
                    'path': [validateFileData.expectedFile.path, actualFileName]
                })
                return pa.asyncValue({
                    'type': ['test', {
                        'success': true,
                        'type': ['file string', {
                            'fileLocation': `${validateFileData.expectedFile.path}/${expectedFileName}`,
                            'parts': pm.wrapRawArray([])
                        }]
                    }]
                })
            }
        })
    }
}
