import * as pd from 'pareto-core-data'
import {
    array,
    boolean,
    data,
    dictionary,
    func,
    group,
    member,
    null_,
    number,
    reference,
    string,
    taggedUnion,
    type,
    typeReference,
    types,
} from "lib-pareto-typescript-project/dist/submodules/glossary/shorthands"

import { definitionReference, constructor, algorithm } from "lib-pareto-typescript-project/dist/submodules/moduleDefinition/shorthands"

import * as gmoduleDefinition from "lib-pareto-typescript-project/dist/submodules/moduleDefinition"

const d = pd.d

export const $: gmoduleDefinition.T.ModuleDefinition<pd.SourceLocation> = {
    'glossary': {
        'imports': d({
            "diff": "res-pareto-diff",
            "common": "glo-pareto-common",
        }),
        'parameters': d({}),
        'types': d({
            "ArgumentError": type(taggedUnion({
                "missing": null_(),
                "too many": null_(),
            })),
            "Summary": type(group({
                "numberOfTests": member(number()),
                "numberOfErrors": member(number()),
            })),
            "TestElement": type(group({
                "type": member(taggedUnion({
                    "subset": reference("TestSet"),
                    "test": group({
                        "type": member(taggedUnion({
                            "boolean": boolean(),
                            "short string": group({
                                "expected": member(string()),
                                "actual": member(string()),
                            }),
                            "long string": group({
                                "expected": member(string()),
                                "actual": member(string()),
                            }),
                            "file string": reference("ValidateFileData"),
                        })),
                    }),
                })),
            })),
            "TestElementResult": type(group({
                "type": member(taggedUnion({
                    "subset": reference("TestSetResult"),
                    "test": group({
                        "success": member(boolean()),
                        "type": member(reference("TestType")),
                    }),
                }))
            })),
            "TestParameters": type(group({
                "testDirectory": member(string()),
            })),
            "TestSet": type( group({
                "elements": member(dictionary(reference("TestElement")))
            })),
            "TestSetResult": type( group({
                "elements": member(dictionary(reference("TestElementResult")))
            })),
            "TestType": type( taggedUnion({
                "boolean": null_(),
                "long string": group({
                    "parts": member(array(reference("diff", "MultilinePart")))
                }),
                "short string": group({
                    "expected": member(string()),
                    "actual": member(string()),
                }),
                "file string": group({
                    "fileLocation": member(string()),
                    "parts": member(array(reference("diff", "MultilinePart")))
                }),
            })),
            "ValidateFileData": type( group({
                "expectedFile": member(group({
                    "path": member(reference("common", "Path")),
                    "fileName": member(string()),
                    "extension": member(string())
                })),
                "actual": member(string())
            })),
        }),
        'interfaces': d({}),
        'functions': d({
            "GetTestSet": func(typeReference("TestParameters"), null, null, data(typeReference("TestSet"), true)),
        }),
    },
    'api': {
        'imports': d({
            "common": "glo-pareto-common",
            "main": "res-pareto-main",
        }),
        'algorithms': d({
            "createTestProgram": algorithm(definitionReference("main", {}, "Main"), constructor(null, {
                "getTestSet": {
                    'function': "GetTestSet",
                },
                "log": definitionReference("common", {}, "Log"),
                "logError": definitionReference("common", {}, "Log"),
                "onTestErrors": definitionReference("common", {}, "Signal"),
            })),
        })
    }
}