import * as pd from 'pareto-core-data'

import * as mproject from "lib-pareto-typescript-project/dist/submodules/project"
import { $ as api } from "./api.data"

import { $ as private_ } from "./modules/private.data"

const d = pd.wrapRawDictionary

export const $: mproject.T.Project = {
    'author': "Corno",
    'description': "the library needed to write tests for Pareto code",
    'license': "ISC",

    'dependencies': d({
        "glo-pareto-common": {},
        "lib-pareto-filesystem": {},
        "lib-pareto-main": {},
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