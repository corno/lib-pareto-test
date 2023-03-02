import * as pt from 'pareto-core-types'

import * as gprivate from "../../submodules/private"

import { CcreateTestProgram } from "../definition/api.generated"

export const $$:CcreateTestProgram = ($d) => {
    const processAsync: <T>($: pt.AsyncValue<T>, $i: ($: T) => void) => void = ($, $i) => $.__execute($i)
    return ($) => {
        gprivate.$a.createTestParametersParser({
            onError: () => {
                $d.logError("FIXME ARG ERROR MESSAGE")
            },
        })(
            $.arguments,
            ($) =>/**/ {
                processAsync(
                    $d.getTestSet($),
                    gprivate.$a.createBoundTester(
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