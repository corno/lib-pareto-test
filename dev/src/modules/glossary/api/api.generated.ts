import * as pt from "pareto-core-types"

import * as glo from "./types.generated"

import * as mcollation from "res-pareto-collation"

export type CcreateGlossarySerializer = ($: null, $d: {
    readonly "compare": mcollation.FIsABeforeB
}) => glo.XserializeGlossary

export type API = {
    createGlossarySerializer: CcreateGlossarySerializer
}