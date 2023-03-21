import * as pd from 'pareto-core-data'


import { external, submodule, this_ } from "lib-pareto-typescript-project/dist/submodules/project/shorthands"
import * as g_project from "lib-pareto-typescript-project/dist/submodules/project"

import { $ as pure } from "./api.data"

import { $ as glossary } from "./glossary.data"


const d = pd.d

export const $: g_project.T.Module<pd.SourceLocation> = {
    'definition': {
        'glossary': {
            'root': glossary,
            'imports': d({
                "diff": external("res-pareto-diff"),
                "common": external("glo-pareto-common"),
                "main": external("res-pareto-main"),
            }),
        },
        'api': {
            'root': pure,

            'imports': d({
                "analyse": submodule("analyse"),
                "parameters": submodule("parameters"),
                "this": this_(),
                "main": external("res-pareto-main")
            }),
        },
    },
    'implementation': ['typescript', null],
}