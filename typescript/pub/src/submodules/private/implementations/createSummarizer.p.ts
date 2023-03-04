import * as pl from 'pareto-core-lib'

import * as gpublic from "../../../main"

import { createSummarizer } from "../definition/api.generated"

export const $$: createSummarizer = (
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
            $: gpublic.T.TestSetResult
        ): void {
            //this should be a reduce function!!!
            $.elements.map(($) => {
                switch ($.type[0]) {
                    case 'subset':
                        pl.cc($.type[1], ($) => {
                            summarizeTestSetImp($)
                        })
                        break
                    case 'test':
                        pl.cc($.type[1], ($) => {
                            summary.numberOfTests = $d.increment(summary.numberOfTests)
                            if (!$.success) {
                                summary.numberOfErrors = $d.increment(summary.numberOfErrors)
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
