
import * as mainTypes from "glo-pareto-main"


import { project } from "../../../data_tmp/project.p"
import { igenerateProject } from "./generateProject.p"

export const main: mainTypes.PProgramMain = ($) => {
    igenerateProject({
        project: project,
        path: ["..", "tmp", "project"],
    })
}
