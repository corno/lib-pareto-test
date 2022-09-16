import * as diff from "res-pareto-diff"

import * as api from "../interface"

export const dependencies: api.DDependencies = {
    stringsAreEqual: diff.fStringsAreEqual,
    diffData: diff.fDiffData,
}