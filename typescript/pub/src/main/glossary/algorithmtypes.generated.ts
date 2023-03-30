import * as pt from 'pareto-core-types'

import { T } from "./datatypes.generated"

import * as g_common from "glo-pareto-common"
import * as g_diff from "res-pareto-diff"
import * as g_main from "res-pareto-main"

export namespace ASYNC {
    
    export namespace I {}
    
    export namespace A {
        
        
        export namespace C {
            export type CreateTester = {
                'construct': ($is: {
                    readonly 'log': g_main.ASYNC.I.Log
                    readonly 'logErrors': g_main.ASYNC.I.Log
                    readonly 'reportFailed': g_main.ASYNC.I.Signal
                }) => g_main.ASYNC.I.Main
            }
        }
        
        
        export namespace F {
            export type GetTestSet = ($: T.TestParameters) => pt.AsyncValue<T.TestSet>
        }
    }
}

export namespace SYNC {}