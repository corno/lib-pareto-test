import * as pt from "pareto-core-types"
import { CCreateArgumentsParser } from "../creators.p"

const processAsync: <T>($: pt.AsyncValue<T>, $i: ($: T) => void) => void = ($, $i) => $._execute($i)

import * as $$ from "../unbound"

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
    return $$.f_createTestParametersParser(
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
