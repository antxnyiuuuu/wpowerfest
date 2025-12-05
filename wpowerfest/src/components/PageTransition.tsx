import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

function PageTransition({ children }: { children: React.ReactNode }) {
  const location = useLocation()
  const isMapaPage = location.pathname === '/mapa'
  // Para la página del mapa, no usar animación para evitar flash blanco
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    // Saltar animación para la página del mapa
    if (isMapaPage) {
      setIsAnimating(false)
      return
    }
    
    setIsAnimating(true)
    const timer = setTimeout(() => {
      setIsAnimating(false)
    }, 500)
    return () => clearTimeout(timer)
  }, [location.pathname, isMapaPage])

  // Sin animación para la página del mapa
  if (isMapaPage) {
    return <div>{children}</div>
  }

  return (
    <div
      className={`transition-all duration-500 ease-in-out ${
        isAnimating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
      }`}
    >
      {children}
    </div>
  )
}

export default PageTransition

