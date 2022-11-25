import * as pl from "pareto-core-lib"

import * as diff from "res-pareto-diff"
// import * as fs from "res-pareto-filesystem"
import * as arith from "res-pareto-arithmetic"
import * as collation from "res-pareto-collation"
import * as bool from "res-pareto-boolean"
import * as fs from "res-pareto-filesystem"
import * as fslib from "lib-pareto-filesystem"
import * as async from "res-pareto-async"

import * as api from "../api"
import { $ } from "../implementation"

export const $$: api.API2 = {
    test: $.createTester(
        {
            runTests: $.createTestsRunner(
                {
                    diffData: diff.fDiffData,
                    stringsAreEqual: diff.fStringsAreEqual,
                    validateFile: $.createFileValidator({
                        readFile: ($) => {
                            const x = $
                            return async.aggregate({
                                connectToStream: ($, $i) => {
                    
                                    fs.f_getFile(
                                        x,
                                        {
                                            onError: () => {
                                                pl.logDebugMessage("#####")
                                            },
                                            init: ($c) => {
                                                $c($i)
                                            }
                                        },
                                        ($, $i) => $._execute($i)
                                    )
                                }
                            })(null).map(($) => {
                                return pl.asyncValue("FOO")
                            })
                        },
                        writeFile: ($) => {
                            fslib.f_createWriteFileFireAndForget(
                                fs.f_createWriteStream,
                                ($, $i) => $._execute($i)
                            )(
                                {
                                    onError: ($) => {
                                        pl.logDebugMessage("$$$$$")
                                    }
                                },
                    
                            )({
                                path: $.path,
                                data: $.data,
                                createContainingDirectories: true,
                            })
                        },
                        unlink: ($) => {
                            fslib.f_createUnlinkFireAndForget(
                                fs.f_unlink,
                                ($, $i) => $._execute($i)
                            )(
                                {
                                    onError: ($) => {
                                        pl.logDebugMessage("$$$$$")
                                    }
                                },
                    
                            )({
                                path: $
                            })
                        },
                        diffData: diff.fDiffData,
                    }),
                }
            ),
            isZero: bool.f_isZero,
            serializeTestResult: $.createTestResultSerializer({
                sortedForEach: collation.fCreateSortedForEach({
                    isYinBeforeYang: collation.fLocaleIsYinBeforeYang
                }),
            }),
            summarize: $.createSummarizer({
                increment: ($) => { return $ + 1 },
            }),
            serializeSummary: $.createSummarySerializer({
                isZero: bool.f_isZero,
                add: arith.f_add,
                negative: arith.f_negative,

            })
        },
        ($, $i) => $._execute($i)

    )
}