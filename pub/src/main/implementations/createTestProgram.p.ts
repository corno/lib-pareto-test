import * as pt from 'pareto-core-types'

import * as api from "../api"

import * as mprivate from "../../submodules/private"

export const $$: api.CcreateTestProgram = ($d) => {
    const processAsync: <T>($: pt.AsyncValue<T>, $i: ($: T) => void) => void = ($, $i) => $.__execute($i)
    return ($) => {
        mprivate.$a.createTestParametersParser({
            onError: () => {
                $d.logError("FIXME ARG ERROR MESSAGE")
            },
        })(
            $.arguments,
            ($) =>/**/ {
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
        )
    }
}