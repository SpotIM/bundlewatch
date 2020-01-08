import { reportToGrafana } from './grafana'
import { reportToSlack } from './slack'
import { getOverallDifference } from '../../analyze/index'

export function reportResults(results, summary, url, reportTo) {
    if (results) {
        const { percentageChange } = getOverallDifference(results)

        results.forEach(result => {
            reportTo.forEach(reporter => {
                if (
                    result.status === 'pass' ||
                    (result.status === 'fail' && result.size)
                ) {
                    switch (reporter) {
                        case 'grafana':
                            reportToGrafana(result)
                            break
                        case 'slack':
                            if (
                                percentageChange >= 5 ||
                                (result.status === 'fail' && result.size)
                            ) {
                                reportToSlack(
                                    result,
                                    summary,
                                    url,
                                    percentageChange.toFixed(1),
                                )
                            }
                            break
                        default:
                    }
                }
            })
        })
    }
}
