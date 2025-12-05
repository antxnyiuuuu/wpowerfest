import Navigation from '../components/Navigation'

function WarmiTalks() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5F5F5] to-white">
      <Navigation />

      {/* Sección principal */}
      <div className="w-full flex items-center justify-center" style={{ paddingTop: '60px', paddingBottom: '60px' }}>
        <div className="max-w-7xl w-full" style={{ paddingLeft: '20px', paddingRight: '20px' }}>
          <div className="text-center">
            <h1 
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#913889] mb-6"
              style={{ 
                fontFamily: "'Anton', sans-serif",
                letterSpacing: '2px'
              }}
            >
              Warmi Talks
            </h1>
            
            <p 
              className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-700 leading-relaxed max-w-3xl mx-auto"
              style={{ 
                fontFamily: "'Gotham', sans-serif",
                fontWeight: 300,
                letterSpacing: '0.3px',
                marginTop: '20px',
                marginBottom: '30px'
              }}
            >
              Espacios dedicados al bienestar integral, incluyendo masterclass, conferencias, entrenamientos y exhibiciones deportivas.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WarmiTalks

