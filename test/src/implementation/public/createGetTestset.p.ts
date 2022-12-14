import * as pt from "pareto-core-types"
import * as pl from "pareto-core-lib"
import * as pm from "pareto-core-state"
import * as pr from "pareto-core-raw"

import * as test from "lib-pareto-test"

import * as api from "../../interface"
import * as us from "res-pareto-ugly-stuff"


import * as pub from "../../../../pub"
import * as pubTypes from "../../../../pub/dist/modules/public"
import * as pubPrivate from "../../../../pub/dist/modules/private"

export const createGetTestset: api.FCreateGetTestset = ($, $f) => {

    return ($) => {

        type LogEntry =
            | ['error', pubTypes.TArgumentError]
            | ['callback', pubTypes.TTestParameters]


        function doIt(name: string, $: pt.Array<string>) {
            const log = pm.createArrayBuilder<LogEntry>()

            const tpp = pubPrivate.$a.createTestParametersParser(
                {
                    donError: ($) => {
                        log.push(['error', $])
                    },
                    dcallback: ($) => {
                        log.push(['callback', $])
                    }
                })
            tpp($)
            pl.logDebugMessage(name)
            log.getArray().forEach(($) => {
                pl.logDebugMessage($[0])
            })
            //pl.logDebugMessage(us.f_JSONStringify(log.getArray()))
        }

        doIt("<", pr.wrapRawArray([]))
        doIt(".", pr.wrapRawArray(["foo"]))
        doIt(">", pr.wrapRawArray(['foo', "bar"]))

        // pub.$a.createTestProgram({
        //     getTestSet: () => {
        //         pl.panic("@@@")
        //     },
        //     log: () => {

        //     },
        //     logError: () => {

        //     },
        //     onTestErrors: () => {

        //     },
        // })

        // pub.$b.createTestProgram(
        //     {
        //         getTestSet: ($) => {
        //             return pl.asyncValue({
        //                 elements: pr.wrapRawDictionary({})
        //             })
        //         },
        //         log: ($) => {
        //             pl.logDebugMessage($)
        //         }
        //     }
        // )(
        //     pr.wrapRawArray(["foo"])
        // )

        const builder = pm.createUnsafeDictionaryBuilder<test.TTestElement>()
        function createTest(name: string, actual: string, expected: string) {
            builder.add(name, {
                type: ['test', {
                    type: ['short string', {
                        actual: actual,
                        expected: expected
                    }]
                }]
            })
        }


        //test that a failing test indeed fails!!! now it will make the program exit with an error code
        pl.logDebugMessage("FIXME: TEST THE TESTLIB")
        createTest(
            "TODO: ACTUALLY TEST THE TEST LIB",
            "TODO: ACTUALLY TEST THE TEST LIB",
            "TODO: ACTUALLY TEST THE TEST LIB",
        )

        return pl.asyncValue(null).map(() => {
            return pl.asyncValue({
                elements: builder.getDictionary()
            })
        })
    }
}
