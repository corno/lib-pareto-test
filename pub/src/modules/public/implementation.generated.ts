import { API } from "./api"
import { $$ as icreateTestProgram } from "./implementations/createTestProgram.p"

export const $a: API = {
    'createTestProgram': icreateTestProgram,
}