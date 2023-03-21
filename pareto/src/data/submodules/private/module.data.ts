import * as pd from 'pareto-core-data'

import * as gproject from "lib-pareto-typescript-project/dist/submodules/project"

import { $ as bindings } from "./bindings.api.data"
import { $ as pure } from "./pure.api.data"
import { $ as glossary } from "./glossary.data"

import { external, main, sibling, this_ } from "lib-pareto-typescript-project/dist/submodules/project/shorthands"

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
    'bindings': [true, {
        'api': {
            'root': bindings,
            'imports': d({
                "analyse": sibling("analyse"),
            }),
        },
        'implementation': ['typescript', null],

    }],
    'pure algorithms': {
        'api': {
            'root': pure,
            'imports': d({
                "analyse": sibling("analyse"),
                //"public": main(),
                "arithmetic": external("res-pareto-arithmetic"),
                "boolean": external("res-pareto-boolean"),
                "collation": external("res-pareto-collation"),
                "common": external("glo-pareto-common"),
                "diff": external("res-pareto-diff"),
                "fs": external("lib-pareto-filesystem"),
                "this": this_(),
            }),
        },
        'implementation': ['typescript', null],
    },
}