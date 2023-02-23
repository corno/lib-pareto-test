import * as pt from 'pareto-core-types'
import * as pl from 'pareto-core-lib'
import * as pa from 'pareto-core-async'
import * as pm from 'pareto-core-map'

import * as mapi from "../api"
import * as mpublic from "../../../main"

export const $$: mapi.CcreateTestRunner = ($d) => {
    return ($) => {
        function doTestSet($: mpublic.T.TestSet): pt.AsyncValue<mpublic.T.TestSetResult> {
            return $.elements.asyncMap(($): pt.AsyncValue<mpublic.T.TestElementResult> => {
                switch ($.type[0]) {
                    case 'subset':
                        return pl.cc($.type[1], ($) => {
                            return doTestSet($).map(($) => {
                                return pa.asyncValue<mpublic.T.TestElementResult>({
                                    type: ['subset', $]
                                })
                            })
                        })
                    case 'test':
                        return pl.cc($.type[1], ($): pt.AsyncValue<mpublic.T.TestElementResult> => {

                            switch ($.type[0]) {
                                case 'boolean':
                                    return pl.cc($.type[1], ($) => {
                                        return pa.asyncValue({
                                            type: ['test', {
                                                success: $,
                                                type: ['boolean', null]
                                            }]
                                        })
                                    })
                                case 'file string':
                                    return pl.cc($.type[1], ($) => {
                                        return $d.validateFile(
                                            $,
                                        )
                                    })
                                case 'long string':
                                    return pl.cc($.type[1], ($) => {
                                        const res = $d.diffData(
                                            {
                                                originalData: $.expected,
                                                changedData: $.actual,
                                                newline: "\n",
                                            }
                                        )
                                        if (res[0] === true) {

                                            return pa.asyncValue({
                                                type: ['test', {
                                                    success: false,
                                                    type: ['long string', {
                                                        parts: res[1]
                                                    }]
                                                }]
                                            })
                                        } else {

                                            return pa.asyncValue({
                                                type: ['test', {
                                                    success: true,
                                                    type: ['long string', {
                                                        parts: pm.wrapRawArray([])
                                                    }]
                                                }]
                                            })
                                        }
                                    })
                                case 'short string':
                                    return pl.cc($.type[1], ($) => {
                                        return pa.asyncValue({
                                            type: ['test', {
                                                success: $d.stringsAreEqual({
                                                    a: $.actual,
                                                    b: $.expected,
                                                }),
                                                type: ['short string', {
                                                    actual: $.actual,
                                                    expected: $.expected,
                                                }]
                                            }]
                                        })
                                    })
                                default: return pl.au($.type[0])
                            }
                        })
                    default: return pl.au($.type[0])
                }
            }).map(($) => {
                return pa.asyncValue({
                    elements: $
                })
            })
        }
        return doTestSet($)
    }
}