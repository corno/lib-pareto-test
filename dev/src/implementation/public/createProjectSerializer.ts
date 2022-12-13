import * as pl from "pareto-core-lib"

import { IWriter } from "lib-fountain-pen"
import { FSerializeGlossary } from "./createGlossarySerializer.p"
import { API, LeafType, Project } from "../../glossary/types.p"
import * as coll from "res-pareto-collation"
import * as fp from "lib-fountain-pen"


export function serializeProject(
    $: Project,
    $i: IWriter,
    $d: {
        serializeGlossary: FSerializeGlossary,
        compare: coll.FIsABeforeB,
    },
) {

    const compare = (a: string, b: string) => $d.compare({ a: a, b: b })


    function tsConfig($i: IWriter) {

        $i.createFile("tsconfig.json", ($i) => {
            $i.literal(`{`)
            $i.literal(`  "compilerOptions": {`)
            $i.literal(`    "noLib": true,`)
            $i.literal(`    "target": "ES2015",`)
            $i.literal(`    "module": "commonjs",`)
            $i.literal(`    "declaration": true,`)
            $i.literal(`    "outDir": "./dist",`)
            $i.literal(`    "rootDir": "./src",`)
            $i.literal(`    "strict": true,`)
            $i.literal(`    "esModuleInterop": true,`)
            $i.literal(`    "forceConsistentCasingInFileNames": true`)
            $i.literal(`  },`)
            $i.literal(`  "include": [`)
            $i.literal(`    "./src"`)
            $i.literal(`  ]`)
            $i.literal(`}`)
        })
    }
    function globals($i: IWriter) {
        $i.createFile("_globals.ts", ($i) => {
            $i.literal(`interface Array<T> {`)
            $i.literal(`    [n: number]: T`)
            $i.literal(`}`)
            $i.literal(`interface Boolean { }`)
            $i.literal(`interface CallableFunction { }`)
            $i.literal(`interface Function { }`)
            $i.literal(`interface IArguments { }`)
            $i.literal(`interface NewableFunction { }`)
            $i.literal(`interface Number { }`)
            $i.literal(`interface Object { }`)
            $i.literal(`interface RegExp { }`)
            $i.literal(`interface String { }`)
            $i.literal(``)
        })
    }
    function api($: API, $i: IWriter) {

        $i.createFile("types.generated.ts", ($i) => {
            $d.serializeGlossary($.glossary, $i)
        })
        $i.createFile("api.generated.ts", ($i) => {
            $i.literal(`import * as pt from "pareto-core-types"`)
            $i.literal(``)
            $i.literal(`import * as glo from "./types.generated"`)
            $i.literal(``)
            $.api.forEach(compare, ($, key) => {
                $i.line(($i) => {
                    $i.snippet(`export type C${key} = `)
                    switch ($[0]) {
                        case "constructor":
                            pl.cc($[1], ($) => {
                                $i.snippet(`($: `)
                                serializeLeafType($.data, $i)
                                $i.snippet(`, $d: {`)
                                $i.indent(($i) => {
                                    $.dependencies.forEach(compare, ($, key) => {
                                        $i.line(($i) => {
                                            $i.snippet(`"${key}": `)
                                            switch ($[0]) {
                                                case "function":
                                                    pl.cc($[1], ($) => {
                                                        $i.snippet(`glo.F${$}`)
                                                    })
                                                    break
                                                case "procedure":
                                                    pl.cc($[1], ($) => {
                                                        $i.snippet(`glo.P${$}`)
                                                    })
                                                    break
                                                default: pl.au($[0])
                                            }
                                        })
                                    })
                                })

                                $i.snippet(`}) => `)
                                switch ($.result[0]) {
                                    case "function":
                                        pl.cc($.result[1], ($) => {
                                            $i.snippet(`glo.F${$}`)
                                        })
                                        break
                                    case "procedure":
                                        pl.cc($.result[1], ($) => {
                                            $i.snippet(`glo.P${$}`)
                                        })
                                        break
                                    default: pl.au($.result[0])
                                }
                            })
                            break
                        case "function":
                            pl.cc($[1], ($) => {
                                $i.snippet(`glo.F${$}`)
                            })
                            break
                        case "procedure":
                            pl.cc($[1], ($) => {
                                $i.snippet(`glo.P${$}`)
                            })
                            break
                        default: pl.au($[0])
                    }
                })
            })
            $i.literal(``)

            $i.line(($i) => {
                $i.snippet(`export type API = {`)
                $i.indent(($i) => {
                    $.api.forEach(compare, ($, key) => {
                        $i.line(($i) => {
                            $i.snippet(`${key}: C${key}`)
                        })
                    })
                })
                $i.snippet(`}`)
            })
        })
        $i.createFile("index.ts", ($i) => {
            $i.line(($i) => {
                $i.snippet(`export * from "./types.generated"`)
            })
            $i.line(($i) => {
                $i.snippet(`export * from "./creators.generated"`)
            })
            $i.line(($i) => {
                $i.snippet(`export * from "./api.generated"`)
            })
        })
    }
    $i.createDirectory("dev", ($i) => {

        $i.createDirectory("src", ($i) => {
            globals($i)
            $i.createDirectory("bin", ($i) => {

                $i.createFile("generateCode.generated.ts", ($i) => {
                    $i.literal(`import * as pt from "pareto-core-types"`)
                })
            })
        })
        tsConfig($i)
        $i.createFile("package.json", ($i) => {
            $i.literal(`{`)
            $i.literal(`  "dependencies": {`)
            // $i.literal(`    "glo-pareto-common": "^0.1.0",`)
            // $i.literal(`    "lib-pareto-filesystem": "^0.7.0",`)
            $i.literal(`    "pareto-core-lib": "^0.17.0",`)
            $i.literal(`    "pareto-core-raw": "^0.7.0",`)
            $i.literal(`    "pareto-core-state": "^0.12.0",`)
            // $i.literal(`    "res-pareto-arithmetic": "^0.5.0",`)
            // $i.literal(`    "res-pareto-boolean": "^0.7.0",`)
            // $i.literal(`    "res-pareto-collation": "^0.10.0",`)
            // $i.literal(`    "res-pareto-diff": "^0.13.2"`)
            $i.literal(`}`)
        })
    })
    function serializeLeafType($: LeafType, $i: fp.ILine) {
        switch ($[0]) {
            case "boolean":
                pl.cc($[1], ($) => {
                    $i.snippet(`boolean`)
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
                    $i.snippet(`glo.T${$}`)
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
    $i.createDirectory("pub", ($i) => {
        $i.createDirectory("src", ($i) => {
            globals($i)
            $i.createDirectory("api", ($i) => {
                api($.api, $i)
            })
            $i.createDirectory("implementation", ($i) => {
                $i.createDirectory("internal_api", ($i) => {
                    api($.implementation["internal api"], $i)
                })
                $i.createDirectory("public", ($i) => {
                    $.implementation.implementations.filter(($, key) => $.type[0] === "pure" ? $ : undefined).forEach(compare, ($, key) => {
                        $i.createFile(`${key}.ts`, ($i) => {
                            $i.literal(`import * as pt from "pareto-core-types"`)
                            $i.literal(``)
                            $i.line(($i) => {
                                $i.snippet(`import * as api from `)
                                switch ($.definition[0]) {
                                    case "private":
                                        pl.cc($.definition[1], ($) => {
                                            $i.snippet(`"../internal_api"`)
                                        })
                                        break
                                    case "public":
                                        pl.cc($.definition[1], ($) => {
                                            $i.snippet(`"../../api"`)

                                        })
                                        break
                                    default: pl.au($.definition[0])
                                }
                            })
                            $i.literal(`import * as pt from "pareto-core-types"`)


                            $i.literal(``)
                            $i.line(($i) => {
                                $i.snippet(`export const ${key}: `)
                                switch ($.definition[0]) {
                                    case "private":
                                        pl.cc($.definition[1], ($) => {
                                            $i.snippet(`iapi.${$}`)
                                        })
                                        break
                                    case "public":
                                        pl.cc($.definition[1], ($) => {
                                            $i.snippet(`api.${$}`)

                                        })
                                        break
                                    default: pl.au($.definition[0])
                                }
                                $i.snippet(` = () => {}`)
                            })
                        })
                    })
                })
                $i.createFile("index.ts", ($i) => {
                    $i.literal(`import * as api from "../api"`)

                    $i.line(($i) => {
                        $i.snippet(`export const $a: api.API = {`)
                        $i.indent(($i) => {
                            //$.implementation.i
                        })
                        $i.snippet(`}`)
                    })
                })
            })
            $i.createFile("index.ts", ($i) => {
                $i.line(($i) => {
                    $i.snippet(`export * from "./api"`)
                })
                $i.line(($i) => {
                    $i.snippet(`export * from "./implementation"`)
                })
            })
        })
        tsConfig($i)
        $i.createFile("package.json", ($i) => {
            $i.literal(`{`)
            $i.literal(`  "author": "Corno",`)
            $i.literal(`  "dependencies": {`)
            // $i.literal(`    "glo-pareto-common": "^0.1.0",`)
            // $i.literal(`    "lib-pareto-filesystem": "^0.7.0",`)
            $i.literal(`    "pareto-core-lib": "^0.17.0",`)
            $i.literal(`    "pareto-core-raw": "^0.7.0",`)
            $i.literal(`    "pareto-core-state": "^0.12.0",`)
            // $i.literal(`    "res-pareto-arithmetic": "^0.5.0",`)
            // $i.literal(`    "res-pareto-boolean": "^0.7.0",`)
            // $i.literal(`    "res-pareto-collation": "^0.10.0",`)
            // $i.literal(`    "res-pareto-diff": "^0.13.2"`)
            $i.literal(`  },`)
            $i.literal(`  "description": "test functions for pareto",`)
            $i.literal(`  "files": [`)
            $i.literal(`    "dist"`)
            $i.literal(`  ],`)
            $i.literal(`  "license": "ISC",`)
            $i.literal(`  "main": "dist/index.js",`)
            $i.literal(`  "name": "lib-pareto-test",`)
            $i.literal(`  "repository": {`)
            $i.literal(`    "type": "git",`)
            $i.literal(`    "url": "http://github.com/corno/lib-pareto-test.git"`)
            $i.literal(`  },`)
            $i.literal(`  "types": "dist/index.d.ts",`)
            $i.literal(`  "version": "0.11.0",`)
            $i.literal(`  "content-fingerprint": "1309fef786ca077562927878b318fbaf88db3409"`)
            $i.literal(`}`)
        })
    })
    $i.createDirectory("test", ($i) => {

        $i.createDirectory("src", ($i) => {
            globals($i)
            $i.createDirectory("bin", ($i) => {

                $i.createFile("test.generated.ts", ($i) => {
                    $i.literal(`import * as pt from "pareto-core-types"`)
                })
            })
        })
        tsConfig($i)
        $i.createFile("package.json", ($i) => {
            $i.literal(`{`)
            $i.literal(`  "dependencies": {`)
            // $i.literal(`    "glo-pareto-common": "^0.1.0",`)
            // $i.literal(`    "lib-pareto-filesystem": "^0.7.0",`)
            $i.literal(`    "pareto-core-lib": "^0.17.0",`)
            $i.literal(`    "pareto-core-raw": "^0.7.0",`)
            $i.literal(`    "pareto-core-state": "^0.12.0",`)
            // $i.literal(`    "res-pareto-arithmetic": "^0.5.0",`)
            // $i.literal(`    "res-pareto-boolean": "^0.7.0",`)
            // $i.literal(`    "res-pareto-collation": "^0.10.0",`)
            // $i.literal(`    "res-pareto-diff": "^0.13.2"`)
            $i.literal(`}`)
        })
    })

}