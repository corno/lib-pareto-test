import * as pl from 'pareto-core-lib'

import { A } from "../api.generated"

export const $$: A.createTestProgram = ($d) => {
    return ($is) => {
        return ($) => {
    
            const x = $d.createTestParametersParser({
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
            })
            
            x.data(
                $.arguments,
            )
            x.end()

        }
    }
}