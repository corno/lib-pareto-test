import * as pt from 'pareto-core-types'

import { T } from "./datatypes.generated"

import * as g_common from "glo-pareto-common"
import * as g_main from "../../../main"
import * as g_mainlib from "res-pareto-main"

export namespace ASYNC {
    
    export namespace I {
        
        export type HandleTestSet = ($: g_main.T.TestSet, ) => void
    }
    
    export namespace A {
        
        
        export namespace C {
            export type CreateTester = ($is: {
                readonly 'log': g_mainlib.ASYNC.I.Log
                readonly 'logError': g_mainlib.ASYNC.I.Log
                readonly 'onTestErrors': g_mainlib.ASYNC.I.Signal
            }) => ASYNC.I.HandleTestSet
        }
    }
}

export namespace SYNC {
    
    export namespace A {
        
        
        export namespace F {
            export type Increment = ($: g_common.T.Number) => g_common.T.Number
        }
        
        
        export namespace P {
            export type SerializeSummary = ($: g_main.T.Summary, $i: g_common.SYNC.I.String) => void
        }
        
        
        export namespace P {
            export type SerializeTestResult = ($: g_main.T.TestSetResult, $i: g_common.SYNC.I.String) => void
        }
        
        
        export namespace F {
            export type Summarize = ($: g_main.T.TestSetResult) => g_main.T.Summary
        }
    }
}