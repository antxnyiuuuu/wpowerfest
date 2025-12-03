import { useEffect, useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import Navigation from '../components/Navigation'

function Home() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [hoveredLogo, setHoveredLogo] = useState<string | null>(null)
  const navigate = useNavigate()

  // Carrusel - imágenes
  const carouselImages = useMemo(() => [
    '/images/inicio.jpg',
    '/images/map.jpg',
    '/images/map2.jpg',
    '/images/stands.jpg',
    '/images/stands2.jpg',
    '/images/passport.jpg',
  ], [])

  useEffect(() => {
    // Auto-play del carrusel
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length)
    }, 5000) // Cambia cada 5 segundos

    return () => clearInterval(interval)
  }, [carouselImages.length])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselImages.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselImages.length) % carouselImages.length)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  // Función para manejar clicks en los logos
  const handleLogoClick = (logoName: string) => {
    // Si es WS, abrir WhatsApp directamente
    if (logoName === 'ws') {
      window.open('https://wa.me/message/6VRABHAF55GXA1', '_blank', 'noopener,noreferrer')
      return
    }
    
    const routes: { [key: string]: string } = {
      'info': '/info',
      'map': '/mapa',
      'auspiciante': '/auspiciante',
      'pasaporte': '/pasaporte',
      'premios': '/premios',
      'stand': '/stand',
    }
    
    const route = routes[logoName]
    if (route) {
      navigate(route)
    }
  }

  const logos = [
    { name: 'info', src: '/images/logo-info.png', alt: 'Información', label: 'Información', tooltip: 'Ver información del evento' },
    { name: 'map', src: '/images/logo-map.png', alt: 'Mapa', label: 'Mapa', tooltip: 'Ver mapa del evento' },
    { name: 'auspiciante', src: '/images/logo-asupiciante.png', alt: 'Auspiciante', label: 'Auspiciante', tooltip: 'Ver auspiciantes' },
    { name: 'pasaporte', src: '/images/logo-pasaporte.png', alt: 'Pasaporte', label: 'Pasaporte', tooltip: 'Ver pasaporte' },
    { name: 'premios', src: '/images/logo-premios.png', alt: 'Premios', label: 'Premios', tooltip: 'Ver premios' },
    { name: 'stand', src: '/images/logo-stand.png', alt: 'Stands', label: 'Stands', tooltip: 'Ver stands' },
    { name: 'ws', src: '/images/logo-ws.png', alt: 'WhatsApp', label: 'WhatsApp', tooltip: 'Contactar por WhatsApp' },
  ]

  return (
    <div className="relative w-full h-full">
      <Navigation />

      {/* Carrusel */}
      <div className="w-full z-45 relative">
        <div className="relative overflow-hidden h-[200px] md:h-[500px] lg:h-[calc(100vh-200px)] md:min-h-[600px]">
          {/* Imágenes del carrusel */}
          {carouselImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-all duration-500 ease-in-out flex items-center justify-center ${
                index === currentSlide ? 'opacity-100 translate-x-0' : 
                index < currentSlide ? 'opacity-0 -translate-x-full' : 
                'opacity-0 translate-x-full'
              }`}
            >
              <img
                src={image}
                alt={`Slide ${index + 1}`}
                className="w-full h-full object-contain carousel-image"
              />
            </div>
          ))}

          {/* Botones de navegación */}
          <button
            onClick={prevSlide}
            className="absolute left-4 md:left-12 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-[#913889] hover:text-[#7FBFA9] rounded-full p-3 md:p-6 shadow-lg transition-all duration-300 hover:scale-110 z-10"
            aria-label="Anterior"
          >
            <svg className="w-6 h-6 md:w-16 md:h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-4 md:right-12 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-[#913889] hover:text-[#7FBFA9] rounded-full p-3 md:p-6 shadow-lg transition-all duration-300 hover:scale-110 z-10"
            aria-label="Siguiente"
          >
            <svg className="w-6 h-6 md:w-16 md:h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Indicadores */}
          <div className="absolute bottom-2 md:bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {carouselImages.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`transition-all duration-300 rounded-full carousel-indicator ${index === currentSlide ? 'active' : ''}`}
                style={{
                  backgroundColor: index === currentSlide ? '#913889' : 'rgba(145, 56, 137, 0.5)',
                  boxShadow: index === currentSlide ? '0 4px 6px rgba(0, 0, 0, 0.1)' : 'none'
                }}
                onMouseEnter={(e) => {
                  if (index !== currentSlide) {
                    e.currentTarget.style.backgroundColor = 'rgba(145, 56, 137, 0.7)'
                  }
                }}
                onMouseLeave={(e) => {
                  if (index !== currentSlide) {
                    e.currentTarget.style.backgroundColor = 'rgba(145, 56, 137, 0.5)'
                  }
                }}
                aria-label={`Ir a slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Sección de presentación */}
      <div className="w-full bg-gradient-to-br from-[#7FBFA9]/10 via-white to-[#913889]/10" style={{ paddingTop: '60px', paddingBottom: '60px' }}>
        <div style={{ width: '100%', maxWidth: '1200px', margin: '0 auto', paddingLeft: '20px', paddingRight: '20px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', width: '100%' }}>
            <h1 
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#913889] leading-tight"
              style={{ 
                letterSpacing: '3px',
                marginBottom: '40px',
                width: '100%',
                maxWidth: '900px',
                paddingLeft: '20px',
                paddingRight: '20px'
              }}
            >
              EL FESTIVAL FEMENINO MÁS INSPIRADOR DEL PAÍS
            </h1>
            <p 
              className="text-base md:text-lg lg:text-xl text-gray-700 leading-relaxed"
              style={{ 
                letterSpacing: '1px',
                marginBottom: '50px',
                width: '100%',
                maxWidth: '800px',
                paddingLeft: '20px',
                paddingRight: '20px'
              }}
            >
              Celebramos los 15 años de la Warmi Runner presentando el <span className="font-semibold text-[#913889]">Warmi Power Fest</span>. 
              Un espacio donde mujeres de todas las edades podrán entrenar, aprender, disfrutar y conectar con marcas y experiencias creadas especialmente para ellas.
            </p>
            
            {/* Información del evento */}
            <div 
              className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
              style={{ 
                width: '100%',
                maxWidth: '1000px',
                marginTop: '30px',
                justifyContent: 'center'
              }}
            >
              <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-[#7FBFA9]/30 text-center" style={{ width: '100%' }}>
                <div className="text-3xl mb-3">📅</div>
                <h3 className="text-lg md:text-xl font-semibold text-[#913889] mb-2">Fechas</h3>
                <p className="text-gray-600 text-sm md:text-base">6, 7 y 8 de marzo<br />2026</p>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-[#7FBFA9]/30 text-center" style={{ width: '100%' }}>
                <div className="text-3xl mb-3">📍</div>
                <h3 className="text-lg md:text-xl font-semibold text-[#913889] mb-2">Ubicación</h3>
                <p className="text-gray-600 text-sm md:text-base">Centro de Exposiciones<br />Quito</p>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-[#7FBFA9]/30 text-center" style={{ width: '100%' }}>
                <div className="text-3xl mb-3">👥</div>
                <h3 className="text-lg md:text-xl font-semibold text-[#913889] mb-2">Participantes</h3>
                <p className="text-gray-600 text-sm md:text-base">+10,000 mujeres<br />reunidas</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Logos en fila */}
      <div className="w-full z-40 relative bg-white/90 backdrop-blur-sm py-4 md:py-6">
        <div className="container mx-auto px-4 flex flex-wrap items-center justify-center gap-8 md:gap-10 lg:gap-12">
          {logos.map((logo) => (
            <div 
              key={logo.name} 
              className="flex flex-col items-center gap-2 md:gap-3 relative"
              onMouseEnter={() => setHoveredLogo(logo.name)}
              onMouseLeave={() => setHoveredLogo(null)}
            >
              <button
                onClick={() => handleLogoClick(logo.name)}
                className="w-24 h-24 md:w-36 md:h-36 lg:w-40 lg:h-40 bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 border-2 border-[#7FBFA9] hover:border-[#913889] overflow-hidden flex items-center justify-center p-1.5 relative z-10"
                style={{ borderRadius: '50%', aspectRatio: '1/1', backgroundColor: 'white' }}
              >
                <img 
                  src={logo.src} 
                  alt={logo.alt} 
                  style={{ 
                    display: 'block', 
                    objectFit: 'contain',
                    width: '100%',
                    height: '100%',
                    maxWidth: '100%',
                    maxHeight: '100%'
                  }}
                />
              </button>
              
              {/* Tooltip/Modal */}
              {hoveredLogo === logo.name && (
                <div 
                  className="absolute left-1/2 transform -translate-x-1/2 px-4 py-2 bg-[#913889] text-white text-xs md:text-sm font-light rounded-lg shadow-xl z-50 whitespace-nowrap animate-fade-in"
                  style={{ 
                    bottom: '100%',
                    marginBottom: '10px'
                  }}
                >
                  {logo.tooltip}
                  <div 
                    className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0"
                    style={{
                      borderLeft: '6px solid transparent',
                      borderRight: '6px solid transparent',
                      borderTop: '6px solid #913889'
                    }}
                  ></div>
                </div>
              )}
              
              <span className="text-xs md:text-sm lg:text-base font-light text-[#913889] text-center">
                {logo.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Sección de Ejes */}
      <div className="w-full bg-white" style={{ paddingTop: '60px', paddingBottom: '60px' }}>
        <div style={{ width: '100%', maxWidth: '1200px', margin: '0 auto', paddingLeft: '20px', paddingRight: '20px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
            <h2 
              className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#913889] text-center"
              style={{ 
                letterSpacing: '3px',
                marginBottom: '50px',
                width: '100%',
                maxWidth: '900px',
                paddingLeft: '20px',
                paddingRight: '20px'
              }}
            >
              Nuestros Ejes
            </h2>
            <div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
              style={{ 
                width: '100%',
                maxWidth: '1000px',
                justifyContent: 'center'
              }}
            >
              <div className="text-center p-6 rounded-lg hover:bg-gradient-to-br hover:from-[#7FBFA9]/10 hover:to-[#913889]/10 transition-all duration-300">
                <div className="text-4xl mb-4">💪</div>
                <h3 className="text-lg md:text-xl font-semibold text-[#913889] mb-2">Fitness</h3>
                <p className="text-gray-600 text-sm">Entrenamiento y actividad física</p>
              </div>
              
              <div className="text-center p-6 rounded-lg hover:bg-gradient-to-br hover:from-[#7FBFA9]/10 hover:to-[#913889]/10 transition-all duration-300">
                <div className="text-4xl mb-4">🧘</div>
                <h3 className="text-lg md:text-xl font-semibold text-[#913889] mb-2">Wellness</h3>
                <p className="text-gray-600 text-sm">Bienestar y relajación</p>
              </div>
              
              <div className="text-center p-6 rounded-lg hover:bg-gradient-to-br hover:from-[#7FBFA9]/10 hover:to-[#913889]/10 transition-all duration-300">
                <div className="text-4xl mb-4">👗</div>
                <h3 className="text-lg md:text-xl font-semibold text-[#913889] mb-2">Moda</h3>
                <p className="text-gray-600 text-sm">Estilo y tendencias</p>
              </div>
              
              <div className="text-center p-6 rounded-lg hover:bg-gradient-to-br hover:from-[#7FBFA9]/10 hover:to-[#913889]/10 transition-all duration-300">
                <div className="text-4xl mb-4">❤️</div>
                <h3 className="text-lg md:text-xl font-semibold text-[#913889] mb-2">Salud</h3>
                <p className="text-gray-600 text-sm">Nutrición y cuidados</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer simple */}
      <footer className="w-full bg-gradient-to-r from-[#7FBFA9] to-[#913889] text-white py-8 md:py-10">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm md:text-base mb-4">
            © {new Date().getFullYear()} Warmi Power Fest. Todos los derechos reservados.
          </p>
          <div className="flex justify-center gap-4">
            <a 
              href="https://wa.me/message/6VRABHAF55GXA1" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:scale-110 transition-transform duration-300"
              aria-label="WhatsApp"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Home

