import * as diff from "res-pareto-diff"

import * as api from "../interface"
export const dependencies: api.DDependencies = {
    diff: {
        stringsAreEqual: diff.stringsAreEqual,
        diffData: diff.diffData,
    }
}