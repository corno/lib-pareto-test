import * as pl from "pareto-core-lib"

import * as exeLib from "lib-pareto-exe"
import * as fs from "lib-pareto-filesystem"

import * as api from "../../interface"

import { f_runTests } from "./runTests.p"
import { p_serializeTestResult } from "./serializeTestResult.p"
import { p_serializeSummary } from "./serializeSummary.p"
import { f_summarize } from "./summarize.p"

export const f_createTester: api.FCreateTester = (
    $d,
    $a,
) => {
    const dependencies = $d
    const getTestSet = $d.getTestSet

    return ($, $i, $d) => {
        const out = exeLib.f_createLogger(
            {
                newline: "\n",
            },
            $i.stdout
        )
        exeLib.p_getSingleArgument(
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
                    $i.setExitCodeToFailed(null)
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
                                                readFile: fs.f_createReadFileOrAbort(
                                                    {
                                                        onError: ($) => {
                                                            pl.implementMe("READFILE Error Handler")
                                                        }
                                                    },
                                                    dependencies.fs.readFile,
                                                ),
                                                writeFile: fs.f_createWriteFileFireAndForget(
                                                    {
                                                        onError: ($) => {
                                                            pl.implementMe("WRITEFILE Error Handler")
                                                        }
                                                    },
                                                    dependencies.fs.writeFile,
                                                    $a,
                                                ),
                                                unlink: fs.f_createUnlinkFireAndForget(
                                                    {
                                                        onError: ($) => {
                                                            pl.implementMe("UNLINK Error Handler")
                                                        }
                                                    },
                                                    dependencies.fs.unlink,
                                                    $a,
                                                ),
                                            }
                                        },
                                    },
                                    $a
                                ),
                                ($) => {
                                    p_serializeTestResult(
                                        {
                                            testResult: $,
                                        },
                                        {
                                            log: out
                                        },
                                        dependencies,
                                    )
                                    const summary = f_summarize(
                                        $,
                                        {
                                            increment: dependencies.increment
                                        }
                                    )
                                    p_serializeSummary(
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
                                        $i.setExitCodeToFailed(null)
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