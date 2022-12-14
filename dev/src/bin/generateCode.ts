
import { project } from "../data/project.p"
import { generateProject } from "../implementation/binding/generateProject.p"

generateProject({
    project: project,
    path: [".", "TMPTMP"],
})