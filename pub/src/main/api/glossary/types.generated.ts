import * as pt from 'pareto-core-types'

import * as mcommon from "glo-pareto-common"
import * as mdiff from "res-pareto-diff"

export namespace T {
    
    export namespace ArgumentError {
        
        export type missing = null
        
        export type too__many = null
    }
    
    export type ArgumentError = 
        | ['missing', null]
        | ['too many', null]
    
    export namespace Summary {
        
        export type numberOfErrors = number
        
        export type numberOfTests = number
    }
    
    export type Summary = {
        readonly 'numberOfErrors': number
        readonly 'numberOfTests': number
    }
    
    export namespace TestElement {
        
        export namespace _ltype {
            
            export type subset = T.TestSet
            
            export namespace test {
                
                export namespace _ltype {
                    
                    export type _lboolean = boolean
                    
                    export type file__string = T.ValidateFileData
                    
                    export namespace long__string {
                        
                        export type actual = string
                        
                        export type expected = string
                    }
                    
                    export type long__string = {
                        readonly 'actual': string
                        readonly 'expected': string
                    }
                    
                    export namespace short__string {
                        
                        export type actual = string
                        
                        export type expected = string
                    }
                    
                    export type short__string = {
                        readonly 'actual': string
                        readonly 'expected': string
                    }
                }
                
                export type _ltype = 
                    | ['boolean', boolean]
                    | ['file string', T.ValidateFileData]
                    | ['long string', {
                        readonly 'actual': string
                        readonly 'expected': string
                    }]
                    | ['short string', {
                        readonly 'actual': string
                        readonly 'expected': string
                    }]
            }
            
            export type test = {
                readonly 'type': 
                    | ['boolean', boolean]
                    | ['file string', T.ValidateFileData]
                    | ['long string', {
                        readonly 'actual': string
                        readonly 'expected': string
                    }]
                    | ['short string', {
                        readonly 'actual': string
                        readonly 'expected': string
                    }]
            }
        }
        
        export type _ltype = 
            | ['subset', T.TestSet]
            | ['test', {
                readonly 'type': 
                    | ['boolean', boolean]
                    | ['file string', T.ValidateFileData]
                    | ['long string', {
                        readonly 'actual': string
                        readonly 'expected': string
                    }]
                    | ['short string', {
                        readonly 'actual': string
                        readonly 'expected': string
                    }]
            }]
    }
    
    export type TestElement = {
        readonly 'type': 
            | ['subset', T.TestSet]
            | ['test', {
                readonly 'type': 
                    | ['boolean', boolean]
                    | ['file string', T.ValidateFileData]
                    | ['long string', {
                        readonly 'actual': string
                        readonly 'expected': string
                    }]
                    | ['short string', {
                        readonly 'actual': string
                        readonly 'expected': string
                    }]
            }]
    }
    
    export namespace TestElementResult {
        
        export namespace _ltype {
            
            export type subset = T.TestSetResult
            
            export namespace test {
                
                export type success = boolean
                
                export type _ltype = T.TestType
            }
            
            export type test = {
                readonly 'success': boolean
                readonly 'type': T.TestType
            }
        }
        
        export type _ltype = 
            | ['subset', T.TestSetResult]
            | ['test', {
                readonly 'success': boolean
                readonly 'type': T.TestType
            }]
    }
    
    export type TestElementResult = {
        readonly 'type': 
            | ['subset', T.TestSetResult]
            | ['test', {
                readonly 'success': boolean
                readonly 'type': T.TestType
            }]
    }
    
    export namespace TestParameters {
        
        export type testDirectory = string
    }
    
    export type TestParameters = {
        readonly 'testDirectory': string
    }
    
    export namespace TestSet {
        
        export namespace elements {
            
            export type D = T.TestElement
        }
        
        export type elements = pt.Dictionary<T.TestElement>
    }
    
    export type TestSet = {
        readonly 'elements': pt.Dictionary<T.TestElement>
    }
    
    export namespace TestSetResult {
        
        export namespace elements {
            
            export type D = T.TestElementResult
        }
        
        export type elements = pt.Dictionary<T.TestElementResult>
    }
    
    export type TestSetResult = {
        readonly 'elements': pt.Dictionary<T.TestElementResult>
    }
    
    export namespace TestType {
        
        export type _lboolean = null
        
        export namespace file__string {
            
            export type fileLocation = string
            
            export namespace parts {
                
                export type A = mdiff.T.MultilinePart
            }
            
            export type parts = pt.Array<mdiff.T.MultilinePart>
        }
        
        export type file__string = {
            readonly 'fileLocation': string
            readonly 'parts': pt.Array<mdiff.T.MultilinePart>
        }
        
        export namespace long__string {
            
            export namespace parts {
                
                export type A = mdiff.T.MultilinePart
            }
            
            export type parts = pt.Array<mdiff.T.MultilinePart>
        }
        
        export type long__string = {
            readonly 'parts': pt.Array<mdiff.T.MultilinePart>
        }
        
        export namespace short__string {
            
            export type actual = string
            
            export type expected = string
        }
        
        export type short__string = {
            readonly 'actual': string
            readonly 'expected': string
        }
    }
    
    export type TestType = 
        | ['boolean', null]
        | ['file string', {
            readonly 'fileLocation': string
            readonly 'parts': pt.Array<mdiff.T.MultilinePart>
        }]
        | ['long string', {
            readonly 'parts': pt.Array<mdiff.T.MultilinePart>
        }]
        | ['short string', {
            readonly 'actual': string
            readonly 'expected': string
        }]
    
    export namespace ValidateFileData {
        
        export type actual = string
        
        export namespace expectedFile {
            
            export type extension = string
            
            export type fileName = string
            
            export type path = mcommon.T.Path
        }
        
        export type expectedFile = {
            readonly 'extension': string
            readonly 'fileName': string
            readonly 'path': mcommon.T.Path
        }
    }
    
    export type ValidateFileData = {
        readonly 'actual': string
        readonly 'expectedFile': {
            readonly 'extension': string
            readonly 'fileName': string
            readonly 'path': mcommon.T.Path
        }
    }
}