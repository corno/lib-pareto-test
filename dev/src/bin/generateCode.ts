import * as pl from "pareto-core-lib"
import * as pt from "pareto-core-types"
import * as pe from "pareto-core-exe"

import * as fp from "lib-fountain-pen"
import * as coll from "res-pareto-collation"
import * as tostring from "res-pareto-tostring"
import { Glossary, Type } from "../glossary/types.p"
import { foo } from "../data/data.p"
import { createSerializer } from "../implementation/public/createSerializer.p"
import * as out from "res-pareto-standard-outstream"


function doIt($: Glossary) {
    fp.$a.createWriter(
        {
            path: [".", "TMPTMP"],
            configuration: fp._defaultSettings,
        },
        {
            onError: ($) => {
                pl.logDebugMessage("ERROR!!!")
            }
        },
    ).createFile("test.ts", ($i) => {
        createSerializer({
            block: $i,
            isABeforeB: coll.$a.localeIsABeforeB,
        })($)

    })

}

doIt(foo)