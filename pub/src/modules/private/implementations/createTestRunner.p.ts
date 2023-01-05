import * as pt from "pareto-core-types"
import * as pl from "pareto-core-lib"

import * as api from "../api"

import * as mpublic from "../../public"

export const icreateTestRunner: api.CcreateTestRunner = ($c, $d) => {
    return ($) => {
        function doTestSet($: mpublic.TTestSet): pt.AsyncValue<mpublic.TTestSetResult> {
            return $.elements.asyncMap(($): pt.AsyncValue<mpublic.TTestElementResult> => {
                switch ($.type[0]) {
                    case "subset":
                        return pl.cc($.type[1], ($) => {
                            return doTestSet($).map(($) => {
                                return pl.asyncValue<mpublic.TTestElementResult>({
                                    type: ["subset", $]
                                })
                            })
                        })
                    case "test":
                        return pl.cc($.type[1], ($): pt.AsyncValue<mpublic.TTestElementResult> => {

                            switch ($.type[0]) {
                                case "boolean":
                                    return pl.cc($.type[1], ($) => {
                                        return pl.asyncValue({
                                            type: ["test", {
                                                success: $,
                                                type: ["boolean", null]
                                            }]
                                        })
                                    })
                                case "file string":
                                    return pl.cc($.type[1], ($) => {
                                        return $d.validateFile(
                                            $,
                                        )
                                    })
                                case "long string":
                                    return pl.cc($.type[1], ($) => {
                                        const res = $d.diffData(
                                            {
                                                originalData: $.expected,
                                                changedData: $.actual,
                                                newline: "\n",
                                            }
                                        )
                                        if (pl.isNotNull(res)) {
                                            return pl.asyncValue({
                                                type: ["test", {
                                                    success: false,
                                                    type: ["long string", {
                                                        parts: res
                                                    }]
                                                }]
                                            })

                                        } else {
                                            return pl.asyncValue({
                                                type: ["test", {
                                                    success: true,
                                                    type: ["long string", {
                                                        parts: pl.createEmptyArray()
                                                    }]
                                                }]
                                            })

                                        }
                                    })
                                case "short string":
                                    return pl.cc($.type[1], ($) => {
                                        return pl.asyncValue({
                                            type: ["test", {
                                                success: $d.stringsAreEqual({
                                                    a: $.actual,
                                                    b: $.expected,
                                                }),
                                                type: ["short string", {
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
            }).map(($) => {
                return pl.asyncValue({
                    elements: $
                })
            })
        }
        return doTestSet($)
    }
}