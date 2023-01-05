import * as pt from "pareto-core-types"

import * as api from "../../public"

import * as pd from "../api"

import { icreateArgumentsParser } from "./createArgumentsParser.p"
import { icreateBoundTester } from "./createBoundTester.p"

const processAsync: <T>($: pt.AsyncValue<T>, $i: ($: T) => void) => void = ($, $i) => $._execute($i)

export const icreateTestProgram: api.CcreateTestProgram = ($, $f) => {
    return icreateArgumentsParser(null, {
        onError: $f.logError,
        callback: ($) =>/**/ {
            processAsync(
                $f.getTestSet($),
                icreateBoundTester(
                    null,
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