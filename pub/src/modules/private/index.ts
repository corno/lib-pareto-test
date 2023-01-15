import { API } from "./api"
import { icreateArgumentsParser } from "./implementations/createArgumentsParser.p"
import { icreateBoundTester } from "./implementations/createBoundTester.p"
import { icreateFileValidator } from "./implementations/createFileValidator.p"
import { icreateSummarizer } from "./implementations/createSummarizer.p"
import { icreateSummarySerializer } from "./implementations/createSummarySerializer.p"
import { icreateTester } from "./implementations/createTester.p"
import { icreateTestParametersParser } from "./implementations/createTestParametersParser.p"
import { icreateTestResultSerializer } from "./implementations/createTestResultSerializer.p"
import { icreateTestRunner } from "./implementations/createTestRunner.p"
import { iincrement } from "./implementations/increment.p"

export * from "./api"

export const $a: API = {
    "createArgumentsParser": icreateArgumentsParser,
    "createBoundTester": icreateBoundTester,
    "createFileValidator": icreateFileValidator,
    "createSummarizer": icreateSummarizer,
    "createSummarySerializer": icreateSummarySerializer,
    "createTester": icreateTester,
    "createTestParametersParser": icreateTestParametersParser,
    "createTestResultSerializer": icreateTestResultSerializer,
    "createTestRunner": icreateTestRunner,
    "increment": iincrement,
}