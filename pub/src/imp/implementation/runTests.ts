import * as pa from "pareto-core-async"
import * as pt from "pareto-core-types"
import * as pl from "pareto-core-lib"

import * as api from "../../interface"
import { TTestElementResult } from "../../interface"
import { validateFile } from "./validateFile"

export const runTests: api.RunTests = ($, $d) => {
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
                                                {
                                                    fs: $d.rtd.fs,
                                                    startAsync: $d.startAsync,
                                                    diffData: $d.rtd.diff.diffData,
                                                },
                                            )
                                        })
                                    case "large string":
                                        return pl.cc($.type[1], ($) => {
                                            const res = $d.rtd.diff.diffData(
                                                {
                                                    originalData: $.expected,
                                                    changedData: $.actual,
                                                    newline: "\n",
                                                }
                                            )
                                            if (pl.isNotNull(res)) {
                                                return pa.value({
                                                    type: ["test", {
                                                        success: false,
                                                        type: ["large string", {
                                                            parts: res
                                                        }]
                                                    }]
                                                })

                                            } else {
                                                return pa.value({
                                                    type: ["test", {
                                                        success: true,
                                                        type: ["large string", {
                                                            parts: pl.createEmptyArray()
                                                        }]
                                                    }]
                                                })

                                            }
                                        })
                                    case "simple string":
                                        return pl.cc($.type[1], ($) => {
                                            return pa.value({
                                                type: ["test", {
                                                    success: $d.rtd.diff.stringsAreEqual({
                                                        a: $.actual,
                                                        b: $.expected,
                                                    }),
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
    return doTestSet($.testSet)
}