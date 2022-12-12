import * as pt from "pareto-core-types"

// import * as common from "glo-pareto-common"

import { TTestParameters, TTestSet } from "../types/types.p"

export type PLog = ($: string) => void



export type POnTestErrors = ($: null) => void



export type PRunProgram = ($: pt.Array<string>) => void



export type FGetTestSet = ($: TTestParameters) => pt.AsyncValue<TTestSet>