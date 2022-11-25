import * as pt from "pareto-core-types"

import { TMultilinePart } from "glo-pareto-diff"


export type TPath = pt.Nested<string>

export type TValidateFileData = {
    readonly "expectedFile": {
        readonly "path": TPath,
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
        readonly "parts": pt.Array<TMultilinePart>,
    }]
    | ["file string", {
        readonly "fileLocation": string
        readonly "parts": pt.Array<TMultilinePart>,
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
