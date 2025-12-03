import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Navigation from '../components/Navigation'

function Home() {
  const [hoveredLogo, setHoveredLogo] = useState<string | null>(null)
  const navigate = useNavigate()
  
  // Contador regresivo
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const targetDate = new Date('2026-03-06T00:00:00').getTime()
    const startDate = new Date('2025-01-01T00:00:00').getTime() // Fecha de inicio para calcular progreso
    const totalDuration = targetDate - startDate

    const updateCountdown = () => {
      const now = new Date().getTime()
      const difference = targetDate - now
      const elapsed = now - startDate

      // Calcular porcentaje de progreso
      const progressPercent = Math.min(Math.max((elapsed / totalDuration) * 100, 0), 100)
      setProgress(progressPercent)

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        })
      } else {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0
        })
        setProgress(100)
      }
    }

    updateCountdown()
    const interval = setInterval(updateCountdown, 1000)

    return () => clearInterval(interval)
  }, [])

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

      {/* Imagen principal */}
      <div className="w-full z-45 relative" style={{ marginTop: '10px', marginBottom: '10px' }}>
        <div className="relative overflow-hidden h-[200px] md:h-[500px] lg:h-[calc(100vh-200px)] md:min-h-[600px] flex items-center justify-center">
          <img
            src="/images/inicio.png"
            alt="Warmi Power Fest"
            className="w-full h-full object-cover"
            style={{ width: '100%', objectFit: 'cover' }}
          />
        </div>
      </div>

      {/* Sección de presentación */}
      <div className="w-full bg-gradient-to-br from-[#7FBFA9]/10 via-white to-[#913889]/10" style={{ paddingTop: '60px', paddingBottom: '60px', marginTop: '10px', marginBottom: '10px' }}>
        <div style={{ width: '100%', maxWidth: '1200px', margin: '0 auto', paddingLeft: '20px', paddingRight: '20px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', width: '100%' }}>
            <h1 
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#913889] leading-tight"
              style={{ 
                letterSpacing: '3px',
                marginTop: '10px',
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
                marginTop: '10px',
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
            
            {/* Contador regresivo */}
            <div 
              className="w-full mt-8 md:mt-12"
              style={{ 
                maxWidth: '1200px',
                marginTop: '30px',
                marginBottom: '10px',
                marginLeft: 'auto',
                marginRight: 'auto',
                paddingLeft: '20px',
                paddingRight: '20px'
              }}
            >
              <div className="bg-white rounded-xl p-6 md:p-8 shadow-xl transition-all duration-300 border border-[#7FBFA9]/30 text-center" style={{ boxShadow: '0 20px 40px rgba(145, 56, 137, 0.2)', marginTop: '10px', marginBottom: '10px' }}>
                <h3 className="text-xl md:text-2xl font-bold text-[#913889]" style={{ marginTop: '10px', marginBottom: '10px' }}>Faltan</h3>
                <div className="flex items-center justify-center gap-2 md:gap-4" style={{ marginTop: '10px', marginBottom: '10px' }}>
                  <div className="flex flex-col items-center">
                    <div className="text-4xl md:text-5xl lg:text-6xl font-mono font-bold text-[#913889]" style={{ fontFamily: 'monospace', letterSpacing: '3px', textShadow: '2px 2px 8px rgba(145, 56, 137, 0.3)', marginTop: '10px', marginBottom: '10px' }}>
                      {String(timeLeft.days).padStart(3, '0')}
                    </div>
                    <span className="text-sm md:text-base text-gray-600 font-semibold" style={{ marginTop: '10px', marginBottom: '10px' }}>DAYS</span>
                  </div>
                  <span className="text-3xl md:text-4xl font-mono font-bold text-[#913889]" style={{ textShadow: '2px 2px 8px rgba(145, 56, 137, 0.3)', marginTop: '10px', marginBottom: '10px' }}>:</span>
                  <div className="flex flex-col items-center">
                    <div className="text-4xl md:text-5xl lg:text-6xl font-mono font-bold text-[#913889]" style={{ fontFamily: 'monospace', letterSpacing: '3px', textShadow: '2px 2px 8px rgba(145, 56, 137, 0.3)', marginTop: '10px', marginBottom: '10px' }}>
                      {String(timeLeft.hours).padStart(2, '0')}
                    </div>
                    <span className="text-sm md:text-base text-gray-600 font-semibold" style={{ marginTop: '10px', marginBottom: '10px' }}>HOURS</span>
                  </div>
                  <span className="text-3xl md:text-4xl font-mono font-bold text-[#913889]" style={{ textShadow: '2px 2px 8px rgba(145, 56, 137, 0.3)', marginTop: '10px', marginBottom: '10px' }}>:</span>
                  <div className="flex flex-col items-center">
                    <div className="text-4xl md:text-5xl lg:text-6xl font-mono font-bold text-[#913889]" style={{ fontFamily: 'monospace', letterSpacing: '3px', textShadow: '2px 2px 8px rgba(145, 56, 137, 0.3)', marginTop: '10px', marginBottom: '10px' }}>
                      {String(timeLeft.minutes).padStart(2, '0')}
                    </div>
                    <span className="text-sm md:text-base text-gray-600 font-semibold" style={{ marginTop: '10px', marginBottom: '10px' }}>MINUTES</span>
                  </div>
                  <span className="text-3xl md:text-4xl font-mono font-bold text-[#913889]" style={{ textShadow: '2px 2px 8px rgba(145, 56, 137, 0.3)', marginTop: '10px', marginBottom: '10px' }}>:</span>
                  <div className="flex flex-col items-center">
                    <div className="text-4xl md:text-5xl lg:text-6xl font-mono font-bold text-[#913889]" style={{ fontFamily: 'monospace', letterSpacing: '3px', textShadow: '2px 2px 8px rgba(145, 56, 137, 0.3)', marginTop: '10px', marginBottom: '10px' }}>
                      {String(timeLeft.seconds).padStart(2, '0')}
                    </div>
                    <span className="text-sm md:text-base text-gray-600 font-semibold" style={{ marginTop: '10px', marginBottom: '10px' }}>SECONDS</span>
                  </div>
                </div>
                
                {/* Barra de progreso */}
                <div style={{ marginTop: '10px', marginBottom: '10px' }}>
                  <div className="w-full bg-gray-200 rounded-full h-4 md:h-5 overflow-hidden" style={{ boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.1)' }}>
                    <div 
                      className="h-full rounded-full transition-all duration-1000 ease-out"
                      style={{ 
                        width: `${progress}%`,
                        background: 'linear-gradient(90deg, #913889 0%, #7FBFA9 100%)',
                        boxShadow: '0 2px 8px rgba(145, 56, 137, 0.4)'
                      }}
                    ></div>
                  </div>
                </div>
                
                <p className="text-gray-500 text-xs md:text-sm" style={{ marginTop: '10px', marginBottom: '10px' }}>6 de marzo 2026</p>
              </div>
            </div>

            {/* Mapa de ubicación */}
            <div 
              className="w-full mt-8 md:mt-12"
              style={{ 
                maxWidth: '1200px',
                marginTop: '30px',
                marginBottom: '10px',
                marginLeft: 'auto',
                marginRight: 'auto',
                paddingLeft: '20px',
                paddingRight: '20px'
              }}
            >
              <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-[#7FBFA9]/30" style={{ boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)', marginTop: '10px', marginBottom: '10px' }}>
                <div className="p-5 md:p-6 bg-white">
                  <h3 className="text-xl md:text-2xl font-bold text-[#913889] text-center flex items-center justify-center gap-3" style={{ marginTop: '10px', marginBottom: '10px' }}>
                    <span className="text-2xl md:text-3xl" style={{ marginTop: '10px', marginBottom: '10px' }}>📍</span>
                    <span style={{ marginTop: '10px', marginBottom: '10px' }}>Ubicación del Evento</span>
                  </h3>
                </div>
                <div className="relative w-full overflow-hidden bg-gray-100" style={{ height: '400px', minHeight: '350px' }}>
                  <iframe
                    src="https://www.google.com/maps?q=Centro+de+Exposiciones+Quito&output=embed&hl=es"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Ubicación del Warmi Power Fest - Centro de Exposiciones, Quito"
                    className="w-full h-full"
                  ></iframe>
                  <div className="absolute bottom-4 right-4 z-10">
                    <a 
                      href="https://maps.app.goo.gl/QoXDHQgyjr8zyaGk6" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="bg-white hover:bg-gray-50 text-gray-700 hover:text-gray-900 px-4 py-2 md:px-6 md:py-3 rounded-lg shadow-xl border border-gray-200 transition-all duration-300 hover:scale-105 font-medium text-sm md:text-base flex items-center gap-2"
                    >
                      <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                      </svg>
                      Abrir en Google Maps
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Logos en fila */}
      <div className="w-full z-40 relative bg-white/90 backdrop-blur-sm py-4 md:py-6" style={{ marginTop: '10px', marginBottom: '10px' }}>
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
              
              <span className="text-xs md:text-sm lg:text-base font-light text-[#913889] text-center" style={{ marginTop: '10px', marginBottom: '10px' }}>
                {logo.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Sección de Ejes */}
      <div className="w-full bg-white" style={{ paddingTop: '60px', paddingBottom: '60px', marginTop: '10px', marginBottom: '10px' }}>
        <div style={{ width: '100%', maxWidth: '1200px', margin: '0 auto', paddingLeft: '20px', paddingRight: '20px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
            <h2 
              className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#913889] text-center"
              style={{ 
                letterSpacing: '3px',
                marginTop: '10px',
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
                marginTop: '10px',
                marginBottom: '10px',
                justifyContent: 'center'
              }}
            >
              <div className="text-center p-6 rounded-lg bg-white hover:bg-gradient-to-br hover:from-[#7FBFA9]/10 hover:to-[#913889]/10 transition-all duration-300 shadow-lg hover:shadow-xl" style={{ marginTop: '10px', marginBottom: '10px', boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)' }}>
                <div className="text-4xl" style={{ marginTop: '10px', marginBottom: '10px' }}>💪</div>
                <h3 className="text-lg md:text-xl font-semibold text-[#913889]" style={{ marginTop: '10px', marginBottom: '10px' }}>Fitness</h3>
                <p className="text-gray-600 text-sm" style={{ marginTop: '10px', marginBottom: '10px' }}>Entrenamiento y actividad física</p>
              </div>
              
              <div className="text-center p-6 rounded-lg bg-white hover:bg-gradient-to-br hover:from-[#7FBFA9]/10 hover:to-[#913889]/10 transition-all duration-300 shadow-lg hover:shadow-xl" style={{ marginTop: '10px', marginBottom: '10px', boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)' }}>
                <div className="text-4xl" style={{ marginTop: '10px', marginBottom: '10px' }}>🧘</div>
                <h3 className="text-lg md:text-xl font-semibold text-[#913889]" style={{ marginTop: '10px', marginBottom: '10px' }}>Wellness</h3>
                <p className="text-gray-600 text-sm" style={{ marginTop: '10px', marginBottom: '10px' }}>Bienestar y relajación</p>
              </div>
              
              <div className="text-center p-6 rounded-lg bg-white hover:bg-gradient-to-br hover:from-[#7FBFA9]/10 hover:to-[#913889]/10 transition-all duration-300 shadow-lg hover:shadow-xl" style={{ marginTop: '10px', marginBottom: '10px', boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)' }}>
                <div className="text-4xl" style={{ marginTop: '10px', marginBottom: '10px' }}>👗</div>
                <h3 className="text-lg md:text-xl font-semibold text-[#913889]" style={{ marginTop: '10px', marginBottom: '10px' }}>Moda</h3>
                <p className="text-gray-600 text-sm" style={{ marginTop: '10px', marginBottom: '10px' }}>Estilo y tendencias</p>
              </div>
              
              <div className="text-center p-6 rounded-lg bg-white hover:bg-gradient-to-br hover:from-[#7FBFA9]/10 hover:to-[#913889]/10 transition-all duration-300 shadow-lg hover:shadow-xl" style={{ marginTop: '10px', marginBottom: '10px', boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)' }}>
                <div className="text-4xl" style={{ marginTop: '10px', marginBottom: '10px' }}>❤️</div>
                <h3 className="text-lg md:text-xl font-semibold text-[#913889]" style={{ marginTop: '10px', marginBottom: '10px' }}>Salud</h3>
                <p className="text-gray-600 text-sm" style={{ marginTop: '10px', marginBottom: '10px' }}>Nutrición y cuidados</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer simple */}
      <footer className="w-full bg-gradient-to-r from-[#7FBFA9] to-[#913889] text-white py-8 md:py-10" style={{ marginTop: '10px' }}>
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

