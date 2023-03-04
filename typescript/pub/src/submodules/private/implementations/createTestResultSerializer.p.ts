import * as pl from 'pareto-core-lib'

import * as gpublic from "../../../main"

import { createTestResultSerializer } from "../definition/api.generated"

export const $$: createTestResultSerializer = (
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
                result: gpublic.T.TestSetResult,
                indentation: string,
            },
        ) {
            const indentation = $.indentation
            $.result.elements.__forEach(
                (a, b) => $d.isABeforeB({a: a, b: b}),
                ($, key) => {
                    const name = key
                    switch ($.type[0]) {
                        case 'test':
                            pl.cc($.type[1], ($) => {
                                const success = $.success
                                $d.log(`${indentation}${$.success ? green : red}${name}${reset}`)
                                switch ($.type[0]) {
                                    case 'short string':
                                        pl.cc($.type[1], ($) => {
                                            if (success) {
                                            } else {
                                                $d.log(`${indentation}  expected: '${$.expected}'`)
                                                $d.log(`${indentation}  actual:   '${$.actual}'`)
                                            }
                                        })
                                        break
                                    case 'long string':
                                        pl.cc($.type[1], ($) => {
                                            $.parts.__forEach(($) => {
                                                const added = $.type[0] === "added"

                                                $d.log(`${indentation}  line ${$.startLineInOriginal}|${$.startLineInChanged}`)
                                                $.lines.__forEach(($) => {
                                                    $d.log(`${indentation}    ${added ? "+" : "-"}${$}`)
                                                })
                                            })
                                        })
                                        break
                                    case 'file string':
                                        pl.cc($.type[1], ($) => {
                                            const fileLocation = $.fileLocation
                                            $.parts.__forEach(($) => {
                                                const added = $.type[0] === "added"
                                                $d.log(`${indentation}  ${cyan}${fileLocation}${reset}:${yellow}${$.startLineInOriginal}${reset}`)
                                                $.lines.__forEach(($) => {
                                                    $d.log(`${indentation}    ${added ? "+" : "-"}${$}`)
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
                                $d.log(`${indentation}${name}`)
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