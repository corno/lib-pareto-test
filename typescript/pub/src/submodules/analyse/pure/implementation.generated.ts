import { API } from "./api.generated"
import { $$ as icreateSummarizer } from "./implementations/createSummarizer.p"
import { $$ as icreateSummarySerializer } from "./implementations/createSummarySerializer.p"
import { $$ as icreateTestResultSerializer } from "./implementations/createTestResultSerializer.p"
import { $$ as iincrement } from "./implementations/increment.p"

export const $api: API = {
    'createSummarizer': icreateSummarizer,
    'createSummarySerializer': icreateSummarySerializer,
    'createTestResultSerializer': icreateTestResultSerializer,
    'increment': iincrement,
}