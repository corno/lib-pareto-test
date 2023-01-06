import * as pt from "pareto-core-types"

import * as glo from "./types.generated"

import * as mglossary from "../../glossary"

import * as coll from "res-pareto-collation"
import * as api from "../api"


export type CcreateConstructorSerializer = (
    $: null,
    $d: {
        compare: coll.FIsABeforeB,
        serializeLeafType: mglossary.XSerializeLeafType,
        serializeAlgorithmReference: api.XSerializeAlgorithmReference,
    }
) => api.XSerializeConstructor

export type CcreateAlgorithmReferenceSerializer = (
    $: null,
    $d: {
        serializeLeafType: mglossary.XSerializeLeafType,
    }
) => api.XSerializeAlgorithmReference

export type API = {
}