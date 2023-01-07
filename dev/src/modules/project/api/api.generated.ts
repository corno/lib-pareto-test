import * as pt from "pareto-core-types"

import * as glo from "./types.generated"

import * as mglossary from "../../glossary"
import * as mapi from "../../api"
import * as mcoll from "res-pareto-collation"

export type CcreateProjectSerializer = (
    $: null,
    $d: {
        serializeLeafType: mglossary.XserializeLeafType
        serializeModuleDefinition: mapi.XserializeModuleDefinition
        compare: mcoll.FIsABeforeB
    },
) => glo.XSerializeProject

export type CcreateTemplateSerializer = (
    $: null,
    $d: {
        compare: mcoll.FIsABeforeB,
    },
) => glo.XSerializeProject

export type API = {
}