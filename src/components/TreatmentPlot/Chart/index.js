import { useMemo } from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { map } from 'lodash'

import { getHighchartsOptions } from './options'
import { FIELDS } from '../constants'

export default function Chart({ data }) {
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

        const options = getHighchartsOptions({ series, yAxis })

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
