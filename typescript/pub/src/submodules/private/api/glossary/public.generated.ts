import * as pt from 'pareto-core-types'

import { T   } from './types.generated'

import * as gcommon from "glo-pareto-common"
import * as gmain from "res-pareto-main"
import * as gpublic from "../../../../main"

export type IHandleTestParameters = ($: gpublic.T.TestParameters, ) => void

export type FHandleArgumentError = ($: gpublic.T.ArgumentError,) => void

export type FIncrement = ($: gcommon.T.Number,) => gcommon.T.Number

export type FParseTestParameters = ($: gmain.T.Arguments, $i: IHandleTestParameters,) => void

export type FReadFile = ($: gcommon.T.Path,) => pt.AsyncValue<gcommon.T.String>

export type FRunTests = ($: gpublic.T.TestSet,) => pt.AsyncValue<gpublic.T.TestSetResult>

export type FSerializeSummary = ($: gpublic.T.Summary,) => void

export type FSerializeTestResult = ($: gpublic.T.TestSetResult,) => void

export type FSummarize = ($: gpublic.T.TestSetResult,) => gpublic.T.Summary

export type FTestTestSet = ($: gpublic.T.TestSet,) => void

export type FValidateFile = ($: gpublic.T.ValidateFileData,) => pt.AsyncValue<gpublic.T.TestElementResult>