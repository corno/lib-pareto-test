
import * as pr from "pareto-core-raw"
import { NGlossary } from "../glossary/types.p"

// import { Function, Glossary, LeafType, Type } from "./types.p"


const wd = pr.wrapRawDictionary



export function boolean(): NGlossary.LeafType {
    return ["boolean", null]
}

export function string(): NGlossary.LeafType {
    return ["string", null]
}
export function reference(type: string): NGlossary.LeafType {
    return ["reference", type]
}
export function externalReference(context: string, type: string): NGlossary.LeafType {
    return ["external reference", {
        type: type,
        context: context,
    }]
}

export function number(): NGlossary.LeafType {
    return ["number", null]
}

export function _null(): NGlossary.LeafType {
    return ["null", null]
}
