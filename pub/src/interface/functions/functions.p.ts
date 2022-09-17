import * as pt from "pareto-core-types"

import * as diff from "api-pareto-diff"
import * as fs from "api-pareto-filesystem"
import * as arithmetic from "api-pareto-arithmetic"
import * as collation from "api-pareto-collation"
import * as bool from "api-pareto-boolean"
import * as main from "api-pareto-main"


import { TSummary } from "../types/Summary.p"
import { TTestSetResult, TTestSet } from "../types/TestResult.p"
import { DCreateTesterDependencies, DRunTestsDependencies } from "../dependencies/dependencies.p"




export type PSerializeTestResult = (
    $: {
        readonly "testResult": TTestSetResult,
    },
    $i: {
        readonly "log": ($: string) => void
    },
    $d: {
        readonly "sortedForEach": collation.FSortedForEach
    }
) => void

export type PSerializeSummary = (
    $: {
        readonly "summary": TSummary,
    },
    $i: {
        readonly "log": ($: string) => void
    },
    $d: {
        readonly "isZero": bool.FIsZero
        readonly "add": arithmetic.FAdd
        readonly "negative": arithmetic.FNegative
    }
) => void

export type FSummarize = (
    $: TTestSetResult,
    $d: {
        readonly "increment": ($: number) => number
    },
) => TSummary

export type FRunTests = (
    $: {
        readonly "testSet": TTestSet
    },
    $d: {
        readonly "rtd": DRunTestsDependencies
    },
    $a: pt.ProcessAsyncValue
) => pt.AsyncValue<TTestSetResult>

export type FGetTestSet = (
    $: {
        readonly "testDirectory": string
    },
) => pt.AsyncValue<TTestSet>

export type FCreateTester = (
    $: null,
    $d: {
        readonly "getTestSet": FGetTestSet,
        readonly "dependencies": DCreateTesterDependencies,
    },
) => main.FProgramMain