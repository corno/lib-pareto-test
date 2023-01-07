import { API } from "./api"
import { icreateTestProgram } from "./implementations/createTestProgram.p"

export * from "./api"

export const $a: API = {
    "createTestProgram": icreateTestProgram,
}