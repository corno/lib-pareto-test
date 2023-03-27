import * as pt from 'pareto-core-types'

import * as g_arithmetic from "res-pareto-arithmetic"
import * as g_boolean from "res-pareto-boolean"
import * as g_collation from "res-pareto-collation"
import * as g_common from "glo-pareto-common"
import * as g_diff from "res-pareto-diff"
import * as g_fs from "lib-pareto-filesystem"
import * as g_this from "./glossary"

export namespace D {
    
}

export namespace A {
    
    export type createTestParametersParser = () => g_this.ASYNC.A.C.CreateTestParametersParser
}

export type API = {
    readonly 'createTestParametersParser': A.createTestParametersParser
}