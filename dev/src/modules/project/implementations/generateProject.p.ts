import * as pt from "pareto-core-types"
import * as pl from "pareto-core-lib"

import * as fp from "lib-fountain-pen"
import * as NProject from "../api"
import { createConstructorSerializer, serializeProject } from "./createProjectSerializer.p"
import { createGlossarySerializer } from "../../glossary/implementations/createGlossarySerializer.p"
import * as coll from "res-pareto-collation"
import { serializeTemplate } from "./createTemplateSerializer.p"

export function generateProject($: NProject.TProjectSettings): void {
    const $i = fp.$a.createWriter(
        {
            path: $.path,
            configuration: fp._defaultSettings,
        },
        {
            onError: ($) => {
                pl.logDebugMessage("ERROR!!!")
            }
        },
    )
    serializeProject(
        $.project,
        $i,
        {
            compare: coll.$a.localeIsABeforeB,
            serializeGlossary: createGlossarySerializer({
                isABeforeB: coll.$a.localeIsABeforeB,
            }),
            serializeConstructor: createConstructorSerializer({
                compare: coll.$a.localeIsABeforeB,
            })
        }
    )
    serializeTemplate(
        $.project,
        $i,
        {
            compare: coll.$a.localeIsABeforeB,
        }
    )
}
