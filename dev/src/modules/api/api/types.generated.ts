import * as pt from "pareto-core-types"
import * as mglossary from "../../glossary"

export type TAlgorithmDefinition = 
    | [ "algorithm", TAlgorithmReference ]
    | [ "constructor", TConstructor ]

export type TAlgorithmReference = {
    readonly "type": 
        | [ "function", {
            readonly "async"?: boolean
            readonly "context"?: 
                | [ "import", string ]
                | [ "local", null ]
            readonly "function": string
        } ]
        | [ "procedure", mglossary.TLeafType ]
}

export type TConstructor = {
    readonly "data": mglossary.TLeafType
    readonly "dependencies": pt.Dictionary<TAlgorithmReference>
    readonly "result": TAlgorithmReference
}

export type TModuleDefinition = {
    readonly "api": {
        readonly "algorithms": pt.Dictionary<TAlgorithmDefinition>
        readonly "imports": pt.Dictionary<string>
    }
    readonly "glossary": mglossary.TGlossary
}