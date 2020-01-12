import axios from 'axios'
const CI_BRANCH = process.env.CIRCLE_BRANCH

export const reportToGrafana = result => {
    let path
    if (CI_BRANCH) {
        path = CI_BRANCH + ' ' + result.filePath
    } else {
        path = result.filePath
    }
    const data = {
        driver: 'influxdb-telemetry',
        name: 'bundlesize-monitoring',
        value: result.size / 1024,
        tags: { path: path },
    }
    axios.post('https://metrics-logger.spot.im/metric', data).catch(error => {
        console.error(`failed to report metric ${error.toString()}`)
    })
}
