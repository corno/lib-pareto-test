import * as pt from "pareto-core-types"

import { FGetTestSet } from "../functions/functions.p"
import { IRunProgram } from "../interfaces/interfaces.p"

export type CCreateTestProgram = (
    $f: {
        readonly "getTestSet": FGetTestSet
        readonly "log": ($: string) => void
        readonly "logError": ($: string) => void
        readonly "onTestErrors": ($: null) => void
    }
) => IRunProgram