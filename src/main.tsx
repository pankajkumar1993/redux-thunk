import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/global.css'
import { Provider } from 'react-redux'
import { persistor, store } from './store'
import App from './App'
import CacheBuster from 'react-cache-buster'
import { version } from '../package.json';
import { PersistGate } from 'redux-persist/integration/react'

const isProduction = process.env.NODE_ENV === 'production';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <CacheBuster
          currentVersion={version}
          isEnabled={isProduction} //If false, the library is disabled.
          isVerboseMode={false} //If true, the library writes verbose logs to console.
          // loadingComponent={<Loading />} //If not pass, nothing appears at the time of new version check.
          loadingComponent={<p>Loading....</p>} //If not pass, nothing appears at the time of new version check.
          metaFileDirectory={'.'} //If public assets are hosted somewhere other than root on your server.
        >
          <App />
        </CacheBuster>
      </PersistGate>
    </Provider>
  </StrictMode>,
)
