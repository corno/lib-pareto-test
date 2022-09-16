import * as pl from "pareto-core-lib"

import * as api from "../../interface"

export const p_serializeTestResult: api.PSerializeTestResult = (
    $,
    $i,
    $d,
) => {
    const red = "\x1b[31m"
    const green = "\x1b[32m"
    const yellow = "\x1b[33m"
    const cyan = "\x1b[36m"
    const reset = "\x1b[0m"

    function serializeTestSetImp(
        $: {
            result: api.TTestSetResult,
            indentation: string,
        },
    ) {
        const indentation = $.indentation
        $d.sortedForEach(
            $.result.elements,
            ($) => {
                const name = $.key
                switch ($.value.type[0]) {
                    case "test":
                        pl.cc($.value.type[1], ($) => {
                            const success = $.success
                            $i.log(`${indentation}${$.success ? green : red}${name}${reset}`)
                            switch ($.type[0]) {
                                case "simple string":
                                    pl.cc($.type[1], ($) => {
                                        if (success) {
                                        } else {
                                            $i.log(`${indentation}  expected: '${$.expected}'`)
                                            $i.log(`${indentation}  actual:   '${$.actual}'`)
                                        }
                                    })
                                    break
                                case "large string":
                                    pl.cc($.type[1], ($) => {
                                        $.parts.forEach(($) => {
                                            const added = $.type[0] === "added"

                                            $i.log(`${indentation}  line ${$.startLineInOriginal}|${$.startLineInChanged}`)
                                            $.lines.forEach(($) => {
                                                $i.log(`${indentation}    ${added ? "+" : "-"}${$}`)
                                            })
                                        })
                                    })
                                    break
                                case "file string":
                                    pl.cc($.type[1], ($) => {
                                        const fileLocation = $.fileLocation
                                        $.parts.forEach(($) => {
                                            const added = $.type[0] === "added"
                                            $i.log(`${indentation}  ${cyan}${fileLocation}${reset}:${yellow}${$.startLineInOriginal}${reset}`)
                                            $.lines.forEach(($) => {
                                                $i.log(`${indentation}    ${added ? "+" : "-"}${$}`)
                                            })
                                        })
                                    })
                                    break
                                case "boolean":
                                    pl.cc($.type[1], ($) => {
                                    })
                                    break

                                default: pl.au($.type[0])
                            }
                        })
                        break
                    case "subset":
                        pl.cc($.value.type[1], ($) => {
                            $i.log(`${indentation}${name}`)
                            serializeTestSetImp({
                                result: $,
                                indentation: `${indentation}  `,
                            })
                        })
                        break

                    default: pl.au($.value.type[0])
                }
            })
    }
    serializeTestSetImp({
        result: $.testResult,
        indentation: ``
    })
}
