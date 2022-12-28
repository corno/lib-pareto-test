import * as pt from "pareto-core-types"
import { NAPI } from "../api/types.p"
import { NGlossary } from "../glossary/types.p"

export namespace NProject {

    export type AlgorithmImplementation = {
        readonly "type":
        | ["pure", null]
        | ["binding", null]
        readonly "definition":
        | ["constructor", NAPI.Constructor]
        | ["algorithm", NAPI.AlgorithmReference]
    }

    export type Implementation = pt.Dictionary<AlgorithmImplementation>

    export type Project = {
        readonly "api": NAPI.ModuleDefinition
        readonly "private definitions": NAPI.ModuleDefinition
        readonly "public implementations": Implementation
        readonly "private implementations": Implementation
    }
}