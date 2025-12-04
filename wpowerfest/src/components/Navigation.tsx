import { Link, useLocation } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'

function Navigation() {
  const location = useLocation()
  const isMapaPage = location.pathname === '/mapa'
  const [showText, setShowText] = useState(true) // Siempre mostrar al inicio
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const hideTimeoutRef = useRef<number | null>(null)
  const initialHideTimeoutRef = useRef<number | null>(null)

  const categories = [
    { name: 'Sobre el Evento', path: '/info' },
    { name: 'Salon Warmi Challenge', path: '/mapa' },
    { name: 'Auspiciante', path: '/auspiciante' },
    { name: 'Stand', path: '/stand' },
  ]

  // Ocultar texto automáticamente después de 4 segundos cuando se entra a la página del mapa
  useEffect(() => {
    if (isMapaPage) {
      // Mostrar al inicio
      setShowText(true)
      
      // Limpiar cualquier timeout anterior
      if (initialHideTimeoutRef.current) {
        clearTimeout(initialHideTimeoutRef.current)
      }
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current)
      }
      
      // Ocultar después de 4 segundos
      initialHideTimeoutRef.current = window.setTimeout(() => {
        setShowText(false)
        initialHideTimeoutRef.current = null
      }, 4000)
    } else {
      // En otras páginas, siempre mostrar
      setShowText(true)
    }
    
    // Limpiar timeouts al cambiar de página o desmontar
    return () => {
      if (initialHideTimeoutRef.current) {
        clearTimeout(initialHideTimeoutRef.current)
        initialHideTimeoutRef.current = null
      }
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current)
        hideTimeoutRef.current = null
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
    <nav className="w-full bg-white shadow-sm z-50 relative border-b border-[#7FBFA9]/20">
      {/* Header principal - siempre visible */}
      <div className="w-full max-w-full mx-auto px-5 py-4 md:py-5">
        {/* Layout móvil - centrado */}
        <div className="md:hidden flex items-center justify-center gap-4 relative">
          {/* Botón menú móvil */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-3 rounded-xl hover:bg-gray-50 active:bg-gray-100 transition-all duration-200"
            aria-label="Toggle menu"
            style={{ 
              minWidth: '48px', 
              minHeight: '48px', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              fontFamily: "'Montserrat', sans-serif"
            }}
          >
            <svg 
              className={`w-6 h-6 text-gray-700 transition-all duration-300 ${isMobileMenuOpen ? 'rotate-90 opacity-70' : 'opacity-100'}`}
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              strokeWidth={2}
            >
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          {/* Logo centrado */}
          <Link 
            to="/" 
            className="flex items-center justify-center flex-shrink-0"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <img 
              src="/images/logo-header.jpeg" 
              alt="Logo Header" 
              className="h-12 sm:h-14 object-contain"
            />
          </Link>

          {/* Espaciador invisible para balancear */}
          <div className="w-12"></div>
        </div>

        {/* Layout desktop - original */}
        <div className="hidden md:flex items-center justify-center">
          <Link 
            to="/" 
            className="flex items-center justify-center flex-shrink-0"
            onClick={() => setIsMobileMenuOpen(false)}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <img 
              src="/images/logo-header.jpeg" 
              alt="Logo Header" 
              className="h-16 lg:h-20 object-contain"
            />
          </Link>
        </div>
      </div>

      {/* Menú móvil - solo visible en móviles cuando está abierto */}
      <div 
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-5 py-6 space-y-4 border-t border-gray-100">
          <Link
            to="/"
            onClick={() => setIsMobileMenuOpen(false)}
            className={`block py-4 px-5 rounded-xl transition-all duration-200 ${
              location.pathname === '/' 
                ? 'bg-gradient-to-r from-[#913889]/10 to-[#7FBFA9]/10 text-[#913889] font-semibold border border-[#913889]/20' 
                : 'text-gray-700 hover:bg-gray-50 active:bg-gray-100'
            }`}
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${location.pathname === '/' ? 'bg-[#913889]/10' : 'bg-gray-100'}`}>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                </svg>
              </div>
              <span className="text-base">Inicio</span>
            </div>
          </Link>

          {categories.map((category) => {
            const isActive = location.pathname === category.path
            return (
              <Link
                key={category.path}
                to={category.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block py-4 px-5 rounded-xl transition-all duration-200 ${
                  isActive 
                    ? 'bg-gradient-to-r from-[#913889]/10 to-[#7FBFA9]/10 text-[#913889] font-semibold border border-[#913889]/20' 
                    : 'text-gray-700 hover:bg-gray-50 active:bg-gray-100'
                }`}
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                <span className="text-base block">{category.name}</span>
              </Link>
            )
          })}
        </div>
      </div>

      {/* Menú desktop - solo visible en pantallas grandes */}
      <div 
        className={`hidden md:block transition-all duration-300 ${
          showText ? 'opacity-100 max-h-96' : 'opacity-0 max-h-0 overflow-hidden'
        }`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="w-full max-w-full mx-auto px-6 pb-5">
          <div className="flex items-center justify-center gap-8 lg:gap-12 xl:gap-16">
            {/* Icono de casa */}
            <Link
              to="/"
              className="relative transition-all duration-300"
              style={{ padding: '8px 12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <span 
                className={`text-base lg:text-xl xl:text-2xl font-light whitespace-nowrap transition-all duration-300 nav-category-text ${
                  location.pathname === '/' 
                    ? 'text-[#913889]' 
                    : 'text-gray-500 hover:text-[#7FBFA9]'
                }`}
                style={{
                  textDecoration: location.pathname === '/' ? 'underline' : 'none',
                  textDecorationThickness: '2px',
                  textDecorationColor: location.pathname === '/' ? '#913889' : 'transparent',
                  textUnderlineOffset: '8px',
                  paddingBottom: '5px'
                }}
              >
                <svg 
                  className="w-5 h-5 lg:w-6 lg:h-6 xl:w-8 xl:h-8 inline-block" 
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
                  style={{ padding: '8px 12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  <span 
                    className={`text-base lg:text-xl xl:text-2xl font-light whitespace-nowrap transition-all duration-300 nav-category-text ${
                      isActive 
                        ? 'text-[#913889]' 
                        : 'text-gray-500 hover:text-[#7FBFA9]'
                    }`}
                    style={{
                      textDecoration: isActive ? 'underline' : 'none',
                      textDecorationThickness: '2px',
                      textDecorationColor: isActive ? '#913889' : 'transparent',
                      textUnderlineOffset: '8px',
                      paddingBottom: '5px'
                    }}
                  >
                    {category.name}
                  </span>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navigation

