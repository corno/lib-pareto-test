import * as pd from 'pareto-core-data'

import * as gproject from "lib-pareto-typescript-project/dist/submodules/project"

import { $ as pure } from "./pure.api.data"
import { $ as glossary } from "./glossary.data"

import { external, main, this_ } from "lib-pareto-typescript-project/dist/submodules/project/shorthands"

const d = pd.d

export const $: gproject.T.Project._ltype.library.submodules.D<pd.SourceLocation> = {
    'glossary': {
        'root': glossary,

        'imports': d({
            "public": main(),
            "common": external("glo-pareto-common"),
            "main": external("res-pareto-main"),
        }),
    },
    'bindings': [false],
    'pure algorithms': {
        'api': {
            'root': pure,
            'imports': d({
                "common": external("glo-pareto-common"),
                //"public": main(),
                "arithmetic": external("res-pareto-arithmetic"),
                "collation": external("res-pareto-collation"),
                "boolean": external("res-pareto-boolean"),
                "diff": external("res-pareto-diff"),
                "fs": external("lib-pareto-filesystem"),
                "this": this_(),
            }),
        },
        'implementation': ['typescript', null],
    },
}