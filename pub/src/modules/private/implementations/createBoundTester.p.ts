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
            pr_onTestErrors: $d.pr_onTestErrors,
            pr_serializeTestResult: $a.createTestResultSerializer(
                {
                    pr_log: $d.pr_log,
                    sf_isABeforeB: mcollation.$a.localeIsABeforeB,
                },
            ),
            pr_serializeSummary: $a.createSummarySerializer(
                {
                    pr_log: $d.pr_log,
                    sf_isZero: mbool.$a.isZero,
                    sf_add: marith.$a.add,
                    sf_negate: marith.$a.negate,

                }
            ),
            af_runTests: $a.createTestRunner(
                {
                    sf_diffData: mdiff.$a.diffData,
                    sf_stringsAreEqual: mdiff.$a.stringsAreEqual,
                    af_validateFile: $a.createFileValidator(
                        {
                            pr_writeFile: ($) =>/**/ {
                                mfslib.$a.createWriteFileFireAndForget(
                                    {
                                        // pr_onError: ($) =>/**/ {
                                        //     $d.pr_onError(`${$.path}: ${fslib.$a.createWriteFileErrorMessage($.error)}`)
                                        // },
                                        if_createWriteStream: mfs.$a.createWriteStream({
                                            pr_onError: ($) => {
                                                $d.pr_onError(`${$.path}: ${mfslib.$a.createWriteFileErrorMessage($.error)}`)
                                            }
                                        }),
                                    },
                                )({
                                    path: $.path,
                                    data: $.data,
                                    createContainingDirectories: true,
                                })
                            },
                            pr_unlink: mfslib.$a.createUnlinkFireAndForget(
                                {
                                    pr_onError: ($) =>/**/ {
                                        $d.pr_onError(`${$.path}: ${mfslib.$a.createUnlinkErrorMessage($.error)}`)
                                    },
                                    af_unlink: mfs.$a.unlink,
                                },
                            ),
                            af_readFile: ($) =>/**/ {
                                const x = $
                                return pl.toAsyncValue(($i2) =>/**/ {

                                    mfs.$a.getFile(
                                        x,
                                        {
                                            onError: ($) =>/**/ {
                                                $d.pr_onError(`${$.path}: ${mfslib.$a.createReadFileErrorMessage($.error)}`)
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
                            sf_diffData: mdiff.$a.diffData,
                        }),
                }
            ),
            sf_summarize: $a.createSummarizer(
                {
                   //log: $d.pr_log,
                    sf_increment: $a.increment,
                }
            ),
            sf_isZero: mbool.$a.isZero,
        },
    )
}