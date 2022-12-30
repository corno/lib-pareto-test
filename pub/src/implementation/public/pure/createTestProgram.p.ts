import * as pt from "pareto-core-types"

import * as api from "../../../api"
import { icreateArgumentsParser } from "../../private/binding/createArgumentsParser.p"
import { icreateTester2 } from "../../private/binding/createTester2.p"


const processAsync: <T>($: pt.AsyncValue<T>, $i: ($: T) => void) => void = ($, $i) => $._execute($i)

export const icreateTestProgram: api.CcreateTestProgram = ($, $f) => {
    return icreateArgumentsParser({
        onError: $f.logError,
        callback: ($) =>/**/ {
            processAsync(
                $f.getTestSet($),
                icreateTester2(
                    {
                        onError: $f.logError,
                        onTestErrors: $f.onTestErrors,
                        log: $f.log
                    }
                )
            )
        }
    })
}