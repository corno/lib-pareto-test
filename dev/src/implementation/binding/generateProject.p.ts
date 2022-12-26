import * as pt from "pareto-core-types"
import * as pl from "pareto-core-lib"

import * as fp from "lib-fountain-pen"
import { NProject } from "../../glossary/project/types.p"
import { createConstructorSerializer, serializeProject } from "../pure/createProjectSerializer"
import { createGlossarySerializer } from "../pure/createGlossarySerializer.p"
import * as coll from "res-pareto-collation"

export function generateProject($: {
    project: NProject.Project,
    path: pt.Nested<string>
    
}) {
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
    serializeProject($.project, $i, {
        compare: coll.$a.localeIsABeforeB,
        serializeGlossary: createGlossarySerializer({
            isABeforeB: coll.$a.localeIsABeforeB,
        }),
        serializeConstructor: createConstructorSerializer({
            compare: coll.$a.localeIsABeforeB,
        })
    })
}
