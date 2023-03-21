import * as pl from 'pareto-core-lib'

import * as g_private from "../../submodules/private"

import { A } from "../api.generated"

export const $$: A.createTestProgram = ($d) => {
    return ($is) => {
        return ($) => {
    
            $d.createTestParametersParser({
                'errorHandler': {
                    'data': () => {
    
                    },
                    'end': () => {
    
                    }
                },
                'handler': ($) => {
    
                    pl.processAsyncValue(
                        $d.getTestSet($),
                        $d.createTester({
                            'log': $is.log,
                            'logError': $is.logErrors,
                            'onTestErrors': $is.reportFailed,
                        }),
                    )
                }
            })(
                $.arguments,
            )

        }
    }
}