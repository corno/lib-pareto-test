import * as pt from "pareto-core-types"
import * as NAPI from "../../api/api/types.p"

export namespace NProject {

    export type AlgorithmImplementation = {

    }

    export type Implementation = pt.Dictionary<AlgorithmImplementation>

    export type Project = {
        readonly "modules": pt.Dictionary<{
            definition: NAPI.ModuleDefinition
            //implementation: Implementation

        }>
        readonly "main": string
    }


    export type TProjectSettings = {
        project: NProject.Project,
        path: pt.Nested<string>
    }

}