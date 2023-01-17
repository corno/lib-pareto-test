import * as pr from 'pareto-core-raw'

import * as mproject from "lib-pareto-typescript-project/dist/modules//project"
import { $ as api } from "./api.p"

import { $ as private_ } from "./modules/private.p"

const d = pr.wrapRawDictionary

export const $: mproject.TProject = {
    'modules': d({
        "public": {
            'definition': api,
            'implementation': {}
        },
        "private": {
            'definition': private_,
            'implemenation': {}
        }
    }),
    'main': "public"
}