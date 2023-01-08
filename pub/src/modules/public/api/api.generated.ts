import * as pt from "pareto-core-types"

import * as glo from "./types.generated"


export type CcreateTestProgram = ($d: {
    readonly "getTestSet": glo.AGetTestSet
    readonly "log": pt.Procedure<string>
    readonly "logError": pt.Procedure<string>
    readonly "onTestErrors": pt.Procedure<null>
}) => pt.Procedure<glo.TArguments>

export type API = {
    createTestProgram: CcreateTestProgram
}