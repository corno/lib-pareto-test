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
        }),
        'functions': d({
            "HandleArgumentError": sfunc(typeReference("public", "ArgumentError"), null, null, null),
            "ParseTestParameters": sfunc(typeReference("main", "Arguments"), null, builderReference("HandleTestParameters"), null),
            // "SerializeSummary": sfunc(typeReference("public", "Summary"), null, null, null),
            // "SerializeTestResult": sfunc(typeReference("public", "TestSetResult"), null, null, null),
            // "TestTestSet": sfunc(typeReference("public", "TestSet"), null, null, null),
        }),

    }],
}