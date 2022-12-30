import * as pt from "pareto-core-types"

import * as glo from "./types.generated"

export type CcreateTestProgram = ($: null, $d: {
    "getTestSet": glo.FGetTestSet
    "log": glo.PLog
    "logError": glo.PLog
    "onTestErrors": glo.POnTestErrors
}) => glo.PRunProgram

export type API = {
    createTestProgram: CcreateTestProgram
}