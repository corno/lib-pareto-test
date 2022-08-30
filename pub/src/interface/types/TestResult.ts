import * as pt from "pareto-core-types"

import * as fs from "api-pareto-filesystem"
import { TMultilinePart } from "api-pareto-diff/dist"

export type TTestSet = {
    readonly "elements": pt.Dictionary<TTestElement>
}

export type ValidateFileData = {
    readonly "expectedFile": {
        path: fs.Path,
        fileName: string,
        extension: string,
    },
    readonly "actual": string,

}

export type TTestElement = {
    readonly "type":
    | ["subset", TTestSet]
    | ["test", {
        type:
        | ["boolean", {
            test: boolean
        }]
        | ["simple string", {
            readonly "expected": string,
            readonly "actual": string,
        }]
        | ["large string", {
            readonly "expected": string,
            readonly "actual": string,
        }]
        | ["file string", ValidateFileData]
    }]
}


export type TTestType =
    | ["boolean", {}]
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
        success: boolean
        type: TTestType
    }]
}


export type TTestSetResult = {
    readonly "elements": pt.Dictionary<TTestElementResult>

}