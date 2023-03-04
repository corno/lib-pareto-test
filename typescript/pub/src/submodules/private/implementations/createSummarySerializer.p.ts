

import { createSummarySerializer } from "../definition/api.generated"

export const $$: createSummarySerializer = (
    $d,
) => {
    return (
        $,
    ) => {
        const red = "\x1b[31m"
        const green = "\x1b[32m"
        const reset = "\x1b[0m"

        $d.log(``)
        const summary = $
        $d.log(`${$d.isZero(summary.numberOfErrors) ? green : ""}${$d.add([summary.numberOfTests, $d.negate(summary.numberOfErrors)])} successful tests${reset}`)
        $d.log(`${$d.isZero(summary.numberOfErrors) ? "" : red}${summary.numberOfErrors} errors${reset}`)
    }
}
