import * as pd from 'pareto-core-data'


import { external, this_ } from "lib-pareto-typescript-project/dist/submodules/project/shorthands"
import * as gproject from "lib-pareto-typescript-project/dist/submodules/project"

import { $ as api } from "./api.data"
import { $ as glossary } from "./glossary.data"

const d = pd.d

export const $: gproject.T.Project._ltype.library.main<pd.SourceLocation> = {
    'definition': {
        'glossary': {
            'root': glossary,
            'imports': d({
                "diff": external("res-pareto-diff"),
                "common": external("glo-pareto-common"),
            }),
        },
        'api': {
            'root': api,

            'imports': d({
                "common": external("glo-pareto-common"),
                "main": external("res-pareto-main"),
                "this": this_(),
            }),
        },
    },
    'implementation': ['typescript', null],
}