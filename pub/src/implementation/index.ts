import { UnboundAPI } from "../api"
import { f_createFileValidator } from "./public/createFileValidator.p"
import { f_createTester } from "./public/createTester.p"
import { f_createTestsRunner } from "./public/createTestsRunner"
import { f_createSummarySerializer } from "./public/createSummarySerializer.p"
import { f_createTestResultSerializer } from "./public/createTestResultSerializer.p"
import { f_createSummarizer } from "./public/createSummarizer.p"
import { f_createArgumentsParser } from "./public/createArgumentsParser.p"

export const $$: UnboundAPI = {
    createArgumentsParser: f_createArgumentsParser,
    createFileValidator: f_createFileValidator,
    createTester: f_createTester,
    createTestsRunner: f_createTestsRunner,
    createSummarySerializer: f_createSummarySerializer,
    createTestResultSerializer: f_createTestResultSerializer,
    createSummarizer: f_createSummarizer,
}