import * as pr from 'pareto-core-raw'

import * as mproject from "lib-pareto-typescript-project/dist/modules/project"
import { $ as api } from "./api.p"

import { $ as private_ } from "./modules/private.p"

const d = pr.wrapRawDictionary

export const $: mproject.TProject = {
    'name': "lib-pareto-test",

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