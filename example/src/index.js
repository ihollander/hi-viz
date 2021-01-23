import './index.css'

import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import HiViz from '@ihollander/hi-viz'

ReactDOM.render(
  <HiViz>
    <App />
  </HiViz>,
  document.getElementById('root')
)
