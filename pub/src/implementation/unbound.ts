export { increment } from "./public/increment.p"

import * as types from "./creators.p"

export type UnboundAPI = {
    createFileValidator: types.CCreateFileValidator,
    createTester: types.CCreateTester,
    createTestsRunner: types.CCreateTestRunner,
    createSummarySerializer: types.CCreateSummarySerializer,
    createTestResultSerializer: types.CCreateTestResultSerializer,
    createSummarizer: types.CCreateSummarizer,
    createTestParametersParser: types.CCreateTestParametersParser,
}

// export { UnboundAPI } from "../api"
export { f_createFileValidator } from "./public/createFileValidator.p"
export { f_createTester } from "./public/createTester.p"
export { f_createTestsRunner } from "./public/createTestsRunner"
export { f_createSummarySerializer } from "./public/createSummarySerializer.p"
export { f_createTestResultSerializer } from "./public/createTestResultSerializer.p"
export { f_createSummarizer } from "./public/createSummarizer.p"
export { f_createTestParametersParser } from "./public/createTestParametersParser.p"

// export const $$: UnboundAPI = {
//     createTestParametersParser: f_createTestParametersParser,
//     createFileValidator: f_createFileValidator,
//     createTester: f_createTester,
//     createTestsRunner: f_createTestsRunner,
//     createSummarySerializer: f_createSummarySerializer,
//     createTestResultSerializer: f_createTestResultSerializer,
//     createSummarizer: f_createSummarizer,
// }