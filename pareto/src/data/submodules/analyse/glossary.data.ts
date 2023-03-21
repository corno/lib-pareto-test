import * as pd from 'pareto-core-data'

import {
    string,
    null_,
    nested,
    dictionary, member, taggedUnion, types, group,
    array,
    typeReference,
    sdata,
    boolean,
    sfunc,
    type,
    optional,
    reference,
    interfaceReference,
    number,
    builderReference,
    builderMethod,
} from "lib-pareto-typescript-project/dist/submodules/glossary/shorthands"

import * as gglossary from "lib-pareto-typescript-project/dist/submodules/glossary"
const d = pd.d

export const $: gglossary.T.Glossary<pd.SourceLocation> = {
    'parameters': d({}),
    'types': d({
    }),
    'type': ['synchronous', {
        'builders': d({
            "HandleTestParameters": builderMethod(typeReference("public", "TestParameters")),
            "HandleTestOutput": ['group', {
                'members': d({
                    "log": ['reference', builderReference("common", "StringBuilder")],
                    "logError": ['reference', builderReference("common", "StringBuilder")],
                    "onTestErrors": builderMethod(typeReference("common", "Null")) 
                })
            }]
        }),
        'functions': d({
            "Increment": sfunc(typeReference("common", "Number"), null, null, sdata(typeReference("common", "Number"))),
            "Summarize": sfunc(typeReference("public", "TestSetResult"), null, null, sdata(typeReference("public", "Summary"))),

            "SerializeSummary": sfunc(typeReference("public", "Summary"), null, builderReference("common", "StringBuilder"), null),
            "SerializeTestResult": sfunc(typeReference("public", "TestSetResult"), null, builderReference("common", "StringBuilder"), null),
            "TestTestSet": sfunc(typeReference("public", "TestSet"), null, builderReference("HandleTestOutput"), null),
            "BoundTestTestSet": sfunc(typeReference("public", "TestSet"), null, null, null),
        }),

    }],
}