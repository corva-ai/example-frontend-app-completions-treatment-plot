export const API_PATH = '/api/v1/data'
export const PROVIDER = 'corva'
export const DATASET_GRANULARITY = {
    0: 'completion.wits', // appropriate for time range below 10,000 seconds
    1: 'completion.wits.summary-10s', // appropriate for time range below 100,000 seconds
    2: 'completion.wits.summary-1m',  // appropriate for time range below 600,000 seconds
    // 3: 'completion.wits.summary-30m',  // appropriate for time range below 18,000,000 seconds
    // and so on
}

export const QUERY_PARAMS = {
    LIMIT: 10000,
    SKIP: 0,
    SORT: JSON.stringify({ timestamp: 1 })
}

export const FIELDS = {
    pressure: { 
        attributeName: 'wellhead_pressure',
        color: 'red',
        label: 'Pressure',
        units: 'PSI'
    },
    rate: { 
        attributeName: 'slurry_flow_rate_in',
        color: 'blue',
        label: 'Rate',
        units: 'BPM'
    },
    concentration: { 
        attributeName: 'total_proppant_concentration',
        color: 'green',
        label: 'Prop Concentration',
        units: 'PPG'
    },
}