import * as api from "../../interface"

export const p_serializeSummary: api.PSerializeSummary = (
    $,
    $i,
    $d,
) => {
    const red = "\x1b[31m"
    const green = "\x1b[32m"
    const reset = "\x1b[0m"

    $i.log(``)
    const summary = $.summary
    $i.log(`${$d.isZero(summary.numberOfErrors) ? green : ""}${$d.add([summary.numberOfTests, $d.negative(summary.numberOfErrors)])} successful tests${reset}`)
    $i.log(`${$d.isZero(summary.numberOfErrors) ? "" : red}${summary.numberOfErrors} errors${reset}`)
}
