import * as pt from 'pareto-core-types'
import * as mcommon from "glo-pareto-common"
import * as mdiff from "res-pareto-diff"

export type TArgumentError = 
    | ['missing', null]
    | ['too many', null]

export type TArguments = pt.Array<string>

export type TSummary = {
    readonly 'numberOfErrors': number
    readonly 'numberOfTests': number
}

export type TTestElement = {
    readonly 'type': 
        | ['subset', TTestSet]
        | ['test', {
            readonly 'type': 
                | ['boolean', boolean]
                | ['file string', TValidateFileData]
                | ['long string', {
                    readonly 'actual': string
                    readonly 'expected': string
                }]
                | ['short string', {
                    readonly 'actual': string
                    readonly 'expected': string
                }]
        }]
}

export type TTestElementResult = {
    readonly 'type': 
        | ['subset', TTestSetResult]
        | ['test', {
            readonly 'success': boolean
            readonly 'type': TTestType
        }]
}

export type TTestParameters = {
    readonly 'testDirectory': string
}

export type TTestSet = {
    readonly 'elements': pt.Dictionary<TTestElement>
}

export type TTestSetResult = {
    readonly 'elements': pt.Dictionary<TTestElementResult>
}

export type TTestType = 
    | ['boolean', null]
    | ['file string', {
        readonly 'fileLocation': string
        readonly 'parts': pt.Array<mdiff.TMultilinePart>
    }]
    | ['long string', {
        readonly 'parts': pt.Array<mdiff.TMultilinePart>
    }]
    | ['short string', {
        readonly 'actual': string
        readonly 'expected': string
    }]

export type TValidateFileData = {
    readonly 'actual': string
    readonly 'expectedFile': {
        readonly 'extension': string
        readonly 'fileName': string
        readonly 'path': mcommon.TPath
    }
}

export type AGetTestSet = ($: TTestParameters) => pt.AsyncValue<TTestSet>