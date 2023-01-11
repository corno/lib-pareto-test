import * as pt from "pareto-core-types"

import * as glo from "./types.generated"


export type CcreateTestProgram = ($d: {
    readonly "af_getTestSet": glo.AGetTestSet
    readonly "pr_log": pt.Procedure<string>
    readonly "pr_logError": pt.Procedure<string>
    readonly "pr_onTestErrors": pt.Procedure<null>
}) => pt.Procedure<glo.TArguments>

export type API = {
    createTestProgram: CcreateTestProgram
}