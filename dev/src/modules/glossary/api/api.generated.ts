import * as pt from "pareto-core-types"

import * as glo from "./types.generated"

import * as coll from "res-pareto-collation"


export type CCreateGlossarySerializer = (
    $: null,
    $d: {
        isABeforeB: coll.FIsABeforeB,
    }
) => glo.XserializeGlossary


export type API = {
}