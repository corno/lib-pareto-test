import * as pa from 'pareto-core-async'

import * as gdiff from "res-pareto-diff"
import * as garith from "res-pareto-arithmetic"
import * as gcollation from "res-pareto-collation"
import * as gbool from "res-pareto-boolean"
import * as gfs from "res-pareto-filesystem"
import * as gfslib from "lib-pareto-filesystem"

import { $a } from ".."

import { CcreateBoundTester } from "../api"

export const $$:CcreateBoundTester = ($d) => {
    return $a.createTester(
        {
            onTestErrors: $d.onTestErrors,
            serializeTestResult: $a.createTestResultSerializer(
                {
                    log: $d.log,
                    isABeforeB: gcollation.$a.localeIsABeforeB,
                },
            ),
            serializeSummary: $a.createSummarySerializer(
                {
                    log: $d.log,
                    isZero: gbool.$a.isZero,
                    add: garith.$a.add,
                    negate: garith.$a.negate,

                }
            ),
            runTests: $a.createTestRunner(
                {
                    diffData: gdiff.$a.diffData,
                    stringsAreEqual: gdiff.$a.stringsAreEqual,
                    validateFile: $a.createFileValidator(
                        {
                            writeFile: ($) =>/**/ {
                                gfslib.$a.createWriteFileFireAndForget(
                                    {
                                        // onError: ($) =>/**/ {
                                        //     $d.onError(`${$.path}: ${fslib.$a.createWriteFileErrorMessage($.error)}`)
                                        // },
                                        createWriteStream: gfs.$a.createWriteStream({
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
                                    unlink: gfs.$a.unlink,
                                },
                            ),
                            readFile: ($) =>/**/ {
                                const x = $
                                return pa.toAsyncValue(($i2) =>/**/ {

                                    gfs.$a.getFile(
                                        x,
                                        {
                                            onError: ($) =>/**/ {
                                                $d.onError(`${$.path}: ${gfslib.$a.createReadFileErrorMessage($.error)}`)
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
                            diffData: gdiff.$a.diffData,
                        }),
                }
            ),
            summarize: $a.createSummarizer(
                {
                   //log: $d.log,
                    increment: $a.increment,
                }
            ),
            isZero: gbool.$a.isZero,
        },
    )
}