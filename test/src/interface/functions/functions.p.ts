import * as pt from "pareto-core-types"

import * as pub from "../../../../pub"


import * as test from "lib-pareto-test"
import { DDependencies } from "../dependencies/dependencies.p"

export type FCreateGetTestset = (
    $: null,
    $d: DDependencies,
    //$a: pt.ProcessAsyncValue
) => pub.FGetTestSet