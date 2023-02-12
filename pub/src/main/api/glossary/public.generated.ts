import * as pt from 'pareto-core-types'

import { T   } from './types.generated'

import * as mcommon from "glo-pareto-common"
import * as mdiff from "res-pareto-diff"

export type FGetTestSet = ($: T.TestParameters,) => pt.AsyncValue<T.TestSet>