import * as pt from 'pareto-core-types'

import * as api from "../api"

import * as mprivate from "../../private"

export const $$: api.CcreateTestProgram = ($d) => {
    const processAsync: <T>($: pt.AsyncValue<T>, $i: ($: T) => void) => void = ($, $i) => $._execute($i)
    return mprivate.$a.createArgumentsParser({
        pr_onError: $d.pr_logError,
        pr_callback: ($) =>/**/ {
            processAsync(
                $d.af_getTestSet($),
                mprivate.$a.createBoundTester(
                    {
                        pr_onError: $d.pr_logError,
                        pr_onTestErrors: $d.pr_onTestErrors,
                        pr_log: $d.pr_log
                    }
                )
            )
        }
    })
}