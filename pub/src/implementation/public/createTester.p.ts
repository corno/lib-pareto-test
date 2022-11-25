
import * as api from "../../api"

export const f_createTester: api.FCreateTester = (
    $d,
    $a,
) => {
    const dependencies = $d
    return ($, $i) => {

        $a(
            dependencies.runTests($),
            ($) => {
                dependencies.serializeTestResult(
                    {
                        testResult: $,
                    },
                    {
                        log: $i.out
                    },
                )
                const summary = dependencies.summarize(
                    $,
                )
                dependencies.serializeSummary(
                    {
                        summary: summary,
                    },
                    {
                        log: $i.out
                    },
                )
                if (dependencies.isZero(summary.numberOfErrors)) {
                    //
                } else {
                    $i.onTestErrors(null)
                }
            }
        )

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
    }

}