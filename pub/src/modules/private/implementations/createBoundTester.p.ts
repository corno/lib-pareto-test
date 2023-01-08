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
            donTestErrors: $d.donTestErrors,
            dserializeTestResult: icreateTestResultSerializer(
                {
                    dlog: $d.dlog,
                    fisABeforeB: collation.$a.localeIsABeforeB,
                },
            ),
            dserializeSummary: icreateSummarySerializer(
                {
                    dlog: $d.dlog,
                    fisZero: bool.$a.isZero,
                    fadd: arith.$a.add,
                    fnegate: arith.$a.negate,

                }
            ),
            frunTests: icreateTestRunner(
                {
                    fdiffData: diff.$a.diffData,
                    fstringsAreEqual: diff.$a.stringsAreEqual,
                    fvalidateFile: icreateFileValidator(
                        {
                            sewriteFile: ($) =>/**/ {
                                fslib.$a.createWriteFileFireAndForget(
                                    {
                                        onError: ($) =>/**/ {
                                            $d.donError(`${$.path}: ${fslib.$a.createWriteFileErrorMessage($.error)}`)
                                        },
                                        createWriteStream: fs.f_createWriteStream,
                                    },
                                )({
                                    path: $.path,
                                    data: $.data,
                                    createContainingDirectories: true,
                                })
                            },
                            seunlink: fslib.$a.createUnlinkFireAndForget(
                                {
                                    onError: ($) =>/**/ {
                                        $d.donError(`${$.path}: ${fslib.$a.createUnlinkErrorMessage($.error)}`)
                                    },
                                    unlink: fs.f_unlink,
                                },
                            ),
                            freadFile: ($) =>/**/ {
                                const x = $
                                return pl.toAsyncValue(($i2) =>/**/ {

                                    fs.f_getFile(
                                        x,
                                        {
                                            onError: ($) =>/**/ {
                                                $d.donError(`${$.path}: ${fslib.$a.createReadFileErrorMessage($.error)}`)
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
                            fdiffData: diff.$a.diffData,
                        }),
                }
            ),
            fsummarize: icreateSummarizer(
                {
                   //log: $d.dlog,
                    fincrement: iincrement,
                }
            ),
            fisZero: bool.$a.isZero,
        },
    )
}