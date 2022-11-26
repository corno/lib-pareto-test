import * as pl from "pareto-core-lib"
import * as api from "../../api"

export const f_createTester: api.CCreateTester = (
    $i,
    $d,
    $a,
) => {

    pl.logDebugMessage("HIER3")
    return ($) => {
        $a(
            $d.runTests($),
            ($) => {
                $i.serializeTestResult($)
                const summary = $d.summarize(
                    $,
                )
                $i.serializeSummary(summary)
                if ($d.isZero(summary.numberOfErrors)) {
                    //
                } else {
                    $i.onTestErrors(null)
                }
            }
        )


    }

}