// import * as pl from "pareto-core-lib"
// import * as api from "../../interface"

// export function summarize(
//     $: api.TTestResult
// ): api.TSummary {
//     type SSummary = {
//         "numberOfErrors": number
//         "numberOfTests": number
//     }
//     const summary: SSummary = {
//         numberOfErrors: 0,
//         numberOfTests: 0,
//     }
//     function summarizeTestSet(
//         $: api.TTestSet
//     ): void {
//         $.elements.forEach((a, b) => a > b, ($, key) => {
//             switch ($.type[0]) {
//                 case "subset":
//                     pl.cc($.type[1], ($) => {
//                         summarizeTestSet($)
//                     })
//                     break
//                 case "test":
//                     pl.cc($.type[1], ($) => {
//                         summary.numberOfTests += 1
//                         if (!$.success) {
//                             summary.numberOfErrors += 1
//                         }

//                     })
//                     break
//                 default: pl.au($.type[0])
//             }
//         })
//     }
//     summarizeTestSet(
//         $.root,
//     )
//     return summary
// }