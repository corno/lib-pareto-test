import * as pl from 'pareto-core-lib'
import * as pt from 'pareto-core-types'

import { A } from "../api.generated"

export const $$: A.createTestParametersParser = (
) => {
    return {
        'construct': ($is) => {
            return {
                'data': ($) => {
                    type State = pt.OptionalValue<string>
                    let state: State = [false]
                    $.__forEach(($) => {
                        if (state[0] === true) {
                            $is.errorHandler.data(['too many', null])
                        } else {
                            state = [true, $]
                        }
                    })
                    pl.cc($, ($) => {
                        pl.optional(
                            state,
                            ($) => {
                                $is.handler({
                                    testDirectory: $,
                                })
                            },
                            () => {
                                $is.errorHandler.data(['missing', null])
                            }

                        )
                        if (state === null) {
                        } else {
                        }

                    })
                },
                'end': () => {
                    $is.errorHandler.end()
                }
            }
        }
    }
}