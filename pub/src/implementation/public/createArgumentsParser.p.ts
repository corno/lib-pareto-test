import * as pl from "pareto-core-lib"

import * as api from "../../api"

export const f_createArgumentsParser: api.CCreateArgumentsParser = (
    $i,
) => {
    return ($) => {
        type State = null | string
        let state: State = null
        $.forEach(($) => {
            if (state !== null) {
                $i.onTooMany()
            } else {
                state = $
            }
        })
        if (state === null) {
            $i.onMissing()
        } else {
            $i.callback(state)
        }
    }
}