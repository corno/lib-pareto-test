import * as pl from "pareto-core-lib"
import * as pa from "pareto-core-async"

import * as exeLib from "lib-pareto-exe"
import * as fs from "lib-pareto-filesystem"

import * as api from "../../interface"

import { runTests } from "./runTests"
import { serializeTestResult } from "./serializeTestResult"
import { serializeSummary } from "./serializeSummary"
import { summarize } from "./summarize"

export const createTester: api.CreateTester = (
    $d
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
                    $d.setExitCodeToFailed()
                },
                callback: ($) => {
                    $d.startAsync(
                        pa.processValue(
                            getTestSet(
                                {
                                    testDirectory: $
                                },
                                {
                                    startAsync: $d.startAsync,
                                }
                            ),
                            ($) => {
                                $d.startAsync(
                                    pa.processValue(
                                    runTests(
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
                                                        }
                                                    ),
                                                    unlink: fs.createUnlinkFireAndForget(
                                                        {
                                                            onError: ($) => {
                                                                pl.implementMe("UNLINK Error Handler")
                                                            }
                                                        },
                                                        {
                                                            unlink: dependencies.fs.unlink
                                                        }
                                                    ),
                                                }
                                            },
                                            startAsync: $d.startAsync,
                                        }
                                    ),
                                    ($) => {
                                        serializeTestResult(
                                            {
                                                testResult: $,
                                            },
                                            {
                                                log: out
                                            }
                                        )
                                        const summary = summarize($)
                                        serializeSummary(
                                            {
                                                summary: summary,
                                            },
                                            {
                                                log: out
                                            },
                                            {
                                                isZero: dependencies.isZero,
                                            }
                                        )
                                        if (summary.numberOfErrors > 0) {
                                            $d.setExitCodeToFailed()
                                        }
                                    }
                                    )
                                )

                            }
                        )
                    )

                }
            }
        )
    }
}