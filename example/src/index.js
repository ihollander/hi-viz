import './index.css'

import React from 'react'
import ReactDOM from 'react-dom'
import { CounterProvider } from './context/counter'
import App from './components/App'
import HiViz from '@ihollander/hi-viz'

ReactDOM.render(
  <HiViz>
    <CounterProvider>
      <App />
    </CounterProvider>
  </HiViz>,
  document.getElementById('root')
)
