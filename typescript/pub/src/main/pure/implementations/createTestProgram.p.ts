import * as pl from 'pareto-core-lib'

import * as g_parameters from "../../../submodules/parameters"
import * as g_private from "../../../submodules/private"
import * as g_main from "res-pareto-main"

import { createTestProgram } from "../api.generated"

export const $$: createTestProgram = ($d) => {
    return ($) => {
        g_parameters.$a.createTestParametersParser({ //<----NOT PURE, THIS IS BINDING
            onError: () => {
                g_main.$r.logError("FIXME ARG ERROR MESSAGE") //<----NOT PURE, THIS IS BINDING
            },
        })(
            $.arguments,
            ($) =>/**/ {
                pl.processAsyncValue(
                    $d.getTestSet($),
                    g_private.$b.test, //<----NOT PURE, THIS IS BINDING
                )
            }
        )
    }
}