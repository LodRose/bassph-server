export const projectSingle = (scanResult) => {
    return {
        bandwidth: scanResult.bandwidth,
        signal: scanResult.signal,
        typeName: scanResult.connectivity.typeName,
        label: scanResult.operator,
        loc: {
            lat: scanResult.location.latitude,
            lng: scanResult.location.longitude
        }
    }
}

export const project = (scanResults) => {
    return scanResults.filter(scanResultFilter)
            .map(projectSingle)
}

const scanResultFilter = (scanResult) => {
    return scanResult.bandwidth != null &&
    scanResult.connectivity != null &&
    scanResult.operator != null &&
    scanResult.location != null
}