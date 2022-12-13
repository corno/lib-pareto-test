import * as pt from "pareto-core-types"

export type LeafType =
    | ["boolean", null]
    | ["string", null]
    | ["null", null]
    | ["number", null]
    | ["reference", string]

export type Type =
    | ["leaf", LeafType]
    | ["array", Type]
    | ["dictionary", Type]
    | ["group", pt.Dictionary<Type>]
    | ["taggedUnion", pt.Dictionary<Type>]
    | ["external reference", {
        readonly "context": string,
        readonly "type": string,
    }]

export type Procedure = {
    readonly "data": LeafType
}

export type Function = {
    readonly "async": boolean
    readonly "data": LeafType
    readonly "return value": LeafType
}

export type Glossary = {
    "imports": pt.Dictionary<string>
    "types": pt.Dictionary<Type>
    "procedures": pt.Dictionary<Procedure>
    "functions": pt.Dictionary<Function>
}

export type Depedency =
    | ["function", string]
    | ["procedure", string]

export type Algorithm =
    | ["constructor", {
        data: LeafType
        dependencies: pt.Dictionary<Depedency>
        result:
        | ["function", string]
        | ["procedure", string]
    }]
    | ["function", string]
    | ["procedure", string]

export type API = {
    glossary: Glossary,
    api: pt.Dictionary<Algorithm>
}

export type Implementation = {
    type:
    | ["pure", null]
    | ["binding", null]
    definition:
    | ["private", string]
    | ["public", string]
}


export type Project = {
    api: API
    implementation: {
        "internal api": API
        "implementations": pt.Dictionary<Implementation>
        "api mapping": pt.Dictionary<string>
    }
}