import { API } from "./api.generated"
import { $$ as iincrement } from "./implementations/increment.s.f"
import { $$ as iserializeSummary } from "./implementations/serializeSummary.s.p"
import { $$ as iserializeTestResult } from "./implementations/serializeTestResult.s.p"
import { $$ as isummarize } from "./implementations/summarize.s.f"

export const $api: API = {
    'increment': iincrement,
    'serializeSummary': iserializeSummary,
    'serializeTestResult': iserializeTestResult,
    'summarize': isummarize,
}