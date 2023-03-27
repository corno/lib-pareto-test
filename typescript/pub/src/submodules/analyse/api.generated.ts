import * as pt from 'pareto-core-types'

import * as g_arithmetic from "res-pareto-arithmetic"
import * as g_boolean from "res-pareto-boolean"
import * as g_foreach from "res-pareto-foreach"
import * as g_main from "../../main"
import * as g_this from "./glossary"

export namespace D {
    
    
    export type serializeSummary = {
        readonly 'add': g_arithmetic.SYNC.A.F.Add
        readonly 'isZero': g_boolean.SYNC.A.F.IsZero
        readonly 'negate': g_arithmetic.SYNC.A.F.Negate
    }
    
    export type serializeTestResult = {
        readonly 'dictionaryForEach': g_foreach.SYNC.A.P.DictionaryForEach
    }
    
    export type summarize = {
        readonly 'increment': g_this.SYNC.A.F.Increment
    }
}

export namespace A {
    
    export type increment = () => g_this.SYNC.A.F.Increment
    
    export type serializeSummary = ($d: D.serializeSummary, ) => g_this.SYNC.A.P.SerializeSummary
    
    export type serializeTestResult = ($d: D.serializeTestResult, ) => g_this.SYNC.A.P.SerializeTestResult
    
    export type summarize = ($d: D.summarize, ) => g_this.SYNC.A.F.Summarize
}

export type API = {
    readonly 'increment': A.increment
    readonly 'serializeSummary': A.serializeSummary
    readonly 'serializeTestResult': A.serializeTestResult
    readonly 'summarize': A.summarize
}