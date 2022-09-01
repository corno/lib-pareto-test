
import * as pe from "pareto-core-exe"
import * as pa from "pareto-core-async"
import * as pw from "pareto-core-raw"

import * as diff from "res-pareto-diff"
import * as fs from "res-pareto-filesystem"

import * as pub from "../../../pub"

pe.runProgram(
    pub.createTester(
        {
            getTestSet: () => {
                return pa.value({
                    elements: pw.wrapRawDictionary<pub.TTestElement>({
                        "a": {
                            type: ["test", {
                                type: ["simple string", {
                                    actual: "FOO",
                                    expected: "BAR"
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
