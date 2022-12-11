
import { CCreateTestProgram } from "./creators/creators.p"


export type API = {
    // createTester: ($i: {
    //     onError: ($: string) => void
    //     log: ($: string) => void
    //     onTestErrors: () => void
    // }) => ITest
    // parseArguments: ($i: {
    //     onError: ($: string) => void
    //     callback: ($: TTestParameters) => void
    // }) => IRunProgram
    createTestProgram: CCreateTestProgram
}