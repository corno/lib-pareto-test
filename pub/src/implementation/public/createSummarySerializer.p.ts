import * as api from "../../api"

export const f_createSummarySerializer: api.CCreateSummarySerializer = (
    $i, $f,
) => {
    return (
        $,
    ) => {
        const red = "\x1b[31m"
        const green = "\x1b[32m"
        const reset = "\x1b[0m"

        $i.log(``)
        const summary = $
        $i.log(`${$f.isZero(summary.numberOfErrors) ? green : ""}${$f.add([summary.numberOfTests, $f.negate(summary.numberOfErrors)])} successful tests${reset}`)
        $i.log(`${$f.isZero(summary.numberOfErrors) ? "" : red}${summary.numberOfErrors} errors${reset}`)
    }
}
