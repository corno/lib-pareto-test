import { API } from "./api.generated"
import { $$ as icreateTestProgram } from "./implementations/createTestProgram.b"

export const $api: API = {
    'createTestProgram': icreateTestProgram,
}