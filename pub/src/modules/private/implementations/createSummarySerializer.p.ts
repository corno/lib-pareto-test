import * as api from "../api"

export const $$: api.CcreateSummarySerializer = (
    $d,
) => {
    return (
        $,
    ) => {
        const red = "\x1b[31m"
        const green = "\x1b[32m"
        const reset = "\x1b[0m"

        $d.pr_log(``)
        const summary = $
        $d.pr_log(`${$d.sf_isZero(summary.numberOfErrors) ? green : ""}${$d.sf_add([summary.numberOfTests, $d.sf_negate(summary.numberOfErrors)])} successful tests${reset}`)
        $d.pr_log(`${$d.sf_isZero(summary.numberOfErrors) ? "" : red}${summary.numberOfErrors} errors${reset}`)
    }
}
