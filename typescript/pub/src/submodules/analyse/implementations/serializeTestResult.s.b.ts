import * as pl from 'pareto-core-lib'

import * as g_main from "../../../main"

import { A } from "../api.generated"

export const $$: A.serializeTestResult = (
    $d,
) => {
    return ($, $i) => {

        const red = "\x1b[31m"
        const green = "\x1b[32m"
        const yellow = "\x1b[33m"
        const cyan = "\x1b[36m"
        const reset = "\x1b[0m"

        function serializeTestSetImp(
            $: {
                result: g_main.T.TestSetResult,
                indentation: string,
            },
        ) {
            const indentation = $.indentation
            $d.dictionaryForEach($.result.elements, ($) => {
                const name = $.key
                pl.cc($.value, ($) => {

                    switch ($.type[0]) {
                        case 'test':
                            pl.cc($.type[1], ($) => {
                                const success = $.success
                                $i(`${indentation}${$.success ? green : red}${name}${reset}`)
                                switch ($.type[0]) {
                                    case 'short string':
                                        pl.cc($.type[1], ($) => {
                                            if (success) {
                                            } else {
                                                $i(`${indentation}  expected: '${$.expected}'`)
                                                $i(`${indentation}  actual:   '${$.actual}'`)
                                            }
                                        })
                                        break
                                    case 'long string':
                                        pl.cc($.type[1], ($) => {
                                            $.parts.__forEach(($) => {
                                                const added = $.type[0] === "added"

                                                $i(`${indentation}  line ${$.startLineInOriginal}|${$.startLineInChanged}`)
                                                $.lines.__forEach(($) => {
                                                    $i(`${indentation}    ${added ? "+" : "-"}${$}`)
                                                })
                                            })
                                        })
                                        break
                                    case 'file string':
                                        pl.cc($.type[1], ($) => {
                                            const fileLocation = $.fileLocation
                                            $.parts.__forEach(($) => {
                                                const added = $.type[0] === "added"
                                                $i(`${indentation}  ${cyan}${fileLocation}${reset}:${yellow}${$.startLineInOriginal}${reset}`)
                                                $.lines.__forEach(($) => {
                                                    $i(`${indentation}    ${added ? "+" : "-"}${$}`)
                                                })
                                            })
                                        })
                                        break
                                    case 'boolean':
                                        pl.cc($.type[1], ($) => {
                                        })
                                        break

                                    default: pl.au($.type[0])
                                }
                            })
                            break
                        case 'subset':
                            pl.cc($.type[1], ($) => {
                                $i(`${indentation}${name}`)
                                serializeTestSetImp({
                                    result: $,
                                    indentation: `${indentation}  `,
                                })
                            })
                            break

                        default: pl.au($.type[0])
                    }
                })
            })
        }
        serializeTestSetImp({
            result: $,
            indentation: ``
        })
    }

}