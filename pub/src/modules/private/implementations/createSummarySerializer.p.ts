import * as api from "../api"

export const icreateSummarySerializer: api.CcreateSummarySerializer = (
    $d,
) => {
    return (
        $,
    ) => {
        const red = "\x1b[31m"
        const green = "\x1b[32m"
        const reset = "\x1b[0m"

        $d.dlog(``)
        const summary = $
        $d.dlog(`${$d.fisZero(summary.numberOfErrors) ? green : ""}${$d.fadd([summary.numberOfTests, $d.fnegate(summary.numberOfErrors)])} successful tests${reset}`)
        $d.dlog(`${$d.fisZero(summary.numberOfErrors) ? "" : red}${summary.numberOfErrors} errors${reset}`)
    }
}
