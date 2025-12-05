import { Link } from 'react-router-dom'
import Navigation from '../components/Navigation'
import RuletaInfo from '../components/RuletaInfo'

function Info() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5F5F5] to-white">
      <Navigation />

      {/* Sección principal - Diseño minimalista */}
      <div className="w-full flex items-center justify-center min-h-[calc(100vh-200px)]" style={{ paddingTop: '60px', paddingBottom: '60px' }}>
        <div className="max-w-7xl w-full" style={{ paddingLeft: '20px', paddingRight: '20px' }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 md:gap-12 lg:gap-16 items-center">
            
            {/* Lado izquierdo - Imagen con estilo minimalista */}
            <div className="relative flex items-center justify-center order-1 lg:order-2" style={{ marginTop: '15px', marginBottom: '35px' }}>
              <div className="relative w-full max-w-[240px] sm:max-w-xs md:max-w-sm">
                {/* Decoración sutil de fondo */}
                <div className="absolute -top-6 -left-6 sm:-top-8 sm:-left-8 w-24 h-24 sm:w-32 sm:h-32 bg-[#913889]/5 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-6 -right-6 sm:-bottom-8 sm:-right-8 w-32 h-32 sm:w-40 sm:h-40 bg-[#7FBFA9]/5 rounded-full blur-3xl"></div>
                
                {/* Imagen principal */}
                <div className="relative overflow-hidden rounded-2xl">
                  <img
                    src="/images/Chica Runner.jpg"
                    alt="Warmi Power Fest"
                    className="w-full h-auto object-cover rounded-2xl shadow-2xl"
                  />
                  {/* Overlay sutil para dar profundidad */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent pointer-events-none"></div>
                </div>
              </div>
            </div>

            {/* Lado derecho - Contenido minimalista */}
            <div className="flex flex-col space-y-10 md:space-y-8 order-2 lg:order-1 items-center text-center lg:text-left lg:items-start">
              {/* Logo pequeño y discreto - centrado */}
              <div className="flex justify-center lg:justify-center w-full" style={{ marginTop: '20px', marginBottom: '30px' }}>
                <img
                  src="/images/logo-solo-warmi.png"
                  alt="Warmi Logo"
                  className="h-16 sm:h-20 md:h-28 lg:h-32 object-contain opacity-90"
                />
              </div>

              {/* Texto informativo con estilo minimalista */}
              <div>
                <p 
                  className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-800 leading-relaxed"
                  style={{ 
                    fontFamily: "'Gotham', sans-serif",
                    lineHeight: '1.7',
                    fontWeight: 300,
                    letterSpacing: '0.3px',
                    marginTop: '20px',
                    marginBottom: '30px'
                  }}
                >
                  El festival femenino más inspirador y completo del país. Celebramos los <span className="font-medium text-[#913889]">15 años de la Warmi Runner</span>.
                </p>
                
                <div className="h-px w-12 sm:w-16 bg-gradient-to-r from-[#913889]/30 to-transparent" style={{ marginTop: '20px', marginBottom: '30px' }}></div>
                
                <p 
                  className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 leading-relaxed"
                  style={{ 
                    fontFamily: "'Gotham', sans-serif",
                    lineHeight: '1.8',
                    fontWeight: 300,
                    letterSpacing: '0.2px',
                    marginTop: '20px',
                    marginBottom: '30px'
                  }}
                >
                  Un espacio donde mujeres de todas las edades podrán entrenar, aprender, disfrutar y conectar con marcas y experiencias creadas especialmente para ellas.
                </p>
              </div>

              {/* Elemento decorativo minimalista */}
              <div className="flex items-center gap-3" style={{ marginTop: '30px', marginBottom: '20px' }}>
                <div className="h-1 w-12 bg-[#7FBFA9]"></div>
                <div className="h-1 w-6 bg-[#913889]"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Componente RuletaInfo debajo del card principal */}
      <div style={{ marginTop: '35px', marginBottom: '35px' }}>
        <RuletaInfo />
      </div>

      {/* Sección ¿Qué habrá en el WPF? */}
      <div className="w-full flex items-center justify-center" style={{ paddingTop: '60px', paddingBottom: '60px' }}>
        <div className="max-w-7xl w-full" style={{ paddingLeft: '20px', paddingRight: '20px' }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-8 lg:gap-12">
            
            {/* Lado izquierdo - Lista de actividades */}
            <div className="p-8 sm:p-8 md:p-10 order-2 lg:order-1">
              {/* Título */}
              <h2 
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight"
                style={{ 
                  fontFamily: "'Anton', sans-serif",
                  letterSpacing: '2px',
                  marginTop: '20px',
                  marginBottom: '40px'
                }}
              >
                <span style={{ color: '#7FBFA9' }}>¿Qué</span>{' '}
                <span style={{ color: '#913889' }}>habrá en el WPF?</span>
              </h2>

              {/* Lista de actividades */}
              <div className="space-y-6" style={{ marginTop: '20px', marginBottom: '30px' }}>
                {/* Salón Warmi Challenge */}
                <div>
                  <Link to="/mapa">
                    <h3 
                      className="text-lg sm:text-xl md:text-2xl font-medium text-[#913889] hover:text-[#7FBFA9] transition-colors duration-200"
                      style={{ 
                        fontFamily: "'Gotham', sans-serif",
                        marginTop: '20px',
                        marginBottom: '15px',
                        textDecoration: 'underline',
                        textDecorationThickness: '2px',
                        textUnderlineOffset: '4px',
                        cursor: 'pointer'
                      }}
                    >
                      Salón Warmi Challenge
                    </h3>
                  </Link>
                  <ul className="list-none space-y-2 ml-4">
                    <li 
                      className="text-base sm:text-lg md:text-xl text-gray-700"
                      style={{ 
                        fontFamily: "'Gotham', sans-serif",
                        fontWeight: 300,
                        position: 'relative',
                        paddingLeft: '20px'
                      }}
                    >
                      <span 
                        className="absolute left-0 top-2 w-2 h-2 rounded-full bg-[#913889]"
                        style={{ marginTop: '6px' }}
                      ></span>
                      Stands de exhibición
                    </li>
                    <li 
                      className="text-base sm:text-lg md:text-xl text-gray-700"
                      style={{ 
                        fontFamily: "'Gotham', sans-serif",
                        fontWeight: 300,
                        position: 'relative',
                        paddingLeft: '20px'
                      }}
                    >
                      <span 
                        className="absolute left-0 top-2 w-2 h-2 rounded-full bg-[#913889]"
                        style={{ marginTop: '6px' }}
                      ></span>
                      Desafíos deportivos
                    </li>
                    <li 
                      className="text-base sm:text-lg md:text-xl text-gray-700"
                      style={{ 
                        fontFamily: "'Gotham', sans-serif",
                        fontWeight: 300,
                        position: 'relative',
                        paddingLeft: '20px'
                      }}
                    >
                      <span 
                        className="absolute left-0 top-2 w-2 h-2 rounded-full bg-[#913889]"
                        style={{ marginTop: '6px' }}
                      ></span>
                      Pasarela de moda deportiva
                    </li>
                  </ul>
                </div>

                {/* Warmi Talks */}
                <div>
                  <Link to="/warmi-talks">
                    <h3 
                      className="text-lg sm:text-xl md:text-2xl font-medium text-[#913889] hover:text-[#7FBFA9] transition-colors duration-200"
                      style={{ 
                        fontFamily: "'Gotham', sans-serif",
                        marginTop: '20px',
                        marginBottom: '15px',
                        textDecoration: 'underline',
                        textDecorationThickness: '2px',
                        textUnderlineOffset: '4px',
                        cursor: 'pointer'
                      }}
                    >
                      Warmi Talks
                    </h3>
                  </Link>
                  <ul className="list-none space-y-2 ml-4">
                    <li 
                      className="text-base sm:text-lg md:text-xl text-gray-700"
                      style={{ 
                        fontFamily: "'Gotham', sans-serif",
                        fontWeight: 300,
                        position: 'relative',
                        paddingLeft: '20px'
                      }}
                    >
                      <span 
                        className="absolute left-0 top-2 w-2 h-2 rounded-full bg-[#913889]"
                        style={{ marginTop: '6px' }}
                      ></span>
                      Masterclass y conferencias
                    </li>
                    <li 
                      className="text-base sm:text-lg md:text-xl text-gray-700"
                      style={{ 
                        fontFamily: "'Gotham', sans-serif",
                        fontWeight: 300,
                        position: 'relative',
                        paddingLeft: '20px'
                      }}
                    >
                      <span 
                        className="absolute left-0 top-2 w-2 h-2 rounded-full bg-[#913889]"
                        style={{ marginTop: '6px' }}
                      ></span>
                      Entrenamientos y exhibiciones deportivas
                    </li>
                    <li 
                      className="text-base sm:text-lg md:text-xl text-gray-700"
                      style={{ 
                        fontFamily: "'Gotham', sans-serif",
                        fontWeight: 300,
                        position: 'relative',
                        paddingLeft: '20px'
                      }}
                    >
                      <span 
                        className="absolute left-0 top-2 w-2 h-2 rounded-full bg-[#913889]"
                        style={{ marginTop: '6px' }}
                      ></span>
                      Lanzamiento de productos
                    </li>
                  </ul>
                </div>

                {/* Otras actividades */}
                <div className="space-y-3">
                  <div 
                    className="text-base sm:text-lg md:text-xl text-gray-700"
                    style={{ 
                      fontFamily: "'Gotham', sans-serif",
                      fontWeight: 300,
                      marginTop: '20px'
                    }}
                  >
                    <strong className="text-[#913889]">Premios Warmi 2026</strong>
                  </div>
                  <div 
                    className="text-base sm:text-lg md:text-xl text-gray-700"
                    style={{ 
                      fontFamily: "'Gotham', sans-serif",
                      fontWeight: 300
                    }}
                  >
                    <strong className="text-[#913889]">Business Warmi Zone</strong>
                  </div>
                  <div 
                    className="text-base sm:text-lg md:text-xl text-gray-700"
                    style={{ 
                      fontFamily: "'Gotham', sans-serif",
                      fontWeight: 300
                    }}
                  >
                    <strong className="text-[#913889]">Zona nutritiva</strong>
                  </div>
                  <div 
                    className="text-base sm:text-lg md:text-xl text-gray-700"
                    style={{ 
                      fontFamily: "'Gotham', sans-serif",
                      fontWeight: 300
                    }}
                  >
                    <strong className="text-[#913889]">Kids zone (zona de niños)</strong>
                  </div>
                </div>
              </div>
            </div>

            {/* Lado derecho - Imagen de la chica */}
            <div className="p-8 sm:p-8 md:p-10 order-1 lg:order-2 flex items-center justify-center">
              <div className="relative w-full max-w-md sm:max-w-lg md:max-w-xl">
                {/* Decoración sutil de fondo */}
                <div className="absolute -top-6 -left-6 sm:-top-8 sm:-left-8 w-24 h-24 sm:w-32 sm:h-32 bg-[#913889]/5 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-6 -right-6 sm:-bottom-8 sm:-right-8 w-32 h-32 sm:w-40 sm:h-40 bg-[#7FBFA9]/5 rounded-full blur-3xl"></div>
                
                {/* Imagen principal */}
                <div className="relative overflow-hidden rounded-2xl">
                  <img
                    src="/images/Chica señalando.jpg"
                    alt="¿Qué habrá en el WPF?"
                    className="w-full h-auto object-cover rounded-2xl shadow-2xl"
                  />
                  {/* Overlay sutil para dar profundidad */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent pointer-events-none"></div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Info
