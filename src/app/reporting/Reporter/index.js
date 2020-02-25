import { reportToGrafana } from './grafana'
import { reportToSlack } from './slack'
import { getOverallDifference } from '../../analyze/index'
const CI_BRANCH = process.env.CIRCLE_BRANCH

export function reportResults(results, summary, url, reportTo) {
    if (results) {
        results.forEach(result => {
            const { percentageChange } = getOverallDifference([result])
            const fixedPercentage = percentageChange
                ? percentageChange.toFixed(1)
                : ''
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
                                CI_BRANCH === 'master' &&
                                (percentageChange >= 5 ||
                                    percentageChange <= -5 ||
                                    (result.status === 'fail' && result.size))
                            ) {
                                reportToSlack(
                                    result,
                                    summary,
                                    url,
                                    fixedPercentage,
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
