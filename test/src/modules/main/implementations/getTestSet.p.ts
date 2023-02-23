import * as pt from 'pareto-core-types'
import * as pa from 'pareto-core-async'
import * as ps from 'pareto-core-state'
import * as pv from 'pareto-core-dev'

import * as gtest from "lib-pareto-test"

import * as gpub from "../../../../../pub"
import * as gprivate from "../../../../../pub/dist/submodules/private"

function buildArray<T>($c: (push: (value: T) => void) => void): pt.Array<T> {
    const temp = ps.createArrayBuilder<T>()
    $c((value) => {
        temp.push(value)
    })
    return temp.getArray()
}

import { CgetTestSet } from "../api"

export const $$:CgetTestSet = ($) => {

    type LogEntry =
        | ['error', gpub.T.ArgumentError]
        | ['callback', gpub.T.TestParameters]

    function doIt(name: string, $: pt.Array<string>) {

        pv.logDebugMessage(name)
        buildArray<LogEntry>((push) => {

            const tpp = gprivate.$a.createTestParametersParser(
                {
                    onError: ($) => {
                        push(['error', $])
                    },
                })
            tpp($, ($) => {
                push(['callback', $])
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