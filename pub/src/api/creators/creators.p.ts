import * as pt from "pareto-core-types"

import { FGetTestSet } from "../glossary/algorithms/algorithms.p"
import { IRunProgram, PLog, POnTestErrors } from "../glossary"

export type CCreateTestProgram = pt.Creator<
    {
        readonly "getTestSet": FGetTestSet
        readonly "log": PLog
        readonly "logError": PLog
        readonly "onTestErrors": POnTestErrors
    },
    IRunProgram
>