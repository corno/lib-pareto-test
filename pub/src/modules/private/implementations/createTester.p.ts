import * as pt from "pareto-core-types/"
import * as pd from "../api"

const processAsync: <T>($: pt.AsyncValue<T>, $i: ($: T) => void) => void = ($, $i) => $._execute($i)


export const icreateTester: pd.CcreateTester = (
    $,
    $d,
) => {
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