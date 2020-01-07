import axios from 'axios'

export const reportToGrafana = result => {
    const data = {
        driver: 'influxdb-telemetry',
        name: 'bundlesize-monitoring',
        value: result.size / 1024,
        tags: { path: result.filePath },
    }
    axios.post('https://metrics-logger.spot.im/metric', data).catch(error => {
        console.error(`failed to report metric ${error.toString()}`)
    })
}
