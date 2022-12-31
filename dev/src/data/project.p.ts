import * as pr from "pareto-core-raw"

import { group, types, _function } from "../glossary/glossary/shorthands.p"
import { externalReference as er, string as str } from "../glossary/glossary/shorthands.p"
import { string, _null, reference, externalReference, number, boolean } from "../glossary/api/shorthands.p"

import { NProject } from "../glossary/project/types.p"
import { api } from "./api.p"


const wd = pr.wrapRawDictionary

export const project: NProject.Project = {
    "api": api,
    "private definitions": {

        "glossary": {
            'imports': wd({
                "api": "../../api",
                "common": "glo-pareto-common"
            }),
            'types': types({
                "WriteFileData": group({
                    "path": er("common", "Path"),
                    "data": str(),
                })
            }),
            'functions': wd({
                "Increment": _function(number(), number()),
                "IsZero": _function(number(), boolean()),
                "Negate": _function(number(), number()),
                "ReadFile": _function(externalReference("common", "Path"), string(), true),
                "RunTests": _function(externalReference("api", "TestSet"), externalReference("api", "TestSetResult"), true),
                "ValidateFile": _function(externalReference("api", "ValidateFileData"), externalReference("api", "TestElementResult"), true),
                "Summarize": _function(externalReference("api", "TestSetResult"), externalReference("api", "Summary")),


            })
        },
        "api": {
            "imports": wd({
                "api": "../../api",
                "arithmetic": "res-pareto-arithmetic",
                "collation": "res-pareto-collation",
                "diff": "res-pareto-diff",
                "fs": "res-pareto-filesystem",
            }),
            "algorithms": wd({
                "CreateArgumentsParser": ["constructor", {
                    data: ["null", null],
                    dependencies: wd({
                        "callback": {
                            type: ["procedure", externalReference("api", "TestParameters")],
                        },
                        "onError": {
                            type: ["procedure", string()],

                        },
                    }),
                    result: {
                        type: ["procedure", externalReference("api", "Arguments")],
                    }
                }],
                "CreateBoundTester": ["constructor", {
                    data: ["null", null],
                    dependencies: wd({
                        "onTestErrors": {
                            type: ["procedure", _null()],

                        },
                        "log": {
                            type: ["procedure", string()],

                        },
                        "onError": {
                            type: ["procedure", string()],

                        },
                    }),
                    result: {
                        type: ["procedure", externalReference("api", "TestSet")],
                    }
                }],
                "CreateFileValidator": ["constructor", {
                    data: ["null", null],
                    dependencies: wd({
                        "writeFile": {
                            type: ["procedure", reference("WriteFileData")],

                        },
                        "unlink": {
                            type: ["procedure", externalReference("fs", "Unlink_Data")],

                        },
                        "readFile": {
                            type: ["function", {
                                function: "ReadFile",
                                async: true,
                            }],

                        },
                        "diffData": {
                            type: ["function", {
                                context: ["import", "diff"],
                                function: "DiffData",
                            }],

                        },
                    }),
                    result: {
                        type: ["function", {
                            function: "ValidateFile",
                            async: true,
                        }],
                    }
                }],
                "CreateSummarizer": ["constructor", {
                    data: ["null", null],
                    dependencies: wd({
                        "log": {
                            type: ["procedure", string()],

                        },
                        "increment": {
                            type: ["function", {
                                function: "Increment",
                            }],

                        },

                    }),
                    result: {
                        type: ["function", {
                            "function": "Summarize",
                        }],
                    }
                }],
                "CreateSummarySerializer": ["constructor", {
                    data: ["null", null],
                    dependencies: wd({
                        "add": {
                            type: ["function", {
                                context: ["import", "arithmetic"],
                                function: "Add",
                            }],
                        },
                        "isZero": {
                            type: ["function", {
                                function: "IsZero",
                            }],
                        },
                        "log": {
                            type: ["procedure", string()],

                        },
                        "negate": {
                            type: ["function", {
                                function: "Negate",
                            }],
                        },
                    }),
                    result: {
                        type: ["procedure", externalReference("api", "Summary")],
                    }
                }],
                "CreateTester": ["constructor", {
                    data: ["null", null],
                    dependencies: wd({
                        "onTestErrors": {
                            type: ["procedure", _null()],

                        },
                        "serializeTestResult": {
                            type: ["procedure", externalReference("api", "TestSetResult")],

                        },
                        "serializeSummary": {
                            type: ["procedure", externalReference("api", "Summary")],

                        },
                        "runTests": {
                            type: ["function", {
                                function: "RunTests",
                                async: true,
                            }],
                        },
                        "isZero": {
                            type: ["function", {
                                function: "IsZero",
                            }],
                        },
                        "summarize": {
                            type: ["function", {
                                function: "Summarize",
                            }],

                        },
                    }),
                    result: {
                        type: ["procedure", externalReference("api", "TestSet")],
                    }
                }],
                "CreateTestParametersParser": ["constructor", {
                    data: ["null", null],
                    dependencies: wd({

                        "callback": {
                            type: ["procedure", externalReference("api", "TestParameters")],
                        },
                        "onError": {
                            type: ["procedure", externalReference("api", "ArgumentError")],

                        },


                    }),
                    result: {
                        type: ["procedure", externalReference("api", "Arguments")],
                    }
                }],
                "CreateTestRunner": ["constructor", {
                    data: ["null", null],
                    dependencies: wd({
                        "diffData": {
                            type: ["function", {
                                context: ["import", "diff"],
                                function: "DiffData",
                            }],
                        },
                        "stringsAreEqual": {
                            type: ["function", {
                                context: ["import", "diff"],
                                function: "StringsAreEqual",
                            }],
                        },
                        "validateFile": {
                            type: ["function", {
                                function: "ValidateFile",
                                async: true,
                            }],
                        },
                    }),
                    result: {
                        type: ["function", {
                            function: "RunTests",
                            async: true,
                        }],
                    }
                }],
                "CreateTestResultSerializer": ["constructor", {
                    data: ["null", null],
                    dependencies: wd({
                        "isABeforeB": {
                            type: ["function", {
                                context: ["import", "collation"],
                                function: "IsABeforeB",
                            }],
                        },
                        "log": {
                            type: ["procedure", string()],

                        },
                    }),
                    result: {
                        type: ["procedure", externalReference("api", "TestSetResult")],
                    }
                }],
            })
        },
    },
    "private implementations": wd({
    }),
    "public implementations": wd({}),


}