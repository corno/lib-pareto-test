import { API } from "./api"
import { $$ as icreateTestProgram } from "./implementations/createTestProgram.p"

export * from "./api"

export const $a: API = {
    'createTestProgram': icreateTestProgram,
}