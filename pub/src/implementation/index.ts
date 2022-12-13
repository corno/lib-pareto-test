import * as api from "../api"

import { icreateArgumentsParser } from "./binding/createArgumentsParser.p"
import { icreateFileValidator } from "./pure/createFileValidator.p"
import { icreateSummarizer } from "./pure/createSummarizer.p"
import { icreateSummarySerializer } from "./pure/createSummarySerializer.p"
import { icreateTester } from "./pure/createTester.p"
import { icreateTester2 } from "./binding/createTester2.p"
import { icreateTestParametersParser } from "./pure/createTestParametersParser.p"
import { icreateTestProgram } from "./binding/createTestProgram.p"
import { icreateTestResultSerializer } from "./pure/createTestResultSerializer.p"
import { icreateTestsRunner } from "./pure/createTestsRunner.p"
import { iincrement } from "./pure/increment.p"
export const $x = {
    "createArgumentsParser": icreateArgumentsParser,
    "createFileValidator": icreateFileValidator,
    "createSummarizer": icreateSummarizer,
    "createSummarySerializer": icreateSummarySerializer,
    "createTester": icreateTester,
    "createTester2": icreateTester2,
    "createTestParametersParser": icreateTestParametersParser,
    "createTestProgram": icreateTestProgram,
    "createTestResultsSerializer": icreateTestResultSerializer,
    "createTestsRunner": icreateTestsRunner,
    "increment": iincrement,
}
export const $a: api.API = {
    "createTestProgram": icreateTestProgram,
}