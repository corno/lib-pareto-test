import * as pt from "pareto-core-types"

import * as glo from "./types.generated"

import * as mcoll from "res-pareto-collation"
import * as mglossary from "../../glossary"

export type CcreateAlgorithmReferenceSerializer = ($: null, $d: {
    readonly "serializeLeafType": mglossary.XserializeLeafType
}) => glo.XserializeAlgorithmReference

export type CcreateConstructorSerializer = ($: null, $d: {
    readonly "compare": mcoll.FIsABeforeB
    readonly "serializeAlgorithmReference": glo.XserializeAlgorithmReference
    readonly "serializeLeafType": mglossary.XserializeLeafType
}) => glo.XserializeConstructor

export type CcreateModuleDefinitionSerializer = ($: null, $d: {
    readonly "compare": mcoll.FIsABeforeB
    readonly "serializeAlgorithmReference": glo.XserializeAlgorithmReference
    readonly "serializeConstructor": glo.XserializeConstructor
    readonly "serializeGlossary": mglossary.XserializeGlossary
}) => glo.XserializeModuleDefinition

export type API = {
    createAlgorithmSerializer: CcreateAlgorithmReferenceSerializer
    createConstructorSerializer: CcreateConstructorSerializer
    createModuleDefinitionSerializer: CcreateModuleDefinitionSerializer
}