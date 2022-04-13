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
        color: '#F50258',
        label: 'Pressure',
        units: 'PSI'
    },
    rate: { 
        attributeName: 'slurry_flow_rate_in',
        color: '#64B5FF',
        label: 'Rate',
        units: 'BPM'
    },
    concentration: { 
        attributeName: 'total_proppant_concentration',
        color: '#FF8F0B',
        label: 'Prop Concentration',
        units: 'PPG'
    },
}