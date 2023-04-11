import * as pl from 'pareto-core-lib'

import * as a_analyse from "../../submodules/analyse"
import * as a_arithmetic from "res-pareto-arithmetic"
import * as a_boolean from "res-pareto-boolean"
import * as a_collation from "res-pareto-collation"
import * as a_diff from "res-pareto-diff"
import * as a_foreach from "res-pareto-foreach"
import * as a_fs from "lib-pareto-filesystem"
import * as a_fserror from "lib-pareto-filesystem/dist/submodules/errorhandlers"
import * as a_fsr from "res-pareto-filesystem"
import * as a_main from "../../main"
import * as a_mainlib from "res-pareto-main"
import * as a_parameters from "../../submodules/parameters"
import * as a_private from "../../submodules/private"

import { A } from "../api.generated"

export const $$: A.createTestProgram = ($d) => {
    return {
        'construct': () => {
            const errorLogger = a_mainlib.$r.createErrorLogger()
            const logger = a_mainlib.$r.createLogger()
            const failedFlagger = a_mainlib.$r.setExitCodeToFailed()
            return a_main.$a.createTestProgram({
                'createTester': a_private.$a.createTester({
                    'isZero': a_boolean.$r.isZero(),
                    'runTests': a_private.$a.createTestRunner({
                        'diffData': a_diff.$r.diffData(),
                        'stringsAreEqual': a_diff.$r.stringsAreEqual(),
                        'validateFile': a_private.$a.validateFile({
                            'diffData': a_diff.$r.diffData(),
                            'readFile': () => {
                                pl.panic("SFSDFSDF")
                            },
                        }, {
                            'unlink': a_fs.$a.createUnlinkFireAndForget({
                                'unlink': a_fsr.$r.unlink()
                            })({
                                'errorHandler': a_fserror.$a.unlink()({
                                    'handler': errorLogger().data
                                }),
                            }),
                            'writeFile': a_fs.$a.createWriteFileFireAndForget({
                                'createFileWriter': a_fsr.$r.createFileWriter()
                            })({
                                'errorHandler': a_fserror.$a.writeFile()({
                                    'handler': errorLogger().data
                                }),
                            }),
                        }),
                    }),
                    'serializeSummary': a_analyse.$a.serializeSummary({
                        'add': a_arithmetic.$r.add(),
                        'isZero': a_boolean.$r.isZero(),
                        'negate': a_arithmetic.$r.negate(),
                    }),
                    'serializeTestResult': a_analyse.$a.serializeTestResult({
                        'dictionaryForEach': a_foreach.$r.createDictionaryForEach({
                            'compare': a_collation.$r.localeIsABeforeB(),
                        })
                    }),
                    'summarize': a_analyse.$a.summarize({
                        'increment': a_analyse.$a.increment()
                    })
                }),
                'createTestParametersParser': a_parameters.$a.createTestParametersParser(),
                'getTestSet': $d.getTestSet,
            })({
                'log': logger(),
                'logErrors': errorLogger(),
                'reportFailed': failedFlagger(),
            })
        }
    }
}