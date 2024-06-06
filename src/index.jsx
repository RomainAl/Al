import './index.css'
import ReactDOM from 'react-dom/client'
import { StrictMode } from 'react'
import { Loader } from '@react-three/drei'
import App from './App.jsx'
import Overlay from './Overlay.jsx'
import { Leva } from 'leva'

const root = ReactDOM.createRoot(document.querySelector('#root'))

root.render(
    <StrictMode>
      <Leva collapsed />
      <App/>
      <Loader/>
      <Overlay/>
    </StrictMode>
)