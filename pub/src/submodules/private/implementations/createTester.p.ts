import * as pt from 'pareto-core-types'

import * as api from "../api"

export const $$: api.CcreateTester = (
    $d,
) => {
    const processAsync: <T>($: pt.AsyncValue<T>, $i: ($: T) => void) => void = ($, $i) => $.__execute($i)
    return ($) => {
        processAsync(
            $d.runTests($),
            ($) => {
                $d.serializeTestResult($)
                const summary = $d.summarize(
                    $,
                )
                $d.serializeSummary(summary)
                if ($d.isZero(summary.numberOfErrors)) {
                    //
                } else {
                    $d.onTestErrors(null)
                }
            }
        )


    }

}