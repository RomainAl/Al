import './index.css'
import ReactDOM from 'react-dom/client'
import { StrictMode } from 'react'
import { Loader } from '@react-three/drei'
import App from './App.jsx'
import Overlay from './Overlay.jsx'

const root = ReactDOM.createRoot(document.querySelector('#root'))

root.render(
    <StrictMode>
      <App/>
      <Overlay/>
      <Loader/>
    </StrictMode>
)