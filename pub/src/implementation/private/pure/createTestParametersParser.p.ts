import { CCreateTestParametersParser } from "../../private_definitions"


export const icreateTestParametersParser: CCreateTestParametersParser = (
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