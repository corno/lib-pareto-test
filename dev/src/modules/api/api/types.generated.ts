import * as pt from "pareto-core-types"
import * as mglossary from "../../glossary"
import * as mfp from "lib-fountain-pen"

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



//////////////


export type XSerializeConstructor = ($: TConstructor, $i: mfp.ILine) => void

export type XSerializeAlgorithmReference = ($: TAlgorithmReference, $i: mfp.ILine) => void
