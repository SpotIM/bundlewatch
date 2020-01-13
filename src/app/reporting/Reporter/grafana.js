import axios from 'axios'
const CI_BRANCH = process.env.CIRCLE_BRANCH

export const reportToGrafana = result => {
    const data = {
        driver: 'influxdb-telemetry',
        name: 'bundlesize-monitoring',
        value: result.size / 1024,
        tags: { path: result.filePath, branch: CI_BRANCH },
    }
    axios.post('https://metrics-logger.spot.im/metric', data).catch(error => {
        console.error(`failed to report metric ${error.toString()}`)
    })
}
