import * as pd from 'pareto-core-data'

import * as g_project from "lib-pareto-typescript-project/dist/submodules/project"

import { $ as pure } from "./api.data"
import { $ as glossary } from "./glossary.data"

import { external, main, this_ } from "lib-pareto-typescript-project/dist/submodules/project/shorthands"

const d = pd.d

export const $: g_project.T.Module<pd.SourceLocation> = {
    'definition': {
        'glossary': {
            'root': glossary,

            'imports': d({
                "main": main(),
                "mainlib": external("res-pareto-main"),
                "common": external("glo-pareto-common"),
            }),
        },
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
    },
    'implementation': ['typescript', null],
}