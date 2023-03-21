import * as pt from 'pareto-core-types'

import { T } from './types.generated'

import * as g_common from "glo-pareto-common"
import * as g_diff from "res-pareto-diff"

export namespace I {}

export namespace F {
    
    export type GetTestSet = ($: T.TestParameters,) => pt.AsyncValue<T.TestSet>
}