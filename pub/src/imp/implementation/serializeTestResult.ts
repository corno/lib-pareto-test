// import * as pl from "pareto-core-lib"
// import * as api from "../../interface"
// import { summarize } from "./summarize"

// export function serializeTestResult(
//     $: {
//         testResult: api.TTestResult,
//         showSummary: boolean,
//     },
//     $i: {
//         log: (str: string) => void
//     },
// ) {
//     const red = "\x1b[31m"
//     const green = "\x1b[32m"
//     const yellow = "\x1b[33m"
//     const cyan = "\x1b[36m"
//     const reset = "\x1b[0m"

//     function serializeTestSet(
//         $: api.TTestSet,
//         indentation: string,
//     ) {
//         $.elements.forEach((a, b) => a > b, ($, key) => {
//             const name = key
//             switch ($.type[0]) {
//                 case "test":
//                     pl.cc($.type[1], ($) => {
//                         $i.log(`${indentation}${$.success ? green : red}${name}${reset}`)
//                         switch ($.type[0]) {
//                             case "simple string":
//                                 pl.cc($.type[1], ($) => {
//                                     $i.log(`${indentation}  expected: '${$.expected}'`)
//                                     $i.log(`${indentation}  actual:   '${$.actual}'`)
//                                 })
//                                 break
//                             case "large string":
//                                 pl.cc($.type[1], ($) => {
//                                     const fileLocation = $.fileLocation
//                                     $.parts.forEach(($) => {
//                                         const added = $.type[0] === "added"

//                                         if (fileLocation !== undefined) {
//                                             $i.log(`${indentation}  ${cyan}${fileLocation}${reset}:${yellow}${$.startLineInOriginal}${reset}`)
//                                         } else {
//                                             $i.log(`${indentation}  line ${$.startLineInOriginal}|${$.startLineInChanged}`)
//                                         }
//                                         $.lines.forEach(($) => {
//                                             $i.log(`${indentation}    ${added ? "+" : "-"}${$}`)
//                                         })
//                                     })
//                                 })
//                                 break
//                             case "boolean":
//                                 pl.cc($.type[1], ($) => {
//                                 })
//                                 break

//                             default: pl.au($.type[0])
//                         }
//                     })
//                     break
//                 case "subset":
//                     pl.cc($.type[1], ($) => {
//                         $i.log(`${indentation}${name}`)
//                         serializeTestSet(
//                             $,
//                             `${indentation}  `,
//                         )
//                     })
//                     break
//                 // case "testString":
//                 //     pl.cc($.type[1], ($) => {
//                 //         switch ($.result[0]) {
//                 //             case "failed":
//                 //                 pl.cc($.result[1], ($) => {
//                 //                     $i.log(`${indentation}${red}${name}${reset}`)
//                 //                     switch ($.multiline[0]) {
//                 //                         case "no":
//                 //                             pl.cc($.multiline[1], ($) => {
//                 //                                 $i.log(`${indentation}  expected: '${$.expected}'`)
//                 //                                 $i.log(`${indentation}  actual:   '${$.actual}'`)
//                 //                             })
//                 //                             break
//                 //                         case "yes":
//                 //                             pl.cc($.multiline[1], ($) => {
//                 //                                 const fileLocation = $.fileLocation
//                 //                                 $.parts.forEach(($) => {
//                 //                                     const added = $.type[0] === "added"

//                 //                                     if (fileLocation !== undefined) {
//                 //                                         $i.log(`${indentation}  ${cyan}${fileLocation}${reset}:${yellow}${$.startLineInExpected}${reset}`)
//                 //                                     } else {
//                 //                                         $i.log(`${indentation}  line ${$.startLineInExpected}|${$.startLineInActual}`)
//                 //                                     }
//                 //                                     $.lines.forEach(($) => {
//                 //                                         $i.log(`${indentation}    ${added ? "+" : "-"}${$}`)
//                 //                                     })
//                 //                                 })
//                 //                             })
//                 //                             break
//                 //                         default: pl.au($.multiline[0])
//                 //                     }
//                 //                 })
//                 //                 break
//                 //             case "success":
//                 //                 pl.cc($.result[1], ($) => {
//                 //                     $i.log(`${indentation}${green}${name}${reset}`)
//                 //                 })
//                 //                 break
//                 //             default: pl.au($.result[0])
//                 //         }
//                 //     })
//                 //     break
//                 default: pl.au($.type[0])
//             }
//         })
//     }
//     serializeTestSet(
//         $.testResult.root,
//         ``
//     )

//     if ($.showSummary) {
//         $i.log(``)
//         const summary = summarize($.testResult)
//         $i.log(`${green}${summary.numberOfTests - summary.numberOfErrors} tests${reset}`)
//         $i.log(`${summary.numberOfErrors > 0 ? red : reset}${summary.numberOfErrors} errors${reset}`)
//     }
// }
