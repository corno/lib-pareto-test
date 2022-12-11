import * as pt from "pareto-core-types"

import * as common from "glo-pareto-common"

export type IWriteFile = pt.Procedure<{
    path: common.TPath,
    data: string,
}>
