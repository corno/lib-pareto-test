import * as pr from 'pareto-core-raw'

import * as mproject from "lib-pareto-typescript-project/dist/submodules/project"
import { $ as api } from "./api.data"

import { $ as private_ } from "./modules/private.data"

const d = pr.wrapRawDictionary

export const $: mproject.TProject = {
    'author': "Corno",
    'description': "the library needed to write tests for Pareto code",
    'license': "ISC",

    'pubdependencies': d({
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
        'test': {
            'dependencies': d({
            }),
        },
    }],
}