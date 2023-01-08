import * as pt from "pareto-core-types"

import * as api from "../api"

import * as mprivate from "../../private"

export const icreateTestProgram: api.CcreateTestProgram = ($d) => {
    const processAsync: <T>($: pt.AsyncValue<T>, $i: ($: T) => void) => void = ($, $i) => $._execute($i)
    return mprivate.$a.createArgumentsParser({
        onError: $d.logError,
        callback: ($) =>/**/ {
            processAsync(
                $d.getTestSet($),
                mprivate.$a.createBoundTester(
                    {
                        onError: $d.logError,
                        onTestErrors: $d.onTestErrors,
                        log: $d.log
                    }
                )
            )
        }
    })
}