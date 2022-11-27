import * as pl from "pareto-core-lib"

import * as api from "../../api"

export const f_createTestParametersParser: api.CCreateTestParametersParser = (
    $i,
) => {
    return ($) => {
        type State = null | string
        let state: State = null
        $.forEach(($) => {
            if (state !== null) {
                $i.onError(["too many", null])
            } else {
                state = $
            }
        })
        if (state === null) {
            $i.onError(["missing", null])
        } else {
            $i.callback(state)
        }
    }
}