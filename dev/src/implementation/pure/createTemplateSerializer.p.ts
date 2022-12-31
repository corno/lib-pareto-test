
import { IWriter } from "lib-fountain-pen"
import { FSerializeGlossary } from "./createGlossarySerializer.p"
import { NProject } from "../../glossary/project/types.p"
import * as coll from "res-pareto-collation"


export function serializeTemplate(
    $: NProject.Project,
    $i: IWriter,
    $d: {
        compare: coll.FIsABeforeB,
    },
) {
    const compare = (a: string, b: string) => $d.compare({ a: a, b: b })
    $i.createDirectory("tmp", ($i) => {
        $i.createDirectory("templates", ($i) => {
            $i.createDirectory("dev", ($i) => {

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
                    $i.createDirectory("implementation_templates", ($i) => {

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

                        }
                        $i.createDirectory("private", ($i) => {
                            implementations($["private implementations"], $i)
                        })
                        $i.createDirectory("public", ($i) => {
                            implementations($["public implementations"], $i)
                        })
                    })
                    $i.createFile("index.ts", ($i) => {
                        $i.literal(`export * from "./api"`)
                        $i.literal(`export * from "./implementation"`)
                    })
                })
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

        })
    })
}