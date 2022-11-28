import * as pl from "pareto-core-lib"

import * as api from "../../api"
import * as types from "../types"

export const f_createSummarizer: types.CCreateSummarizer = (
    $i,
    $f,
) => {
    return ($) => {

        type SSummary = {
            "numberOfErrors": number
            "numberOfTests": number
        }
        const summary: SSummary = {
            numberOfErrors: 0,
            numberOfTests: 0,
        }
        function summarizeTestSetImp(
            $: api.TTestSetResult
        ): void {
            //this should be a reduce function!!!
            $.elements.map(($, key) => {
                switch ($.type[0]) {
                    case "subset":
                        pl.cc($.type[1], ($) => {
                            summarizeTestSetImp($)
                        })
                        break
                    case "test":
                        pl.cc($.type[1], ($) => {
                            summary.numberOfTests = $f.increment(summary.numberOfTests)
                            if (!$.success) {
                                summary.numberOfErrors = $f.increment(summary.numberOfErrors)
                            }

                        })
                        break
                    default: pl.au($.type[0])
                }
            })
        }
        summarizeTestSetImp(
            $,
        )
        return summary
    }
}