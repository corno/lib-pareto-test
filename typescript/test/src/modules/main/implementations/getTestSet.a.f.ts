import * as pt from 'pareto-core-types'
import * as pa from 'pareto-core-async'
import * as ps from 'pareto-core-state'
import * as pv from 'pareto-core-dev'

import * as g_test from "lib-pareto-test"
import * as g_build from "res-pareto-build"
import * as g_pub from "../../../../../pub/dist"
import * as g_parameters from "../../../../../pub/dist/submodules/parameters"

import { A } from "../api.generated"

export const $$: A.getTestSet = ($) => {

    type LogEntry =
        | ['error', g_pub.T.ArgumentsError]
        | ['callback', g_pub.T.TestParameters]

    function doIt(name: string, $: pt.Array<string>) {

        pv.logDebugMessage(name)
        g_build.$r.buildArray()<LogEntry>(($i) => {

            // const tpp = g_parameters.$a.createTestParametersParser(

            // )
            // const tpp2 = tpp({
            //     'errorHandler': ($) => {
            //         $i(['error', $])
            //     },
            //     'handler': ($) => {

            //     }
            // })




            // ($, ($) => {
            //     $i(['callback', $])
            // })
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

    const builder = ps.createUnsafeDictionaryBuilder<g_test.T.TestElement>()
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