import * as pt from 'pareto-core-types'

import { CcreateTester } from "../definition/api.generated"

export const $$:CcreateTester = (
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