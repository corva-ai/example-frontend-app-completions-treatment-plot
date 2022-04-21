import { corvaDataAPI } from '@corva/ui/clients'
import { map } from 'lodash'

import { API_PATH, DATASET_GRANULARITY, FIELDS, QUERY_PARAMS, PROVIDER } from './constants'

export const fetchData = async (assetID, granularity, dateRange) => {
    let result = []
    let fields = map(FIELDS, field => {
        if(granularity === DATASET_GRANULARITY[0])
            return `data.${field.attributeName}`
        else
            return `data.median.${field.attributeName}`
    }).concat('timestamp')

    const params = {
        fields: fields.join(','),
        limit: QUERY_PARAMS.LIMIT,
        query: JSON.stringify({ 
            asset_id: assetID,
            ...((dateRange.start || dateRange.end) && {
                "timestamp": {
                    "$gte": dateRange.start/1000,
                    "$lte": dateRange.end/1000
                }
            })
        }),
        skip: QUERY_PARAMS.SKIP,
        sort: QUERY_PARAMS.SORT,
    }

    try {
        result = await corvaDataAPI.get(`${API_PATH}/${PROVIDER}/${granularity}/`, params)
    }
    catch(error){
        console.log("Error fetching PRC data: ", error)
    }
    finally{
        return result
    }

}