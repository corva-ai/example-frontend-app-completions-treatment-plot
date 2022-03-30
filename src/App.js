import { useState, createContext } from 'react'
import { AppHeader } from '@corva/ui/components'
import PropTypes from 'prop-types'
import { DEFAULT_SETTINGS } from './constants'

import styles from './App.css'
import TreatmentPlot from './components/TreatmentPlot'

export const ChartsContext = createContext()

function App(props) {
  const { appHeaderProps } = props
  const [isZoomActive, setIsZoomActive] = useState(false)
  const asset_id = 'YOUR_ASSET_ID'

  return (
    <div className={styles.container}>
      <AppHeader {...appHeaderProps} />
      <div className={styles.content}>
        <ChartsContext.Provider value={{ asset_id, isZoomActive, setIsZoomActive }}>
            <TreatmentPlot/>
        </ChartsContext.Provider>
      </div>
    </div>
  )
}

App.propTypes = {
  appHeaderProps: PropTypes.shape({}).isRequired,
}

App.defaultProps = {
  ...DEFAULT_SETTINGS,
}

// Important: Do not change root component default export (App.js). Use it as container
//  for your App. It's required to make build and zip scripts work as expected;
export default App
