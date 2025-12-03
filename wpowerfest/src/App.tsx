import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Info from './pages/Info'
import Mapa from './pages/Mapa'
import Auspiciante from './pages/Auspiciante'
import Pasaporte from './pages/Pasaporte'
import Premios from './pages/Premios'
import Stand from './pages/Stand'
import WS from './pages/WS'
import PageTransition from './components/PageTransition'
import WhatsAppButton from './components/WhatsAppButton'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/info" element={<PageTransition><Info /></PageTransition>} />
        <Route path="/mapa" element={<PageTransition><Mapa /></PageTransition>} />
        <Route path="/auspiciante" element={<PageTransition><Auspiciante /></PageTransition>} />
        <Route path="/pasaporte" element={<PageTransition><Pasaporte /></PageTransition>} />
        <Route path="/premios" element={<PageTransition><Premios /></PageTransition>} />
        <Route path="/stand" element={<PageTransition><Stand /></PageTransition>} />
        <Route path="/ws" element={<PageTransition><WS /></PageTransition>} />
      </Routes>
      <WhatsAppButton />
    </BrowserRouter>
  )
}

export default App
