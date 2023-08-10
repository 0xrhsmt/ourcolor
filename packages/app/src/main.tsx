import './polyfills';
import './global.css'

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import NetworkConfigProvider from './NetworkConfigProvider.tsx'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <NetworkConfigProvider>
      <App />
    </NetworkConfigProvider>
  </React.StrictMode>,
)
