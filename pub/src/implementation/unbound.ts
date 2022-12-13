export { iincrement as increment } from "./pure/increment.p"

import * as types from "./creators.p"

// export type UnboundAPI = {
//     createFileValidator: types.CCreateFileValidator,
//     createTester: types.CCreateTester,
//     createTestsRunner: types.CCreateTestRunner,
//     createSummarySerializer: types.CCreateSummarySerializer,
//     createTestResultSerializer: types.CCreateTestResultSerializer,
//     createSummarizer: types.CCreateSummarizer,
//     createTestParametersParser: types.CCreateTestParametersParser,
// }

// export { UnboundAPI } from "../api"
export { icreateFileValidator as f_createFileValidator } from "./pure/createFileValidator.p"
export { icreateTester as f_createTester } from "./pure/createTester.p"
export { icreateTestsRunner as f_createTestsRunner } from "./pure/createTestsRunner"
export { icreateSummarySerializer as f_createSummarySerializer } from "./pure/createSummarySerializer.p"
export { icreateTestResultSerializer as f_createTestResultSerializer } from "./pure/createTestResultSerializer.p"
export { icreateSummarizer as f_createSummarizer } from "./pure/createSummarizer.p"
export { icreateTestParametersParser as f_createTestParametersParser } from "./pure/createTestParametersParser.p"

// export const $$: UnboundAPI = {
//     createTestParametersParser: f_createTestParametersParser,
//     createFileValidator: f_createFileValidator,
//     createTester: f_createTester,
//     createTestsRunner: f_createTestsRunner,
//     createSummarySerializer: f_createSummarySerializer,
//     createTestResultSerializer: f_createTestResultSerializer,
//     createSummarizer: f_createSummarizer,
// }