
import * as mainTypes from "glo-pareto-main"


import { project } from "../../../data_tmp/project.p"
import { generateProject } from "./generateProject.p"

export const main: mainTypes.PProgramMain = ($) => {
    generateProject({
        project: project,
        path: ["..", "tmp", "project"],
    })
}
