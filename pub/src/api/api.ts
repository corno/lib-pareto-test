import { IRunProgram, ITest, TTestParameters } from "./types"

import * as types from "./types"


export type BoundAPI = {
    // createTester: ($i: {
    //     onError: ($: string) => void
    //     log: ($: string) => void
    //     onTestErrors: () => void
    // }) => ITest
    // parseArguments: ($i: {
    //     onError: ($: string) => void
    //     callback: ($: TTestParameters) => void
    // }) => IRunProgram
    createTestProgram: types.CCreateTestProgram
}