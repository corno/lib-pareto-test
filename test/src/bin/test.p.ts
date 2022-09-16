#!/usr/bin/env node

import * as pe from "pareto-core-exe"

import * as test from "lib-pareto-test"

import * as diff from "res-pareto-diff"
import * as fs from "res-pareto-filesystem"

import { f_createGetTestset } from "../imp"
import { dependencies } from "../dependencies/dependencies"


pe.runProgram(
    test.createTester(
        {
            getTestSet: f_createGetTestset(
                dependencies
            ),
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
