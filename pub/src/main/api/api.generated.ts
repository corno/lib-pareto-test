import * as pt from 'pareto-core-types'

import * as glo from "./glossary"

import * as mcommon from "glo-pareto-common"
import * as mmain from "res-pareto-main"

export type CcreateTestProgram = ($d: {
    readonly 'getTestSet': glo.FGetTestSet
    readonly 'log': mcommon.FLog
    readonly 'logError': mcommon.FLog
    readonly 'onTestErrors': mcommon.FSignal
}) => mmain.FMain

export type API = {
    createTestProgram: CcreateTestProgram
}