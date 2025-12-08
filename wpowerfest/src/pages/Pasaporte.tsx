import Navigation from '../components/Navigation'

function Pasaporte() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Imagen grande */}
      <div className="w-full">
        <div className="relative overflow-hidden" style={{ height: 'calc(100vh - 150px)', minHeight: '600px' }}>
          <div className="absolute inset-0 flex items-center justify-center">
            <img 
              src="/images/passport.jpg" 
              alt="Pasaporte"
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Pasaporte
