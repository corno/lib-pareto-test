import * as pt from 'pareto-core-types'

import * as g_main from "res-pareto-main"
import * as g_main2 from "../main"

export namespace D {
    
    export type createTestProgram = {
        readonly 'getTestSet': g_main2.ASYNC.A.F.GetTestSet
    }
}

export namespace A {
    
    export type createTestProgram = ($d: D.createTestProgram, ) => g_main.ASYNC.A.C.CreateMain
}

export type API = {
    readonly 'createTestProgram': A.createTestProgram
}