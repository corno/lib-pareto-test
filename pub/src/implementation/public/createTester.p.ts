import * as pl from "pareto-core-lib"
import * as api from "../../api"
import * as types from "../types"

export const f_createTester: types.CCreateTester = (
    $i,
    $f,
    $a,
) => {

    pl.logDebugMessage("HIER3")
    return ($) => {
        $a(
            $f.runTests($),
            ($) => {
                $i.serializeTestResult($)
                const summary = $f.summarize(
                    $,
                )
                $i.serializeSummary(summary)
                if ($f.isZero(summary.numberOfErrors)) {
                    //
                } else {
                    $i.onTestErrors(null)
                }
            }
        )


    }

}