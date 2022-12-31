import * as pl from "pareto-core-lib"

import * as pe from "pareto-core-exe"

import * as exe from "lib-pareto-exe"


import { project } from "../data/project.p"
import { generateProject } from "../implementation/binding/generateProject.p"


export function generate() {
    pe.runProgram(($) => {
        exe.p_getSingleArgument($.arguments, {
            callback: ($) => {
                generateProject({
                    project: project,
                    path: $,
                })
            },
            error: () => {
                pl.implementMe("@@@@")
            }
        })
    })
}
