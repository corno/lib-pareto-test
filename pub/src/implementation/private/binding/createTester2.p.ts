import * as pt from "pareto-core-types"
import * as pl from "pareto-core-lib"

import * as pd from "../../private_definitions"


import * as diff from "res-pareto-diff"
import * as arith from "res-pareto-arithmetic"
import * as collation from "res-pareto-collation"
import * as bool from "res-pareto-boolean"
import * as fs from "res-pareto-filesystem"
import * as fslib from "lib-pareto-filesystem"

import { icreateTestResultSerializer } from "../../public/pure/createTestResultSerializer.p"
import { icreateTester } from "../../public/pure/createTester.p"
import { icreateSummarySerializer } from "../pure/createSummarySerializer.p"
import { icreateTestsRunner } from "../pure/createTestsRunner.p"
import { icreateFileValidator } from "../pure/createFileValidator.p"
import { icreateSummarizer } from "../pure/createSummarizer.p"
import { iincrement } from "../../public/pure/increment.p"

const processAsync: <T>($: pt.AsyncValue<T>, $i: ($: T) => void) => void = ($, $i) => $._execute($i)


export const icreateTester2: pd.CCreateTester2 = ($i) => {
    return icreateTester(
        {
            onTestErrors: $i.onTestErrors,
            serializeTestResult: icreateTestResultSerializer(
                {
                    log: $i.log,
                    isABeforeB: collation.$a.localeIsABeforeB,
                },
            ),
            serializeSummary: icreateSummarySerializer(
                {
                    log: $i.log,
                    isZero: bool.$a.isZero,
                    add: arith.f_add,
                    negate: arith.f_negative,

                }
            ),
            runTests: icreateTestsRunner(
                {
                    diffData: diff.fDiffData,
                    stringsAreEqual: diff.fStringsAreEqual,
                    validateFile: icreateFileValidator(
                        {

                            writeFile: ($) =>/**/ {
                                fslib.$b.createWriteFileFireAndForget(
                                    {
                                        onError: ($) =>/**/ {
                                            $i.onError(`${$.path}: ${fslib.$b.createWriteFileErrorMessage($.error)}`)
                                        }
                                    },

                                    processAsync,
                                )({
                                    path: $.path,
                                    data: $.data,
                                    createContainingDirectories: true,
                                })
                            },
                            unlink: fslib.$b.createUnlinkFireAndForget({
                                onError: ($) =>/**/ {
                                    $i.onError(`${$.path}: ${fslib.$b.createUnlinkErrorMessage($.error)}`)
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
                                                $i.onError(`${$.path}: ${fslib.$b.createReadFileErrorMessage($.error)}`)
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
                            diffData: diff.fDiffData,
                        }),
                }
            ),
            summarize: icreateSummarizer(
                {
                    log: $i.log,
                    increment: iincrement,
                }
            ),
            isZero: bool.$a.isZero,
        },
        processAsync,

    )
}