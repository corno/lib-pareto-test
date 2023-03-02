import { API } from "./definition/api.generated"
import { $$ as icreateTestProgram } from "./implementations/createTestProgram.p"

export const $a: API = {
    'createTestProgram': icreateTestProgram,
}