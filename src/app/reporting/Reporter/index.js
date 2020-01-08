import { reportToGrafana } from './grafana'
import { reportToSlack } from './slack'

export function reportResults(results, summary, url, reportTo) {
    if (results) {
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
                            reportToSlack(result, summary, url)
                            break
                        default:
                    }
                }
            })
        })
    }
}
