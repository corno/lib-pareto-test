
import * as pa from "pareto-core-async"
import * as pm from "pareto-core-state"
import * as pl from "pareto-core-lib"

import * as test from "lib-pareto-test"

import * as pub from "../../../pub"

export function createGetTestSet($d: {}): test.GetTestSet {
    return () => {

        const builder = pm.createDictionaryBuilder<test.TTestElement>(
            ["ignore", {}],
            () => {
                pl.panic("duplicate key")
            }
        )
        function createTest(name: string, actual: string, expected: string) {
            builder.add(name, {
                type: ["test", {
                    type: ["simple string", {
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

        return pa.value({
            elements: builder.getDictionary()
        })
    }
}