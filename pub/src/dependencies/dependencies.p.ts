import * as pl from "pareto-core-lib"

import * as diff from "res-pareto-diff"
// import * as fs from "res-pareto-filesystem"
import * as arith from "res-pareto-arithmetic"
import * as collation from "res-pareto-collation"
import * as bool from "res-pareto-boolean"
import * as fs from "res-pareto-filesystem"
import * as fslib from "lib-pareto-filesystem"

import * as api from "../api"
import { $$ } from "../implementation"

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
        return $$.createArgumentsParser(
            {
                onMissing: () =>/**/ {
                    $i.onError(`missing argument`)
                },
                onTooMany: () =>/**/ {
                    $i.onError(`too many arguments`)

                },
                callback: $i.callback,
            }
        )
    },
    createTester: ($i) => {
        return $$.createTester(
            {
                onTestErrors: $i.onTestErrors,
                serializeTestResult: $$.createTestResultSerializer(
                    {
                        log: $i.log,
                    },
                    {
                        sortedForEach: collation.fCreateSortedForEach({
                            isYinBeforeYang: collation.fLocaleIsYinBeforeYang
                        }),
                    }
                ),
                serializeSummary: $$.createSummarySerializer(
                    {
                        log: $i.log
                    },
                    {
                        isZero: bool.f_isZero,
                        add: arith.f_add,
                        negative: arith.f_negative,

                    }
                )
            },
            {
                runTests: $$.createTestsRunner(
                    {
                        diffData: diff.fDiffData,
                        stringsAreEqual: diff.fStringsAreEqual,
                        validateFile: $$.createFileValidator(
                            {

                                writeFile: ($) =>/**/ {
                                    fslib.f_createWriteFileFireAndForget(
                                        fs.f_createWriteStream,
                                        ($, $i) =>/**/ $._execute($i)
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
                                unlink: ($) =>/**/ {
                                    fslib.f_createUnlinkFireAndForget(
                                        fs.f_unlink,
                                        ($, $i) =>/**/ $._execute($i)
                                    )(
                                        {
                                            onError: ($) =>/**/ {
                                                $i.onError(`${$.path}: ${fslib.l_createUnlinkErrorMessage($.error)}`)
                                            }
                                        },

                                    )({
                                        path: $
                                    })
                                },
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
                summarize: $$.createSummarizer(
                    {
                        log: $i.log,
                    },
                    {
                        increment: ($) =>/**/ { return $ + 1 },
                    }
                ),
                isZero: bool.f_isZero,
            },
            ($, $i) =>/**/ $._execute($i)

        )
    },
    createTestProgram: ($f) => {
        return $b.parseArguments({
            onError: pl.logDebugMessage,
            callback: ($) =>/**/ {
                pl.logDebugMessage("HIER1")
                $f.getTestSet({ testDirectory: $ })._execute(($) =>/**/ {

                    pl.logDebugMessage("HIER2")
                    $b.createTester(
                        {
                            onError: pl.logDebugMessage,
                            onTestErrors: () =>/**/ {
                                pl.logDebugMessage("!TESTERRORS")

                            },
                            log: pl.logDebugMessage
                        }
                    )($)
                })

            }
        })
    }
}