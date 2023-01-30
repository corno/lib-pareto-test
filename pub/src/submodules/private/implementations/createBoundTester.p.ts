import * as pt from 'pareto-core-types'
import * as pl from 'pareto-core-lib'

import * as api from "../api"

import * as mdiff from "res-pareto-diff"
import * as marith from "res-pareto-arithmetic"
import * as mcollation from "res-pareto-collation"
import * as mbool from "res-pareto-boolean"
import * as mfs from "res-pareto-filesystem"
import * as mfslib from "lib-pareto-filesystem"

import { $a } from "../index"



export const $$: api.CcreateBoundTester = ($d) => {
    return $a.createTester(
        {
            onTestErrors: $d.onTestErrors,
            serializeTestResult: $a.createTestResultSerializer(
                {
                    log: $d.log,
                    isABeforeB: mcollation.$a.localeIsABeforeB,
                },
            ),
            serializeSummary: $a.createSummarySerializer(
                {
                    log: $d.log,
                    isZero: mbool.$a.isZero,
                    add: marith.$a.add,
                    negate: marith.$a.negate,

                }
            ),
            runTests: $a.createTestRunner(
                {
                    diffData: mdiff.$a.diffData,
                    stringsAreEqual: mdiff.$a.stringsAreEqual,
                    validateFile: $a.createFileValidator(
                        {
                            writeFile: ($) =>/**/ {
                                mfslib.$a.createWriteFileFireAndForget(
                                    {
                                        // onError: ($) =>/**/ {
                                        //     $d.onError(`${$.path}: ${fslib.$a.createWriteFileErrorMessage($.error)}`)
                                        // },
                                        createWriteStream: mfs.$a.createWriteStream({
                                            onError: ($) => {
                                                $d.onError(`${$.path}: ${mfslib.$a.createWriteFileErrorMessage($.error)}`)
                                            }
                                        }),
                                    },
                                )({
                                    path: $.path,
                                    data: $.data,
                                    createContainingDirectories: true,
                                })
                            },
                            unlink: mfslib.$a.createUnlinkFireAndForget(
                                {
                                    onError: ($) =>/**/ {
                                        $d.onError(`${$.path}: ${mfslib.$a.createUnlinkErrorMessage($.error)}`)
                                    },
                                    unlink: mfs.$a.unlink,
                                },
                            ),
                            readFile: ($) =>/**/ {
                                const x = $
                                return pl.toAsyncValue(($i2) =>/**/ {

                                    mfs.$a.getFile(
                                        x,
                                        {
                                            onError: ($) =>/**/ {
                                                $d.onError(`${$.path}: ${mfslib.$a.createReadFileErrorMessage($.error)}`)
                                            },
                                            init: ($c) =>/**/ {
                                                let out = ""
                                                $c({
                                                    onData: ($) =>/**/ {
                                                        out += $
                                                    },
                                                    onEnd: () =>/**/ {
                                                        $i2(out)
                                                    }
                                                })
                                            }
                                        },
                                    )
                                })
                            },
                            diffData: mdiff.$a.diffData,
                        }),
                }
            ),
            summarize: $a.createSummarizer(
                {
                   //log: $d.log,
                    increment: $a.increment,
                }
            ),
            isZero: mbool.$a.isZero,
        },
    )
}