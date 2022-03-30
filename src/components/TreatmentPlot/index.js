import { useEffect, useState, useContext } from 'react'

import { fetchData } from './api'
import { createSubscription } from './subscription'

import Chart from './Chart'
import { ChartsContext } from '../../App'

export default function TreatmentPlotComponent() {
    const { asset_id, isZoomActive } = useContext(ChartsContext)
    const [plotData, setPlotData] = useState([]) 
    const [bufferData, setBufferData] = useState({ prc: [] })

    // Fetch initial data
    useEffect(() => {
        const fetchInitialData = async () => {
            const result = await fetchData(asset_id)
            setPlotData(result)
        }

        fetchInitialData()
        
        return () => {
            setPlotData([])
        }

    }, [asset_id])

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
    // We also clean the buffer everytime this happen
    useEffect(() => {
        if(!isZoomActive){
            setPlotData(prevData => prevData.concat(bufferData.prc))
            setBufferData(prevBuffer => { return { ...prevBuffer, prc: [] }})
        }
    }, [isZoomActive])
    
    const updateData = newData => {
        if(!isZoomActive)
            setPlotData(prevData => {
                if(prevData.length > 0)
                    return prevData.concat(newData)
                else
                    return prevData
            })
        else {
            setBufferData(prevBuffer => { return { ...prevBuffer, prc: prevBuffer.prc.concat(newData) }})
        }
    }

    return (
        <section>
            <Chart data={plotData}/>
        </section>
    )
}
