
import * as diff from "api-pareto-diff"
import * as fsLib from "lib-pareto-filesystem"

export type DDiffDependencies = {
    readonly diffData: diff.FDiffData
    readonly stringsAreEqual: diff.FStringsAreEqual
}

export type DRunTestsDependencies = {
    readonly fs: DHandledFileSystemDependencies
    readonly diff: DDiffDependencies
}

export type DHandledFileSystemDependencies = {
    readonly  readFile: fsLib.FReadFileOrAbort
    readonly  writeFile: fsLib.PWriteFileFireAndForget
    readonly  unlink: fsLib.PUnlinkFireAndForget
}