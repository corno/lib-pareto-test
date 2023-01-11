import * as pt from "pareto-core-types"

import * as api from "../api"

export const icreateTester: api.CcreateTester = (
    $d,
) => {
    const processAsync: <T>($: pt.AsyncValue<T>, $i: ($: T) => void) => void = ($, $i) => $._execute($i)
    return ($) => {
        processAsync(
            $d.af_runTests($),
            ($) => {
                $d.pr_serializeTestResult($)
                const summary = $d.sf_summarize(
                    $,
                )
                $d.pr_serializeSummary(summary)
                if ($d.sf_isZero(summary.numberOfErrors)) {
                    //
                } else {
                    $d.pr_onTestErrors(null)
                }
            }
        )


    }

}