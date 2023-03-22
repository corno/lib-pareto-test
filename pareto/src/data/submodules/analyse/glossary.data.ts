import * as pd from 'pareto-core-data'

import {
    constructor,
    aInterfaceMethod, data,
    externalTypeReference,
    imp,
    procedure, sfunction, sInterfaceReference
} from "lib-pareto-typescript-project/dist/submodules/glossary/shorthands"

import * as g_glossary from "lib-pareto-typescript-project/dist/submodules/glossary"
const d = pd.d

export const $: g_glossary.T.Glossary<pd.SourceLocation> = {
    'parameters': d({}),
    'imports': d({
        "common": imp({}),
        "main": imp({}),
        "mainlib": imp({}),
    }),
    'types': d({
    }),
    'asynchronous': {
        'interfaces': d({
            "HandleTestSet": aInterfaceMethod(externalTypeReference("main", "TestSet")),
        }),
        'algorithms': d({
            "CreateTester": constructor(sInterfaceReference("HandleTestSet"), {
                "log": sInterfaceReference("mainlib", "Log"),
                "logError": sInterfaceReference("mainlib", "Log"),
                "onTestErrors": sInterfaceReference("mainlib", "Signal"),
            }),
        }),
    },
    'synchronous': {
        'interfaces': d({
        }),
        'algorithms': d({
            "SerializeSummary": procedure(data(externalTypeReference("main", "Summary")), sInterfaceReference("common", "String")),
            //"SerializeTestSet": procedure(data(externalTypeReference("main", "TestSet")), sInterfaceReference("common", "String")),
            "SerializeTestResult": procedure(data(externalTypeReference("main", "TestSetResult")), sInterfaceReference("common", "String")),

            "Increment": sfunction(externalTypeReference("common", "Number"), data(externalTypeReference("common", "Number")),),
            "Summarize": sfunction(externalTypeReference("main", "Summary"), data(externalTypeReference("main", "TestSetResult"))),

        }),
    },
}