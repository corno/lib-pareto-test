import * as pt from 'pareto-core-types'

import * as g_arithmetic from "res-pareto-arithmetic"
import * as g_boolean from "res-pareto-boolean"
import * as g_foreach from "res-pareto-foreach"
import * as g_main from "../../main"
import * as g_this from "./glossary"

export namespace A {
    
    export type increment = () => g_this.SYNC.A.F.Increment
    
    export type serializeSummary = ($d: {
        readonly 'add': g_arithmetic.SYNC.A.F.Add
        readonly 'isZero': g_boolean.SYNC.A.F.IsZero
        readonly 'negate': g_arithmetic.SYNC.A.F.Negate
    }, ) => g_this.SYNC.A.P.SerializeSummary
    
    export type serializeTestResult = ($d: {
        readonly 'dictionaryForEach': g_foreach.SYNC.A.P.DictionaryForEach
    }, ) => g_this.SYNC.A.P.SerializeTestResult
    
    export type summarize = ($d: {
        readonly 'increment': g_this.SYNC.A.F.Increment
    }, ) => g_this.SYNC.A.F.Summarize
}

export type API = {
    readonly 'increment': A.increment
    readonly 'serializeSummary': A.serializeSummary
    readonly 'serializeTestResult': A.serializeTestResult
    readonly 'summarize': A.summarize
}