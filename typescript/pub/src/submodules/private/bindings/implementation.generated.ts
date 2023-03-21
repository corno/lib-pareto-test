import { API } from "./api.generated"
import { $$ as itest } from "./implementations/test.p"

export const $api: API = {
    'test': itest,
}