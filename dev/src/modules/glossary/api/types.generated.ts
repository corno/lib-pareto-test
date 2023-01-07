import * as pt from "pareto-core-types"

import * as fp from "lib-fountain-pen"

export type TFunction = {
    readonly "async": boolean
    readonly "data": TLeafType
    readonly "return value": TLeafType
}

export type TGlossary = {
    readonly "functions": pt.Dictionary<TFunction>
    readonly "imports": pt.Dictionary<string>
    readonly "types": pt.Dictionary<TType>
}

export type TLeafType =
    | ["boolean", null]
    | ["external reference", {
        readonly "context": string
        readonly "type": string
    }]
    | ["null", null]
    | ["number", null]
    | ["reference", string]
    | ["string", null]

export type TType =
    | ["array", TType]
    | ["dictionary", TType]
    | ["group", pt.Dictionary<TType>]
    | ["leaf", TLeafType]
    | ["taggedUnion", pt.Dictionary<TType>]


////////////////



export type FSerializeGlossary = (
    $: TGlossary,
    block: fp.IBlock,
) => void


export type XSerializeLeafType = ($: TLeafType, $i: fp.ILine) => void