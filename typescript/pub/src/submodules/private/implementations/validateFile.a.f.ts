import * as pt from 'pareto-core-types'

import * as pm from 'pareto-core-map'
import * as pl from 'pareto-core-lib'
import * as pa from 'pareto-core-async'
import * as pd from 'pareto-core-data'

import * as g_main from "../../../main"

import { A } from "../api.generated"


/*temp*/
function wrapRawOptionalValue<T>(
    $: pt.RawOptionalValue<T>,
): pt.OptionalValue<T> {
    if ($[0] === false) {
        return pl.notSet()
    } else {
        return pl.set($[1])
    }

}


export const $$: A.validateFile = ($d, $se) => {
    return ($) => {
        const expectedFileName = `${$.expectedFile.fileName}.expected.${$.expectedFile.extension}`
        return $d.readFile({
            'path': $d.push({
                'array': $.expectedFile.path,
                'element': expectedFileName
            }),
        }).map((expectedData) => {
            const actualFileName = `${$.expectedFile.fileName}.actual.${$.expectedFile.extension}`
            const validateFileData = $
            return wrapRawOptionalValue(
                $d.diffData(
                    {
                        'originalData': expectedData,
                        'changedData': $.actual,
                        'newline': "\n",
                    },
                )).map(
                    ($) => {
                        //side effect
                        $se.writeFile(
                            {
                                'data': validateFileData.actual,
                                'settings': {
                                    'path': $d.push({
                                        'array': validateFileData.expectedFile.path,
                                        'element': actualFileName,
                                    }),
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
                                'path': $d.push({
                                    'array': validateFileData.expectedFile.path,
                                    'element': actualFileName,
                                })
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

