import React from 'react'
import ReactDOM from 'react-dom/client'
import RemindersApp from './RemindersApp.jsx'
import { BrowserRouter } from 'react-router-dom';
import './styles.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <BrowserRouter>
        <RemindersApp />
      </BrowserRouter>
  </React.StrictMode>,
)
