import * as pt from 'pareto-core-types'
import * as pa from 'pareto-core-async'
import * as ps from 'pareto-core-state'
import * as pv from 'pareto-core-dev'

import * as gtest from "lib-pareto-test"
import * as gbuild from "res-pareto-build"
import * as gpub from "../../../../../pub"
import * as gprivate from "../../../../../pub/dist/submodules/private"

import { getTestSet } from "../api.generated"

export const $$: getTestSet = ($) => {

    type LogEntry =
        | ['error', gpub.T.ArgumentError]
        | ['callback', gpub.T.TestParameters]

    function doIt(name: string, $: pt.Array<string>) {

        pv.logDebugMessage(name)
        gbuild.$r.buildArray<LogEntry>(null, ($i) => {

            const tpp = gprivate.$a.createTestParametersParser(
                {
                    onError: ($) => {
                        $i(['error', $])
                    },
                }
            )
            tpp($, ($) => {
                $i(['callback', $])
            })
        }).__forEach(($) => {
            pv.logDebugMessage($[0])
        })
        //pv.logDebugMessage(us.f_JSONStringify(log.getArray()))
    }

    // doIt("<", pr.wrapRawArray([]))
    // doIt(".", pr.wrapRawArray(["foo"]))
    // doIt(">", pr.wrapRawArray(['foo', "bar"]))

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
    //             return pa.asyncValue({
    //                 elements: pd.wrapRawDictionary({})
    //             })
    //         },
    //         log: ($) => {
    //             pv.logDebugMessage($)
    //         }
    //     }
    // )(
    //     pr.wrapRawArray(["foo"])
    // )

    const builder = ps.createUnsafeDictionaryBuilder<gtest.T.TestElement>()
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
    pv.logDebugMessage("FIXME: TEST THE TESTLIB")
    createTest(
        "TODO: ACTUALLY TEST THE TEST LIB",
        "TODO: ACTUALLY TEST THE TEST LIB",
        "TODO: ACTUALLY TEST THE TEST LIB",
    )

    return pa.asyncValue(null).map(() => {
        return pa.asyncValue({
            elements: builder.getDictionary()
        })
    })
}