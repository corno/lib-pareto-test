import * as pt from "pareto-core-types"
import * as diff from "res-pareto-diff"
import * as fs from "res-pareto-filesystem"

export type TArgumentError = 
    | [ "missing", null ]
    | [ "too many", null ]

export type TSummary = {
    readonly "numberOfErrors": number,
    readonly "numberOfTests": number,
}

export type TTestElement = {
    readonly "type": 
        | [ "subset", TTestSet ]
        | [ "test", {
            readonly "type": 
                | [ "boolean", boolean ]
                | [ "file string", TValidateFileData ]
                | [ "long string", {
                    readonly "actual": string,
                    readonly "expected": string,
                } ]
                | [ "short string", {
                    readonly "actual": string,
                    readonly "expected": string,
                } ]
            ,
        } ]
    ,
}

export type TTestElementResult = {
    readonly "type": 
        | [ "subset", TTestSetResult ]
        | [ "test", {
            readonly "success": boolean,
            readonly "type": TTestType,
        } ]
    ,
}

export type TTestParameters = {
    readonly "testDirectory": string,
}

export type TTestSet = {
    readonly "elements": pt.Dictionary<TTestElement>,
}

export type TTestSetResult = {
    readonly "elements": pt.Dictionary<TTestElementResult>,
}

export type TTestType = 
    | [ "boolean", null ]
    | [ "file string", {
        readonly "fileLocation": string,
        readonly "parts": pt.Array<diff.TMultilinePart>,
    } ]
    | [ "long string", {
        readonly "parts": pt.Array<diff.TMultilinePart>,
    } ]
    | [ "short string", {
        readonly "actual": string,
        readonly "expected": string,
    } ]

export type TValidateFileData = {
    readonly "actual": string,
    readonly "expectedFile": {
        readonly "extension": string,
        readonly "fileName": string,
        readonly "path": fs.TPath,
    },
}

export type PLog = ($: string) => void

export type POnTestErrors = ($: null) => void

export type PRunProgram = ($: pt.Array<string>) => void

export type FGetTestSet = ($: TTestParameters) => pt.AsyncValue<TTestSet>