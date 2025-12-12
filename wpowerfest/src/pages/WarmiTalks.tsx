import Navigation from '../components/Navigation'
import Footer from '../components/Footer'

function WarmiTalks() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Contenedor para la imagen centrada */}
      <div
        className="w-full flex items-start justify-center"
        style={{
          paddingTop: '20px',
          paddingBottom: '40px'
        }}
      >
        <img
          src="/images/fondo-warmi-talks.png"
          alt="Warmi Talks"
          className="object-contain"
          style={{
            maxWidth: '90%',
            maxHeight: '85vh',
            width: 'auto',
            height: 'auto',
            display: 'block',
            margin: '0 auto'
          }}
        />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default WarmiTalks

