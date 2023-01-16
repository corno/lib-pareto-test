import * as pt from "pareto-core-types"
import * as mcommon from "glo-pareto-common"
import * as mpublic from "../../public"

export type TWriteFileData = {
    readonly "data": string
    readonly "path": mcommon.TPath
}

export type FIncrement = ($: number) => number

export type AReadFile = ($: mcommon.TPath) => pt.AsyncValue<string>

export type ARunTests = ($: mpublic.TTestSet) => pt.AsyncValue<mpublic.TTestSetResult>

export type FSummarize = ($: mpublic.TTestSetResult) => mpublic.TSummary

export type AValidateFile = ($: mpublic.TValidateFileData) => pt.AsyncValue<mpublic.TTestElementResult>