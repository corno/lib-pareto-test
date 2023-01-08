import * as pt from "pareto-core-types"

import * as api from "../api"

export const icreateTester: api.CcreateTester = (
    $d,
) => {
    const processAsync: <T>($: pt.AsyncValue<T>, $i: ($: T) => void) => void = ($, $i) => $._execute($i)
    return ($) => {
        processAsync(
            $d.frunTests($),
            ($) => {
                $d.dserializeTestResult($)
                const summary = $d.fsummarize(
                    $,
                )
                $d.dserializeSummary(summary)
                if ($d.fisZero(summary.numberOfErrors)) {
                    //
                } else {
                    $d.donTestErrors(null)
                }
            }
        )


    }

}