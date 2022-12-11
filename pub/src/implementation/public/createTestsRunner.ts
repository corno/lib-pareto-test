import * as pt from "pareto-core-types"
import * as pl from "pareto-core-lib"

import * as api from "../../api"
import { CCreateTestRunner } from "../creators.p"

export const f_createTestsRunner: CCreateTestRunner = ($f) => {
    return ($) => {
        function doTestSet($: api.TTestSet): pt.AsyncValue<api.TTestSetResult> {
            return $.elements.asyncMap(($): pt.AsyncValue<api.TTestElementResult> => {
                switch ($.type[0]) {
                    case "subset":
                        return pl.cc($.type[1], ($) => {
                            return doTestSet($).map(($) => {
                                return pl.asyncValue<api.TTestElementResult>({
                                    type: ["subset", $]
                                })
                            })
                        })
                    case "test":
                        return pl.cc($.type[1], ($): pt.AsyncValue<api.TTestElementResult> => {

                            switch ($.type[0]) {
                                case "boolean":
                                    return pl.cc($.type[1], ($) => {
                                        return pl.asyncValue({
                                            type: ["test", {
                                                success: $.test,
                                                type: ["boolean", null]
                                            }]
                                        })
                                    })
                                case "file string":
                                    return pl.cc($.type[1], ($) => {
                                        return $f.validateFile(
                                            $,
                                        )
                                    })
                                case "large string":
                                    return pl.cc($.type[1], ($) => {
                                        const res = $f.diffData(
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
                                                    type: ["large string", {
                                                        parts: res
                                                    }]
                                                }]
                                            })

                                        } else {
                                            return pl.asyncValue({
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
                                        return pl.asyncValue({
                                            type: ["test", {
                                                success: $f.stringsAreEqual({
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
            }).map(($) => {
                return pl.asyncValue({
                    elements: $
                })
            })
        }
        return doTestSet($)
    }
}