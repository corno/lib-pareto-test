import * as pt from "pareto-core-types"

import * as common from "glo-pareto-common"

import { TTestParameters, TTestSet } from "../types/types.p"

export type FGetTestSet = pt.AsyncFunction<TTestParameters, TTestSet>

export type PLog = pt.Procedure<string>

export type POnTestErrors = pt.Procedure<null>

export type IRunProgram = pt.Procedure<pt.Array<string>>
