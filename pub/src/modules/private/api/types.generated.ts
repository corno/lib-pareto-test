import * as pt from "pareto-core-types"
import * as mcommon from "glo-pareto-common"
import * as mpublic from "../../public"

export type TWriteFileData = {
    readonly "data": string
    readonly "path": mcommon.TPath
}

export type FIncrement = ($: mcommon.TNumber) => mcommon.TNumber

export type AReadFile = ($: mcommon.TPath) => pt.AsyncValue<mcommon.TString>

export type ARunTests = ($: mpublic.TTestSet) => pt.AsyncValue<mpublic.TTestSetResult>

export type FSummarize = ($: mpublic.TTestSetResult) => mpublic.TSummary

export type AValidateFile = ($: mpublic.TValidateFileData) => pt.AsyncValue<mpublic.TTestElementResult>