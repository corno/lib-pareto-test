import * as pt from "pareto-core-types"
import * as pr from "pareto-core-raw"
import * as pl from "pareto-core-lib"


const x = pr.wrapRawDictionary({
    "api": pr.wrapRawDictionary({}),
    "glossary": pr.wrapRawDictionary({}),
    "project": pr.wrapRawDictionary({}),
}).asyncMap(($, key) => $.asyncMap(($, key) => $()))