import * as pt from 'pareto-core-types'

import { T } from "./datatypes.generated"

import * as g_common from "glo-pareto-common"
import * as g_main from "../../../main"
import * as g_mainlib from "res-pareto-main"

export namespace ASYNC {
    
    export namespace I {
        
        export type ErrorsHandler = {
            'data': ($: g_main.T.ArgumentError, ) => void
            'end': () => void
        }
        
        export type HandleArguments = {
            'data': ($: g_mainlib.T.Arguments, ) => void
            'end': () => void
        }
        
        export type ParametersHandler = ($: g_main.T.TestParameters, ) => void
    }
    
    export namespace A {
        
        
        export namespace C {
            export type CreateTestParametersParser = ($is: {
                readonly 'errorHandler': ASYNC.I.ErrorsHandler
                readonly 'handler': ASYNC.I.ParametersHandler
            }) => ASYNC.I.HandleArguments
        }
    }
}

export namespace SYNC {}