import * as pd from 'pareto-core-data'

import { algorithm, dependent, procedure, sfunction } from "lib-pareto-typescript-project/dist/submodules/project/shorthands"

import * as g_project from "lib-pareto-typescript-project/dist/submodules/project"
const d = pd.d

export const $: g_project.T.ModuleDefinition.api.root<pd.SourceLocation> = {
    'algorithms': d({
        "serializeTestResult": algorithm(procedure("this", {}, "SerializeTestResult"), {}, dependent(null, {
            "dictionaryForEach": procedure("foreach", { "T": "g_main.T.TestSetResult.elements.D"}, "DictionaryForEach"),
        }, {})),
        "summarize": algorithm(sfunction("this", {}, "Summarize"), {},  dependent(null, {
            "increment": sfunction("this", {}, "Increment"),
        }, {})),
        "serializeSummary": algorithm(procedure("this", {}, "SerializeSummary"), {}, dependent(null, {
            "add": sfunction("arithmetic", {}, "Add"),
            "isZero": sfunction("boolean", {}, "IsZero"),
            "negate": sfunction("arithmetic", {}, "Negate"),
        }, {})),
        "increment": algorithm(sfunction("this", {}, "Increment")),
    }),
}