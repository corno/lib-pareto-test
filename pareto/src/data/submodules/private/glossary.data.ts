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
    method,
    interfaceReference,
    number,
} from "lib-pareto-typescript-project/dist/submodules/glossary/shorthands"

import * as gglossary from "lib-pareto-typescript-project/dist/submodules/glossary"
const d = pd.d

export const $: gglossary.T.Glossary<pd.SourceLocation> = {
    'parameters': d({}),
    'types': d({
    }),
    'interfaces': d({
        "HandleTestParameters": method(typeReference("public", "TestParameters")),
    }),
    'functions': d({
        "HandleArgumentError": func(typeReference("public", "ArgumentError"), null, null, null),
        "Increment": func(typeReference("common", "Number"), null, null, data(typeReference("common", "Number"), false)),
        "ParseTestParameters": func(typeReference("main", "Arguments"), null, interfaceReference("HandleTestParameters"), null),
        "ReadFile": func(typeReference("common", "Path"), null, null, data(typeReference("common", "String"), true)),
        "RunTests": func(typeReference("public", "TestSet"), null, null, data(typeReference("public", "TestSetResult"), true)),
        "ValidateFile": func(typeReference("public", "ValidateFileData"), null, null, data(typeReference("public", "TestElementResult"), true)),
        "Summarize": func(typeReference("public", "TestSetResult"), null, null, data(typeReference("public", "Summary"), false)),
        "SerializeSummary": func(typeReference("public", "Summary"), null, null, null),
        "SerializeTestResult": func(typeReference("public", "TestSetResult"), null, null, null),
        "TestTestSet": func(typeReference("public", "TestSet"), null, null, null),
    }),
}