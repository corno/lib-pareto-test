import { FTest } from "./types"
import { FCreateFileValidator, FCreateSummarizer, FCreateSummarySerializer, FCreateTester, FCreateTestResultSerializer, FCreateTestRunner } from "./unboundFunctions.p"

export * from "./unboundFunctions.p"
export * from "./types"

export type API = {
    createFileValidator: FCreateFileValidator,
    createTester: FCreateTester,
    createTestsRunner: FCreateTestRunner,
    createSummarySerializer: FCreateSummarySerializer,
    createTestResultSerializer: FCreateTestResultSerializer,
    createSummarizer: FCreateSummarizer,
}

export type API2 = {
    test: FTest
}