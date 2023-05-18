import * as pd from 'pareto-core-data'

import {
    constructor,
    aInterfaceMethod, data,
    externalTypeReference,
    imp,
    procedure, sfunction, aInterface, aExternalInterfaceReference, aInterfaceReference, sExternalInterfaceReference
} from "lib-pareto-typescript-project/dist/submodules/glossary/shorthands"

import * as g_glossary from "lib-pareto-typescript-project/dist/submodules/glossary"
const d = pd.d

export const $: g_glossary.T.Glossary<pd.SourceLocation> = {
    'glossary parameters': d({}),
    'imports': d({
        "common": imp(),
        "main": imp(),
        "mainlib": imp(),
    }),
    'root': {
        'namespaces': d({}),
        'types': d({
        }),
    },
    'asynchronous': {
        'interfaces': d({
            "HandleTestSet": aInterface(aInterfaceMethod(externalTypeReference("main", "TestSet"))),
        }),
        'algorithms': d({
            "CreateTester": constructor(aInterfaceReference("HandleTestSet"), {
                "log": aExternalInterfaceReference("mainlib", "Log"),
                "logError": aExternalInterfaceReference("mainlib", "Log"),
                "onTestErrors": aExternalInterfaceReference("mainlib", "Signal"),
            }),
        }),
    },
    'synchronous': {
        'interfaces': d({
        }),
        'algorithms': d({
            "SerializeSummary": procedure(data(externalTypeReference("main", "Summary")), sExternalInterfaceReference("common", "String")),
            //"SerializeTestSet": procedure(data(externalTypeReference("main", "TestSet")), sExternalInterfaceReference("common", "String")),
            "SerializeTestResult": procedure(data(externalTypeReference("main", "TestSetResult")), sExternalInterfaceReference("common", "String")),

            "Increment": sfunction(externalTypeReference("common", "Number"), data(externalTypeReference("common", "Number")),),
            "Summarize": sfunction(externalTypeReference("main", "Summary"), data(externalTypeReference("main", "TestSetResult"))),

        }),
    },
}