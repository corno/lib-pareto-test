import * as pt from 'pareto-core-types'

import * as t from './types.generated'

import * as mcommon from "glo-pareto-common"
import * as mmain from "lib-pareto-main"
import * as mpublic from "../../../public"

export type IHandleTestParameters = ($: mpublic.TTestParameters, ) => void

export type FHandleArgumentError = ($: mpublic.TArgumentError,) => void

export type FIncrement = ($: mcommon.TNumber,) => mcommon.TNumber

export type FParseTestParameters = ($: mmain.TArguments, $i: IHandleTestParameters,) => void

export type FReadFile = ($: mcommon.TPath,) => pt.AsyncValue<mcommon.TString>

export type FRunTests = ($: mpublic.TTestSet,) => pt.AsyncValue<mpublic.TTestSetResult>

export type FSerializeSummary = ($: mpublic.TSummary,) => void

export type FSerializeTestResult = ($: mpublic.TTestSetResult,) => void

export type FSummarize = ($: mpublic.TTestSetResult,) => mpublic.TSummary

export type FTestTestSet = ($: mpublic.TTestSet,) => void

export type FValidateFile = ($: mpublic.TValidateFileData,) => pt.AsyncValue<mpublic.TTestElementResult>