import * as pl from "pareto-core-lib"
import * as fp from "lib-fountain-pen"
import * as coll from "res-pareto-collation"
import { Glossary, Type } from "../../glossary/types.p"

const compare = (a: string, b: string) => coll.$a.localeIsABeforeB({ a: a, b: b })

type Serialize = ($: Glossary) => void

export function createSerializer($d: {
    block: fp.IBlock,
    isABeforeB: coll.FIsABeforeB,
}): Serialize {
    function serializeType($: Type, $i: fp.ILine) {
        switch ($[0]) {
            case "array":
                pl.cc($[1], ($) => {
                    $i.snippet(`pt.Array<`)
                    serializeType($, $i)
                    $i.snippet(`>`)
                })
                break
            case "boolean":
                pl.cc($[1], ($) => {
                    $i.snippet(`boolean`)
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
                                $i.snippet(`,`)
                            })
                        })
                    })
                    $i.snippet(`}`)
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
                    $i.snippet(`${$.context === undefined ? "" : `${$.context}.`}T${$.type}`)
                })
                break
            case "string":
                pl.cc($[1], ($) => {
                    $i.snippet(`string`)
                })
                break
            case "taggedUnion":
                pl.cc($[1], ($) => {
                    $i.indent(($i) => {
                        $.forEach((a, b) => coll.$a.localeIsABeforeB({ a: a, b: b }), ($, key) => {
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
    const $i = $d.block
    return ($) => {
        $i.line(($i) => {
            $i.snippet(`import * as pt from "pareto-core-types"`)
        })
        $.imports.forEach(compare, ($, key) => {
            $i.line(($i) => {
                $i.snippet(`import * as ${key} from "${$}"`)
            })
        })
        $.types.forEach(compare, ($, key) => {
            $i.line(($i) => {
            })
            $i.line(($i) => {
                $i.snippet(`export type T${key} = `)
                serializeType($, $i)
            })
        })
        $.procedures.forEach(compare, ($, key) => {
            $i.line(($i) => {
            })
            $i.line(($i) => {
                $i.snippet(`export type P${key} = ($: `)
                serializeType($.type, $i)
                $i.snippet(`) => void`)
            })
        })
        $.functions.forEach(compare, ($, key) => {
            $i.line(($i) => {
            })
            $i.line(($i) => {
                $i.snippet(`export type ${$.async ? "A" : "F"}${key} = ($: `)
                serializeType($.type, $i)
                $i.snippet(`) => `)
                if ($.async) {
                    serializeType($["return type"], $i)
                } else {
                    $i.snippet(`pt.Async<`)
                    serializeType($["return type"], $i)
                    $i.snippet(`>`)
                }
            })
        })
    }
}

