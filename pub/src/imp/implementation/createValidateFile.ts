// import * as pt from "pareto-core-types"
// import * as pl from "pareto-core-lib"

// import { File, WriteFile, Unlink } from "api-pareto-handledfilesystem"

// import * as pa from "pareto-core-async"
// import * as diff from "api-pareto-diff"
// import * as ta from "../../interface"

// // export function createValidateFile(
// //     file: File,
// //     writeFile: WriteFile,
// //     unlink: Unlink,
// //     diffLines: diffAPI.DiffLines,
// //     asyncValue: afAPI.Value,
// // ): ta.ValidateFile {
// export function validateFile(
//     $: {
//         path: string,
//         fileName: string,
//         extension: string,
//         actualData: string,
//     },
//     $r: {
//         file: File
//         writeFile: WriteFile
//         unlink: Unlink
//         startAsync: ($: pt.AsyncNonValue) => void
//         diffData: diff.DiffData
//     }
// ): pt.AsyncValue<ta.TTestElement> {
//     const expectedFileName = `${$.fileName}.expected.${$.extension}`
//     return pa.rewrite(
//         $r.file(
//             {
//                 path: [$.path, expectedFileName]
//             },
//             {},
//         ),

//         (expectedData): pt.AsyncValue<ta.TTestElement> => {
//             const actualFileName = `${$.fileName}.actual.${$.extension}`
//             if ($.actualData !== expectedData) {
//                 $r.startAsync(
//                     $r.writeFile(
//                         {
//                             path: [$.path, actualFileName],
//                             data: $.actualData
//                         },
//                         {}
//                     )
//                 )
//                 return pa.value({
//                     type: ["test", {
//                         success: false,
//                         type: ["large string", {
//                             fileLocation: `${$.path}/${expectedFileName}`,
//                             parts: $r.diffData(
//                                 {
//                                     originalData: expectedData,
//                                     changedData: $.actualData,
//                                     newline: "\n",
//                                 },
//                             )
//                         }]
//                     }]
//                 })

//             } else {
//                 $r.startAsync(
//                     $r.unlink(
//                         {
//                             path: [$.path, actualFileName]
//                         },
//                         {}
//                     )
//                 )
//                 return pa.value({
//                     type: ["test", {
//                         success: true,
//                         type: ["large string", {
//                             fileLocation: `${$.path}/${expectedFileName}`,
//                             parts: pl.createArray([])
//                         }]
//                     }]
//                 })
//             }
//         }
//     )
// }

