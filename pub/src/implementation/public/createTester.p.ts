import { CCreateTester } from "../creators.p"


export const f_createTester: CCreateTester = (
    $i,
    $a,
) => {
    return ($) => {
        $a(
            $i.runTests($),
            ($) => {
                $i.serializeTestResult($)
                const summary = $i.summarize(
                    $,
                )
                $i.serializeSummary(summary)
                if ($i.isZero(summary.numberOfErrors)) {
                    //
                } else {
                    $i.onTestErrors(null)
                }
            }
        )


    }

}