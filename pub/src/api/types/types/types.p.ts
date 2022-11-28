import * as pt from "pareto-core-types"

import * as diff from "res-pareto-diff"
import * as fs from "api-pareto-filesystem"

export type TValidateFileData = {
    readonly "expectedFile": {
        readonly "path": fs.TPath,
        readonly "fileName": string,
        readonly "extension": string,
    },
    readonly "actual": string,
}

export type TTestType =
    | ["boolean", null]
    | ["simple string", {
        readonly "expected": string,
        readonly "actual": string,
    }]
    | ["large string", {
        readonly "parts": pt.Array<diff.TMultilinePart>,
    }]
    | ["file string", {
        readonly "fileLocation": string
        readonly "parts": pt.Array<diff.TMultilinePart>,
    }]



export type TTestElementResult = {
    readonly "type":
    | ["subset", TTestSetResult]
    | ["test", {
        readonly "success": boolean
        readonly "type": TTestType
    }]
}

export type TTestSetResult = {
    readonly "elements": pt.Dictionary<TTestElementResult>

}



export type TTestSet = {
    readonly "elements": pt.Dictionary<TTestElement>
}


export type TTestElement = {
    readonly "type":
    | ["subset", TTestSet]
    | ["test", {
        readonly "type":
        | ["boolean", {
            readonly "test": boolean
        }]
        | ["simple string", {
            readonly "expected": string,
            readonly "actual": string,
        }]
        | ["large string", {
            readonly "expected": string,
            readonly "actual": string,
        }]
        | ["file string", TValidateFileData]
    }]
}

export type TSummary = {
    readonly "numberOfErrors": number
    readonly "numberOfTests": number
}

export type TTestParameters = {
    readonly "testDirectory": string
}