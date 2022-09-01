import * as api from "../../interface"

export const serializeSummary: api.SerializeSummary = (
    $,
    $i,
) => {
    const red = "\x1b[31m"
    const green = "\x1b[32m"
    const reset = "\x1b[0m"

    $i.log(``)
    const summary = $.summary
    $i.log(`${summary.numberOfErrors === 0 ? green : ""}${summary.numberOfTests - summary.numberOfErrors} successful tests${reset}`)
    $i.log(`${summary.numberOfErrors > 0 ? red : ""}${summary.numberOfErrors} errors${reset}`)
}
