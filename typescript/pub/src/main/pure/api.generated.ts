import * as pt from 'pareto-core-types'

import * as g_common from "glo-pareto-common"
import * as g_main from "res-pareto-main"
import * as g_this from "../glossary"

export type createTestProgram = ($d: {
    readonly 'getTestSet': g_this.F.GetTestSet
}) => g_main.F.Main

export type API = {
    createTestProgram: createTestProgram
}