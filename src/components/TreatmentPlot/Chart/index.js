import { useMemo, useContext } from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { map } from 'lodash'

import { getHighchartsOptions } from './options'
import { FIELDS, DATASET_GRANULARITY } from '../constants'
import { ChartsContext } from '../../../App'

import { TreatmentPlotContext } from '../index'

export default function Chart() {
    const { setIsZoomActive } = useContext(ChartsContext)
    const { plotData: data, datasetGranularity, prcPlotRef, setDatasetGranularity, setDateRange } = useContext(TreatmentPlotContext)

    return useMemo(() => {
        
        const series = map(FIELDS, (field, key) => {
            return {
                color: field.color,
                data: map(data, record => {
                    // If dataset is summary.wits, we take the median value
                    if(datasetGranularity === DATASET_GRANULARITY[0])
                        return [record.timestamp * 1000, record.data[field.attributeName]]
                    else
                        return [record.timestamp * 1000, record.data.median[field.attributeName]]
                }),
                id: field.attributeName,
                name: field.label,
                tooltip: {
                    valueSuffix: ` ${field.units}`
                },
                type: 'line',
                units: field.units,
                yAxis: key
            }
        })

        let xAxis = {
            events: {
                afterSetExtremes: event => {
                    const { userMax, userMin } = event
                    const timeLength = (userMax - userMin)/1000
                    console.log('userMax', userMax)
                    console.log('userMin', userMin)
                    console.log('TOTAL: ', timeLength)

                    setDateRange({
                        start: userMin,
                        end: userMax
                    })

                    if(timeLength <= 10000)
                        setDatasetGranularity(DATASET_GRANULARITY[0])
                    else if(timeLength <= 100000)
                        setDatasetGranularity(DATASET_GRANULARITY[1])
                    else if(timeLength <= 600000)
                        setDatasetGranularity(DATASET_GRANULARITY[2])

                    setIsZoomActive(userMax || userMin)
                }
            },
        }

        let yAxis = map(FIELDS, (field, key) => {

            return {
                id: key,
                title: null,
                gridLineColor: '#414141',
                labels: {
                    enabled: false
                },
            }
        })

        const options = getHighchartsOptions({ series, xAxis, yAxis })

        return (
            <>
                <HighchartsReact
                    containerProps={{ style: { width: '100%', height: '500px' } }}
                    highcharts={Highcharts}
                    immutable
                    options={options}
                    ref={prcPlotRef}
                />
            </>
        )
    }, [data])
}
