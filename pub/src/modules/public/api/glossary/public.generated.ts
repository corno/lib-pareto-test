import * as pt from 'pareto-core-types'

import * as t from './types.generated'

import * as mcommon from "glo-pareto-common"
import * as mdiff from "res-pareto-diff"

export type TArgumentError = t.UArgumentError

export type TSummary = t.USummary

export type TTestElement = t.UTestElement

export type TTestElementResult = t.UTestElementResult

export type TTestParameters = t.UTestParameters

export type TTestSet = t.UTestSet

export type TTestSetResult = t.UTestSetResult

export type TTestType = t.UTestType

export type TValidateFileData = t.UValidateFileData

export type FGetTestSet = ($: TTestParameters,) => pt.AsyncValue<TTestSet>

export type FSignal = ($: mcommon.TNull,) => void