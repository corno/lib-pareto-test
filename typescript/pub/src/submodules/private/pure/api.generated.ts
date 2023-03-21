import * as pt from 'pareto-core-types'

import * as g_analyse from "../../analyse"
import * as g_arithmetic from "res-pareto-arithmetic"
import * as g_boolean from "res-pareto-boolean"
import * as g_collation from "res-pareto-collation"
import * as g_common from "glo-pareto-common"
import * as g_diff from "res-pareto-diff"
import * as g_fs from "lib-pareto-filesystem"
import * as g_this from "../glossary"

export type createFileValidator = ($d: {
    readonly 'diffData': g_diff.F.DiffData
    readonly 'readFile': g_this.F.ReadFile
    readonly 'unlink': g_fs.F.UnlinkFireAndForget
    readonly 'writeFile': g_fs.F.WriteFile
}) => g_this.F.ValidateFile

export type createTester = ($d: {
    readonly 'isZero': g_boolean.F.IsZero
    readonly 'runTests': g_this.F.RunTests
    readonly 'serializeSummary': g_analyse.F.SerializeSummary
    readonly 'serializeTestResult': g_analyse.F.SerializeTestResult
    readonly 'summarize': g_analyse.F.Summarize
}) => g_analyse.F.TestTestSet

export type createTestRunner = ($d: {
    readonly 'diffData': g_diff.F.DiffData
    readonly 'stringsAreEqual': g_diff.F.StringsAreEqual
    readonly 'validateFile': g_this.F.ValidateFile
}) => g_this.F.RunTests

export type API = {
    createFileValidator: createFileValidator
    createTester: createTester
    createTestRunner: createTestRunner
}