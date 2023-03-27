import * as pt from 'pareto-core-types'

import * as g_analyse from "../analyse"
import * as g_boolean from "res-pareto-boolean"
import * as g_diff from "res-pareto-diff"
import * as g_fs from "lib-pareto-filesystem"
import * as g_this from "./glossary"

export namespace D {
    
    export type createTester = {
        readonly 'isZero': g_boolean.SYNC.A.F.IsZero
        readonly 'runTests': g_this.ASYNC.A.F.RunTests
        readonly 'serializeSummary': g_analyse.SYNC.A.P.SerializeSummary
        readonly 'serializeTestResult': g_analyse.SYNC.A.P.SerializeTestResult
        readonly 'summarize': g_analyse.SYNC.A.F.Summarize
    }
    
    export type createTestRunner = {
        readonly 'diffData': g_diff.SYNC.A.F.DiffData
        readonly 'stringsAreEqual': g_diff.SYNC.A.F.StringsAreEqual
        readonly 'validateFile': g_this.ASYNC.A.F.ValidateFile
    }
    
    export type validateFile = {
        readonly 'diffData': g_diff.SYNC.A.F.DiffData
        readonly 'readFile': g_fs.ASYNC.A.F.ReadFileOrAbort
    }
}

export namespace A {
    
    export type createTester = ($d: D.createTester, ) => g_analyse.ASYNC.A.C.CreateTester
    
    export type createTestRunner = ($d: D.createTestRunner, ) => g_this.ASYNC.A.F.RunTests
    
    export type validateFile = ($d: D.validateFile, $se: {
        readonly 'unlink': g_fs.ASYNC.I.UnlinkFireAndForget
        readonly 'writeFile': g_fs.ASYNC.I.WriteFileFireAndForget
    }) => g_this.ASYNC.A.F.ValidateFile
}

export type API = {
    readonly 'createTester': A.createTester
    readonly 'createTestRunner': A.createTestRunner
    readonly 'validateFile': A.validateFile
}