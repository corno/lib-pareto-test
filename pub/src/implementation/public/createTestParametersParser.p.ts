import * as pl from "pareto-core-lib"

import * as api from "../../api"
import * as types from "../types"

export const f_createTestParametersParser: types.CCreateTestParametersParser = (
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