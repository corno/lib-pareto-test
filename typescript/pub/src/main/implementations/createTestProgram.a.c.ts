import * as pl from 'pareto-core-lib'

import { A } from "../api.generated"

export const $$: A.createTestProgram = ($d) => {
    return {
        'construct': ($is) => {
            return ($) => {
        
                const x = $d.createTestParametersParser.construct({
                    'errorHandler': {
                        'data': () => {
        
                        },
                        'end': () => {
        
                        }
                    },
                    'handler': ($) => {
        
                        pl.processAsyncValue(
                            $d.getTestSet($),
                            $d.createTester.construct({
                                'log': $is.log,
                                'logError': $is.logErrors,
                                'onTestErrors': pl.panic("SDFSD"),
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
}