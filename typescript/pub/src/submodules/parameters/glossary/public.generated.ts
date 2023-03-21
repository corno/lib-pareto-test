import * as pt from 'pareto-core-types'

import { T } from './types.generated'

import * as g_common from "glo-pareto-common"
import * as g_main from "res-pareto-main"
import * as g_public from "../../../main"

export namespace B {
    
    export type HandleTestParameters = ($: g_public.T.TestParameters, ) => void
}

export namespace F {
    
    export type HandleArgumentError = ($: g_public.T.ArgumentError,) => void
    
    export type ParseTestParameters = ($: g_main.T.Arguments, $b: B.HandleTestParameters,) => void
}