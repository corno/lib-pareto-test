import * as pt from 'pareto-core-types'

import * as glo from "./types.generated"

import * as mcommon from "glo-pareto-common"

export type CcreateTestProgram = ($d: {
    readonly 'af_getTestSet': glo.AGetTestSet
    readonly 'pr_log': pt.Procedure<mcommon.TString>
    readonly 'pr_logError': pt.Procedure<mcommon.TString>
    readonly 'pr_onTestErrors': pt.Procedure<mcommon.TNull>
}) => pt.Procedure<glo.TArguments>

export type API = {
    createTestProgram: CcreateTestProgram
}