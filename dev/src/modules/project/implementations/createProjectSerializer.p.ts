import * as pl from "pareto-core-lib"

import * as api from "../api"

import * as mapi from "../../api"
import * as mglossary from "../../glossary"
import * as mfp from "lib-fountain-pen"


export const createProjectSerializer: api.CcreateProjectSerializer = (
    $,
    $d,
) => {
    return ($, $i) => {

        const compare = (a: string, b: string) => $d.compare({ a: a, b: b })


        function serializeAlgorithmDefinition($: mapi.TAlgorithmDefinition, $i: mfp.ILine) {

            switch ($[0]) {
                case "constructor":
                    pl.cc($[1], ($) => {
                        $d.serializeConstructor($, $i)
                    })
                    break
                case "algorithm":
                    pl.cc($[1], ($) => {
                        $d.serializeAlgorithmReference($, $i)

                    })
                    break
                default: pl.au($[0])
            }
        }
        function tsConfig($i: mfp.IWriter) {

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
        function globals($i: mfp.IWriter) {
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
        function glossary($: mglossary.TGlossary, $i: mfp.IWriter) {
            $i.createFile("types.generated.ts", ($i) => {
                $d.serializeGlossary($, $i)
            })
        }
        $i.createDirectory("dev", ($i) => {

            $i.createDirectory("src", ($i) => {
                globals($i)
                $i.createDirectory("bin", ($i) => {

                    $i.createFile("generateCode.generated.ts", ($i) => {
                        $i.literal(`import * as exe from "pareto-core-exe"`)
                        $i.literal(`import { main } from "../modules/main/implementations/main"`)
                        $i.literal(``)
                        $i.literal(`exe.runProgram(main)`)





                    })
                })
            })
            tsConfig($i)
        })
        $i.createDirectory("pub", ($i) => {
            $i.createDirectory("src", ($i) => {
                globals($i)
                function moduleDefintion($: mapi.TModuleDefinition, $i: mfp.IWriter) {
                    glossary($.glossary, $i)
                    $i.createFile("api.generated.ts", ($i) => {
                        $i.literal(`import * as pt from "pareto-core-types"`)
                        $i.literal(``)
                        $i.literal(`import * as glo from "./types.generated"`)
                        $i.literal(``)
                        $.api.imports.forEach(compare, ($, key) => {
                            $i.line(($i) => {
                                $i.snippet(`import * as m${key} from "${$}"`)
                            })
                        })
                        $.api.algorithms.forEach(compare, ($, key) => {
                            $i.literal(``)
                            $i.line(($i) => {
                                $i.snippet(`export type C${key} = `)
                                serializeAlgorithmDefinition($, $i)
                            })
                        })
                        $i.literal(``)
                        $i.line(($i) => {
                            $i.snippet(`export type API = {`)
                            $i.indent(($i) => {
                                $.api.algorithms.forEach(compare, ($, key) => {
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
                $i.createDirectory("modules", ($i) => {
                    $.modules.forEach(compare, ($, key) => {
                        $i.createDirectory(`${key}`, ($i) => {
                            $i.createDirectory(`api`, ($i) => {
                                moduleDefintion($.definition, $i)
                            })

                            // $.definition.api.algorithms.forEach(compare, ($, key) => {
                            //     $i.createDirectory(`${key}`, ($i) => {

                            //     })
                            // })
                            $i.createFile("index.ts", ($i) => {
                                $.definition.api.algorithms.forEach(compare, ($, key) => {
                                    $i.literal(`import { i${key} } from "./implementations/${key}.p"`)
                                })
                                $i.literal(``)
                                $i.literal(`export * from "./api"`)
                                $i.literal(``)
                                $i.line(($i) => {

                                    $i.snippet(`export const $a = {`)
                                    $i.indent(($i) => {

                                        $.definition.api.algorithms.forEach(compare, ($, key) => {
                                            $i.literal(`"${key}": i${key},`)
                                        })
                                    })
                                    $i.snippet(`}`)
                                })

                            })
                        })

                    })
                })
                // $i.createDirectory("implementation", ($i) => {

                //     // $i.createDirectory("private_definitions", ($i) => {
                //     //     moduleDefintion($["private definitions"], $i)
                //     // })
                //     // function implementations($: NProject.Implementation, $i: IWriter) {
                //     //     $i.createFile("index.ts", ($i) => {
                //     //         $.forEach(compare, ($, key) => {
                //     //             $i.literal(`import { i${key} } from "./${$.type[0] === "binding" ? "binding" : "pure"}/${key}.p"`)
                //     //         })
                //     //         $i.literal(``)
                //     //         $i.line(($i) => {
                //     //             $i.snippet(`export const $a = {`)
                //     //             $i.indent(($i) => {
                //     //                 $.forEach(compare, ($, key) => {
                //     //                     $i.literal(`"${key}": i${key},`)
                //     //                 })
                //     //             })
                //     //             $i.snippet(`}`)
                //     //         })
                //     //     })

                //     // }
                //     // $i.createDirectory("private", ($i) => {
                //     //     implementations($["private implementations"], $i)
                //     // })
                //     // $i.createDirectory("public", ($i) => {
                //     //     implementations($["public implementations"], $i)
                //     // })




                //     // $i.createFile("implementationDeclarations.ts", ($i) => {
                //     //     $i.literal(`import * as glo from "./internal_glossary"`)
                //     //     $i.literal(`import * as api from "../api"`)
                //     //     $i.literal(``)
                //     //     $.implementation.implementations.forEach(compare, ($, key) => {
                //     //         $i.line(($i) => {
                //     //             $i.snippet(`export type I${key} = `)
                //     //             serializeAlgorithmDefinition($.definition, $i)
                //     //         })
                //     //     })
                //     // })
                //     $i.createFile("index.ts", ($i) => {
                //         $i.literal(`export * from "./private_definitions"`)
                //         $i.literal(`export { $a as $x } from "./private"`)
                //         $i.literal(`export * from "./public"`)

                //         $i.literal(``)
                //     })
                // })
                $i.createFile("index.ts", ($i) => {
                    $i.literal(`export { $a } from "./modules/${$.main}"`)
                })
            })
            tsConfig($i)
        })
        $i.createDirectory("test", ($i) => {

            $i.createDirectory("src", ($i) => {
                globals($i)
                $i.createDirectory("bin", ($i) => {

                    $i.createFile("test.generated.ts", ($i) => {
                        $i.literal(`#!/usr/bin/env node`)
                        $i.literal(``)
                        $i.literal(`import * as pe from "pareto-core-exe"`)
                        $i.literal(`import * as pl from "pareto-core-lib"`)
                        $i.literal(`import * as test from "lib-pareto-test"`)
                        $i.literal(``)
                        $i.literal(`import { dependencies } from "../dependencies/dependencies.p"`)
                        $i.literal(`import { data } from "../data/data.p"`)
                        $i.literal(`import { createGetTestset } from "../implementation"`)
                        $i.literal(``)
                        $i.literal(`pe.runProgram(`)
                        $i.literal(`    ($) => {`)
                        $i.literal(`        test.$b.createTestProgram(`)
                        $i.literal(`            {`)
                        $i.literal(`                getTestSet: createGetTestset(`)
                        $i.literal(`                    data,`)
                        $i.literal(`                    dependencies`)
                        $i.literal(`                ),`)
                        $i.literal(`                log: ($) => {`)
                        $i.literal(`                    pl.logDebugMessage($)`)
                        $i.literal(`                },`)
                        $i.literal(`                logError: ($) => {`)
                        $i.literal(`                    pl.logDebugMessage($)`)
                        $i.literal(`                },`)
                        $i.literal(`                onTestErrors: ($) => {`)
                        $i.literal(`                    pl.logDebugMessage("TEST ERROR")`)
                        $i.literal(`                },`)
                        $i.literal(`            },`)
                        $i.literal(`        )(`)
                        $i.literal(`           $.arguments`)
                        $i.literal(`        )`)
                        $i.literal(`    }`)
                        $i.literal(`)`)
                    })
                    $i.createFile("testXXXXX.generated.ts", ($i) => {
                        $i.literal(`import * as pt from "pareto-core-types"`)
                        $i.literal(`import * as pr from "pareto-core-raw"`)
                        $i.literal(`import * as pl from "pareto-core-lib"`)
                        $i.literal(``)

                        $.modules.forEach(compare, ($, key) => {
                            const moduleName = key
                            $.definition.api.algorithms.forEach(compare, ($, key) => {
                                $i.line(($i) => {
                                    $i.snippet(`import { test as ${moduleName}_${key} } from "../modules/${moduleName}/${key}.p"`)
                                })
                            })
                        })
                        $i.literal(``)
                        $i.line(($i) => {
                            $i.snippet(`const x = pr.wrapRawDictionary({`)
                            $i.indent(($i) => {
                                $.modules.forEach(compare, ($, key) => {
                                    const moduleName = key
                                    $i.line(($i) => {
                                        $i.snippet(`"${key}": pr.wrapRawDictionary({`)
                                        $i.indent(($i) => {
                                            $.definition.api.algorithms.forEach(compare, ($, key) => {
                                                $i.line(($i) => {
                                                    $i.snippet(`"${key}": ${moduleName}_${key},`)
                                                })
                                            })
                                        })
                                        $i.snippet(`}),`)
                                    })
                                })
                            })
                            $i.snippet(`}).asyncMap(($, key) => $.asyncMap(($, key) => $()))`)
                        })
                    })
                })
                $i.createDirectory("modules", ($i) => {

                    $.modules.forEach(compare, ($, key) => {
                        const moduleName = key

                        $i.createDirectory(key, ($i) => {
                            const def = $.definition
                            $.definition.api.algorithms.forEach(compare, ($, key) => {
                                // $i.createFile(`${key}_tmp.p.ts`, ($i) => {
                                //     $i.literal(`import * as pt from "pareto-core-types"`)
                                //     $i.literal(`import * as pl from "pareto-core-lib"`)
                                //     $i.literal(``)
                                //     $i.literal(`import * as tst from "lib-pareto-test"`)

                                //     $i.literal(``)
                                //     def.api.imports.forEach(compare, ($, key) => {
                                //         $i.literal(`import * as m${key} from "${$}"`)
                                //     })
                                //     $i.line(($i) => {
                                //         $i.snippet(`export type XX = `)
                                //         $i.indent(($i) => {
                                //             switch ($[0]) {
                                //                 case "algorithm":
                                //                     pl.cc($[1], ($) => {

                                //                     })
                                //                     break
                                //                 case "constructor":
                                //                     pl.cc($[1], ($) => {
                                //                         $.dependencies.forEach(compare, ($, key) => {
                                //                             $i.line(($i) => {
                                //                                 $i.snippet(`| [ "${key}", `)
                                //                                 switch ($.type[0]) {
                                //                                     case "function":
                                //                                         pl.cc($.type[1], ($) => {
                                //                                             if ($.context !== undefined) {
                                //                                                 switch ($.context[0]) {
                                //                                                     case "import":
                                //                                                         pl.cc($.context[1], ($) => {

                                //                                                         })
                                //                                                         break
                                //                                                     case "local":
                                //                                                         pl.cc($.context[1], ($) => {

                                //                                                         })
                                //                                                         break
                                //                                                     default: pl.au($.context[0])
                                //                                                 }
                                //                                             } else {
                                                                                
                                //                                             }
                                //                                             $i.snippet(`string/*FIXME*/`)
                                //                                         })
                                //                                         break
                                //                                     case "procedure":
                                //                                         pl.cc($.type[1], ($) => {
                                //                                             $d.serializeLeafType($, $i)
                                //                                         })
                                //                                         break
                                //                                     default: pl.au($.type[0])
                                //                                 }
                                //                                 $i.snippet(` ]`)
                                //                             })
                                //                         })
                                //                     })
                                //                     break
                                //                 default: pl.au($[0])
                                //             }
                                //         })
                                //         $i.snippet(`}`)
                                //     })
                                //     $i.literal(``)

                                // })
                                $i.createFile(`${key}.p.ts`, ($i) => {
                                    $i.literal(`import * as pt from "pareto-core-types"`)
                                    $i.literal(`import * as pl from "pareto-core-lib"`)
                                    $i.literal(``)
                                    $i.literal(`import * as tst from "lib-pareto-test"`)
                                    $i.literal(``)
                                    $i.line(($i) => {
                                        $i.snippet(`export function test(): pt.AsyncValue<tst.TTestElement> {`)
                                        $i.indent(($i) => {
                                            $i.literal(`pl.implementMe("${moduleName}:${key}")`)
                                        })
                                        $i.snippet(`}`)
                                    })
                                })
                            })
                        })
                    })
                })
            })
            tsConfig($i)
        })

    }
}