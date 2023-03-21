import * as pt from 'pareto-core-types'

import { T } from './types.generated'

import * as g_common from "glo-pareto-common"
import * as g_main from "res-pareto-main"
import * as g_public from "../../../main"

export namespace I {}

export namespace F {
    
    export type ReadFile = ($: g_common.T.Path,) => pt.AsyncValue<g_common.T.String>
    
    export type RunTests = ($: g_public.T.TestSet,) => pt.AsyncValue<g_public.T.TestSetResult>
    
    export type ValidateFile = ($: g_public.T.ValidateFileData,) => pt.AsyncValue<g_public.T.TestElementResult>
}