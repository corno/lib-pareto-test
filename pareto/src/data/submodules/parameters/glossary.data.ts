import * as pd from 'pareto-core-data'

import {
    aconstructor,
    aInterfaceMethod,
    aInterfaceReference,
    externalTypeReference,
    imp,
    sconstructor,
    sInterfaceMethod,
    sInterfaceReference,
    streamconsumer,
    typeReference,
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
            "ParametersHandler": aInterfaceMethod(externalTypeReference("main", "TestParameters")),
            "ErrorsHandler": streamconsumer(
                aInterfaceMethod(externalTypeReference("main", "ArgumentError")),
                aInterfaceMethod(null),
            ),
            "HandleArguments": streamconsumer(
                aInterfaceMethod(externalTypeReference("mainlib", "Arguments")),
                aInterfaceMethod(null)
            )
        }),
        'algorithms': d({
            "CreateTestParametersParser": aconstructor(aInterfaceReference("HandleArguments"), {
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