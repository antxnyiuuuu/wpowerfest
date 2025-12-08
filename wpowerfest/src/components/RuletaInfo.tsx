import { useState } from 'react'

function RuletaInfo() {
  const [hoveredSection, setHoveredSection] = useState<number | null>(null)

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

  return (
    <div className="w-full flex items-center justify-center" style={{ paddingTop: '35px', paddingBottom: '35px' }}>
      <div className="max-w-7xl w-full" style={{ paddingLeft: '20px', paddingRight: '20px' }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-8 lg:gap-12">
          
          {/* Card de información - estilo minimalista */}
          <div className="p-8 sm:p-8 md:p-10 order-2 lg:order-2">
            <div className="flex flex-col h-full justify-center">
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
                      marginTop: '20px',
                      marginBottom: '30px'
                    }}
                  >
                    <span className="text-[#B018A9]">{hoveredEje.title}</span>
                  </p>
                  
                  <div className="h-px w-12 sm:w-16 bg-gradient-to-r from-[#B018A9]/30 to-transparent" style={{ marginTop: '20px', marginBottom: '30px' }}></div>
                  
                  {/* Descripción del eje */}
                  <p 
                    className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 leading-relaxed"
                    style={{ 
                      fontFamily: "'Gotham', sans-serif",
                      lineHeight: '1.8',
                      fontWeight: 300,
                      letterSpacing: '0.2px',
                      marginTop: '20px',
                      marginBottom: '30px'
                    }}
                  >
                    {hoveredEje.description}
                  </p>

                  {/* Elemento decorativo */}
                  <div className="flex items-center gap-3" style={{ marginTop: '30px', marginBottom: '20px' }}>
                    <div className="h-1 w-12 bg-[#54F6C5]"></div>
                    <div className="h-1 w-6 bg-[#B018A9]"></div>
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
                      marginTop: '20px',
                      marginBottom: '30px'
                    }}
                  >
                    <span className="font-medium text-[#B018A9] ">NUESTROS  EJES</span>
                  </p>
                  
                  <div className="h-px w-12 sm:w-16 bg-gradient-to-r from-[#B018A9]/30 to-transparent" style={{ marginTop: '20px', marginBottom: '30px' }}></div>
                  
                  <p 
                    className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 leading-relaxed"
                    style={{ 
                      fontFamily: "'Gotham', sans-serif",
                      lineHeight: '1.8',
                      fontWeight: 300,
                      letterSpacing: '0.2px',
                      marginTop: '20px',
                      marginBottom: '30px'
                    }}
                  >
                    Toca cada sección de la ruleta para conocer los diferentes ejes que componen el Warmi Power Fest.
                  </p>

                  {/* Elemento decorativo */}
                  <div className="flex items-center gap-3" style={{ marginTop: '30px', marginBottom: '20px' }}>
                    <div className="h-1 w-12 bg-[#54F6C5]"></div>
                    <div className="h-1 w-6 bg-[#B018A9]"></div>
                  </div>
                </>
              )}
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
                      onMouseEnter={() => setHoveredSection(section.id)}
                      onMouseLeave={() => setHoveredSection(null)}
                      onTouchStart={() => setHoveredSection(section.id)}
                      onTouchEnd={() => setTimeout(() => setHoveredSection(null), 300)}
                    >
                      <img
                        src={section.image}
                        alt={`Sección ${section.id}`}
                        className={`w-full h-full object-contain transition-all duration-300 ease-out ${
                          hoveredSection === section.id
                            ? 'scale-110 brightness-110 drop-shadow-lg'
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

                {/* Logo central - encima de todo */}
                <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
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
    </div>
  )
}

export default RuletaInfo

