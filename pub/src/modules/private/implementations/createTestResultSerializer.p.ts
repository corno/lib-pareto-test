import * as pl from 'pareto-core-lib'

import * as api from "../api"

import * as mpublic from "../../public"

export const $$: api.CcreateTestResultSerializer = (
    $d,
) => {
    return (
        $,
    ) => {
        const red = "\x1b[31m"
        const green = "\x1b[32m"
        const yellow = "\x1b[33m"
        const cyan = "\x1b[36m"
        const reset = "\x1b[0m"

        function serializeTestSetImp(
            $: {
                result: mpublic.TTestSetResult,
                indentation: string,
            },
        ) {
            const indentation = $.indentation
            $.result.elements.forEach(
                (a, b) => $d.sf_isABeforeB({a: a, b: b}),
                ($, key) => {
                    const name = key
                    switch ($.type[0]) {
                        case 'test':
                            pl.cc($.type[1], ($) => {
                                const success = $.success
                                $d.pr_log(`${indentation}${$.success ? green : red}${name}${reset}`)
                                switch ($.type[0]) {
                                    case 'short string':
                                        pl.cc($.type[1], ($) => {
                                            if (success) {
                                            } else {
                                                $d.pr_log(`${indentation}  expected: '${$.expected}'`)
                                                $d.pr_log(`${indentation}  actual:   '${$.actual}'`)
                                            }
                                        })
                                        break
                                    case 'long string':
                                        pl.cc($.type[1], ($) => {
                                            $.parts.forEach(($) => {
                                                const added = $.type[0] === "added"

                                                $d.pr_log(`${indentation}  line ${$.startLineInOriginal}|${$.startLineInChanged}`)
                                                $.lines.forEach(($) => {
                                                    $d.pr_log(`${indentation}    ${added ? "+" : "-"}${$}`)
                                                })
                                            })
                                        })
                                        break
                                    case 'file string':
                                        pl.cc($.type[1], ($) => {
                                            const fileLocation = $.fileLocation
                                            $.parts.forEach(($) => {
                                                const added = $.type[0] === "added"
                                                $d.pr_log(`${indentation}  ${cyan}${fileLocation}${reset}:${yellow}${$.startLineInOriginal}${reset}`)
                                                $.lines.forEach(($) => {
                                                    $d.pr_log(`${indentation}    ${added ? "+" : "-"}${$}`)
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
                                $d.pr_log(`${indentation}${name}`)
                                serializeTestSetImp({
                                    result: $,
                                    indentation: `${indentation}  `,
                                })
                            })
                            break

                        default: pl.au($.type[0])
                    }
                }
            )
        }
        serializeTestSetImp({
            result: $,
            indentation: ``
        })
    }


}