import Navigation from '../components/Navigation'

function Info() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Sección principal - Centrado */}
      <div className="w-full flex items-center justify-center min-h-[calc(100vh-200px)]">
        {/* Card con bordes redondeados */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200 max-w-6xl w-full mx-4 md:mx-6 my-8 md:my-12">
          <div className="grid grid-cols-1 md:grid-cols-2">
            
            {/* Primera mitad - Imagen */}
            <div className="flex items-center justify-center p-6 md:p-8">
              <img
                src="/images/Chica Runner.jpg"
                alt="Warmi Runner"
                className="w-full max-w-md h-auto object-contain rounded-lg"
              />
            </div>

            {/* Segunda mitad - Logo y texto */}
            <div className="flex flex-col items-center justify-center space-y-5 md:space-y-6 text-center p-8 md:p-10">
              {/* Logo */}
              <div className="w-full flex justify-center">
                <img
                  src="/images/logo-solo-warmi.png"
                  alt="Warmi Logo"
                  className="h-16 md:h-20 lg:h-24 object-contain"
                />
              </div>

              {/* Título */}
              <h1 
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#913889] leading-tight"
                style={{ 
                  fontFamily: "'Anton', sans-serif",
                  letterSpacing: '2px'
                }}
              >
                WARMI POWER FEST
              </h1>

              {/* Texto informativo */}
              <div className="space-y-4 md:space-y-5 text-gray-700">
                <p 
                  className="text-base md:text-lg lg:text-xl leading-relaxed"
                  style={{ 
                    fontFamily: "'Montserrat', sans-serif",
                    lineHeight: '1.8'
                  }}
                >
                  Warmi Power Fest, el festival femenino más inspirador y completo del país, celebramos los 15 años de la Warmi Runner.
                </p>
                
                <p 
                  className="text-base md:text-lg lg:text-xl leading-relaxed"
                  style={{ 
                    fontFamily: "'Montserrat', sans-serif",
                    lineHeight: '1.8'
                  }}
                >
                  Un espacio donde mujeres de todas las edades podrán entrenar, aprender, disfrutar y conectar con marcas y experiencias creadas especialmente para ellas.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Info
