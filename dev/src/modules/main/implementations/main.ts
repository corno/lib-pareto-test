import * as pl from "pareto-core-lib"

import * as exe from "lib-pareto-exe"
import * as mainTypes from "glo-pareto-main"


import { project } from "../../../data/project.p"
import { igenerateProject } from "./generateProject.p"

export const main: mainTypes.PProgramMain = ($) => {
    exe.p_getSingleArgument($.arguments, {
        callback: ($) => {
            igenerateProject({
                project: project,
                path: $,
            })
        },
        error: () => {
            pl.implementMe("@@@@")
        }
    })
}
