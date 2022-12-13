import * as pt from "pareto-core-types"
import { NGlossary } from "../glossary/types.p"

export namespace NAPI {

export type Depedency =
    | ["function", string]
    | ["procedure", string]

export type Constructor = {
    data: NGlossary. LeafType
    dependencies: pt.Dictionary<Depedency>
    result:
    | ["function", string]
    | ["procedure", string]
}

export type PublicAlgorithm =
    | ["constructor", Constructor]
    | ["function", string]
    | ["procedure", string]

export type API = {
    glossary: NGlossary.Glossary,
    api: pt.Dictionary<PublicAlgorithm>
}

}