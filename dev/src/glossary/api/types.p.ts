import * as pt from "pareto-core-types"
import { NGlossary } from "../glossary/types.p"

export namespace NAPI {

    export type AlgorithmReference = {
        type:
        | ["function", null]
        | ["procedure", null]
        context?:
        | ["local", null]
        | ["import", string]
        algorithm: string
    }

    export type Constructor = {
        data: NGlossary.LeafType
        dependencies: pt.Dictionary<AlgorithmReference>
        result: AlgorithmReference
    }

    export type AlgorithmDefinition =
        | ["constructor", Constructor]
        | ["algorithm", AlgorithmReference]

    export type ModuleDefinition = {
        glossary: NGlossary.Glossary,
        api: pt.Dictionary<AlgorithmDefinition>
    }

}