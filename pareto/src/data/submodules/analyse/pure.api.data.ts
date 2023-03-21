import * as pd from 'pareto-core-data'

import { functionReference, constructor, algorithm, typeReference } from "lib-pareto-typescript-project/dist/submodules/api/shorthands"

import * as gapi from "lib-pareto-typescript-project/dist/submodules/api"
const d = pd.d

export const $: gapi.T.API<pd.SourceLocation> = {
    'algorithms': d({
        "createTestResultSerializer": algorithm(functionReference("this", {}, "SerializeTestResult"), constructor(null, {
            "isABeforeB": functionReference("collation", {}, "IsABeforeB"),
        })),
        "createSummarizer": algorithm(functionReference("this", {}, "Summarize"), constructor(null, {
            "increment": functionReference("this", {}, "Increment"),
        })),
        "createSummarySerializer": algorithm(functionReference("this", {}, "SerializeSummary"), constructor(null, {
            "add": functionReference("arithmetic", {}, "Add"),
            "isZero": functionReference("boolean", {}, "IsZero"),
            "negate": functionReference("arithmetic", {}, "Negate"),
        })),
        "increment": algorithm(functionReference("this", {}, "Increment")),
    }),
}