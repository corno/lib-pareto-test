import * as pd from 'pareto-core-data'

import * as gproject from "lib-pareto-typescript-project/dist/submodules/project"
import { $ as api } from "./api.data"

import { $ as private_ } from "./modules/private.data"

const d = pd.d

export const $: gproject.T.Project<pd.SourceLocation> = {
    'author': "Corno",
    'description': "the library needed to write tests for Pareto code",
    'license': "ISC",

    'dependencies': d({
        "glo-pareto-common": {},
        "lib-pareto-filesystem": {},
        "res-pareto-arithmetic": {},
        "res-pareto-boolean": {},
        "res-pareto-collation": {},
        "res-pareto-diff": {},
        "res-pareto-main": {},
    }),
    'type': ['library', {

        'main': {
            'definition': api,
        },
        'submodules': d({
            "private": {
                'definition': private_,
                'implemenation': {}
            }
        }),
        'executables': d({}),
        'test': {
            'dependencies': d({
                "res-pareto-build": {},
            }),
            'glossary': {
                'functions': d({}),
                'imports': d({}),
                'parameters': d({}),
                'types': d({}),
                'interfaces': d({}),
            },
        },
    }],
}