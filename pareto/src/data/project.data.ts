import * as pd from 'pareto-core-data'

import * as gproject from "lib-pareto-typescript-project/dist/submodules/project"
import * as gglossary from "lib-pareto-typescript-project/dist/submodules/glossary"

import { $ as main } from "./main/module.data"

import { $ as parameters } from "./submodules/parameters/module.data"
import { $ as private_ } from "./submodules/private/module.data"
import { $ as analyse } from "./submodules/analyse/module.data"

const d = pd.d

export const $: gproject.T.Project<pd.SourceLocation> = {
    'author': "Corno",
    'description': "the library needed to write tests for Pareto code",
    'license': "TBD",

    'dependencies': d({
        "glo-pareto-common": null,
        "lib-pareto-filesystem": null,
        "res-pareto-arithmetic": null,
        "res-pareto-boolean": null,
        "res-pareto-collation": null,
        "res-pareto-diff": null,
        "res-pareto-main": null,
    }),
    'type': ['library', {

        'main': main,
        'submodules': d({
            "parameters": parameters,
            "private": private_,
            "analyse": analyse,
        }),
        'executables': d({}),
        'test': {
            'dependencies': d({
                "res-pareto-build": null,
            }),
            'glossary': {
                'parameters': d({}),
                'types': d({}),
                'type': ['synchronous', {
                    'builders': d({}),
                    'functions': d<gglossary.T.Glossary._ltype.synchronous.functions.D<pd.SourceLocation>>({}),
                }],
            },
            'imports': d({}),

        },
    }],
}