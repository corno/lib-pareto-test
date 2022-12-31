import * as pt from "pareto-core-types"
import * as pd from "../../private_definitions"

const processAsync: <T>($: pt.AsyncValue<T>, $i: ($: T) => void) => void = ($, $i) => $._execute($i)


export const icreateTester: pd.CCreateTester = (
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