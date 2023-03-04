import * as pt from 'pareto-core-types'

import * as g_common from "glo-pareto-common"
import * as g_main from "res-pareto-main"
import * as g_this from "./glossary"

export type createTestProgram = ($d: {
    readonly 'getTestSet': g_this.F.GetTestSet
    readonly 'log': g_common.F.Log
    readonly 'logError': g_common.F.Log
    readonly 'onTestErrors': g_common.F.Signal
}) => g_main.F.Main

export type API = {
    createTestProgram: createTestProgram
}