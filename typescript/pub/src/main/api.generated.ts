import * as pt from 'pareto-core-types'

import * as g_analyse from "../submodules/analyse"
import * as g_main from "res-pareto-main"
import * as g_parameters from "../submodules/parameters"
import * as g_this from "./glossary"

export namespace A {
    
    export type createTestProgram = ($d: {
        readonly 'createTester': g_analyse.ASYNC.A.C.CreateTester
        readonly 'createTestParametersParser': g_parameters.ASYNC.A.C.CreateTestParametersParser
        readonly 'getTestSet': g_this.ASYNC.A.F.GetTestSet
    }, ) => g_this.ASYNC.A.C.CreateTester
}

export type API = {
    readonly 'createTestProgram': A.createTestProgram
}