import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './components/App.jsx'
import './index.css'
import { GoalsProvider } from './context/GoalsContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoalsProvider>
      <App />
    </GoalsProvider>
  </StrictMode>,
)
