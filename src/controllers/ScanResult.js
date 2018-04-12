import autoBind from 'auto-bind'
import * as ScanResultMapper from './mappers/ScanResult'

class ScanResultController {
    constructor({ storeScanResult, showScanResults }) {
        this.storeScanResult = storeScanResult
        this.showScanResults = showScanResults
        autoBind(this)        
    }

    post(req, res) {
        let scanResult = ScanResultMapper.transform(req.body)
        scanResult.ipAddress = req.ip
        this.storeScanResult.execute(scanResult)
            .subscribe(scanResult => {
                console.log("Inserted new scan result")
                res.send(scanResult)
            }, err => {
                console.log(err)
                res.send(err)
            })
    }

    get(req, res) {
        this.showScanResults.execute({ afterEpoch: req.query.afterEpoch })
            .subscribe(scanResults => {
                if(req.query._format == 'csv') {
                    res.contentType('text/csv')
                    res.header('Content-Disposition', 'attachment; filename=scan_results.csv')
                    res.send(ScanResultMapper.transformToCsv(scanResults))
                }
                else {
                    res.send(scanResults)
                }
            })
    }
}

export default ScanResultController