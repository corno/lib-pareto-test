import * as pr from 'pareto-core-raw'
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
    typeReference,
    types,
} from "lib-pareto-typescript-project/dist/submodules/glossary/shorthands.p"

import { definitionReference, constructor, algorithm } from "lib-pareto-typescript-project/dist/submodules/moduleDefinition/shorthands.p"

import * as mmoduleDefinition from "lib-pareto-typescript-project/dist/submodules/moduleDefinition"

const d = pr.wrapRawDictionary

export const $: mmoduleDefinition.TModuleDefinition = {
    'glossary': {
        'imports': d({
            "diff": "res-pareto-diff",
            "common": "glo-pareto-common",
        }),
        'parameters': d({}),
        'templates': d({}),
        'types': types({
            "ArgumentError": taggedUnion({
                "missing": null_(),
                "too many": null_(),
            }),
            "Summary": group({
                "numberOfTests": member(number()),
                "numberOfErrors": member(number()),
            }),
            "TestElement": group({
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
            }),
            "TestElementResult": group({
                "type": member(taggedUnion({
                    "subset": reference("TestSetResult"),
                    "test": group({
                        "success": member(boolean()),
                        "type": member(reference("TestType")),
                    }),
                }))
            }),
            "TestParameters": group({
                "testDirectory": member(string()),
            }),
            "TestSet": group({
                "elements": member(dictionary(reference("TestElement")))
            }),
            "TestSetResult": group({
                "elements": member(dictionary(reference("TestElementResult")))
            }),
            "TestType": taggedUnion({
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
            }),
            "ValidateFileData": group({
                "expectedFile": member(group({
                    "path": member(reference("common", "Path")),
                    "fileName": member(string()),
                    "extension": member(string())
                })),
                "actual": member(string())
            }),
        }),
        'interfaces': d({}),
        'functions': d({
            "GetTestSet": func(typeReference("TestParameters"), null, null, data(typeReference("TestSet"), true)),
            "Signal": func(typeReference("common", "Null"), null, null, null),
        }),
    },
    'api': {
        'imports': d({
            "common": "glo-pareto-common",
            "main": "res-pareto-main",
        }),
        'algorithms': d({
            "createTestProgram": algorithm(definitionReference("main", "Main"), constructor(null, {
                "getTestSet": {
                    'function': "GetTestSet",
                },
                "log": {
                    'context': ['import', "common"],
                    'function': "Log",
                },
                "logError": {
                    'context': ['import', "common"],
                    'function': "Log",
                },
                "onTestErrors": {
                    'function': "Signal",
                },
            })),
        })
    }
}