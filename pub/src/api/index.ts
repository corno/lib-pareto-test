import { IRunProgram, ITest } from "./types"
import { CCreateArgumentsParser, CCreateFileValidator, CCreateSummarizer, CCreateSummarySerializer, CCreateTester, CCreateTestProgram, CCreateTestResultSerializer, CCreateTestRunner } from "./creators"

export * from "./creators"
export * from "./types"

export type UnboundAPI = {
    createFileValidator: CCreateFileValidator,
    createTester: CCreateTester,
    createTestsRunner: CCreateTestRunner,
    createSummarySerializer: CCreateSummarySerializer,
    createTestResultSerializer: CCreateTestResultSerializer,
    createSummarizer: CCreateSummarizer,
    createArgumentsParser: CCreateArgumentsParser,
}

export type BoundAPI = {
    createTester: ($i: {
        onError: ($: string) => void
        log: ($: string) => void
        onTestErrors: () => void
    }) => ITest
    parseArguments: ($i: {
        onError: ($: string) => void
        callback: ($: string) => void
    }) => IRunProgram
    createTestProgram: CCreateTestProgram
}