import * as pt from "pareto-core-types"

export type LeafType =
    | ["boolean", null]
    | ["string", null]
    | ["null", null]
    | ["number", null]
    | ["reference", string]
    | ["external reference", {
        readonly "context": string,
        readonly "type": string,
    }]

export type Type =
    | ["leaf", LeafType]
    | ["array", Type]
    | ["dictionary", Type]
    | ["group", pt.Dictionary<Type>]
    | ["taggedUnion", pt.Dictionary<Type>]

export type Function = {
    readonly "async": boolean
    readonly "data": LeafType
    readonly "return value": LeafType
}

export type Glossary = {
    "imports": pt.Dictionary<string>
    "types": pt.Dictionary<Type>
    "functions": pt.Dictionary<Function>
}

