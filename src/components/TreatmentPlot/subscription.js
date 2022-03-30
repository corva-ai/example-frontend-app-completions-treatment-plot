import { socketClient } from '@corva/ui/clients'
import { DATASET, FIELDS, PROVIDER } from './constants'

export function createSubscription({ asset_id: assetId, updateData }) {
  
  const subscription = { 
    assetId: assetId,
    dataset: DATASET,
    provider: PROVIDER,
  }

  const onDataReceive = event => {
    let entries = event.data

    const newData = entries.map(entry => {
      return {
        timestamp: entry.timestamp,
        data: {
          [FIELDS.pressure.attributeName]: entry.data[FIELDS.pressure.attributeName],
          [FIELDS.rate.attributeName]: entry.data[FIELDS.rate.attributeName],
          [FIELDS.concentration.attributeName]: entry.data[FIELDS.concentration.attributeName],

        }
      }
    })

    updateData(newData)
  }

  return socketClient.subscribe(subscription, { onDataReceive })
}