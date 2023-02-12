import * as pt from 'pareto-core-types'

import { T   } from './types.generated'

import * as mcommon from "glo-pareto-common"
import * as mmain from "res-pareto-main"
import * as mpublic from "../../../../main"

export type IHandleTestParameters = ($: mpublic.T.TestParameters, ) => void

export type FHandleArgumentError = ($: mpublic.T.ArgumentError,) => void

export type FIncrement = ($: mcommon.T.Number,) => mcommon.T.Number

export type FParseTestParameters = ($: mmain.T.Arguments, $i: IHandleTestParameters,) => void

export type FReadFile = ($: mcommon.T.Path,) => pt.AsyncValue<mcommon.T.String>

export type FRunTests = ($: mpublic.T.TestSet,) => pt.AsyncValue<mpublic.T.TestSetResult>

export type FSerializeSummary = ($: mpublic.T.Summary,) => void

export type FSerializeTestResult = ($: mpublic.T.TestSetResult,) => void

export type FSummarize = ($: mpublic.T.TestSetResult,) => mpublic.T.Summary

export type FTestTestSet = ($: mpublic.T.TestSet,) => void

export type FValidateFile = ($: mpublic.T.ValidateFileData,) => pt.AsyncValue<mpublic.T.TestElementResult>