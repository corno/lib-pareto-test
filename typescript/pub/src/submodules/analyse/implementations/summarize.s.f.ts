import * as pl from 'pareto-core-lib'

import * as g_main from "../../../main"

import { A } from "../api.generated"

export const $$: A.summarize = ($d) => {
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
            $: g_main.T.TestSetResult
        ): void {
            //this should be a reduce function!!!
            $.elements.map(($) => {
                switch ($.type[0]) {
                    case 'subset':
                        pl.ss($.type, ($) => {
                            summarizeTestSetImp($)
                        })
                        break
                    case 'test':
                        pl.ss($.type, ($) => {
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
