import * as pa from "pareto-core-async"
import * as pt from "pareto-core-types"
import * as pl from "pareto-core-lib"

import * as diff from "api-pareto-diff"

import * as api from "../../interface"
import { TTestElementResult } from "../../interface"
import { validateFile } from "./validateFile"

// function after(
//     $: pt.AsyncNonValue,
//     callback: () => void
// ): pt.AsyncNonValue {
//     return {
//         execute: (cb) => {
//             $.execute(() => {
//                 callback()
//                 cb()
//             })
//         }
//     }
// }

export const runTests: api.RunTests = ($, $i, $d) => {
    return pa.createAsyncRegistry(
        (reg) => {
            function doTestSet($: api.TTestSet): pt.AsyncValue<api.TTestSetResult> {
                return pa.rewrite(
                    pa.dictionary(
                        $.elements,
                        ($): pt.AsyncValue<api.TTestElementResult> => {
                            switch ($.type[0]) {
                                case "subset":
                                    return pl.cc($.type[1], ($) => {
                                        return pa.rewrite(
                                            doTestSet($),
                                            ($) => {
                                                return pa.value<api.TTestElementResult>({
                                                    type: ["subset", $]
                                                })
                                            }
                                        )
                                    })
                                case "test":
                                    return pl.cc($.type[1], ($): pt.AsyncValue<TTestElementResult> => {

                                        switch ($.type[0]) {
                                            case "boolean":
                                                return pl.cc($.type[1], ($) => {
                                                    return pa.value({
                                                        type: ["test", {
                                                            success: $.test,
                                                            type: ["boolean", {}]
                                                        }]
                                                    })
                                                })
                                            case "file string":
                                                return pl.cc($.type[1], ($) => {
                                                    return validateFile(
                                                        $,
                                                        $d.validateFile,
                                                    )
                                                })
                                            case "large string":
                                                return pl.cc($.type[1], ($) => {
                                                    const res = $d.diffData(
                                                        {
                                                            originalData: $.expected,
                                                            changedData: $.actual,
                                                            newline: "\n",
                                                        }
                                                    )
                                                    return pa.value({
                                                        type: ["test", {
                                                            success: res === null,
                                                            type: ["large string", {
                                                                parts: res === null ? pl.createEmptyArray() : res
                                                            }]
                                                        }]
                                                    })
                                                })
                                            case "simple string":
                                                return pl.cc($.type[1], ($) => {
                                                    return pa.value({
                                                        type: ["test", {
                                                            success: $.actual === $.expected,
                                                            type: ["simple string", {
                                                                actual: $.actual,
                                                                expected: $.expected,
                                                            }]
                                                        }]
                                                    })
                                                })
                                            default: return pl.au($.type[0])
                                        }
                                    })
                                default: return pl.au($.type[0])
                            }
                        }
                    ),
                    ($) => {
                        return pa.value({
                            elements: $
                        })
                    }
                )
            }

            $d.startAsync(
                pa.processValue(
                    doTestSet($.testSet),
                    ($) => {
                        $i.onDone($)
                    }
                )
            )

        }
    )
}