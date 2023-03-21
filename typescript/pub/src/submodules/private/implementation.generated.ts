import { API } from "./api.generated"
import { $$ as icreateTester } from "./implementations/createTester.a.c"
import { $$ as icreateTestRunner } from "./implementations/createTestRunner.a.f"
import { $$ as ivalidateFile } from "./implementations/validateFile.a.f"

export const $api: API = {
    'createTester': icreateTester,
    'createTestRunner': icreateTestRunner,
    'validateFile': ivalidateFile,
}