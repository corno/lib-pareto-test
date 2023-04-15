import * as pd from 'pareto-core-data'

import * as g_project from "lib-pareto-typescript-project/dist/submodules/project"
import * as g_glossary from "lib-pareto-typescript-project/dist/submodules/glossary"

import { $ as main_ } from "./main/module.data"

import { $ as bindings } from "./bindings.api.data"

import { $ as parameters } from "./submodules/parameters/module.data"
import { $ as private_ } from "./submodules/private/module.data"
import { $ as analyse } from "./submodules/analyse/module.data"
import { submodule, main, external } from "lib-pareto-typescript-project/dist/submodules/project/shorthands"

const d = pd.d

export const $: g_project.T.Project<pd.SourceLocation> = {
    'author': "Corno",
    'description': "the library needed to write tests for Pareto code",
    'license': "TBD",

    'dependencies': d({
        "glo-pareto-common": null,
        "lib-pareto-filesystem": null,
        "res-pareto-arithmetic": null,
        "res-pareto-array": null,
        "res-pareto-boolean": null,
        "res-pareto-collation": null,
        "res-pareto-diff": null,
        "res-pareto-foreach": null,
        "res-pareto-main": null,
    }),
    'type': ['library', {
        'main': main_,
        'submodules': d({
            "parameters": parameters,
            "private": private_,
            "analyse": analyse,
        }),
        'bindings': [true, {
            'definition': {
                'glossary': {
                    'root': {
                        'parameters': d({}),
                        'imports': d({}),
                        'root': {
                            'namespaces': d({}),
                            'types': d({}),
                        },
                        'asynchronous': {
                            'interfaces': d({}),
                            'algorithms': d({}),
                        },
                        'synchronous': {
                            'interfaces': d({}),
                            'algorithms': d({}),
                        },
                    },
                    'imports': d({}),
                },
                'api': {
                    'root': bindings,
                    'imports': d({
                        "main": external("res-pareto-main"),
                        "main2": main(),
                    }),
                },

            },
            'implementation': ['typescript', null],

        }],
        'executables': d({}),
        'test': {
            'dependencies': d({
                "res-pareto-build": null
            }),
            'definition': {
                'glossary': {
                    'root': {
                        'parameters': d({}),
                        'imports': d({}),
                        'root': {
                            'namespaces': d({}),
                            'types': d({}),
                        },
                        'asynchronous': {
                            'interfaces': d({}),
                            'algorithms': d({}),
                        },
                        'synchronous': {
                            'interfaces': d({}),
                            'algorithms': d({}),
                        },
                    },
                    'imports': d({}),
                },
                'api': {
                    'root': {
                        'algorithms': d({}),
                    },
                    'imports': d({}),
                },
            },
            'imports': d({}),
        }
    }],
}