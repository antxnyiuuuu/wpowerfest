import Navigation from '../components/Navigation'

function Pasaporte() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Contenedor principal */}
      <div className="w-full px-4 py-8 md:py-12" style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
      }}>
        <div className="max-w-7xl mx-auto" style={{
          width: '100%',
          maxWidth: '1280px',
          marginLeft: 'auto',
          marginRight: 'auto'
        }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12" style={{
            display: 'grid',
            gridTemplateColumns: window.innerWidth >= 1024 ? '1fr 1fr' : '1fr',
            gap: '48px',
            width: '100%'
          }}>

            {/* Card de la imagen */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-lg p-8 flex items-center justify-center" style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '32px'
            }}>
              <img
                src="/images/Pasaporte.png"
                alt="Pasaporte Warmi Power Fest"
                className="w-full max-w-md object-contain"
                style={{
                  maxWidth: '450px',
                  width: '100%',
                  height: 'auto',
                  display: 'block',
                  margin: '0 auto'
                }}
              />
            </div>

            {/* Card del texto */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-lg p-8 lg:p-10 flex flex-col justify-center space-y-6" style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              padding: '40px'
            }}>
              {/* Título */}
              <h1
                className="text-4xl md:text-5xl lg:text-6xl font-bold uppercase"
                style={{
                  fontFamily: "'Anton', sans-serif",
                  color: '#B018A9',
                  letterSpacing: '2px',
                  marginBottom: '24px'
                }}
              >
                <span style={{ color: '#B018A9' }}>WARMI</span>{' '}
                <span style={{ color: '#54F6C5' }}>PASSPORT</span>
              </h1>

              {/* Descripción 1 */}
              <p
                className="text-base md:text-lg lg:text-xl leading-relaxed"
                style={{
                  fontFamily: "'Gotham', sans-serif",
                  color: '#000000',
                  fontWeight: 400,
                  lineHeight: '1.8',
                  marginBottom: '24px'
                }}
              >
                Con <span style={{ color: '#B018A9', fontWeight: 700 }}>Warmi Passport</span>, cada participante recorrerá todos los stands superando retos y acumulando sellos para ganar premios exclusivos.
              </p>

              {/* Descripción 2 */}
              <p
                className="text-base md:text-lg lg:text-xl leading-relaxed"
                style={{
                  fontFamily: "'Gotham', sans-serif",
                  color: '#000000',
                  fontWeight: 400,
                  lineHeight: '1.8'
                }}
              >
                Tu marca llega directo a sus manos con insertos promocionales, beneficios especiales y presencia en todo el recorrido.
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Pasaporte
