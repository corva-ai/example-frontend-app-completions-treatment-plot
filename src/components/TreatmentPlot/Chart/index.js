import { useMemo, useContext } from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { map } from 'lodash'

import { getHighchartsOptions } from './options'
import { FIELDS } from '../constants'
import { ChartsContext } from '../../../App'

export default function Chart({ data }) {
    const { setIsZoomActive } = useContext(ChartsContext)

    return useMemo(() => {
        
        const series = map(FIELDS, (field, key) => {
            return {
                color: field.color,
                data: map(data, record => {
                    return [record.timestamp * 1000, record.data[field.attributeName]]
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
                    setIsZoomActive(event.userMax || event.userMin)
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
                />
            </>
        )
    }, [data])
}
