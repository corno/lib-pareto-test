import * as pl from 'pareto-core-lib'

import * as api from "../api"

import * as mpublic from "../../public"

export const $$: api.CcreateSummarizer = (
   $d,
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
            $: mpublic.TTestSetResult
        ): void {
            //this should be a reduce function!!!
            $.elements.map(($, key) => {
                switch ($.type[0]) {
                    case 'subset':
                        pl.cc($.type[1], ($) => {
                            summarizeTestSetImp($)
                        })
                        break
                    case 'test':
                        pl.cc($.type[1], ($) => {
                            summary.numberOfTests = $d.sf_increment(summary.numberOfTests)
                            if (!$.success) {
                                summary.numberOfErrors = $d.sf_increment(summary.numberOfErrors)
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
