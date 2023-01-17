import { API } from "./api"
import { $$ as icreateArgumentsParser } from "./implementations/createArgumentsParser.p"
import { $$ as icreateBoundTester } from "./implementations/createBoundTester.p"
import { $$ as icreateFileValidator } from "./implementations/createFileValidator.p"
import { $$ as icreateSummarizer } from "./implementations/createSummarizer.p"
import { $$ as icreateSummarySerializer } from "./implementations/createSummarySerializer.p"
import { $$ as icreateTester } from "./implementations/createTester.p"
import { $$ as icreateTestParametersParser } from "./implementations/createTestParametersParser.p"
import { $$ as icreateTestResultSerializer } from "./implementations/createTestResultSerializer.p"
import { $$ as icreateTestRunner } from "./implementations/createTestRunner.p"
import { $$ as iincrement } from "./implementations/increment.p"

export * from "./api"

export const $a: API = {
    'createArgumentsParser': icreateArgumentsParser,
    'createBoundTester': icreateBoundTester,
    'createFileValidator': icreateFileValidator,
    'createSummarizer': icreateSummarizer,
    'createSummarySerializer': icreateSummarySerializer,
    'createTester': icreateTester,
    'createTestParametersParser': icreateTestParametersParser,
    'createTestResultSerializer': icreateTestResultSerializer,
    'createTestRunner': icreateTestRunner,
    'increment': iincrement,
}