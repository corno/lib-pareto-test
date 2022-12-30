import { icreateArgumentsParser } from "./binding/createArgumentsParser.p"
import { icreateFileValidator } from "./pure/createFileValidator.p"
import { icreateTestParametersParser } from "./pure/createTestParametersParser.p"

export const $a = {
    "createArgumentsParser": icreateArgumentsParser,
    "createTestParametersParser": icreateTestParametersParser,
    "createFileValidator": icreateFileValidator,
}