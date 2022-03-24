import { socketClient } from '@corva/ui/clients'
import { DATASET, FIELDS, PROVIDER } from './constants'

export function createSubscription({ assetId, setPlotData }) {
  
  const subscription = { 
    assetId: assetId,
    dataset: DATASET,
    provider: PROVIDER,
  }

  const onDataReceive = event => {
    let entry = event.data

    const newData = {
      timestamp: entry.timestamp,
      data: {
        [FIELDS.pressure.attributeName]: entry.data[FIELDS.pressure.attributeName],
        [FIELDS.rate.attributeName]: entry.data[FIELDS.rate.attributeName],
        [FIELDS.concentration.attributeName]: entry.data[FIELDS.concentration.attributeName],

      }
    }

    setPlotData(prevData => {
      if(prevData.length > 0)
        return prevData.concat(newData)
      else
        return prevData
    })
  }

  return socketClient.subscribe(subscription, { onDataReceive })
}