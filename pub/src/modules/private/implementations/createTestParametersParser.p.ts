import * as api from "../api"

export const icreateTestParametersParser: api.CcreateTestParametersParser = (
    $,
    $d,
) => {
    return ($) => {
        type State = null | string
        let state: State = null
        $.forEach(($) => {
            if (state !== null) {
                $d.onError(["too many", null])
            } else {
                state = $
            }
        })
        if (state === null) {
            $d.onError(["missing", null])
        } else {
            $d.callback(state)
        }
    }
}