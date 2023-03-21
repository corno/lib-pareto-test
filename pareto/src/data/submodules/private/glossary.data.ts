import * as pd from 'pareto-core-data'

import {
    afunction,
    data,
    externalTypeReference,
    imp,
} from "lib-pareto-typescript-project/dist/submodules/glossary/shorthands"

import * as g_glossary from "lib-pareto-typescript-project/dist/submodules/glossary"
const d = pd.d

export const $: g_glossary.T.Glossary<pd.SourceLocation> = {
    'parameters': d({}),
    'imports': d({
        "common": imp({}),
        "public": imp({}),
    }),
    'types': d({
    }),
    'asynchronous': {
        'interfaces': d({}),
        'algorithms': d({
            "RunTests": afunction(externalTypeReference("public", "TestSetResult"), data(externalTypeReference("public", "TestSet"))),
            "ValidateFile": afunction(externalTypeReference("public", "TestElementResult"), data(externalTypeReference("public", "ValidateFileData"))),
        }),
    },
    'synchronous': {
        'interfaces': d({}),
        'algorithms': d({}),
    },
}