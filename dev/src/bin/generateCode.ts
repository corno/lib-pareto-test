import * as pl from "pareto-core-lib"

import * as fp from "lib-fountain-pen"
import { Glossary, Project, Type } from "../glossary/types.p"
import { data } from "../data/data.p"
import { serializeProject } from "../implementation/public/createProjectSerializer"
import { createGlossarySerializer } from "../implementation/public/createGlossarySerializer.p"
import * as coll from "res-pareto-collation"

function doIt($: Project) {
    const $i = fp.$a.createWriter(
        {
            path: [".", "TMPTMP"],
            configuration: fp._defaultSettings,
        },
        {
            onError: ($) => {
                pl.logDebugMessage("ERROR!!!")
            }
        },
    )
    serializeProject($, $i, {
        compare: coll.$a.localeIsABeforeB,
        serializeGlossary: createGlossarySerializer({
            isABeforeB: coll.$a.localeIsABeforeB,
    
        })
    })
}

doIt(data)