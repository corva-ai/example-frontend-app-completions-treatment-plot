import { useEffect, useState, useContext, createContext } from 'react'

import { fetchData } from './api'
import { createSubscription } from './subscription'

import Chart from './Chart'
import { ChartsContext } from '../../App'
import { DATASET_GRANULARITY } from './constants'

export const TreatmentPlotContext = createContext()

// Use as many as constants of granularity datasets for initial empty state
const INITIAL_PLOT_DATA_STATE = {
    [DATASET_GRANULARITY[0]]: [],
    [DATASET_GRANULARITY[1]]: [],
    [DATASET_GRANULARITY[2]]: [],
}
const INITIAL_GRANULARITY = DATASET_GRANULARITY[2]

export default function TreatmentPlotComponent() {
    const { asset_id, isZoomActive } = useContext(ChartsContext)
    const [bufferData, setBufferData] = useState({ prc: [] })
    const [datasetGranularity, setDatasetGranularity] = useState(INITIAL_GRANULARITY)
    const [plotData, setPlotData] = useState(INITIAL_PLOT_DATA_STATE) 

    // Fetch initial data
    useEffect(() => {
        const fetchInitialData = async () => {
            const result = await fetchData(asset_id, datasetGranularity)
            setPlotData(prevData => {
                return {
                    ...prevData,
                    [datasetGranularity]: result
                }
            })
        }

        fetchInitialData()
        
        return () => {
            setPlotData(INITIAL_PLOT_DATA_STATE)
        }

    }, [asset_id, datasetGranularity])

    // Subscribe to dataset changes
    useEffect(() => {
        let unsubscribe
    
        unsubscribe = createSubscription({
            asset_id,
            updateData
        })
    
        return () => {
            unsubscribe?.()
        }
    }, [asset_id])
    
    // We update the plot data with whatever is in the buffer each time the zooming is deactivated
    // Notice that we only store buffer data for the initial granularity dataset, and we reset all other granularity datasets
    // We also clean the buffer everytime this happen
    useEffect(() => {
        if(!isZoomActive){
            setPlotData(prevData => {
                return {
                    ...INITIAL_PLOT_DATA_STATE,
                    [INITIAL_GRANULARITY] : prevData[INITIAL_GRANULARITY].concat(bufferData.prc)
                }
            })
            setBufferData(prevBuffer => { return { ...prevBuffer, prc: [] }})
        }
    }, [isZoomActive])
    
    // We use this function to update only the initial granularity dataset realtime data
    const updateData = newData => {
        if(!isZoomActive)
            setPlotData(prevData => {
                if(prevData[INITIAL_GRANULARITY].length > 0)
                    return {
                        ...prevData,
                        [INITIAL_GRANULARITY] : prevData[INITIAL_GRANULARITY].concat(newData)
                    }
                else
                    return prevData
            })
        else {
            setBufferData(prevBuffer => { return { ...prevBuffer, prc: prevBuffer.prc.concat(newData) }})
        }
    }

    return (
        <section>
            <TreatmentPlotContext.Provider 
                value={{ 
                    datasetGranularity, 
                    plotData: plotData[datasetGranularity],
                    setDatasetGranularity
                }}
            >
                <Chart/>
            </TreatmentPlotContext.Provider>
        </section>
    )
}
