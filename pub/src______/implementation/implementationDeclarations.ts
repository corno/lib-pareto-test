import * as pt from "pareto-core-types"

// import * as glo from "./internal_glossary"
import * as api from "../api"

// export type IcreateArgumentsParser = ($: null, $d: {
//     "callback": glo.PRunTests
//     "onError": glo.POnArgumentError
// }) => api.PRunProgram
// export type IcreateFileValidator = api.XXXX
// export type IcreateSummarizer = api.XXXX
// export type IcreateSummarySerializer = api.XXXX
// export type IcreateTester = api.XXXX
// export type IcreateTester2 = api.XXXX
// export type IcreateTestParametersParser = api.XXXX
// export type IcreateTestProgram = api.XXXX
// export type IcreateTestResultSerializer = api.XXXX
// export type IcreateTestsRunner = api.XXXX
// export type Iincrement = api.XXXX


export type CCreateSummarySerializer = pt.Creator<
    {
        readonly "log": api.PLog
        readonly "isZero": glo.FIsZero
        readonly "add": arithmetic.FAdd
        readonly "negate": glo.FNegate
    },
    glo.PSerializeSummary
>
