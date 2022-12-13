
import * as api from "../api"

import { icreateTestProgram } from "./binding/createTestProgram.p"

export const $a: api.API = {
    createTestProgram: icreateTestProgram
}