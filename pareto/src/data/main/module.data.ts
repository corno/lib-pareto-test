import * as pd from 'pareto-core-data'

import * as gproject from "lib-pareto-typescript-project/dist/submodules/project"

import { $ as api } from "./api.data"
import { $ as glossary } from "./glossary.data"

export const $: gproject.T.Module<pd.SourceLocation> = {
    'definition': {
        'glossary': glossary,
        'api': api,
    },
    'implementation': ['typescript', {}],
}