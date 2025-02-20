import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import TimeContextProvider from './context/timeContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <TimeContextProvider>
      <App />
    </TimeContextProvider>
  </StrictMode>,
)
