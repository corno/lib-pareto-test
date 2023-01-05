import * as pt from "pareto-core-types"

import * as api from "../api"

import * as mprivate from "../../private"

export const icreateTestProgram: api.CcreateTestProgram = ($, $f) => {
    const processAsync: <T>($: pt.AsyncValue<T>, $i: ($: T) => void) => void = ($, $i) => $._execute($i)
    return mprivate.$a.createArgumentsParser(null, {
        onError: $f.logError,
        callback: ($) =>/**/ {
            processAsync(
                $f.getTestSet($),
                mprivate.$a.createBoundTester(
                    null,
                    {
                        onError: $f.logError,
                        onTestErrors: $f.onTestErrors,
                        log: $f.log
                    }
                )
            )
        }
    })
}