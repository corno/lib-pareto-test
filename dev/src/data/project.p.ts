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
            // 'procedures': wd({
            //     "OnArgumentError": {
            //         data: externalReference("api", "ArgumentError")
            //     },
            //     "RunTests": {
            //         data: externalReference("api", "TestParameters")
            //     },
            //     "SerializeSummary": {
            //         data: externalReference("api", "Summary")
            //     },
            //     "SerializeTestResult": {
            //         data: externalReference("api", "TestSetResult")
            //     },
            //     "Test": {
            //         data: externalReference("api", "TestSet")
            //     },
            //     "WriteFile": {
            //         data: reference("WriteFileData")
            //     },
            // }),
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
                "CreateFileValidator": ["constructor", {
                    data: ["null", null],
                    dependencies: wd({
                        // readonly "writeFile": PWriteFile
                        // readonly "unlink": fs.PUnlinkFireAndForget
                        // readonly "readFile": glo.AReadFile
                        // readonly "diffData": diff.FDiffData,

                        
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

                    //     export type CCreateSummarySerializer = pt.Creator<
                    //     {
                    //         readonly "log": pt.Procedure<string>
                    //         readonly "isZero": glo.FIsZero
                    //         readonly "add": arithmetic.FAdd
                    //         readonly "negate": glo.FNegate
                    //     },
                    //     PSerializeSummary
                    // >
                    }),
                    result: {
                        type: ["procedure", externalReference("api", "Summary")],
                    }
                }],
                "CreateTestRunner": ["constructor", {
                    data: ["null", null],
                    dependencies: wd({

                    }),
                    result: {
                        type: ["procedure", reference("TestSet")],
                    }
                }],
                "CreateTestParametersParser": ["constructor", {
                    data: ["null", null],
                    dependencies: wd({

                    }),
                    result: {
                        type: ["procedure", reference("TestSet")],
                    }
                }],
                "CreateTester": ["constructor", {
                    data: ["null", null],
                    dependencies: wd({

                    }),
                    result: {
                        type: ["procedure", reference("TestSet")],
                    }
                }],
                "CreateTester2": ["constructor", {
                    data: ["null", null],
                    dependencies: wd({

                    }),
                    result: {
                        type: ["procedure", reference("TestSet")],
                    }
                }],
                "CreateTestResultSerializer": ["constructor", {
                    data: ["null", null],
                    dependencies: wd({

                    }),
                    result: {
                        type: ["procedure", reference("TestSet")],
                    }
                }],
            })
        },
    },
    "private implementations": wd({
        // "createArgumentsParser": {
        //     "type": ["binding", null],
        //     "definition": ["constructor", {
        //         data: ["null", null],
        //         dependencies: wd({
        //             // onError: ["procedure", "OnArgumentError"],
        //             // callback: ["procedure", "RunTests"],
        //         }),
        //         result: {
        //             type: ["procedure", null],
        //             algorithm: "RunProgram"
        //         }
        //     }],
        // },
        // "createFileValidator": {
        //     "type": ["pure", null],
        //     "definition": ["constructor", {
        //         data: ["null", null],
        //         dependencies: wd({
        //             // onError: ["procedure", "OnArgumentError"],
        //             // callback: ["procedure", "RunTests"],
        //         }),
        //         result: {
        //             type: ["procedure", null],
        //             algorithm: "XX"
        //         }
        //     }],
        // },
        // "createTestParametersParser": {
        //     "type": ["pure", null],
        //     "scope": ["public", "XX"],
        // },
        // "createSummarizer": {
        //     "type": ["pure", null],
        //     "scope": ["public", "XX"],
        // },
        // "createSummarySerializer": {
        //     "type": ["pure", null],
        //     "scope": ["public", "XX"],
        // },
        // "createTester": {
        //     "type": ["pure", null],
        //     "scope": ["public", "XX"],
        // },
        // "createTester2": {
        //     "type": ["binding", null],
        //     "scope": ["public", "XX"],
        // },
        // "createTestProgram": {
        //     "type": ["binding", null],
        //     "scope": ["public", "createTestProgram"],
        // },
        // "createTestResultSerializer": {
        //     "type": ["pure", null],
        //     "scope": ["public", "XX"],
        // },
        // "createTestsRunner": {
        //     "type": ["pure", null],
        //     "scope": ["public", "XX"],
        // },
        // "increment": {
        //     "type": ["pure", null],
        //     "scope": ["public", "XX"],
        // },
    }),
    "public implementations": wd({}),


}