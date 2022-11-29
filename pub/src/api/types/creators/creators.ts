import * as pt from "pareto-core-types"

import { FGetTestSet } from "../functions/functions.p"
import { IRunProgram, PLog, POnTestErrors } from "../interfaces/interfaces.p"

export type CCreateTestProgram = (
    $f: {
        readonly "getTestSet": FGetTestSet
        readonly "log": PLog
        readonly "logError": PLog
        readonly "onTestErrors": POnTestErrors
    }
) => IRunProgram