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

const processAsync: api.ProcessAsyncValue = ($, $i) => $._execute($i)

export const $b: api.BoundAPI = {
    parseArguments: ($i) => {

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
    },
    createTester: ($i) => {
        return $$.f_createTester(
            {
                onTestErrors: $i.onTestErrors,
                serializeTestResult: $$.f_createTestResultSerializer(
                    {
                        log: $i.log,
                    },
                    {
                        sortedForEach: collation.fCreateSortedForEach({
                            isYinBeforeYang: collation.fLocaleIsYinBeforeYang
                        }),
                    }
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
                                        fs.f_createWriteStream,
                                        processAsync,
                                    )(
                                        {
                                            onError: ($) =>/**/ {
                                                $i.onError(`${$.path}: ${fslib.l_createWriteFileErrorMessage($.error)}`)
                                            }
                                        },

                                    )({
                                        path: $.path,
                                        data: $.data,
                                        createContainingDirectories: true,
                                    })
                                },
                                unlink: fslib.f_createUnlinkFireAndForget(
                                    fs.f_unlink,
                                    processAsync,
                                )(
                                    {
                                        onError: ($) =>/**/ {
                                            $i.onError(`${$.path}: ${fslib.l_createUnlinkErrorMessage($.error)}`)
                                        }
                                    },

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
                                                    $i.onError(`${$.path}: ${fslib.l_createReadFileErrorMessage($.error)}`)
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
    },
    createTestProgram: ($f) => {
        return $b.parseArguments({
            onError: pl.logDebugMessage,
            callback: ($) =>/**/ {
                processAsync(
                    $f.getTestSet($),
                    ($) =>/**/ {
                        $b.createTester(
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