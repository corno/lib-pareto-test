

import { createSummarySerializer } from "../api.generated"

export const $$: createSummarySerializer = (
    $d,
) => {
    return ($, $i) => {
        const red = "\x1b[31m"
        const green = "\x1b[32m"
        const reset = "\x1b[0m"

        $i(``)
        const summary = $
        $i(`${$d.isZero(summary.numberOfErrors) ? green : ""}${$d.add([summary.numberOfTests, $d.negate(summary.numberOfErrors)])} successful tests${reset}`)
        $i(`${$d.isZero(summary.numberOfErrors) ? "" : red}${summary.numberOfErrors} errors${reset}`)
    }
}
