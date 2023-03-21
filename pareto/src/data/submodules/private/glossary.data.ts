import * as pd from 'pareto-core-data'

import {
    typeReference,
    adata,
    afunc,
} from "lib-pareto-typescript-project/dist/submodules/glossary/shorthands"

import * as gglossary from "lib-pareto-typescript-project/dist/submodules/glossary"
const d = pd.d

export const $: gglossary.T.Glossary<pd.SourceLocation> = {
    'parameters': d({}),
    'types': d({
    }),
    'type': ['asynchronous', {
        'interfaces': d({
        }),
        'functions': d({
            "ReadFile": afunc(typeReference("common", "Path"), null, adata(typeReference("common", "String"))),
            "RunTests": afunc(typeReference("public", "TestSet"), null, adata(typeReference("public", "TestSetResult"))),
            "ValidateFile": afunc(typeReference("public", "ValidateFileData"), null, adata(typeReference("public", "TestElementResult"))),
            // "SerializeSummary": afunc(typeReference("public", "Summary"), null, null, null),
            // "SerializeTestResult": afunc(typeReference("public", "TestSetResult"), null, null, null),
            // "TestTestSet": afunc(typeReference("public", "TestSet"), null, null, null),
        }),

    }],
}