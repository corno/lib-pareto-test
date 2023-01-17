import * as pt from 'pareto-core-types'
import * as pl from 'pareto-core-lib'

import * as api from "../api"

import * as diff from "res-pareto-diff"
import * as arith from "res-pareto-arithmetic"
import * as collation from "res-pareto-collation"
import * as bool from "res-pareto-boolean"
import * as fs from "res-pareto-filesystem"
import * as fslib from "lib-pareto-filesystem"

import { $a } from "../index"



export const $$: api.CcreateBoundTester = ($d) => {
    return $a.createTester(
        {
            pr_onTestErrors: $d.pr_onTestErrors,
            pr_serializeTestResult: $a.createTestResultSerializer(
                {
                    pr_log: $d.pr_log,
                    sf_isABeforeB: collation.$a.localeIsABeforeB,
                },
            ),
            pr_serializeSummary: $a.createSummarySerializer(
                {
                    pr_log: $d.pr_log,
                    sf_isZero: bool.$a.isZero,
                    sf_add: arith.$a.add,
                    sf_negate: arith.$a.negate,

                }
            ),
            af_runTests: $a.createTestRunner(
                {
                    sf_diffData: diff.$a.diffData,
                    sf_stringsAreEqual: diff.$a.stringsAreEqual,
                    af_validateFile: $a.createFileValidator(
                        {
                            pr_writeFile: ($) =>/**/ {
                                fslib.$a.createWriteFileFireAndForget(
                                    {
                                        // pr_onError: ($) =>/**/ {
                                        //     $d.pr_onError(`${$.path}: ${fslib.$a.createWriteFileErrorMessage($.error)}`)
                                        // },
                                        if_createWriteStream: fs.$a.createWriteStream({
                                            pr_onError: ($) => {
                                                $d.pr_onError(`${$.path}: ${fslib.$a.createWriteFileErrorMessage($.error)}`)
                                            }
                                        }),
                                    },
                                )({
                                    path: $.path,
                                    data: $.data,
                                    createContainingDirectories: true,
                                })
                            },
                            pr_unlink: fslib.$a.createUnlinkFireAndForget(
                                {
                                    pr_onError: ($) =>/**/ {
                                        $d.pr_onError(`${$.path}: ${fslib.$a.createUnlinkErrorMessage($.error)}`)
                                    },
                                    af_unlink: fs.$a.unlink,
                                },
                            ),
                            af_readFile: ($) =>/**/ {
                                const x = $
                                return pl.toAsyncValue(($i2) =>/**/ {

                                    fs.$a.getFile(
                                        x,
                                        {
                                            onError: ($) =>/**/ {
                                                $d.pr_onError(`${$.path}: ${fslib.$a.createReadFileErrorMessage($.error)}`)
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
                            sf_diffData: diff.$a.diffData,
                        }),
                }
            ),
            sf_summarize: $a.createSummarizer(
                {
                   //log: $d.pr_log,
                    sf_increment: $a.increment,
                }
            ),
            sf_isZero: bool.$a.isZero,
        },
    )
}