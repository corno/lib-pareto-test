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
                        "fp": "lib-fountain-pen",
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
                    'callbacks': wd({
                        "serializeGlossary": {
                            data: reference("Glossary"),
                            context: ["import", "fp"],
                            interface: "Block",
                        },
                        "serializeLeafType": {
                            data: reference("LeafType"),
                            context: ["import", "fp"],
                            interface: "Line",
                        },
                    }),
                    'interfaces': wd({}),
                },
                "api": {
                    "imports": wd({
                        "collation": "res-pareto-collation"
                    }),
                    "algorithms": wd({
                        "createGlossarySerializer": ["constructor", {
                            data: ["null", null],
                            dependencies: wd({
                                "compare": {
                                    type: ["function", {
                                        context: ["import", "collation"],
                                        function: "IsABeforeB",
                                    }],
                                },
                            }),
                            result: {
                                type: ["callback", {
                                    "callback": "serializeGlossary"
                                }],
                            }
                        }],
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
                        "collation": "res-pareto-collation",
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
                                        context: ["import", "collation"],
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
                                        context: ["import", "collation"],
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
                        "fp": "lib-fountain-pen",
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
                    }),
                    'functions': wd({
                    }),
                    'callbacks': wd({
                        "serializeProject": {
                            data: reference("Project"),
                            context: ["import", "fp"],
                            interface: "Writer",
                        },
                    }),
                    'interfaces': wd({}),
                },
                "api": {
                    "imports": wd({
                        "api": "../../api",
                        "glossary": "../../glossary",
                        "collation": "res-pareto-collation",
                    }),
                    "algorithms": wd({
                        "createProjectSerializer": ["constructor", {
                            data: ["null", null],
                            dependencies: wd({
                                serializeLeafType: {
                                    type: ["callback", {
                                        context: ["import", "glossary"],
                                        "callback": "serializeLeafType"
                                    }],
                                },
                                serializeModuleDefinition: {
                                    type: ["callback", {
                                        context: ["import", "api"],
                                        "callback": "serializeModuleDefinition"
                                    }],
                                },
                                "compare": {
                                    type: ["function", {
                                        context: ["import", "collation"],
                                        function: "IsABeforeB",
                                    }],
                                },
                            }),
                            result: {
                                type: ["callback", {
                                    "callback": "serializeProject"
                                }],
                            }
                        }],
                        "createTemplateSerializer": ["constructor", {
                            data: ["null", null],
                            dependencies: wd({
                                "compare": {
                                    type: ["function", {
                                        context: ["import", "collation"],
                                        function: "IsABeforeB",
                                    }],
                                },
                            }),
                            result: {
                                type: ["callback", {
                                    "callback": "serializeProject"
                                }],
                            }
                        }],
                    })
                },
            },
            implemenation: {}
        }
    }),
    main: "project"
}