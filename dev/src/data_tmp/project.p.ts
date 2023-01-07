import * as pr from "pareto-core-raw"

import { dictionary, group, taggedUnion, types, _function } from "../modules/glossary/api/shorthands.p"
import {
    externalReference as er,
    string as str,
    _null as nll,
    reference as ref,
    boolean as bln,
} from "../modules/glossary/api/shorthands.p"
import { string, _null, reference, externalReference, number, boolean } from "../modules/api/api/shorthands.p"

import * as NProject from "../modules/project"


const wd = pr.wrapRawDictionary

export const project: NProject.TProject = {
    modules: wd({
        "glossary": {
            definition: {

                "glossary": {
                    'imports': wd({
                    }),
                    'types': types({
                        "Function": group({
                            "async": bln(),
                            "data": ref("LeafType"),
                            "return value": ref("LeafType")
                        }),
                        "Callback": group({
                            "data": ref("LeafType"),
                            "context": taggedUnion({
                                "local": nll(),
                                "import": str(),
                            }),
                            "interface": str()
                        }),
                        "Glossary": group({
                            "imports": dictionary(str()),
                            "types": dictionary(ref("Type")),
                            "functions": dictionary(ref("Function")),
                            "interfaces": dictionary(ref("Interface")),
                            "callbacks": dictionary(ref("Callback")),
                        }),
                        "Interface": group({
                            "members": dictionary(taggedUnion({
                                "interface": group({
                                    "context": taggedUnion({
                                        "local": nll(),
                                        "import": str(),
                                    }),
                                    "interface": str(),
                                }),
                                "procedure": ref("LeafType")
                            }))
                        }),
                        "LeafType": taggedUnion({
                            "boolean": nll(),
                            "string": nll(),
                            "null": nll(),
                            "number": nll(),
                            "reference": str(),
                            "external reference": group({
                                "context": str(),
                                "type": str(),
                            }),
                        }),
                        "Type": taggedUnion({
                            "leaf": ref("LeafType"),
                            "array": ref("Type"),
                            "dictionary": ref("Type"),
                            "group": dictionary(ref("Type")),
                            "taggedUnion": dictionary(ref("Type")),
                        }),



                    }),
                    'functions': wd({


                    }),
                    'callbacks': wd({}),
                    'interfaces': wd({}),
                },
                "api": {
                    "imports": wd({
                    }),
                    "algorithms": wd({
                    })
                },
            },
            implementation: {}
        },
        "api": {
            definition: {

                "glossary": {
                    'imports': wd({
                        "fp": "lib-fountain-pen",
                        "glossary": "../../glossary"
                    }),
                    'types': types({
                        "AlgorithmDefinition": taggedUnion({
                            "constructor": ref("Constructor"),
                            "algorithm": ref("AlgorithmReference"),
                        }),
                        "AlgorithmReference": group({
                            "type": taggedUnion({
                                "function": group({
                                    "context": taggedUnion({
                                        "local": nll(),
                                        "import": str(),
                                    }),

                                    "function": str(),
                                    "async": bln(),
                                }),
                                "procedure": er("glossary", "LeafType"),
                                "callback": group({
                                    "context": taggedUnion({
                                        "local": nll(),
                                        "import": str(),
                                    }),

                                    "callback": str(),
                                })
                            }),
                        }),
                        "Constructor": group({
                            "data": er("glossary", "LeafType"),
                            "dependencies": dictionary(ref("AlgorithmReference")),
                            "result": ref("AlgorithmReference"),
                        }),
                        "ModuleDefinition": group({
                            "glossary": er("glossary", "Glossary"),
                            "api": group({
                                "imports": dictionary(str()),
                                "algorithms": dictionary(ref("AlgorithmDefinition")),
                            }),
                        })
                    }),
                    'functions': wd({

                    }),
                    'callbacks': wd({
                        "serializeConstructor": {
                            data: reference("Constructor"),
                            context: ["import", "fp"],
                            interface: "Line",

                        },
                        "serializeAlgorithmReference": {
                            data: reference("AlgorithmReference"),
                            context: ["import", "fp"],
                            interface: "Line",

                        },
                        "serializeModuleDefinition": {
                            data: reference("ModuleDefinition"),
                            context: ["import", "fp"],
                            interface: "Writer",

                        },
                    }),
                    'interfaces': wd({}),
                },
                "api": {
                    "imports": wd({
                        "coll": "res-pareto-collation",
                        "glossary": "../../glossary",
                    }),
                    "algorithms": wd({
                        "createAlgorithmReferenceSerializer": ["constructor", {
                            data: ["null", null],
                            dependencies: wd({
                                serializeLeafType: {
                                    type: ["callback", {
                                        context: ["import", "glossary"],
                                        "callback": "serializeLeafType"
                                    }],
                                },
                            }),
                            result: {
                                type: ["callback", {
                                    "callback": "serializeAlgorithmReference"
                                }],
                            }
                        }],
                        "createModuleDefinitionSerializer": ["constructor", {
                            data: ["null", null],
                            dependencies: wd({
                                "compare": {
                                    type: ["function", {
                                        context: ["import", "coll"],
                                        function: "IsABeforeB",
                                    }],

                                },
                                serializeGlossary: {
                                    type: ["callback", {
                                        context: ["import", "glossary"],
                                        "callback": "serializeGlossary"
                                    }],
                                },
                                serializeAlgorithmReference: {
                                    type: ["callback", {
                                        "callback": "serializeAlgorithmReference"
                                    }],
                                },
                                serializeConstructor: {
                                    type: ["callback", {
                                        "callback": "serializeConstructor"
                                    }],
                                },
                            }),
                            result: {
                                type: ["callback", {
                                    "callback": "serializeModuleDefinition"
                                }],
                            }
                        }],
                        "createConstructorSerializer": ["constructor", {
                            data: ["null", null],
                            dependencies: wd({
                                "compare": {
                                    type: ["function", {
                                        context: ["import", "coll"],
                                        function: "IsABeforeB",
                                    }],

                                },
                                serializeLeafType: {
                                    type: ["callback", {
                                        context: ["import", "glossary"],
                                        "callback": "serializeLeafType"
                                    }],
                                },
                                serializeAlgorithmReference: {
                                    type: ["callback", {
                                        "callback": "serializeAlgorithmReference"
                                    }],
                                },
                            }),
                            result: {
                                type: ["callback", {
                                    "callback": "serializeConstructor"
                                }],
                            }
                        }],
                    })
                },
            },
            implementation: {}
        },
        "project": {
            definition: {

                "glossary": {
                    'imports': wd({
                        "api": "../../api",
                        "common": "glo-pareto-common",
                    }),
                    'types': types({
                        "AlgorithmImplementation": group({}),
                        "Implementation": dictionary(ref("AlgorithmImplementation")),
                        "Project": group({
                            "modules": dictionary(group({
                                "definition": er("api", "ModuleDefinition"),
                            })),
                            "main": str(),
                        }),
                        "ProjectSettings": group({
                            "project": ref("Project"),
                            "path": er("common", "Path"),
                        })
                        // export type TAlgorithmImplementation = {

                        // }

                        // export type TImplementation = pt.Dictionary<TAlgorithmImplementation>

                        // export type TProject = {
                        //     readonly "modules": pt.Dictionary<{
                        //         definition: NAPI.TModuleDefinition
                        //         //implementation: Implementation

                        //     }>
                        //     readonly "main": string
                        // }


                        // export type TProjectSettings = {
                        //     project: TProject,
                        //     path: pt.Nested<string>
                        // }




                    }),
                    'functions': wd({


                    }),
                    'callbacks': wd({}),
                    'interfaces': wd({}),
                },
                "api": {
                    "imports": wd({
                        // "api": "../../public",
                        // "arithmetic": "res-pareto-arithmetic",
                        // "collation": "res-pareto-collation",
                        // "diff": "res-pareto-diff",
                        // "fs": "res-pareto-filesystem",
                    }),
                    "algorithms": wd({
                        // "createArgumentsParser": ["constructor", {
                        //     data: ["null", null],
                        //     dependencies: wd({
                        //         "callback": {
                        //             type: ["procedure", externalReference("api", "TestParameters")],
                        //         },
                        //         "onError": {
                        //             type: ["procedure", string()],

                        //         },
                        //     }),
                        //     result: {
                        //         type: ["procedure", externalReference("api", "Arguments")],
                        //     }
                        // }],
                        // "createBoundTester": ["constructor", {
                        //     data: ["null", null],
                        //     dependencies: wd({
                        //         "onTestErrors": {
                        //             type: ["procedure", _null()],

                        //         },
                        //         "log": {
                        //             type: ["procedure", string()],

                        //         },
                        //         "onError": {
                        //             type: ["procedure", string()],

                        //         },
                        //     }),
                        //     result: {
                        //         type: ["procedure", externalReference("api", "TestSet")],
                        //     }
                        // }],
                        // "createFileValidator": ["constructor", {
                        //     data: ["null", null],
                        //     dependencies: wd({
                        //         "writeFile": {
                        //             type: ["procedure", reference("WriteFileData")],

                        //         },
                        //         "unlink": {
                        //             type: ["procedure", externalReference("fs", "Unlink_Data")],

                        //         },
                        //         "readFile": {
                        //             type: ["function", {
                        //                 function: "ReadFile",
                        //                 async: true,
                        //             }],

                        //         },
                        //         "diffData": {
                        //             type: ["function", {
                        //                 context: ["import", "diff"],
                        //                 function: "DiffData",
                        //             }],

                        //         },
                        //     }),
                        //     result: {
                        //         type: ["function", {
                        //             function: "ValidateFile",
                        //             async: true,
                        //         }],
                        //     }
                        // }],
                        // "createSummarizer": ["constructor", {
                        //     data: ["null", null],
                        //     dependencies: wd({
                        //         "log": {
                        //             type: ["procedure", string()],

                        //         },
                        //         "increment": {
                        //             type: ["function", {
                        //                 function: "Increment",
                        //             }],

                        //         },

                        //     }),
                        //     result: {
                        //         type: ["function", {
                        //             "function": "Summarize",
                        //         }],
                        //     }
                        // }],
                        // "createSummarySerializer": ["constructor", {
                        //     data: ["null", null],
                        //     dependencies: wd({
                        //         "add": {
                        //             type: ["function", {
                        //                 context: ["import", "arithmetic"],
                        //                 function: "Add",
                        //             }],
                        //         },
                        //         "isZero": {
                        //             type: ["function", {
                        //                 function: "IsZero",
                        //             }],
                        //         },
                        //         "log": {
                        //             type: ["procedure", string()],

                        //         },
                        //         "negate": {
                        //             type: ["function", {
                        //                 function: "Negate",
                        //             }],
                        //         },
                        //     }),
                        //     result: {
                        //         type: ["procedure", externalReference("api", "Summary")],
                        //     }
                        // }],
                        // "createTester": ["constructor", {
                        //     data: ["null", null],
                        //     dependencies: wd({
                        //         "onTestErrors": {
                        //             type: ["procedure", _null()],

                        //         },
                        //         "serializeTestResult": {
                        //             type: ["procedure", externalReference("api", "TestSetResult")],

                        //         },
                        //         "serializeSummary": {
                        //             type: ["procedure", externalReference("api", "Summary")],

                        //         },
                        //         "runTests": {
                        //             type: ["function", {
                        //                 function: "RunTests",
                        //                 async: true,
                        //             }],
                        //         },
                        //         "isZero": {
                        //             type: ["function", {
                        //                 function: "IsZero",
                        //             }],
                        //         },
                        //         "summarize": {
                        //             type: ["function", {
                        //                 function: "Summarize",
                        //             }],

                        //         },
                        //     }),
                        //     result: {
                        //         type: ["procedure", externalReference("api", "TestSet")],
                        //     }
                        // }],
                        // "createTestParametersParser": ["constructor", {
                        //     data: ["null", null],
                        //     dependencies: wd({

                        //         "callback": {
                        //             type: ["procedure", externalReference("api", "TestParameters")],
                        //         },
                        //         "onError": {
                        //             type: ["procedure", externalReference("api", "ArgumentError")],

                        //         },


                        //     }),
                        //     result: {
                        //         type: ["procedure", externalReference("api", "Arguments")],
                        //     }
                        // }],
                        // "createTestRunner": ["constructor", {
                        //     data: ["null", null],
                        //     dependencies: wd({
                        //         "diffData": {
                        //             type: ["function", {
                        //                 context: ["import", "diff"],
                        //                 function: "DiffData",
                        //             }],
                        //         },
                        //         "stringsAreEqual": {
                        //             type: ["function", {
                        //                 context: ["import", "diff"],
                        //                 function: "StringsAreEqual",
                        //             }],
                        //         },
                        //         "validateFile": {
                        //             type: ["function", {
                        //                 function: "ValidateFile",
                        //                 async: true,
                        //             }],
                        //         },
                        //     }),
                        //     result: {
                        //         type: ["function", {
                        //             function: "RunTests",
                        //             async: true,
                        //         }],
                        //     }
                        // }],
                        // "createTestResultSerializer": ["constructor", {
                        //     data: ["null", null],
                        //     dependencies: wd({
                        //         "isABeforeB": {
                        //             type: ["function", {
                        //                 context: ["import", "collation"],
                        //                 function: "IsABeforeB",
                        //             }],
                        //         },
                        //         "log": {
                        //             type: ["procedure", string()],

                        //         },
                        //     }),
                        //     result: {
                        //         type: ["procedure", externalReference("api", "TestSetResult")],
                        //     }
                        // }],
                    })
                },
            },
            implemenation: {}
        }
    }),
    main: "project"
}