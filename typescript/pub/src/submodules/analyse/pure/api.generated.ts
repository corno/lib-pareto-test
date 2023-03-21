import * as pt from 'pareto-core-types'

import * as g_arithmetic from "res-pareto-arithmetic"
import * as g_boolean from "res-pareto-boolean"
import * as g_collation from "res-pareto-collation"
import * as g_common from "glo-pareto-common"
import * as g_diff from "res-pareto-diff"
import * as g_fs from "lib-pareto-filesystem"
import * as g_this from "../glossary"

export type createSummarizer = ($d: {
    readonly 'increment': g_this.F.Increment
}) => g_this.F.Summarize

export type createSummarySerializer = ($d: {
    readonly 'add': g_arithmetic.F.Add
    readonly 'isZero': g_boolean.F.IsZero
    readonly 'negate': g_arithmetic.F.Negate
}) => g_this.F.SerializeSummary

export type createTestResultSerializer = ($d: {
    readonly 'isABeforeB': g_collation.F.IsABeforeB
}) => g_this.F.SerializeTestResult

export type increment = g_this.F.Increment

export type API = {
    createSummarizer: createSummarizer
    createSummarySerializer: createSummarySerializer
    createTestResultSerializer: createTestResultSerializer
    increment: increment
}