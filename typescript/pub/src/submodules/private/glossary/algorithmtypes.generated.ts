import * as pt from 'pareto-core-types'

import { T } from "./datatypes.generated"

import * as g_common from "glo-pareto-common"
import * as g_main from "res-pareto-main"
import * as g_public from "../../../main"

export namespace ASYNC {
    
    export namespace I {}
    
    export namespace A {
        
        
        export namespace F {
            export type RunTests = ($: g_public.T.TestSet) => pt.AsyncValue<g_public.T.TestSetResult>
        }
        
        
        export namespace F {
            export type ValidateFile = ($: g_public.T.ValidateFileData) => pt.AsyncValue<g_public.T.TestElementResult>
        }
    }
}

export namespace SYNC {}