import { useEffect, useState } from 'react'
import { fetchData } from './api'
import { createSubscription } from './subscription'

import Chart from './Chart'

export default function TreatmentPlotComponent({ assetId }) {
    const [plotData, setPlotData] = useState([]) 

    // Fetch initial data
    useEffect(() => {
        const fetchInitialData = async () => {
            const result = await fetchData(assetId)
            setPlotData(result)
        }
        fetchInitialData()
        
        return () => {
            setPlotData([])
        }

    }, [assetId])

    // Subscribe to dataset changes
    useEffect(() => {
        let unsubscribe
    
        unsubscribe = createSubscription({
            assetId,
            setPlotData
        })
    
        return () => {
          unsubscribe?.()
        }
    }, [assetId])
    
    

    return (
        <section>
            <Chart data={plotData}/>
        </section>
    )
}
