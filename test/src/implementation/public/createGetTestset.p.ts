
import * as pl from "pareto-core-lib"
import * as pm from "pareto-core-state"

import * as test from "lib-pareto-test"

import * as api from "../../interface"


import * as pub from "../../../../pub"

export const createGetTestset: api.FCreateGetTestset = ($, $d) => {
    return ($) => {




        pub.$$.test(
            $.testDirectory,
            {
                out: ($) => {

                },
                onTestErrors: () => {

                }
            },
            {
                getTestSet: () => {}
            },
        )

        pl.logDebugMessage("REENABLE TESTS!!!!!!")

        const builder = pm.createUnsafeDictionaryBuilder<test.TTestElement>()
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

        return pl.asyncValue({
            elements: builder.getDictionary()
        })
    }
}
