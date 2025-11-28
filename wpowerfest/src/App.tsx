import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Detectar si es móvil por tamaño de pantalla (hasta 768px)
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }

    // Verificar al cargar
    checkMobile()

    // Escuchar cambios de tamaño
    window.addEventListener('resize', checkMobile)

    return () => {
      window.removeEventListener('resize', checkMobile)
    }
  }, [])

  const imageUrl = isMobile ? '/images/Backing-HD-android.png' : '/images/Backing-HD.jpg'

  return (
    <div 
      className="fullscreen-image"
      style={{ backgroundImage: `url(${imageUrl})` }}
    ></div>
  )
}

export default App
