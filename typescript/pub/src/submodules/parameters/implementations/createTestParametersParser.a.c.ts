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
                    let state: State = pl.notSet()
                    $.__forEach(($) => {
                        state.map(
                            ($) => {
                                $is.errorHandler.data(['too many', null])
                            },
                            () => {
                                state = pl.set($)
                             }
                        )
                    })
                    pl.cc($, ($) => {
                        state.map(
                            ($) => {
                                $is.handler({
                                    testDirectory: $,
                                })
                            },
                            () => {
                                $is.errorHandler.data(['missing', null])
                            }

                        )

                    })
                },
                'end': () => {
                    $is.errorHandler.end()
                }
            }
        }
    }
}