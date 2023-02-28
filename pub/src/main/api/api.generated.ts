import * as pt from 'pareto-core-types'

import * as gcommon from "glo-pareto-common"
import * as gmain from "res-pareto-main"
import * as gthis from "./glossary"

export type CcreateTestProgram = ($d: {
    readonly 'getTestSet': gthis.FGetTestSet
    readonly 'log': gcommon.FLog
    readonly 'logError': gcommon.FLog
    readonly 'onTestErrors': gcommon.FSignal
}) => gmain.FMain

export type API = {
    createTestProgram: CcreateTestProgram
}