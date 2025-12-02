import './HeroSection.css'

function HeroSection() {
  return (
    <section className="hero-section">
      {/* Fondo Base - Imagen Desenfocada */}
      <div className="background-layer">
        <img 
          src="/images/StartGirlDesenfoque.png" 
          alt="Background gradient" 
          className="background-image"
        />
      </div>

      {/* Área Izquierda - La Chica */}
      <div className="girl-layer">
        <img 
          src="/images/StartGirl.png" 
          alt="Start Girl" 
          className="girl-image"
        />
      </div>

      {/* Área Derecha - Contenedor Centrado Verticalmente */}
      <div className="right-wrapper">
        {/* Logo */}
        <img 
          src="/images/logoStart.png" 
          alt="Logo Start" 
          className="logo-image"
        />
        
        {/* Texto */}
        <div className="info-text">
          <h3 className="text-subtitle">BIENESTAR - BELLEZA - DEPORTE</h3>
          <h2 className="text-date">6, 7 y 8 DE MARZO 2026</h2>
          <p className="text-location">CENTRO DE EXPOSICIONES QUITO</p>
        </div>
      </div>

      {/* Barra Decorativa Superior */}
      <div className="bar-top-layer">
        <img 
          src="/images/barrasuperior.png" 
          alt="Top bar" 
          className="bar-image"
        />
      </div>

      {/* Barra Decorativa Inferior */}
      <div className="bar-bottom-layer">
        <img 
          src="/images/barrainferior.png" 
          alt="Bottom bar" 
          className="bar-image"
        />
      </div>

      {/* Rectángulo Blanco en el Centro */}
      <div className="center-rectangle"></div>
    </section>
  )
}

export default HeroSection

