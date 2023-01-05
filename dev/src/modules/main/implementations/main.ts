import * as pl from "pareto-core-lib"

import * as exe from "lib-pareto-exe"
import * as mainTypes from "glo-pareto-main"


import { project } from "../../../data/project.p"
import { generateProject } from "../../project/implementations/generateProject.p"

export const main: mainTypes.PProgramMain = ($) => {
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
}
