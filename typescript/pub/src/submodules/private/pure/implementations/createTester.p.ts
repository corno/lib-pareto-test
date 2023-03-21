import * as pl from 'pareto-core-lib'

import { createTester } from "../api.generated"

import * as gmain from "res-pareto-main"


export const $$: createTester = (
    $d,
) => {
    return ($, $i) => {
        pl.processAsyncValue(
            $d.runTests($),
            ($) => {
                $d.serializeTestResult($, $i.log)
                const summary = $d.summarize(
                    $,
                )
                $d.serializeSummary(summary, $i.log)
                if ($d.isZero(summary.numberOfErrors)) {
                    //
                } else {
                    $i.onTestErrors(null)
                }
            }
        )

    }

}