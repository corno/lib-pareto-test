import { API } from "./api.generated"
import { $$ as icreateTestProgram } from "./implementations/createTestProgram.p"

export const $api: API = {
    'createTestProgram': icreateTestProgram,
}