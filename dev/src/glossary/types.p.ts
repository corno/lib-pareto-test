import * as pt from "pareto-core-types"

export type Type =
    | ["array", Type]
    | ["boolean", null]
    | ["dictionary", Type]
    | ["group", pt.Dictionary<Type>]
    | ["null", null]
    | ["number", null]
    | ["reference", {
        readonly "context"?: string,
        readonly "type": string,
    }]
    | ["string", null]
    | ["taggedUnion", pt.Dictionary<Type>]

export type Procedure = {
    readonly "type": Type
}

export type Function = {
    readonly "async": boolean
    readonly "type": Type
    readonly "return type": Type
}

export type Glossary = {
    "imports": pt.Dictionary<string>
    "types": pt.Dictionary<Type>
    "procedures": pt.Dictionary<Procedure>
    "functions": pt.Dictionary<Function>
}

