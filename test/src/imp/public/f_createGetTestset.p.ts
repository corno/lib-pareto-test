
import * as pa from "pareto-core-async"
import * as pm from "pareto-core-state"
import * as pl from "pareto-core-lib"

import * as test from "lib-pareto-test"

import * as api from "../../interface"




import * as pub from "../../../../pub"

export const f_createGetTestset: api.FCreateGetTestset = ($d) => {
    return ($) => {

        pub.createTester(
            {
                getTestSet: () => {
                    return pa.value({
                        elements: pl.createEmptyDictionary()
                    })
                },
                diff: $d.diff,
                fs: {
                    //for testing purposes this should probably not really be done with the filesystem
                    readFile: () => {
                        pl.implementMe("!!!")
                    },
                    writeFile: () => {
                        pl.implementMe("!!!")
                    },
                    unlink: () => {
                        pl.implementMe("!!!")
                    },
                },
                isYinBeforeYang: collation.,
                isZero: x,
                add: x,
                negative: x,
                increment: x,

            },
        )

        // pub.runTests(
        //     {
        //         testSet: {
        //             elements: pl.createEmptyDictionary()
        //         }
        //     },
        //     {
        //         rtd: {

        //         },
        //         startAsync: x,
        //     }
        // )

        const builder = pm.createDictionaryBuilder<test.TTestElement>(
            ["ignore", null],
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