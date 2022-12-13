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
import { CCreateArgumentsParser, CCreateTester2 } from "./creators.p"

const processAsync: <T>($: pt.AsyncValue<T>, $i: ($: T) => void) => void = ($, $i) => $._execute($i)


const createArgumentsParser: CCreateArgumentsParser = ($i) => {

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
            callback: ($) => {
                $i.callback($)
            },
        }
    )
}

export const createTester: CCreateTester2 = ($i) => {
    return $$.f_createTester(
        {
            onTestErrors: $i.onTestErrors,
            serializeTestResult: $$.f_createTestResultSerializer(
                {
                    log: $i.log,
                    isABeforeB: collation.$a.localeIsABeforeB,
                },
            ),
            serializeSummary: $$.f_createSummarySerializer(
                {
                    log: $i.log,
                    isZero: bool.$a.isZero,
                    add: arith.f_add,
                    negate: arith.f_negative,

                }
            ),
            runTests: $$.f_createTestsRunner(
                {
                    diffData: diff.fDiffData,
                    stringsAreEqual: diff.fStringsAreEqual,
                    validateFile: $$.f_createFileValidator(
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
            summarize: $$.f_createSummarizer(
                {
                    log: $i.log,
                    increment: $$.increment,
                }
            ),
            isZero: bool.$a.isZero,
        },
        processAsync,

    )
}

export const $a: api.API = {
    createTestProgram: ($, $f) => {
        return createArgumentsParser({
            onError: $f.logError,
            callback: ($) =>/**/ {
                processAsync(
                    $f.getTestSet($),
                    createTester(
                        {
                            onError: $f.logError,
                            onTestErrors: $f.onTestErrors,
                            log: $f.log
                        }
                    )
                )
            }
        })
    }
}