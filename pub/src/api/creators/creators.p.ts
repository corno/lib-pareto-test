import * as pt from "pareto-core-types"

import * as glo from "../glossary"

export type CCreateTestProgram = pt.Creator<
    {
        readonly "getTestSet": glo.FGetTestSet
        readonly "log": glo.PLog
        readonly "logError": glo.PLog
        readonly "onTestErrors": glo.POnTestErrors
    },
    glo.IRunProgram
>