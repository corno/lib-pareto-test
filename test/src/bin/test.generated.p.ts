#!/usr/bin/env node

import * as pe from "pareto-core-exe"
import * as pl from "pareto-core-lib"

import * as test from "lib-pareto-test"

import { $b, dependencies } from "../dependencies/dependencies.p"
import { data } from "../data/data.p"


pe.runProgram(
    ($, $i) => {
        pl.logDebugMessage("???")
        test.$b.createTestProgram(
            {
                getTestSet: $b.createGetTestset(
                    data,
                    dependencies
                ),
            },
        )(
           $.arguments
        )
    }
)
