import * as pt from "pareto-core-types"
import * as mapi from "../../api"
import * as mcommon from "glo-pareto-common"

export type TAlgorithmImplementation = {}

export type TImplementation = pt.Dictionary<TAlgorithmImplementation>

export type TProject = {
    readonly "main": string
    readonly "modules": pt.Dictionary<{
        readonly "definition": mapi.TModuleDefinition
    }>
}

export type TProjectSettings = {
    readonly "path": mcommon.TPath
    readonly "project": TProject
}