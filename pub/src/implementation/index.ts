
//export * from "./unbound"
export * from "./bound"
import * as types from "./types"


export type UnboundAPI = {
    createFileValidator: types.CCreateFileValidator,
    createTester: types.CCreateTester,
    createTestsRunner: types.CCreateTestRunner,
    createSummarySerializer: types.CCreateSummarySerializer,
    createTestResultSerializer: types.CCreateTestResultSerializer,
    createSummarizer: types.CCreateSummarizer,
    createTestParametersParser: types.CCreateTestParametersParser,
}