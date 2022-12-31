
import * as pd from "../../private_definitions"

export const icreateTester: pd.CCreateTester = (
    $i,
    $a,
) => {
    return ($) => {
        $a(
            $i.runTests($),
            ($) => {
                $i.serializeTestResult($)
                const summary = $i.summarize(
                    $,
                )
                $i.serializeSummary(summary)
                if ($i.isZero(summary.numberOfErrors)) {
                    //
                } else {
                    $i.onTestErrors(null)
                }
            }
        )


    }

}