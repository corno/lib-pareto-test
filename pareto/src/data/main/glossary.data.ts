import * as pd from 'pareto-core-data'

import {
    constructor,
    afunction, aInterfaceReference, array, boolean, data, dictionary, externalTypeReference, group, imp, member, null_, number,
    ref, string, taggedUnion, type, typeReference, aExternalInterfaceReference
} from "lib-pareto-typescript-project/dist/submodules/glossary/shorthands"

import * as g_glossary from "lib-pareto-typescript-project/dist/submodules/glossary"
const d = pd.d

export const $: g_glossary.T.Glossary<pd.SourceLocation> = {
    'glossary parameters': d({}),
    'imports': d({
        "common": imp(),
        "main": imp(),
        "diff": imp(),
    }),
    'root': {
        'namespaces': d({}),
        'types': d({
            "ArgumentsError": type(taggedUnion({
                "missing": null_(),
                "too many": null_(),
            })),
            "Summary": type(group({
                "numberOfTests": member(number()),
                "numberOfErrors": member(number()),
            })),
            "TestElement": type(group({
                "type": member(taggedUnion({
                    "subset": ref(typeReference("TestSet")),
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
                            "file string": ref(typeReference("ValidateFileData")),
                        })),
                    }),
                })),
            })),
            "TestElementResult": type(group({
                "type": member(taggedUnion({
                    "subset": ref(typeReference("TestSetResult")),
                    "test": group({
                        "success": member(boolean()),
                        "type": member(ref(typeReference("TestType"))),
                    }),
                })),
            })),
            "TestParameters": type(group({
                "testDirectory": member(string()),
            })),
            "TestSet": type(group({
                "elements": member(dictionary(ref(typeReference("TestElement")))),
            })),
            "TestSetResult": type(group({
                "elements": member(dictionary(ref(typeReference("TestElementResult")))),
            })),
            "TestType": type(taggedUnion({
                "boolean": null_(),
                "long string": group({
                    "parts": member(array(ref(externalTypeReference("diff", "MultilinePart")))),
                }),
                "short string": group({
                    "expected": member(string()),
                    "actual": member(string()),
                }),
                "file string": group({
                    "fileLocation": member(string()),
                    "parts": member(array(ref(externalTypeReference("diff", "MultilinePart")))),
                }),
            })),
            "ValidateFileData": type(group({
                "expectedFile": member(group({
                    "path": member(ref(externalTypeReference("common", "Path"))),
                    "fileName": member(string()),
                    "extension": member(string()),
                })),
                "actual": member(string()),
            })),
        }),
    },
    'asynchronous': {
        'interfaces': d({}),
        'algorithms': d({
            "GetTestSet": afunction(typeReference("TestSet"), typeReference("TestParameters")),
            "CreateTester": constructor(aExternalInterfaceReference("main", "Main"), {
                "logErrors": aExternalInterfaceReference("main", "Log"),
                "log": aExternalInterfaceReference("main", "Log"),
                "reportFailed": aExternalInterfaceReference("main", "Signal"),
            })
        }),
    },
    'synchronous': {
        'interfaces': d({}),
        'algorithms': d({}),
    },

}