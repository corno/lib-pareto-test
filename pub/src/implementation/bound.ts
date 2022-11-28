import * as pt from "pareto-core-types"
import * as pl from "pareto-core-lib"

import * as diff from "res-pareto-diff"
// import * as fs from "res-pareto-filesystem"
import * as arith from "res-pareto-arithmetic"
import * as collation from "res-pareto-collation"
import * as bool from "res-pareto-boolean"
import * as fs from "res-pareto-filesystem"
import * as fslib from "lib-pareto-filesystem"

import * as api from "../api"

import * as $$ from "./unbound"

const processAsync: <T>($: pt.AsyncValue<T>, $i: ($: T) => void) => void = ($, $i) => $._execute($i)

export type CParseArguments = ($i: {
    onError: ($: string) => void
    callback: ($: api.TTestParameters) => void
}) => api.IRunProgram

export type CCreateTester = ($i: {
    onError: ($: string) => void
    log: ($: string) => void
    onTestErrors: () => void
}) => api.ITest

const parseArguments: CParseArguments = ($i) => {

    // exeLib.p_getSingleArgument(
    //     $.arguments,
    //     {
    //         error: ($) => {
    //             // switch ($[0]) {
    //             //     case "no arguments found":
    //             //         pl.cc($[1], ($) => {
    //             //             $i.out("missing test directory path")
    //             //         })
    //             //         break
    //             //     case "too many arguments found":
    //             //         pl.cc($[1], ($) => {
    //             //             $i.out("too many arguments, only a test directory expected")
    //             //         })
    //             //         break
    //             //     default: pl.au($[0])
    //             // }
    //             // $i.setExitCodeToFailed(null)
    //         },
    //         callback: ($) => {

    //         }
    //     }
    // )
    return $$.f_createTestParametersParser(
        {
            onError: () =>/**/ {
                $i.onError(`arguments error`)
            },
            callback: $i.callback,
        }
    )
}

export const createTester: CCreateTester = ($i) => {
    return $$.f_createTester(
        {
            onTestErrors: $i.onTestErrors,
            serializeTestResult: $$.f_createTestResultSerializer(
                {
                    log: $i.log,
                    isABeforeB: collation.fLocaleIsYinBeforeYang,
                },
            ),
            serializeSummary: $$.f_createSummarySerializer(
                {
                    log: $i.log
                },
                {
                    isZero: bool.f_isZero,
                    add: arith.f_add,
                    negate: arith.f_negative,

                }
            )
        },
        {
            runTests: $$.f_createTestsRunner(
                {
                    diffData: diff.fDiffData,
                    stringsAreEqual: diff.fStringsAreEqual,
                    validateFile: $$.f_createFileValidator(
                        {

                            writeFile: ($) =>/**/ {
                                fslib.f_createWriteFileFireAndForget(
                                    {
                                        createWriteStream: fs.f_createWriteStream,
                                        onError: ($) =>/**/ {
                                            $i.onError(`${$.path}: ${fslib.f_createWriteFileErrorMessage($.error)}`)
                                        }
                                    },

                                    processAsync,
                                )({
                                    path: $.path,
                                    data: $.data,
                                    createContainingDirectories: true,
                                })
                            },
                            unlink: fslib.f_createUnlinkFireAndForget({
                                unlink: fs.f_unlink,
                                onError: ($) =>/**/ {
                                    $i.onError(`${$.path}: ${fslib.f_createUnlinkErrorMessage($.error)}`)
                                }
                            },
                                processAsync,
                            ),
                        },
                        {
                            readFile: ($) =>/**/ {
                                const x = $
                                return pl.toAsyncValue(($i2) =>/**/ {

                                    fs.f_getFile(
                                        x,
                                        {
                                            onError: ($) =>/**/ {
                                                $i.onError(`${$.path}: ${fslib.f_createReadFileErrorMessage($.error)}`)
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
            summarize: $$.f_createSummarizer(
                {
                    log: $i.log,
                },
                {
                    increment: $$.increment,
                }
            ),
            isZero: bool.f_isZero,
        },
        processAsync,

    )
}

export const $b: api.BoundAPI = {
    createTestProgram: ($f) => {
        return parseArguments({
            onError: pl.logDebugMessage,
            callback: ($) =>/**/ {
                processAsync(
                    $f.getTestSet($),
                    ($) =>/**/ {
                        createTester(
                            {
                                onError: pl.logDebugMessage,
                                onTestErrors: () =>/**/ {
                                    pl.logDebugMessage("!TESTERRORS")

                                },
                                log: pl.logDebugMessage
                            }
                        )($)
                    }
                )
            }
        })
    }
}