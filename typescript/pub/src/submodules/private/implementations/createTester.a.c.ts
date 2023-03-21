import * as pl from 'pareto-core-lib'

import { A } from "../api.generated"

export const $$: A.createTester = ($d) => {
    return ($is) => {
        return ($) => {
            pl.processAsyncValue(
                $d.runTests($),
                ($) => {
                    const summary = $d.summarize(
                        $,
                    )
                    $d.serializeTestResult($, $is.log.data)
                    $d.serializeSummary(summary, $is.log.data)
                    if ($d.isZero(summary.numberOfErrors)) {
                        //
                    } else {
                        $is.onTestErrors(null)
                    }
                }
            )
        }
    }
}