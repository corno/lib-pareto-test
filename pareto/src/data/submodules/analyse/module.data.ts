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
                "main": main(),
                "arithmetic": external("res-pareto-arithmetic"),
                "boolean": external("res-pareto-boolean"),
                "foreach": external("res-pareto-foreach"),
                "this": this_(),
            }),
        },
    },
    'implementation': ['typescript', null],
}