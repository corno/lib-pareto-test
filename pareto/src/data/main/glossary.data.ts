import * as pd from 'pareto-core-data'

import {
    string,
    null_,
    nested,
    dictionary, member, taggedUnion, types, group,
    array,
    typeReference,
    data,
    boolean,
    func,
    type,
    optional,
    reference,
    number,
} from "lib-pareto-typescript-project/dist/submodules/glossary/shorthands"

import * as gglossary from "lib-pareto-typescript-project/dist/submodules/glossary"
const d = pd.d

export const $: gglossary.T.Glossary<pd.SourceLocation> = {
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
}