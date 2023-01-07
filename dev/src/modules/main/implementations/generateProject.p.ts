import * as pl from "pareto-core-lib"

import * as mproject from "../../project"
import * as mfp from "lib-fountain-pen"
import * as mcoll from "res-pareto-collation"

import { createGlossarySerializer } from "../../glossary/implementations/createGlossarySerializer.p"
import { serializeLeafType } from "../../glossary/implementations/serializeLeafType.p"

import { createProjectSerializer } from "../../project/implementations/createProjectSerializer.p"
import { createTemplateSerializer } from "../../project/implementations/createTemplateSerializer.p"

import { createConstructorSerializer } from "../../api/implementations/createConstructorSerializer.p"
import { createAlgorithmReferenceSerializer } from "../../api/implementations/createAlgorithmReferenceSerializer.p"
import { createModuleDefinitionSerializer } from "../../api/implementations/createModuleDefinitionSerializer.p"




export function generateProject($: mproject.TProjectSettings): void {
    const $i = mfp.$a.createWriter(
        {
            path: $.path,
            configuration: mfp._defaultSettings,
        },
        {
            onError: ($) => {
                pl.logDebugMessage("ERROR!!!")
            }
        },
    )

    const sar = createAlgorithmReferenceSerializer(
        null,
        {
            serializeLeafType: serializeLeafType,
        }
    )

    createProjectSerializer(
        null,
        {
            compare: mcoll.$a.localeIsABeforeB,
            serializeModuleDefinition: createModuleDefinitionSerializer(
                null,
                {
                    compare: mcoll.$a.localeIsABeforeB,
                    serializeGlossary: createGlossarySerializer(null, {
                        isABeforeB: mcoll.$a.localeIsABeforeB,
                    }),
                    serializeConstructor: createConstructorSerializer(null, {
                        compare: mcoll.$a.localeIsABeforeB,
                        serializeAlgorithmReference: sar,
                        serializeLeafType: serializeLeafType,
                    }),
                    serializeAlgorithmReference: sar,

                }
            ),
            serializeLeafType: serializeLeafType,
        }
    )(
        $.project,
        $i,
    )
    createTemplateSerializer(
        null,
        {
            compare: mcoll.$a.localeIsABeforeB,
        }
    )(
        $.project,
        $i,
    )
}
