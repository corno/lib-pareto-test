import * as pt from "pareto-core-types"
import * as pl from "pareto-core-lib"

import * as api from "../api"

import * as diff from "res-pareto-diff"
import * as arith from "res-pareto-arithmetic"
import * as collation from "res-pareto-collation"
import * as bool from "res-pareto-boolean"
import * as fs from "res-pareto-filesystem"
import * as fslib from "lib-pareto-filesystem"

import { icreateTestResultSerializer } from "./createTestResultSerializer.p"
import { icreateTester } from "./createTester.p"
import { icreateSummarySerializer } from "./createSummarySerializer.p"
import { icreateTestRunner } from "./createTestRunner.p"
import { icreateFileValidator } from "./createFileValidator.p"
import { icreateSummarizer } from "./createSummarizer.p"
import { iincrement } from "./increment.p"

const processAsync: <T>($: pt.AsyncValue<T>, $i: ($: T) => void) => void = ($, $i) => $._execute($i)


export const icreateBoundTester: api.CcreateBoundTester = ($d) => {
    return icreateTester(
        {
            pr_onTestErrors: $d.pr_onTestErrors,
            pr_serializeTestResult: icreateTestResultSerializer(
                {
                    pr_log: $d.pr_log,
                    sf_isABeforeB: collation.$a.localeIsABeforeB,
                },
            ),
            pr_serializeSummary: icreateSummarySerializer(
                {
                    pr_log: $d.pr_log,
                    sf_isZero: bool.$a.isZero,
                    sf_add: arith.$a.add,
                    sf_negate: arith.$a.negate,

                }
            ),
            af_runTests: icreateTestRunner(
                {
                    sf_diffData: diff.$a.diffData,
                    sf_stringsAreEqual: diff.$a.stringsAreEqual,
                    af_validateFile: icreateFileValidator(
                        {
                            pr_writeFile: ($) =>/**/ {
                                fslib.$a.createWriteFileFireAndForget(
                                    {
                                        donError: ($) =>/**/ {
                                            $d.pr_onError(`${$.path}: ${fslib.$a.createWriteFileErrorMessage($.error)}`)
                                        },
                                        fcreateWriteStream: fs.f_createWriteStream,
                                    },
                                )({
                                    path: $.path,
                                    data: $.data,
                                    createContainingDirectories: true,
                                })
                            },
                            pr_unlink: fslib.$a.createUnlinkFireAndForget(
                                {
                                    donError: ($) =>/**/ {
                                        $d.pr_onError(`${$.path}: ${fslib.$a.createUnlinkErrorMessage($.error)}`)
                                    },
                                    funlink: fs.f_unlink,
                                },
                            ),
                            af_readFile: ($) =>/**/ {
                                const x = $
                                return pl.toAsyncValue(($i2) =>/**/ {

                                    fs.f_getFile(
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
                                        ($, $i) =>/**/ $._execute($i)
                                    )
                                })
                            },
                            sf_diffData: diff.$a.diffData,
                        }),
                }
            ),
            sf_summarize: icreateSummarizer(
                {
                   //log: $d.pr_log,
                    sf_increment: iincrement,
                }
            ),
            sf_isZero: bool.$a.isZero,
        },
    )
}