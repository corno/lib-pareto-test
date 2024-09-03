import * as pt from 'pareto-core-types'
import * as pl from 'pareto-core-lib'
import * as pa from 'pareto-core-async'
import * as pm from 'pareto-core-map'

import * as g_main from "../../../main"

import { A } from "../api.generated"

/*temp*/
function wrapRawOptionalValue<T>(
    $: pt.RawOptionalValue<T>,
): pt.OptionalValue<T> {
    if ($[0] === false) {
        return pl.notSet()
    } else {
        return pl.set($[1])
    }

}

export const $$: A.createTestRunner = ($d) => {
    return ($) => {
        function doTestSet($: g_main.T.TestSet): pt.AsyncValue<g_main.T.TestSetResult> {
            return $.elements.asyncMap(($): pt.AsyncValue<g_main.T.TestElementResult> => {
                switch ($.type[0]) {
                    case 'subset': return pl.ss($.type, ($) => doTestSet($).map(($) => pa.asyncValue<g_main.T.TestElementResult>({
                        type: ['subset', $]
                    })))
                    case 'test': return pl.ss($.type, ($): pt.AsyncValue<g_main.T.TestElementResult> => {
                        switch ($.type[0]) {
                            case 'boolean': return pl.ss($.type, ($) => pa.asyncValue({
                                type: ['test', {
                                    success: $,
                                    type: ['boolean', null]
                                }]
                            }))
                            case 'file string': return pl.ss($.type, ($) => $d.validateFile($,))
                            case 'long string': return pl.ss($.type, ($) => wrapRawOptionalValue(
                                $d.diffData(
                                    {
                                        originalData: $.expected,
                                        changedData: $.actual,
                                        newline: "\n",
                                    }
                                )).map(
                                    ($): pt.AsyncValue<g_main.T.TestElementResult> => pa.asyncValue({
                                        type: ['test', {
                                            success: false,
                                            type: ['long string', {
                                                parts: $
                                            }]
                                        }]
                                    }),
                                    () => pa.asyncValue({
                                        type: ['test', {
                                            success: true,
                                            type: ['long string', {
                                                parts: pm.wrapRawArray([])
                                            }]
                                        }]
                                    })
                                )
                            )
                            case 'short string': return pl.ss($.type, ($) => pa.asyncValue({
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
                            }))
                            default: return pl.au($.type[0])
                        }
                    })
                    default: return pl.au($.type[0])
                }
            }).map(($) => pa.asyncValue({
                elements: $
            }))
        }
        return doTestSet($)
    }
}