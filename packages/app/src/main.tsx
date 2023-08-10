import './polyfills';
import './global.css'

import React from 'react'
import ReactDOM from 'react-dom/client'
import ChainProvider from './providers/ChainProvider.tsx'
import RouterProvider from './providers/RouterProvider.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChainProvider>
      <RouterProvider />
    </ChainProvider>
  </React.StrictMode>,
)
