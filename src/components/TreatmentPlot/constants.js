export const API_PATH = '/api/v1/data'
export const DATASET = 'completion.wits'
export const PROVIDER = 'corva'

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
        units: 'unit x'
    },
    rate: { 
        attributeName: 'slurry_flow_rate_in',
        color: 'blue',
        label: 'Rate',
        units: 'unit y'
    },
    concentration: { 
        attributeName: 'total_proppant_concentration',
        color: 'green',
        label: 'Prop Concentration',
        units: 'unit z'
    },
}