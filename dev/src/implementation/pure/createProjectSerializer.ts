import * as pl from "pareto-core-lib"

import { ILine, IWriter } from "lib-fountain-pen"
import { FSerializeGlossary } from "./createGlossarySerializer.p"
import { NAPI } from "../../glossary/api/types.p"
import { NGlossary } from "../../glossary/glossary/types.p"
import { NProject } from "../../glossary/project/types.p"
import * as coll from "res-pareto-collation"
import * as fp from "lib-fountain-pen"


function serializeAlgorithmReference($: NAPI.AlgorithmReference, $i: ILine) {

    if ($.context !== undefined) {
        pl.cc($.context, ($) => {
            switch ($[0]) {
                // case "api":
                //     pl.cc($[1], ($) => {
                //         $i.snippet(`api`)
                //     })
                //     break
                case "import":
                    pl.cc($[1], ($) => {
                        $i.snippet(`m${$}`)
                    })
                    break
                case "local":
                    pl.cc($[1], ($) => {
                        $i.snippet(`glo`)
                    })
                    break
                default: pl.au($[0])
            }

        })
    }
    pl.cc($.type, ($) => {
        switch ($[0]) {
            case "function":
                pl.cc($[1], ($) => {
                    $i.snippet(`F`)
                })
                break
            case "procedure":
                pl.cc($[1], ($) => {
                    $i.snippet(`P`)
                })
                break
            default: pl.au($[0])
        }
    })
    $i.snippet(`${$.algorithm}`)
}

export function serializeLeafType($: NGlossary.LeafType, $i: fp.ILine) {
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
        case "external reference":
            pl.cc($[1], ($) => {
                $i.snippet(`${$.context}.T${$}`)
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

export type PSerializeConstructor = ($: NAPI.Constructor, $i: ILine) => void
export type CCreateConstructorSerializer = ($d: {
    compare: coll.FIsABeforeB,
}) => PSerializeConstructor

export const createConstructorSerializer: CCreateConstructorSerializer = (
    $d
) => {
    const compare = (a: string, b: string) => $d.compare({ a: a, b: b })


    return ($, $i) => {

        $i.snippet(`($: `)
        serializeLeafType($.data, $i)
        $i.snippet(`, $d: {`)
        $i.indent(($i) => {
            $.dependencies.forEach(compare, ($, key) => {
                $i.line(($i) => {
                    $i.snippet(`"${key}": `)
                    serializeAlgorithmReference($, $i)
                })
            })
        })

        $i.snippet(`}) => `)
        serializeAlgorithmReference($.result, $i)
    }
}

export function serializeProject(
    $: NProject.Project,
    $i: IWriter,
    $d: {
        serializeGlossary: FSerializeGlossary,
        serializeConstructor: PSerializeConstructor
        compare: coll.FIsABeforeB,
    },
) {


    const compare = (a: string, b: string) => $d.compare({ a: a, b: b })


    function serializeAlgorithmDefinition($: NAPI.AlgorithmDefinition, $i: ILine) {

        switch ($[0]) {
            case "constructor":
                pl.cc($[1], ($) => {
                    $d.serializeConstructor($, $i)
                })
                break
            case "algorithm":
                pl.cc($[1], ($) => {
                    serializeAlgorithmReference($, $i)

                })
                break
            default: pl.au($[0])
        }
    }
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
    function glossary($: NGlossary.Glossary, $i: IWriter) {
        $i.createFile("types.generated.ts", ($i) => {
            $d.serializeGlossary($, $i)
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
    $i.createDirectory("pub", ($i) => {
        $i.createDirectory("src", ($i) => {
            globals($i)
            function moduleDefintion($: NAPI.ModuleDefinition, $i: IWriter) {
                glossary($.glossary, $i)
                $i.createFile("api.generated.ts", ($i) => {
                    $i.literal(`import * as pt from "pareto-core-types"`)
                    $i.literal(``)
                    $i.literal(`import * as glo from "./types.generated"`)
                    $i.literal(``)
                    $.api.forEach(compare, ($, key) => {
                        $i.line(($i) => {
                            $i.snippet(`export type C${key} = `)
                            serializeAlgorithmDefinition($, $i)
                        })
                    })
                    $i.literal(``)

                    $i.line(($i) => {
                        $i.snippet(`export type API = {`)
                        $i.indent(($i) => {
                            $.api.forEach(compare, ($, key) => {
                                $i.literal(`${key}: C${key}`)
                            })
                        })
                        $i.snippet(`}`)
                    })
                })
                $i.createFile("index.ts", ($i) => {
                    $i.literal(`export * from "./types.generated"`)
                    $i.literal(`export * from "./api.generated"`)
                })
            }
            $i.createDirectory("api", ($i) => {

                moduleDefintion($.api, $i)
            })
            $i.createDirectory("implementation", ($i) => {

                $i.createDirectory("private_definitions", ($i) => {
                    moduleDefintion($["private definitions"], $i)
                })
                function implementations($: NProject.Implementation, $i: IWriter) {
                    $i.createDirectory("pure", ($i) => {
                        $.filter(($, key) => $.type[0] === "pure" ? $ : undefined).forEach(compare, ($, key) => {
                            $i.createFile(`${key}.p.ts`, ($i) => {
                                $i.literal(`import * as pt from "pareto-core-types"`)
                                $i.literal(``)
                                $i.literal(`import * as id from "./implementationDeclarations"`)
                                $i.literal(``)

                                $i.literal(``)
                                $i.line(($i) => {
                                    $i.snippet(`export const i${key}: id.I${key}`)
                                    $i.snippet(` = ($c, $d) => {`)
                                    $i.indent(($i) => {
                                        $i.line(($i) => {
                                            $i.snippet(`return ($) => {`)
                                            $i.indent(($i) => {
                                                $i.line(($i) => {
                                                    $i.snippet(`//implement me`)
                                                })
                                            })
                                            $i.snippet(`}`)
                                        })
                                    })
                                    $i.snippet(`}`)
                                })
                            })
                        })
                    })
                    $i.createDirectory("binding", ($i) => {
                        $.filter(($, key) => $.type[0] === "binding" ? $ : undefined).forEach(compare, ($, key) => {
                            $i.createFile(`${key}.p.ts`, ($i) => {
                                $i.literal(`import * as pt from "pareto-core-types"`)
                                $i.literal(``)
                                $i.literal(`import * as id from "./implementationDeclarations"`)
                                $i.literal(``)

                                $i.literal(``)
                                $i.line(($i) => {
                                    $i.snippet(`export const i${key}: id.I${key}`)
                                    $i.snippet(` = ($c, $d) => {`)
                                    $i.indent(($i) => {
                                        $i.line(($i) => {
                                            $i.snippet(`return ($) => {`)
                                            $i.indent(($i) => {
                                                $i.line(($i) => {
                                                    $i.snippet(`//implement me`)
                                                })
                                            })
                                            $i.snippet(`}`)
                                        })
                                    })
                                    $i.snippet(`}`)
                                })
                            })
                        })
                    })
                    $i.createFile("index.ts", ($i) => {
                        $.forEach(compare, ($, key) => {
                            $i.literal(`import { i${key} } from "./${$.type[0] === "binding" ? "binding" : "pure"}/${key}.p"`)
                        })
                        $i.literal(``)
                        $i.line(($i) => {
                            $i.snippet(`export const $a = {`)
                            $i.indent(($i) => {
                                $.forEach(compare, ($, key) => {
                                    $i.literal(`"${key}": i${key},`)
                                })
                            })
                            $i.snippet(`}`)
                        })
                    })

                }
                $i.createDirectory("private", ($i) => {
                    implementations($["private implementations"], $i)
                })
                $i.createDirectory("public", ($i) => {
                    implementations($["public implementations"], $i)
                })
                // $i.createFile("implementationDeclarations.ts", ($i) => {
                //     $i.literal(`import * as glo from "./internal_glossary"`)
                //     $i.literal(`import * as api from "../api"`)
                //     $i.literal(``)
                //     $.implementation.implementations.forEach(compare, ($, key) => {
                //         $i.line(($i) => {
                //             $i.snippet(`export type I${key} = `)
                //             serializeAlgorithmDefinition($.definition, $i)
                //         })
                //     })
                // })
                $i.createFile("index.ts", ($i) => {
                    $i.literal(`export * from "./private_definitions"`)
                    $i.literal(`export { $a as $x } from "./private"`)
                    $i.literal(`export * from "./public"`)

                    $i.literal(``)
                    // $.implementation.implementations.forEach(compare, ($, key) => {

                    //     $i.literal(`import { i${key} } from "./${$.type[0] === "binding" ? "binding" : "pure"}/${key}.p"`)
                    // })
                    // $i.line(($i) => {
                    //     $i.snippet(`export const $x = {`)
                    //     $i.indent(($i) => {
                    //         $.implementation.implementations.forEach(compare, ($, key) => {
                    //             $i.literal(`"${key}": i${key},`)
                    //         })
                    //         //$.implementation.i
                    //     })
                    //     $i.snippet(`}`)
                    // })

                    // $i.line(($i) => {
                    //     $i.snippet(`export const $a: api.API = {`)
                    //     $i.indent(($i) => {
                    //         $.implementation["api mapping"].forEach(compare, ($, key) => {
                    //             $i.line(($i) => {
                    //                 $i.snippet(`"${key}": i${$},`)
                    //             })
                    //         })
                    //         //$.implementation.i
                    //     })
                    //     $i.snippet(`}`)
                    // })
                })
            })
            $i.createFile("index.ts", ($i) => {
                $i.literal(`export * from "./api"`)
                $i.literal(`export * from "./implementation"`)
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