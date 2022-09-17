
import * as diff from "api-pareto-diff"
import * as fs from "api-pareto-filesystem"
import * as bool from "api-pareto-boolean"
import * as arithmetic from "api-pareto-arithmetic"
import * as collation from "api-pareto-collation"
import * as fsLib from "lib-pareto-filesystem"

export type DDiffDependencies = {
    readonly "diffData": diff.FDiffData
    readonly "stringsAreEqual": diff.FStringsAreEqual
}

export type DRunTestsDependencies = {
    readonly "fs": DHandledFileSystemDependencies
    readonly "diff": DDiffDependencies
}

export type DHandledFileSystemDependencies = {
    readonly "readFile": fsLib.FReadFileOrAbort
    readonly "writeFile": fsLib.FWriteFileFireAndForget
    readonly "unlink": fsLib.FUnlinkFireAndForget
}


export type DDependencies = {
    readonly "diffData": diff.FDiffData
    readonly "stringsAreEqual": diff.FStringsAreEqual

}

export type DCreateTesterDependencies = {
    readonly "fs": {
        readonly "readFile": fs.FReadFile
        readonly "writeFile": fs.FWriteFile
        readonly "unlink": fs.FUnlink
    },
    readonly "diff": {
        readonly "diffData": diff.FDiffData
        readonly "stringsAreEqual": diff.FStringsAreEqual
    },
    readonly "isZero": bool.FIsZero,
    readonly "add": arithmetic.FAdd,
    readonly "negative": arithmetic.FNegative,
    readonly "sortedForEach": collation.FSortedForEach
    readonly "increment": ($: number) => number
}