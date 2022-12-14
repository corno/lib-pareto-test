import * as pt from "pareto-core-types"
import { CCreateArgumentsParser } from "../creators.p"
import { icreateTestParametersParser } from "../pure/createTestParametersParser.p"

export const icreateArgumentsParser: CCreateArgumentsParser = ($i) => {

    // exeLib.p_getSingleArgument(
    //     $.arguments,
    //     {
    //         error: ($) => {
    //             // switch ($[0]) {
    //             //     case "no arguments found":
    //             //         pl.cc($[1], ($) => {
    //             //             $i.out("missing test directory path")
    //             //         })
    //             //         break
    //             //     case "too many arguments found":
    //             //         pl.cc($[1], ($) => {
    //             //             $i.out("too many arguments, only a test directory expected")
    //             //         })
    //             //         break
    //             //     default: pl.au($[0])
    //             // }
    //             // $i.setExitCodeToFailed(null)
    //         },
    //         callback: ($) => {

    //         }
    //     }
    // )
    return icreateTestParametersParser(
        {
            onError: () =>/**/ {
                $i.onError(`arguments error`)
            },
            callback: ($) => {
                $i.callback($)
            },
        }
    )
}
