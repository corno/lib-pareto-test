import * as pt from 'pareto-core-types'

import { T } from './types.generated'

import * as g_common from "glo-pareto-common"
import * as g_main from "res-pareto-main"
import * as g_public from "../../../../main"

export namespace I {}

export namespace B {
    
    export type HandleTestParameters = ($: g_public.T.TestParameters, ) => void
}

export namespace F {
    
    export type HandleArgumentError = ($: g_public.T.ArgumentError,) => void
    
    export type Increment = ($: g_common.T.Number,) => g_common.T.Number
    
    export type ParseTestParameters = ($: g_main.T.Arguments, $b: B.HandleTestParameters,) => void
    
    export type ReadFile = ($: g_common.T.Path,) => pt.AsyncValue<g_common.T.String>
    
    export type RunTests = ($: g_public.T.TestSet,) => pt.AsyncValue<g_public.T.TestSetResult>
    
    export type SerializeSummary = ($: g_public.T.Summary,) => void
    
    export type SerializeTestResult = ($: g_public.T.TestSetResult,) => void
    
    export type Summarize = ($: g_public.T.TestSetResult,) => g_public.T.Summary
    
    export type TestTestSet = ($: g_public.T.TestSet,) => void
    
    export type ValidateFile = ($: g_public.T.ValidateFileData,) => pt.AsyncValue<g_public.T.TestElementResult>
}