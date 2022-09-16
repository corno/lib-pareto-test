import * as pl from "pareto-core-lib"
import * as pa from "pareto-core-async"

import * as exeLib from "lib-pareto-exe"
import * as fs from "lib-pareto-filesystem"

import * as api from "../../interface"

import { f_runTests } from "./f_runTests"
import { f_serializeTestResult } from "./f_serializeTestResult"
import { f_serializeSummary } from "./f_serializeSummary"
import { f_summarize } from "./f_summarize"

export const f_createTester: api.FCreateTester = (
    $d,
    $a,
) => {
    const dependencies = $d
    const getTestSet = $d.getTestSet

    return ($, $i, $d) => {
        const out = exeLib.createLogger(
            {
                writer: $i.stdout,
                newline: "\n",
            }
        )
        exeLib.getSingleArgument(
            $.arguments,
            {
                error: ($) => {
                    switch ($[0]) {
                        case "no arguments found":
                            pl.cc($[1], ($) => {
                                out("missing test directory path")
                            })
                            break
                        case "too many arguments found":
                            pl.cc($[1], ($) => {
                                out("too many arguments, only a test directory expected")
                            })
                            break
                        default: pl.au($[0])
                    }
                    $i.setExitCodeToFailed()
                },
                callback: ($) => {
                    $a(
                        getTestSet(
                            {
                                testDirectory: $
                            },
                        ),
                        ($) => {
                            $a(
                                f_runTests(
                                    {
                                        testSet: $
                                    },
                                    {
                                        rtd: {
                                            diff: dependencies.diff,
                                            fs: {
                                                readFile: fs.createReadFileOrAbort(
                                                    {
                                                        onError: ($) => {
                                                            pl.implementMe("READFILE Error Handler")
                                                        }
                                                    },
                                                    {
                                                        readFile: dependencies.fs.readFile
                                                    }
                                                ),
                                                writeFile: fs.createWriteFileFireAndForget(
                                                    {
                                                        onError: ($) => {
                                                            pl.implementMe("WRITEFILE Error Handler")
                                                        }
                                                    },
                                                    {
                                                        writeFile: dependencies.fs.writeFile
                                                    },
                                                    $a,
                                                ),
                                                unlink: fs.createUnlinkFireAndForget(
                                                    {
                                                        onError: ($) => {
                                                            pl.implementMe("UNLINK Error Handler")
                                                        }
                                                    },
                                                    {
                                                        unlink: dependencies.fs.unlink
                                                    },
                                                    $a,
                                                ),
                                            }
                                        },
                                    },
                                    $a
                                ),
                                ($) => {
                                    f_serializeTestResult(
                                        {
                                            testResult: $,
                                        },
                                        {
                                            log: out
                                        },
                                        {
                                            isYinBeforeYang: dependencies.isYinBeforeYang
                                        }
                                    )
                                    const summary = f_summarize(
                                        $,
                                        {
                                            increment: dependencies.increment
                                        }
                                    )
                                    f_serializeSummary(
                                        {
                                            summary: summary,
                                        },
                                        {
                                            log: out
                                        },
                                        {
                                            isZero: dependencies.isZero,
                                            add: dependencies.add,
                                            negative: dependencies.negative,
                                        }
                                    )
                                    if (dependencies.isZero(summary.numberOfErrors)) {
                                        //
                                    } else {
                                        $i.setExitCodeToFailed()
                                    }
                                }
                            )

                        }
                    )

                }
            }
        )
    }
}