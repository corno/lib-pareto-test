import * as pt from 'pareto-core-types'
import * as pr from 'pareto-core-raw'
import * as pl from 'pareto-core-lib'
import * as tst from "lib-pareto-test"

import { test as private_createArgumentsParser } from "../modules/private/createArgumentsParser.generated"
import { test as private_createBoundTester } from "../modules/private/createBoundTester.generated"
import { test as private_createFileValidator } from "../modules/private/createFileValidator.generated"
import { test as private_createSummarizer } from "../modules/private/createSummarizer.generated"
import { test as private_createSummarySerializer } from "../modules/private/createSummarySerializer.generated"
import { test as private_createTester } from "../modules/private/createTester.generated"
import { test as private_createTestParametersParser } from "../modules/private/createTestParametersParser.generated"
import { test as private_createTestResultSerializer } from "../modules/private/createTestResultSerializer.generated"
import { test as private_createTestRunner } from "../modules/private/createTestRunner.generated"
import { test as private_increment } from "../modules/private/increment.generated"
import { test as public_createTestProgram } from "../modules/public/createTestProgram.generated"

const x = pr.wrapRawDictionary<pt.Dictionary<() => pt.AsyncValue<tst.TTestElement>>>({
    'private': pr.wrapRawDictionary({
        'createArgumentsParser': private_createArgumentsParser,
        'createBoundTester': private_createBoundTester,
        'createFileValidator': private_createFileValidator,
        'createSummarizer': private_createSummarizer,
        'createSummarySerializer': private_createSummarySerializer,
        'createTester': private_createTester,
        'createTestParametersParser': private_createTestParametersParser,
        'createTestResultSerializer': private_createTestResultSerializer,
        'createTestRunner': private_createTestRunner,
        'increment': private_increment,
    }),
    'public': pr.wrapRawDictionary({
        'createTestProgram': public_createTestProgram,
    }),
}).asyncMap(($, key) => $.asyncMap(($, key) => $()))