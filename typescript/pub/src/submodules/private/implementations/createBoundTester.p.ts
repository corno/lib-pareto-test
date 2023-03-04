import * as pa from 'pareto-core-async'
import * as pd from 'pareto-core-dev'

import * as gdiff from "res-pareto-diff"
import * as garith from "res-pareto-arithmetic"
import * as gcollation from "res-pareto-collation"
import * as gbool from "res-pareto-boolean"
import * as gfs from "res-pareto-filesystem"
import * as gfslib from "lib-pareto-filesystem"

import { $a } from ".."

import { createBoundTester } from "../definition/api.generated"

export const $$: createBoundTester = ($d) => {
    return $a.createTester(
        {
            onTestErrors: $d.onTestErrors,
            serializeTestResult: $a.createTestResultSerializer(
                {
                    log: $d.log,
                    isABeforeB: gcollation.$r.localeIsABeforeB,
                },
            ),
            serializeSummary: $a.createSummarySerializer(
                {
                    log: $d.log,
                    isZero: gbool.$r.isZero,
                    add: garith.$r.add,
                    negate: garith.$r.negate,

                }
            ),
            runTests: $a.createTestRunner(
                {
                    diffData: gdiff.$r.diffData,
                    stringsAreEqual: gdiff.$r.stringsAreEqual,
                    validateFile: $a.createFileValidator(
                        {
                            writeFile: ($) =>/**/ {
                                gfslib.$a.createWriteFileFireAndForget(
                                    {
                                        // onError: ($) =>/**/ {
                                        //     $d.onError(`${$.path}: ${fslib.$a.createWriteFileErrorMessage($.error)}`)
                                        // },
                                        createWriter: gfs.$r.createWriter({
                                            onError: ($) => {
                                                $d.onError(`${$.path}: ${gfslib.$a.createWriteFileErrorMessage($.error)}`)
                                            }
                                        }),
                                    },
                                )({
                                    path: $.path,
                                    data: $.data,
                                    createContainingDirectories: true,
                                })
                            },
                            unlink: gfslib.$a.createUnlinkFireAndForget(
                                {
                                    onError: ($) =>/**/ {
                                        $d.onError(`${$.path}: ${gfslib.$a.createUnlinkErrorMessage($.error)}`)
                                    },
                                    unlink: gfs.$r.unlink,
                                },
                            ),
                            readFile: ($) =>/**/ {
                                const x = $
                                return pa.toAsyncValue(($i) =>/**/ {
                                    pd.implementMe(`READ FILE`)
                                    // gfs.$r.getFile(
                                    //     x,
                                    //     {
                                    //         onError: ($) =>/**/ {
                                    //             $d.onError(`${$.path}: ${gfslib.$a.createReadFileErrorMessage($.error)}`)
                                    //         },
                                    //         init: ($c) =>/**/ {
                                    //             let out = ""
                                    //             $c({
                                    //                 onData: ($) =>/**/ {
                                    //                     out += $
                                    //                 },
                                    //                 onEnd: () =>/**/ {
                                    //                     $i(out)
                                    //                 }
                                    //             })
                                    //         }
                                    //     },
                                    // )
                                })
                            },
                            diffData: gdiff.$r.diffData,
                        }),
                }
            ),
            summarize: $a.createSummarizer(
                {
                   //log: $d.log,
                    increment: $a.increment,
                }
            ),
            isZero: gbool.$r.isZero,
        },
    )
}