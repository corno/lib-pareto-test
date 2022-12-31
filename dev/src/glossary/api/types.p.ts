import * as pt from "pareto-core-types"
import { NGlossary } from "../glossary/types.p"

export namespace NAPI {

    export type AlgorithmReference = {
        type:
        | ["function", {
            context?:
            | ["local", null]
            | ["import", string]
            "function": string
            "async"?: boolean
        }]
        | ["procedure", NGlossary.LeafType]
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
        api: {
            imports: pt.Dictionary<string>
            algorithms: pt.Dictionary<AlgorithmDefinition>
        }
    }

}