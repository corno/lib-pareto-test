import * as pt from "pareto-core-types"
import * as mapi from "../../public"
import * as mcommon from "glo-pareto-common"

export type TWriteFileData = {
    readonly "data": string
    readonly "path": mcommon.TPath
}

export type FIncrement = ($: number) => number

export type AReadFile = ($: mcommon.TPath) => pt.AsyncValue<string>

export type ARunTests = ($: mapi.TTestSet) => pt.AsyncValue<mapi.TTestSetResult>

export type FSummarize = ($: mapi.TTestSetResult) => mapi.TSummary

export type AValidateFile = ($: mapi.TValidateFileData) => pt.AsyncValue<mapi.TTestElementResult>