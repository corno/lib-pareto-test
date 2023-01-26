import * as pt from 'pareto-core-types'

import * as mcommon from "glo-pareto-common"
import * as mdiff from "res-pareto-diff"

export namespace GArgumentError {}
export type GArgumentError = 
    | ['missing', null]
    | ['too many', null]
export type UArgumentError = GArgumentError

export namespace GSummary {}
export type GSummary = {
    readonly 'numberOfErrors': number
    readonly 'numberOfTests': number
}
export type USummary = GSummary

export namespace GTestElement {
    
    export namespace Ptype {
        
        export namespace Otest {
            
            export namespace Ptype {
                
                export namespace Olong__string {}
                export type Olong__string = {
                    readonly 'actual': string
                    readonly 'expected': string
                }
                
                export namespace Oshort__string {}
                export type Oshort__string = {
                    readonly 'actual': string
                    readonly 'expected': string
                }
            }
            export type Ptype = 
                | ['boolean', boolean]
                | ['file string', UValidateFileData]
                | ['long string', Ptype.Olong__string]
                | ['short string', Ptype.Oshort__string]
        }
        export type Otest = {
            readonly 'type': Otest.Ptype
        }
    }
    export type Ptype = 
        | ['subset', UTestSet]
        | ['test', Ptype.Otest]
}
export type GTestElement = {
    readonly 'type': GTestElement.Ptype
}
export type UTestElement = GTestElement

export namespace GTestElementResult {
    
    export namespace Ptype {
        
        export namespace Otest {}
        export type Otest = {
            readonly 'success': boolean
            readonly 'type': UTestType
        }
    }
    export type Ptype = 
        | ['subset', UTestSetResult]
        | ['test', Ptype.Otest]
}
export type GTestElementResult = {
    readonly 'type': GTestElementResult.Ptype
}
export type UTestElementResult = GTestElementResult

export namespace GTestParameters {}
export type GTestParameters = {
    readonly 'testDirectory': string
}
export type UTestParameters = GTestParameters

export namespace GTestSet {
    
    export namespace Pelements {}
    export type Pelements = pt.Dictionary<UTestElement>
}
export type GTestSet = {
    readonly 'elements': GTestSet.Pelements
}
export type UTestSet = GTestSet

export namespace GTestSetResult {
    
    export namespace Pelements {}
    export type Pelements = pt.Dictionary<UTestElementResult>
}
export type GTestSetResult = {
    readonly 'elements': GTestSetResult.Pelements
}
export type UTestSetResult = GTestSetResult

export namespace GTestType {
    
    export namespace Ofile__string {
        
        export namespace Pparts {}
        export type Pparts = pt.Array<mdiff.TMultilinePart>
    }
    export type Ofile__string = {
        readonly 'fileLocation': string
        readonly 'parts': Ofile__string.Pparts
    }
    
    export namespace Olong__string {
        
        export namespace Pparts {}
        export type Pparts = pt.Array<mdiff.TMultilinePart>
    }
    export type Olong__string = {
        readonly 'parts': Olong__string.Pparts
    }
    
    export namespace Oshort__string {}
    export type Oshort__string = {
        readonly 'actual': string
        readonly 'expected': string
    }
}
export type GTestType = 
    | ['boolean', null]
    | ['file string', GTestType.Ofile__string]
    | ['long string', GTestType.Olong__string]
    | ['short string', GTestType.Oshort__string]
export type UTestType = GTestType

export namespace GValidateFileData {
    
    export namespace PexpectedFile {}
    export type PexpectedFile = {
        readonly 'extension': string
        readonly 'fileName': string
        readonly 'path': mcommon.TPath
    }
}
export type GValidateFileData = {
    readonly 'actual': string
    readonly 'expectedFile': GValidateFileData.PexpectedFile
}
export type UValidateFileData = GValidateFileData