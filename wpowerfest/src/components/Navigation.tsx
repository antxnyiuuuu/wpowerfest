import { Link, useLocation } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'

function Navigation() {
  const location = useLocation()
  const isMapaPage = location.pathname === '/mapa'
  const [showText, setShowText] = useState(!isMapaPage)
  const hideTimeoutRef = useRef<number | null>(null)

  const categories = [
    { name: 'Sobre el Evento', path: '/info' },
    { name: 'Salon Warmi Challenge', path: '/mapa' },
    { name: 'Auspiciante', path: '/auspiciante' },
    { name: 'Stand', path: '/stand' },
  ]

  // Ocultar texto automáticamente cuando se entra a la página del mapa
  useEffect(() => {
    if (isMapaPage) {
      setShowText(false)
    } else {
      setShowText(true)
    }
    // Limpiar timeout al cambiar de página
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current)
      hideTimeoutRef.current = null
    }
    
    // Limpiar timeout al desmontar
    return () => {
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current)
      }
    }
  }, [isMapaPage])

  const handleMouseEnter = () => {
    if (isMapaPage) {
      // Cancelar cualquier timeout pendiente
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current)
        hideTimeoutRef.current = null
      }
      setShowText(true)
    }
  }

  const handleMouseLeave = () => {
    if (isMapaPage) {
      // Cancelar timeout anterior si existe
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current)
      }
      // Esperar 2 segundos antes de ocultar
      hideTimeoutRef.current = window.setTimeout(() => {
        setShowText(false)
        hideTimeoutRef.current = null
      }, 2000)
    }
  }

  return (
    <nav className="w-full bg-white shadow-sm z-50 relative border-b border-[#7FBFA9]/30">
      <div className="w-full max-w-full mx-auto" style={{ paddingTop: '10px', paddingBottom: '10px' }}>
        {/* Logo centrado */}
        <div 
          className="flex justify-center items-center"
          style={{ 
            paddingTop: '5px',
            paddingBottom: '1px',
            marginBottom: '3px',
            width: '100%'
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <Link to="/" className="flex items-center justify-center">
            <img 
              src="/images/logo-header.jpeg" 
              alt="Logo Header" 
              className="h-10 md:h-16 lg:h-20 object-contain"
            />
          </Link>
        </div>

        {/* Categorías como texto subrayado */}
        <div 
          className={`flex items-center justify-center gap-4 md:gap-10 lg:gap-12 xl:gap-14 overflow-x-auto transition-all duration-300 ${
            showText ? 'opacity-100 max-h-96' : 'opacity-0 max-h-0 overflow-hidden'
          }`}
          style={{ 
            paddingTop: showText ? '15px' : '0',
            paddingBottom: showText ? '10px' : '0',
            width: '100%',
            marginLeft: 'auto',
            marginRight: 'auto'
          }}
        >
          {/* Icono de casa */}
          <Link
            to="/"
            className="relative transition-all duration-300"
          >
            <span 
              className={`text-xs md:text-lg lg:text-xl xl:text-2xl font-light whitespace-nowrap transition-all duration-300 nav-category-text ${
                location.pathname === '/' 
                  ? 'text-[#913889]' 
                  : 'text-gray-500 hover:text-[#7FBFA9]'
              }`}
              style={{
                textDecoration: location.pathname === '/' ? 'underline' : 'none',
                textDecorationThickness: '2px',
                textDecorationColor: location.pathname === '/' ? '#913889' : 'transparent',
                textUnderlineOffset: '8px'
              }}
            >
              <svg 
                className="w-4 h-4 md:w-6 md:h-6 lg:w-7 lg:h-7 xl:w-8 xl:h-8 inline-block" 
                fill="currentColor" 
                viewBox="0 0 20 20"
                style={{ verticalAlign: 'middle' }}
              >
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
            </span>
          </Link>

          {categories.map((category) => {
            const isActive = location.pathname === category.path
            return (
              <Link
                key={category.path}
                to={category.path}
                className="relative transition-all duration-300"
              >
                <span 
                  className={`text-xs md:text-lg lg:text-xl xl:text-2xl font-light whitespace-nowrap transition-all duration-300 nav-category-text ${
                    isActive 
                      ? 'text-[#913889]' 
                      : 'text-gray-500 hover:text-[#7FBFA9]'
                  }`}
                  style={{
                    textDecoration: isActive ? 'underline' : 'none',
                    textDecorationThickness: '2px',
                    textDecorationColor: isActive ? '#913889' : 'transparent',
                    textUnderlineOffset: '8px'
                  }}
                >
                  {category.name}
                </span>
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}

export default Navigation

