import * as pt from "pareto-core-types"

import * as api from "../api"

import * as mprivate from "../../private"

export const icreateTestProgram: api.CcreateTestProgram = ($d) => {
    const processAsync: <T>($: pt.AsyncValue<T>, $i: ($: T) => void) => void = ($, $i) => $._execute($i)
    return mprivate.$a.createArgumentsParser({
        donError: $d.dlogError,
        dcallback: ($) =>/**/ {
            processAsync(
                $d.fgetTestSet($),
                mprivate.$a.createBoundTester(
                    {
                        donError: $d.dlogError,
                        donTestErrors: $d.donTestErrors,
                        dlog: $d.dlog
                    }
                )
            )
        }
    })
}