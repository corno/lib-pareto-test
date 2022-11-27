import { IRunProgram, ITest, TTestParameters } from "./types"
import { CCreateTestParametersParser, CCreateFileValidator, CCreateSummarizer, CCreateSummarySerializer, CCreateTester, CCreateTestProgram, CCreateTestResultSerializer, CCreateTestRunner } from "./creators"

export * from "./creators"
export * from "./types"

export type UnboundAPI = {
    createFileValidator: CCreateFileValidator,
    createTester: CCreateTester,
    createTestsRunner: CCreateTestRunner,
    createSummarySerializer: CCreateSummarySerializer,
    createTestResultSerializer: CCreateTestResultSerializer,
    createSummarizer: CCreateSummarizer,
    createTestParametersParser: CCreateTestParametersParser,
}

export type BoundAPI = {
    createTester: ($i: {
        onError: ($: string) => void
        log: ($: string) => void
        onTestErrors: () => void
    }) => ITest
    parseArguments: ($i: {
        onError: ($: string) => void
        callback: ($: TTestParameters) => void
    }) => IRunProgram
    createTestProgram: CCreateTestProgram
}