import * as pt from 'pareto-core-types'

import { T   } from './types.generated'

import * as gcommon from "glo-pareto-common"
import * as gdiff from "res-pareto-diff"

export type FGetTestSet = ($: T.TestParameters,) => pt.AsyncValue<T.TestSet>