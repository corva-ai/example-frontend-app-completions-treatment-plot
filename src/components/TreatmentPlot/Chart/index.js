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
    const { plotData: data, granularity, setGranularity } = useContext(TreatmentPlotContext)

    return useMemo(() => {
        const chart = {
            events: {
                // load: event => {
                //     const { dataMax, dataMin } = event.target.xAxis[0]
                //     const timeLength = (dataMax - dataMin)/1000
                    
                //     if(timeLength <= 10000)
                //         DATASET_GRANULARITY[0]
                //     else if(timeLength <= 100000)
                //         DATASET_GRANULARITY[1]
                //     else if(timeLength <= 600000)
                //         DATASET_GRANULARITY[2]
                // }
                load() {
                    const chart = this
                    const x = chart.plotLeft + 10
                    const y = chart.plotTop + 10
                    chart.renderer.button('Reset Zoom', x, y)
                        .on('click', () => {
                            chart.xAxis[0].setExtremes()
                        })
                        .add()
                        .toFront()
                }

            }
        }
        
        const series = map(FIELDS, (field, key) => {
            return {
                color: field.color,
                data: map(data, record => {
                    // If dataset is summary.wits, we take the median value
                    if(granularity === DATASET_GRANULARITY[0])
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
                    console.log('event', event)
                    const { userMax, userMin } = event
                    console.log('userMax', userMax)
                    console.log('userMin', userMin)
                    console.log('TOTAL: ', (userMax - userMin)/1000)
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

        const options = getHighchartsOptions({ chart, series, xAxis, yAxis })

        return (
            <>
                <HighchartsReact
                    containerProps={{ style: { width: '100%', height: '500px' } }}
                    highcharts={Highcharts}
                    immutable
                    options={options}
                />
            </>
        )
    }, [data])
}
