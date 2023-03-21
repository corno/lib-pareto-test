import { API } from "./api.generated"
import { $$ as icreateFileValidator } from "./implementations/createFileValidator.p"
import { $$ as icreateTester } from "./implementations/createTester.p"
import { $$ as icreateTestRunner } from "./implementations/createTestRunner.p"

export const $api: API = {
    'createFileValidator': icreateFileValidator,
    'createTester': icreateTester,
    'createTestRunner': icreateTestRunner,
}