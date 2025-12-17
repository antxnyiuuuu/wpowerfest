import { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

function RuletaInfo() {
  const [hoveredSection, setHoveredSection] = useState<number | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedEje, setSelectedEje] = useState<typeof sections[0] | null>(null)

  // 5 secciones con información sobre los ejes
  const sections = [
    {
      id: 1,
      image: '/images/Rueda-1.png',
      rotation: 0,
      title: 'Deporte',
      description: 'Actividades deportivas y competencias diseñadas para empoderar a las mujeres a través del movimiento y la actividad física.'
    },
    {
      id: 2,
      image: '/images/Rueda-2.png',
      rotation: 72,
      title: 'Fitness y Wellness',
      description: 'Espacios dedicados al bienestar integral, incluyendo entrenamientos, yoga, meditación y prácticas de autocuidado.'
    },
    {
      id: 3,
      image: '/images/Rueda-3.png',
      rotation: 144,
      title: 'Moda y Equipamientos',
      description: 'Tendencias en moda deportiva y equipamientos especializados para la mujer activa y moderna.'
    },
    {
      id: 4,
      image: '/images/Rueda-4.png',
      rotation: 216,
      title: 'Belleza',
      description: 'Productos y servicios de belleza que realzan la confianza y el cuidado personal de cada mujer.'
    },
    {
      id: 5,
      image: '/images/Rueda-5.png',
      rotation: 288,
      title: 'Salud y Nutrición',
      description: 'Información y recursos sobre alimentación saludable, nutrición deportiva y bienestar nutricional.'
    },
  ]

  const hoveredEje = hoveredSection ? sections.find(s => s.id === hoveredSection) : null

  // Detectar si es móvil (tablet y móvil)
  const [isMobile, setIsMobile] = useState(false)

  // Estados para detectar scroll vs tap
  const touchStartRef = useRef<{ x: number; y: number; time: number } | null>(null)
  const hasMovedRef = useRef(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)

    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Bloquear scroll cuando el modal está abierto
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden'
      document.documentElement.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
      document.documentElement.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
      document.documentElement.style.overflow = ''
    }
  }, [isModalOpen])

  // Manejar click/touch en sección
  const handleSectionClick = (section: typeof sections[0]) => {
    if (isMobile && !hasMovedRef.current) {
      setSelectedEje(section)
      setIsModalOpen(true)
    }
  }

  // Manejar inicio de touch
  const handleTouchStart = (e: React.TouchEvent, section: typeof sections[0]) => {
    if (isMobile) {
      const touch = e.touches[0]
      touchStartRef.current = {
        x: touch.clientX,
        y: touch.clientY,
        time: Date.now()
      }
      hasMovedRef.current = false
    } else {
      setHoveredSection(section.id)
    }
  }

  // Manejar movimiento de touch
  const handleTouchMove = (e: React.TouchEvent) => {
    if (isMobile && touchStartRef.current) {
      const touch = e.touches[0]
      const moveDistance = Math.sqrt(
        Math.pow(touch.clientX - touchStartRef.current.x, 2) +
        Math.pow(touch.clientY - touchStartRef.current.y, 2)
      )
      // Si se movió más de 10px, es un scroll, no un tap
      if (moveDistance > 10) {
        hasMovedRef.current = true
      }
    }
  }

  // Manejar fin de touch
  const handleTouchEnd = (e: React.TouchEvent, section: typeof sections[0]) => {
    if (isMobile) {
      // Solo abrir modal si no hubo movimiento significativo y fue un tap rápido
      if (touchStartRef.current && !hasMovedRef.current) {
        const touchDuration = Date.now() - touchStartRef.current.time
        // Si fue un tap rápido (menos de 300ms), abrir modal
        if (touchDuration < 300) {
          handleSectionClick(section)
        }
      }
      touchStartRef.current = null
      hasMovedRef.current = false
    } else {
      setTimeout(() => setHoveredSection(null), 300)
    }
  }

  // Cerrar modal
  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedEje(null)
  }

  return (
    <div className="w-full flex items-center justify-center" style={{ paddingTop: '35px', paddingBottom: '35px' }}>
      <div className="max-w-7xl w-full" style={{ paddingLeft: '20px', paddingRight: '20px' }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-8 lg:gap-12">

          {/* Card de información - estilo minimalista */}
          <div className="p-8 sm:p-8 md:p-10 order-2 lg:order-2">
            <div className="flex flex-col h-full justify-center">
              {/* Card contenedor con diseño minimalista */}
              <div
                className="relative bg-white rounded-2xl border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden"
                style={{
                  padding: "40px 30px",
                  borderLeft: hoveredEje ? "4px solid #B018A9" : "4px solid #54F6C5",
                  transition: "all 0.5s ease"
                }}
              >
                {/* Decoración de fondo sutil */}
                <div
                  className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-10 transition-opacity duration-500"
                  style={{
                    background: hoveredEje ? "#B018A9" : "#54F6C5",
                  }}
                ></div>

                {/* Contenido */}
                <div
                  key={hoveredEje?.id || 'default'}
                  className="relative z-10"
                >
                  {hoveredEje ? (
                    <>
                      {/* Título del eje con hover */}
                      <p
                        className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-800 leading-relaxed"
                        style={{
                          fontFamily: "'Anton', sans-serif",
                          lineHeight: '1.7',
                          fontWeight: 400,
                          letterSpacing: '2px',
                          marginBottom: '20px'
                        }}
                      >
                        <span className="text-[#B018A9]">{hoveredEje.title}</span>
                      </p>

                      <div className="h-px w-16 bg-gradient-to-r from-[#B018A9] via-[#B018A9]/50 to-transparent mb-6"></div>

                      {/* Descripción del eje */}
                      <p
                        className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed"
                        style={{
                          fontFamily: "'Gotham', sans-serif",
                          lineHeight: '1.8',
                          fontWeight: 300,
                          letterSpacing: '0.2px',
                        }}
                      >
                        {hoveredEje.description}
                      </p>

                      {/* Elemento decorativo */}
                      <div className="flex items-center gap-3 mt-8">
                        <div className="h-1 w-12 bg-[#B018A9] rounded-full"></div>
                        <div className="h-1 w-6 bg-[#54F6C5] rounded-full"></div>
                      </div>
                    </>
                  ) : (
                    <>
                      {/* Texto inicial cuando no hay hover */}
                      <p
                        className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-800 leading-relaxed"
                        style={{
                          fontFamily: "'Anton', sans-serif",
                          lineHeight: '1.7',
                          fontWeight: 400,
                          letterSpacing: '2px',
                          marginBottom: '20px'
                        }}
                      >
                        <span className="font-medium text-[#54F6C5]">NUESTROS EJES</span>
                      </p>

                      <div className="h-px w-16 bg-gradient-to-r from-[#54F6C5] via-[#54F6C5]/50 to-transparent mb-6"></div>

                      <p
                        className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed"
                        style={{
                          fontFamily: "'Gotham', sans-serif",
                          lineHeight: '1.8',
                          fontWeight: 300,
                          letterSpacing: '0.2px',
                        }}
                      >
                        Toca cada sección de la ruleta para conocer los diferentes ejes que componen el Warmi Power Fest.
                      </p>

                      {/* Elemento decorativo */}
                      <div className="flex items-center gap-3 mt-8">
                        <div className="h-1 w-12 bg-[#54F6C5] rounded-full"></div>
                        <div className="h-1 w-6 bg-[#B018A9] rounded-full"></div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Card de la ruleta */}
          <div className="p-8 sm:p-8 md:p-8 order-1 lg:order-1 flex items-center justify-start" style={{ marginTop: '20px', marginBottom: '20px', paddingLeft: '0', marginLeft: '-20px' }}>
            <div className="relative w-full aspect-square max-w-[360px] sm:max-w-md md:max-w-lg lg:max-w-xl">
              {/* Contenedor para las secciones */}
              <div className="relative w-full h-full">
                {sections.map((section) => {
                  // Calcular la posición de cada imagen manteniendo la distancia circular
                  // Radio ajustado para compensar el tamaño más grande y mantener distancia proporcional
                  const baseRadius = 32
                  const isHovered = hoveredSection === section.id
                  // Cuando se agranda (scale-110), aumentamos el radio proporcionalmente para mantener la distancia
                  const radius = isHovered ? baseRadius * 1.05 : baseRadius
                  const angleRad = (section.rotation * Math.PI) / 180
                  const x = 50 + radius * Math.sin(angleRad)
                  const y = 50 - radius * Math.cos(angleRad)

                  return (
                    <div
                      key={section.id}
                      className="absolute transition-all duration-300 ease-out cursor-pointer touch-manipulation"
                      style={{
                        left: `${x}%`,
                        top: `${y}%`,
                        transform: `translate(-50%, -50%) rotate(${section.rotation}deg)`,
                        transformOrigin: 'center center',
                        width: '50%',
                        height: '50%',
                      }}
                      onMouseEnter={() => !isMobile && setHoveredSection(section.id)}
                      onMouseLeave={() => !isMobile && setHoveredSection(null)}
                      onClick={() => !isMobile && handleSectionClick(section)}
                      onTouchStart={(e) => handleTouchStart(e, section)}
                      onTouchMove={handleTouchMove}
                      onTouchEnd={(e) => handleTouchEnd(e, section)}
                    >
                      <img
                        src={section.image}
                        alt={`Sección ${section.id}`}
                        className={`w-full h-full object-contain transition-all duration-300 ease-out ${hoveredSection === section.id
                          ? 'scale-125 brightness-110 drop-shadow-2xl'
                          : 'scale-100 brightness-100'
                          }`}
                        style={{
                          transform: `rotate(${-section.rotation}deg)`,
                          transformOrigin: 'center center',
                        }}
                      />
                    </div>
                  )
                })}

                {/* Logo central - encima de todo - oculto en móvil */}
                <div className="absolute inset-0 hidden md:flex items-center justify-center z-10 pointer-events-none">
                  <img
                    src="/images/logo-solo-warmi.png"
                    alt="Warmi Logo"
                    className="h-5 sm:h-7 md:h-10 lg:h-12 object-contain drop-shadow-md"
                  />
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Modal para móvil */}
      {isModalOpen && selectedEje && createPortal(
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-6 bg-[#000000]/60 backdrop-blur-md h-screen w-screen"
          onClick={(e) => {
            if (e.target === e.currentTarget) handleCloseModal()
          }}
        >
          <div
            className="rounded-3xl w-full max-w-xl relative border-t-8 border-[#B018A9] shadow-2xl animate-fadeInUp m-auto overflow-hidden"
            style={{ backgroundColor: '#ffffff' }}
          >
            {/* Botón cerrar */}
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 text-[#9ca3af] hover:text-[#B018A9] hover:bg-[#f3f4f6] rounded-full p-2 transition-colors z-10"
              aria-label="Cerrar"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Contenido del modal */}
            <div className="py-10 px-6 md:px-10">
              {/* Imagen del eje */}
              <div className="flex justify-center mb-6">
                <div className="w-48 h-48 md:w-56 md:h-56 flex items-center justify-center">
                  <img
                    src={selectedEje.image}
                    alt={selectedEje.title}
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>

              {/* Título */}
              <h3
                className="text-3xl md:text-4xl text-[#B018A9] font-['Anton'] uppercase mb-4 text-center"
                style={{
                  letterSpacing: '2px',
                }}
              >
                {selectedEje.title}
              </h3>

              {/* Línea decorativa */}
              <div className="flex justify-center mb-6">
                <div className="h-1 w-16 bg-gradient-to-r from-transparent via-[#54F6C5] to-transparent"></div>
              </div>

              {/* Descripción */}
              <p
                className="text-base md:text-lg text-gray-600 leading-relaxed text-center"
                style={{
                  fontFamily: "'Gotham', sans-serif",
                  lineHeight: '1.8',
                  fontWeight: 300,
                  letterSpacing: '0.2px',
                }}
              >
                {selectedEje.description}
              </p>

              {/* Elementos decorativos */}
              <div className="flex items-center justify-center gap-3 mt-8">
                <div className="h-1 w-12 bg-[#54F6C5]"></div>
                <div className="h-1 w-6 bg-[#B018A9]"></div>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  )
}

export default RuletaInfo

