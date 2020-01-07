import { reportToGrafana } from './grafana'

export function reportResults(results, reportTo) {
    if (results) {
        results.forEach(result => {
            reportTo.forEach(reporter => {
                switch (reporter) {
                    case 'grafana':
                        reportToGrafana(result)
                        break
                    default:
                }
            })
        })
    }
}
