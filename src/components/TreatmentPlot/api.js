import { corvaDataAPI } from '@corva/ui/clients'
import { map } from 'lodash'

import { API_PATH, DATASET, FIELDS, QUERY_PARAMS, PROVIDER } from './constants'

export const fetchData = async assetID => {
    let result = []
    let fields = map(FIELDS, field => `data.${field.attributeName}`).concat('timestamp')

    const params = {
        fields: fields.join(','),
        limit: QUERY_PARAMS.LIMIT,
        query: JSON.stringify({ asset_id: assetID }),
        skip: QUERY_PARAMS.SKIP,
        sort: QUERY_PARAMS.SORT,
    }

    try {
        result = await corvaDataAPI.get(`${API_PATH}/${PROVIDER}/${DATASET}/`, params)
    }
    catch(error){
        console.log("Error fetching PRC data: ", error)
    }
    finally{
        return result
    }

}