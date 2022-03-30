const defaultHighchartsOptions = {
    chart: {
        backgroundColor: 'transparent',
        plotBackgroundColor: '#191919',
        style: { color: '#9E9E9E', fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif', fontSize: '11px', fontWeight: 'normal' },
        zoomType: 'x'
    },
    credits: { enabled: false },
    exporting: { enabled: false },
    labels: {
        color: '#9E9E9E'
    },
    legend: {
        itemHiddenStyle: { opacity: 0.6 },
        itemHoverStyle: { color: '#9E9E9E', opacity: 1 },
        itemStyle: { fontSize: '11px', fontWeight: 'normal', color: '#9E9E9E', opacity: 0.8 },
        symbolRadius: 3,
        symbolHeight: 10,
        symbolWidth: 10,
        useHTML: true
    },
    plotOptions: {
        series: {
            lineWidth: 2
        }
    },
    responsive: {
        rules: [{
            condition: {
                maxWidth: 500
            },
            chartOptions: {
                legend: {
                    layout: 'horizontal',
                    align: 'center',
                    verticalAlign: 'bottom'
                }
            }
        }]
    },
    time: {
        useUTC: false
    },
    tooltip: {
        backgroundColor: 'rgba(59, 59, 59, 0.8)',
        borderColor: '#03BCD4',
        borderRadius: 4,
        borderWidth: 1,
        crosshairs: true,
        headerFormat: '<div style="padding-top:0.25rem"><span>{point.key}</span></div>',
        pointFormat: `
            <div style="margin:0.4rem 0">
                <span style="border-radius:50%;background-color:{series.color};display:inline-block;height:.5rem;margin-right:.25rem;width:.5rem"></span>
                <span style="color:#BDBDBD;margin-right:.25rem;">{series.name}:</span>
                <span>{point.y}</span>
            </div>`,
        shadow: false,
        shared: true,
        style: { color: '#fff' },
        useHTML: true,
        valueDecimals: 2,
        xDateFormat: '%m/%d/%Y %I:%M:%S %p'
    },
    xAxis: {
        dateTimeLabelFormats : {
            second: '%I:%M %p',
            minute: '%I:%M %p',
            hour: '%I:%M %p',
            day: '%m/%d/%Y'
        },
        gridLineWidth: 0, 
        lineWidth: 0,
        tickWidth: 0,
        title: { text: 'Time' },
        type: 'datetime',
    },
}

export function getHighchartsOptions({ series, xAxis, yAxis }) {
    return {
        ...defaultHighchartsOptions,
        title: { text: '' },
        series,
        xAxis: {
            ...defaultHighchartsOptions.xAxis,
            ...xAxis
        },
        yAxis
    }
}