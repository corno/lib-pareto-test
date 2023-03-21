import * as pt from 'pareto-core-types'

import * as g_arithmetic from "res-pareto-arithmetic"
import * as g_boolean from "res-pareto-boolean"
import * as g_collation from "res-pareto-collation"
import * as g_common from "glo-pareto-common"
import * as g_diff from "res-pareto-diff"
import * as g_fs from "lib-pareto-filesystem"
import * as g_this from "../glossary"

export type createTestParametersParser = ($d: {
    readonly 'onError': g_this.F.HandleArgumentError
}) => g_this.F.ParseTestParameters

export type API = {
    createTestParametersParser: createTestParametersParser
}