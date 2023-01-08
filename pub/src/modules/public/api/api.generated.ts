import * as pt from "pareto-core-types"

import * as glo from "./types.generated"


export type CcreateTestProgram = ($d: {
    readonly "fgetTestSet": glo.AGetTestSet
    readonly "dlog": pt.Procedure<string>
    readonly "dlogError": pt.Procedure<string>
    readonly "donTestErrors": pt.Procedure<null>
}) => pt.Procedure<glo.TArguments>

export type API = {
    createTestProgram: CcreateTestProgram
}