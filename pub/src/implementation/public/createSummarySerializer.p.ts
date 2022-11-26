import * as api from "../../api"

export const f_createSummarySerializer: api.CCreateSummarySerializer = (
    $i, $d,
) => {
    return (
        $,
    ) => {
        const red = "\x1b[31m"
        const green = "\x1b[32m"
        const reset = "\x1b[0m"

        $i.log(``)
        const summary = $
        $i.log(`${$d.isZero(summary.numberOfErrors) ? green : ""}${$d.add([summary.numberOfTests, $d.negative(summary.numberOfErrors)])} successful tests${reset}`)
        $i.log(`${$d.isZero(summary.numberOfErrors) ? "" : red}${summary.numberOfErrors} errors${reset}`)
    }
}
