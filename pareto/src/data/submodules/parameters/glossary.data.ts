import * as pd from 'pareto-core-data'

import {
    constructor,
    aInterfaceMethod,
    aInterfaceReference,
    externalTypeReference,
    imp, streamconsumer, aInterface
} from "lib-pareto-typescript-project/dist/submodules/glossary/shorthands"

import * as g_glossary from "lib-pareto-typescript-project/dist/submodules/glossary"
const d = pd.d

export const $: g_glossary.T.Glossary<pd.SourceLocation> = {
    'parameters': d({}),
    'types': d({
    }),
    'imports': d({
        "main": imp({}),
        "mainlib": imp({}),
    }),
    'asynchronous': {
        'interfaces': d({
            "ParametersHandler": aInterface(aInterfaceMethod(externalTypeReference("main", "TestParameters"))),
            "ErrorsHandler": aInterface(streamconsumer(
                aInterfaceMethod(externalTypeReference("main", "ArgumentsError")),
                aInterfaceMethod(null),
            )),
            "HandleArguments": aInterface(streamconsumer(
                aInterfaceMethod(externalTypeReference("mainlib", "Arguments")),
                aInterfaceMethod(null)
            ))
        }),
        'algorithms': d({
            "CreateTestParametersParser": constructor(aInterfaceReference("HandleArguments"), {
                "handler": aInterfaceReference("ParametersHandler"),
                "errorHandler": aInterfaceReference("ErrorsHandler"),
            }),
        }),
    },
    'synchronous': {
        'interfaces': d({
        }),
        'algorithms': d({
        }),
    },

}