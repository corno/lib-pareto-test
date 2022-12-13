import * as pt from "pareto-core-types"

export namespace NGlossary {

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

}
