import * as pt from "pareto-core-types"
import { NAPI } from "../api/types.p"
import { NGlossary } from "../glossary/types.p"

export namespace NProject {

    export type PrivateAlgorithm =
        | ["constructor", NAPI.Constructor]
        | ["function", string]
        | ["procedure", string]

    export type Implementation = {
        type:
        | ["pure", null]
        | ["binding", null]
        scope:
        | ["private", PrivateAlgorithm]
        | ["public", string]
    }


    export type Project = {
        api: NAPI.API
        implementation: {
            "internal glossary": NGlossary.Glossary
            "implementations": pt.Dictionary<Implementation>
            "api mapping": pt.Dictionary<string>
        }
    }
}