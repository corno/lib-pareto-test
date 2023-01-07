import * as pl from "pareto-core-lib"

import * as mproject from "../../project"
import * as mfp from "lib-fountain-pen"
import * as mcoll from "res-pareto-collation"

import { icreateGlossarySerializer } from "../../glossary/implementations/createGlossarySerializer.p"
import { iserializeLeafType } from "../../glossary/implementations/serializeLeafType.p"

import { icreateProjectSerializer } from "../../project/implementations/createProjectSerializer.p"
import { icreateTemplateSerializer } from "../../project/implementations/createTemplateSerializer.p"

import { icreateConstructorSerializer } from "../../api/implementations/createConstructorSerializer.p"
import { icreateAlgorithmReferenceSerializer } from "../../api/implementations/createAlgorithmReferenceSerializer.p"
import { icreateModuleDefinitionSerializer } from "../../api/implementations/createModuleDefinitionSerializer.p"




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

    const sar = icreateAlgorithmReferenceSerializer(
        null,
        {
            serializeLeafType: iserializeLeafType,
        }
    )

    icreateProjectSerializer(
        null,
        {
            compare: mcoll.$a.localeIsABeforeB,
            serializeModuleDefinition: icreateModuleDefinitionSerializer(
                null,
                {
                    compare: mcoll.$a.localeIsABeforeB,
                    serializeGlossary: icreateGlossarySerializer(null, {
                        compare: mcoll.$a.localeIsABeforeB,
                    }),
                    serializeConstructor: icreateConstructorSerializer(null, {
                        compare: mcoll.$a.localeIsABeforeB,
                        serializeAlgorithmReference: sar,
                        serializeLeafType: iserializeLeafType,
                    }),
                    serializeAlgorithmReference: sar,

                }
            ),
            serializeLeafType: iserializeLeafType,
        }
    )(
        $.project,
        $i,
    )
    icreateTemplateSerializer(
        null,
        {
            compare: mcoll.$a.localeIsABeforeB,
        }
    )(
        $.project,
        $i,
    )
}
