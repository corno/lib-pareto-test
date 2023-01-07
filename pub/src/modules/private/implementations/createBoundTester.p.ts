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


export const icreateBoundTester: api.CcreateBoundTester = ($, $d) => {
    return icreateTester(
        null,
        {
            onTestErrors: $d.onTestErrors,
            serializeTestResult: icreateTestResultSerializer(
                null,
                {
                    log: $d.log,
                    isABeforeB: collation.$a.localeIsABeforeB,
                },
            ),
            serializeSummary: icreateSummarySerializer(
                null,
                {
                    log: $d.log,
                    isZero: bool.$a.isZero,
                    add: arith.f_add,
                    negate: arith.f_negative,

                }
            ),
            runTests: icreateTestRunner(
                null,
                {
                    diffData: diff.$a.diffData,
                    stringsAreEqual: diff.$a.stringsAreEqual,
                    validateFile: icreateFileValidator(
                        null,
                        {
                            writeFile: ($) =>/**/ {
                                fslib.$b.createWriteFileFireAndForget(
                                    {
                                        onError: ($) =>/**/ {
                                            $d.onError(`${$.path}: ${fslib.$b.createWriteFileErrorMessage($.error)}`)
                                        }
                                    },

                                    processAsync,
                                )({
                                    path: $.path,
                                    data: $.data,
                                    createContainingDirectories: true,
                                })
                            },
                            unlink: fslib.$b.createUnlinkFireAndForget(
                                {
                                    onError: ($) =>/**/ {
                                        $d.onError(`${$.path}: ${fslib.$b.createUnlinkErrorMessage($.error)}`)
                                    }
                                },
                                processAsync,
                            ),
                            readFile: ($) =>/**/ {
                                const x = $
                                return pl.toAsyncValue(($i2) =>/**/ {

                                    fs.f_getFile(
                                        x,
                                        {
                                            onError: ($) =>/**/ {
                                                $d.onError(`${$.path}: ${fslib.$b.createReadFileErrorMessage($.error)}`)
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
                            diffData: diff.$a.diffData,
                        }),
                }
            ),
            summarize: icreateSummarizer(
                null,
                {
                    log: $d.log,
                    increment: iincrement,
                }
            ),
            isZero: bool.$a.isZero,
        },
    )
}