import * as pt from 'pareto-core-types'

import * as gglo from "./glossary"

import * as gcommon from "glo-pareto-common"
import * as gmain from "res-pareto-main"

export type CcreateTestProgram = ($d: {
    readonly 'getTestSet': gglo.FGetTestSet
    readonly 'log': gcommon.FLog
    readonly 'logError': gcommon.FLog
    readonly 'onTestErrors': gcommon.FSignal
}) => gmain.FMain

export type API = {
    createTestProgram: CcreateTestProgram
}