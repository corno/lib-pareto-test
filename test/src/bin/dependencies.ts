import * as diff from "res-pareto-diff"

import { Dependencies } from "../imp/createGetTestSet";

export const dependencies: Dependencies = {
    diff: {
        stringsAreEqual: diff.stringsAreEqual,
        diffData: diff.diffData,
    }
}