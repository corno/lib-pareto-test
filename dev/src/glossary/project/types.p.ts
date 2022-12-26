import * as pt from "pareto-core-types"
import { NAPI } from "../api/types.p"
import { NGlossary } from "../glossary/types.p"

export namespace NProject {

    export type Implementation = {
        readonly "type":
        | ["pure", null]
        | ["binding", null]
        readonly "definition":
        | ["constructor", NAPI.Constructor]
        | ["algorithm", NAPI.AlgorithmReference]
    }

    export type Project = {
        readonly "api": NAPI.API
        readonly "implementation": {
            "internal glossary": NGlossary.Glossary
            "implementations": pt.Dictionary<Implementation>
            "api mapping": pt.Dictionary<string>
        }
    }
}