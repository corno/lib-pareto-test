import * as pt from "pareto-core-types"

import * as diff from "res-pareto-diff"
import * as fs from "lib-pareto-filesystem"
import * as arithmetic from "res-pareto-arithmetic"
import * as collation from "res-pareto-collation"
import { FGetTestSet } from "../functions/functions.p"
import { IRunProgram } from "../interfaces/interfaces.p"

export type CCreateTestProgram = (
    $f: {
        readonly "getTestSet": FGetTestSet
    }
) => IRunProgram