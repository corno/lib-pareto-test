import * as pm from 'pareto-core-map'
import * as pl from 'pareto-core-lib'
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
            const validateFileData = $
            return pl.optional(
                $d.diffData(
                    {
                        'originalData': expectedData,
                        'changedData': $.actual,
                        'newline': "\n",
                    },
                ),
                ($) => {
                    //side effect
                    $se.writeFile(
                        {
                            'data': validateFileData.actual,
                            'settings': {
                                'path': [validateFileData.expectedFile.path, actualFileName],
                                'create containing directories': true,
                                'overwrite if exists': true,
                            }
                        },
                    )
                    return pa.asyncValue<g_main.T.TestElementResult>({
                        'type': ['test', {
                            'success': false,
                            'type': ['file string', {
                                'fileLocation': `${validateFileData.expectedFile.path}/${expectedFileName}`,
                                'parts': $
                            }]
                        }]
                    })
                },
                () => {
                    {
                        //side effect
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

                }
            )
        })
    }
}

