import * as pd from 'pareto-core-data'

import * as g_project from "lib-pareto-typescript-project/dist/submodules/project"

import { $ as pure } from "./api.data"
import { $ as glossary } from "./glossary.data"

import { external, main, sibling, this_ } from "lib-pareto-typescript-project/dist/submodules/project/shorthands"

const d = pd.d

export const $: g_project.T.Module<pd.SourceLocation> = {
    'definition': {
        'glossary': {
            'root': glossary,

            'imports': d({
                "public": main(),
                "common": external("glo-pareto-common"),
                "main": external("res-pareto-main"),
            }),
        },
        'api': {
            'root': pure,
            'imports': d({
                "analyse": sibling("analyse"),
                "array": external("res-pareto-array"),
                //"public": main(),
                "boolean": external("res-pareto-boolean"),
                "diff": external("res-pareto-diff"),
                "fs": external("lib-pareto-filesystem"),
                "this": this_(),
            }),
        },
    },
    'implementation': ['typescript', null],
}