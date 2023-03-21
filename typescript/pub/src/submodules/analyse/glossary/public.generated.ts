import * as pt from 'pareto-core-types'

import { T } from './types.generated'

import * as g_common from "glo-pareto-common"
import * as g_main from "res-pareto-main"
import * as g_public from "../../../main"

export namespace B {
    
    export type HandleTestOutput = {
        'log': g_common.B.StringBuilder
        'logError': g_common.B.StringBuilder
        'onTestErrors': ($: g_common.T.Null, ) => void
    }
    
    export type HandleTestParameters = ($: g_public.T.TestParameters, ) => void
}

export namespace F {
    
    export type BoundTestTestSet = ($: g_public.T.TestSet,) => void
    
    export type Increment = ($: g_common.T.Number,) => g_common.T.Number
    
    export type SerializeSummary = ($: g_public.T.Summary, $b: g_common.B.StringBuilder,) => void
    
    export type SerializeTestResult = ($: g_public.T.TestSetResult, $b: g_common.B.StringBuilder,) => void
    
    export type Summarize = ($: g_public.T.TestSetResult,) => g_public.T.Summary
    
    export type TestTestSet = ($: g_public.T.TestSet, $b: B.HandleTestOutput,) => void
}