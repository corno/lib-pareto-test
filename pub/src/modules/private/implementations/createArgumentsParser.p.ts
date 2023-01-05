
import * as api from "../api"
import { icreateTestParametersParser } from "./createTestParametersParser.p"


export const icreateArgumentsParser: api.CcreateArgumentsParser = ($c, $d) => {

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
        null,
        {
            onError: () =>/**/ {
                $d.onError(`arguments error`)
            },
            callback: ($) => {
                $d.callback($)
            },
        }
    )
}
