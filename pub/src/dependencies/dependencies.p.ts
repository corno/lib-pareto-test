import * as diff from "res-pareto-diff"
import * as fs from "res-pareto-filesystem"
import * as arith from "res-pareto-arithmetic"
import * as collation from "res-pareto-collation"
import * as bool from "res-pareto-boolean"

import * as api from "../interface"

export const dependencies2: api.DDependencies = {
    stringsAreEqual: diff.fStringsAreEqual,
    diffData: diff.fDiffData,
}

export const dependencies: api.DCreateTesterDependencies = {
    fs: {
        readFile: fs.f_readFile,
        writeFile: fs.f_writeFile,
        unlink: fs.f_unlink,
    },
    diff: {
        diffData: diff.fDiffData,
        stringsAreEqual: diff.fStringsAreEqual,
    },
    isZero: bool.f_isZero,
    increment: ($) => { return $ + 1 },
    add: arith.f_add,
    negative: arith.f_negative,
    sortedForEach: collation.fCreateSortedForEach({
        isYinBeforeYang: collation.fLocaleIsYinBeforeYang
    }),
}