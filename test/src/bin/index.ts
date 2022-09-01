
import * as pe from "pareto-core-exe"
import * as pa from "pareto-core-async"
import * as pw from "pareto-core-raw"
import * as pl from "pareto-core-lib"

import * as diff from "res-pareto-diff"
import * as fs from "res-pareto-filesystem"

import * as pub from "../../../pub"

pe.runProgram(
    pub.createTester(
        {
            getTestSet: () => {
                //test that a failing test indeed fails!!! now it will make the program exit with an error code
                pl.logDebugMessage("FIXME: TEST THE TESTLIB")
                return pa.value({
                    elements: pw.wrapRawDictionary<pub.TTestElement>({
                        "a": {
                            type: ["test", {
                                type: ["simple string", {
                                    actual: "TODO: ACTUALLY TEST THE TEST LIB",
                                    expected: "TODO: ACTUALLY TEST THE TEST LIB"
                                }]
                            }]
                        }
                    })
                })
            },
            diff: {
                diffData: diff.diffData,
                stringsAreEqual: diff.stringsAreEqual,
            },
            fs: {
                readFile: fs.readFile,
                writeFile: fs.writeFile,
                unlink: fs.unlink,
            },
        },
    )
)
