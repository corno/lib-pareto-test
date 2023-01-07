import * as pl from "pareto-core-lib"

import * as api from "../api"

import * as fp from "lib-fountain-pen"

export const createGlossarySerializer: api.CCreateGlossarySerializer = ($, $d) => {
    const compare = (a: string, b: string) => $d.isABeforeB({ a: a, b: b })

    function serializeLeafType($: api.TLeafType, $i: fp.ILine) {
        switch ($[0]) {
            case "boolean":
                pl.cc($[1], ($) => {
                    $i.snippet(`boolean`)
                })
                break
            case "external reference":
                pl.cc($[1], ($) => {
                    $i.snippet(`m${$.context}.T${$.type}`)
                })
                break
            case "null":
                pl.cc($[1], ($) => {
                    $i.snippet(`null`)
                })
                break
            case "number":
                pl.cc($[1], ($) => {
                    $i.snippet(`number`)
                })
                break
            case "reference":
                pl.cc($[1], ($) => {
                    $i.snippet(`T${$}`)
                })
                break
            case "string":
                pl.cc($[1], ($) => {
                    $i.snippet(`string`)
                })
                break
            default: pl.au($[0])
        }
    }
    function serializeType($: api.TType, $i: fp.ILine) {
        switch ($[0]) {
            case "array":
                pl.cc($[1], ($) => {
                    $i.snippet(`pt.Array<`)
                    serializeType($, $i)
                    $i.snippet(`>`)
                })
                break
            case "leaf":
                pl.cc($[1], ($) => {
                    serializeLeafType($, $i)
                })
                break
            case "dictionary":
                pl.cc($[1], ($) => {
                    $i.snippet(`pt.Dictionary<`)
                    serializeType($, $i)
                    $i.snippet(`>`)
                })
                break
            case "group":
                pl.cc($[1], ($) => {
                    $i.snippet(`{`)
                    $i.indent(($i) => {
                        $.forEach(compare, ($, key) => {
                            $i.line(($i) => {
                                $i.snippet(`readonly "${key}": `)
                                serializeType($, $i)
                            })
                        })
                    })
                    $i.snippet(`}`)
                })
                break
            case "taggedUnion":
                pl.cc($[1], ($) => {
                    $i.indent(($i) => {
                        $.forEach(compare, ($, key) => {
                            $i.line(($i) => {
                                $i.snippet(`| [ "${key}", `)
                                serializeType($, $i)
                                $i.snippet(` ]`)
                            })
                        })
                    })
                })
                break
            default: pl.au($[0])
        }
    }
    return ($, $i) => {
        $i.line(($i) => {
            $i.snippet(`import * as pt from "pareto-core-types"`)
        })
        $.imports.forEach(compare, ($, key) => {
            $i.line(($i) => {
                $i.snippet(`import * as m${key} from "${$}"`)
            })
        })
        $.types.forEach(compare, ($, key) => {
            $i.literal(``)
            $i.line(($i) => {
                $i.snippet(`export type T${key} = `)
                serializeType($, $i)
            })
        })
        // $.procedures.forEach(compare, ($, key) => {
        //     $i.literal(``)
        //     $i.line(($i) => {
        //         $i.snippet(`export type P${key} = ($: `)
        //         serializeLeafType($.data, $i)
        //         $i.snippet(`) => void`)
        //     })
        // })
        $.functions.forEach(compare, ($, key) => {
            $i.literal(``)
            $i.line(($i) => {
                $i.snippet(`export type ${$.async ? "A" : "F"}${key} = ($: `)
                serializeLeafType($.data, $i)
                $i.snippet(`) => `)
                if ($.async) {
                    $i.snippet(`pt.AsyncValue<`)
                    serializeLeafType($["return value"], $i)
                    $i.snippet(`>`)
                } else {
                    serializeLeafType($["return value"], $i)
                }
            })
        })
    }
}
