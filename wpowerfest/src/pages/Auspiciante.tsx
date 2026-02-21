import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

function Auspiciante() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Contenido principal */}
      <div
        className="w-full flex items-center justify-center min-h-[calc(100vh-200px)]"
        style={{ paddingTop: "80px", paddingBottom: "60px" }}
      >
        <div
          className="max-w-7xl w-full"
          style={{ paddingLeft: "20px", paddingRight: "20px" }}
        >
          {/* Título principal */}
          <h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-center mb-12 md:mb-16 lg:mb-20"
            style={{
              fontFamily: "'Anton', sans-serif",
              color: "#B018A9",
              letterSpacing: "2px",
            }}
          >
            AUSPICIANTES
          </h1>

          {/* Aquí va el nuevo contenido */}

          {/* Sección Media Partner */}
          <div className="w-full flex flex-col items-center justify-center" style={{ marginTop: "40px", marginBottom: "60px" }}>
            {/* Subtítulo */}
            <div className="flex flex-col items-center mb-6 md:mb-8">
              <h2
                className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-center uppercase mb-4"
                style={{
                  fontFamily: "'Anton', sans-serif",
                  color: "#7B3FE4",
                  letterSpacing: "0.08em",
                  fontWeight: 700,
                }}
              >
                MEDIA PARTNER
              </h2>
              {/* Línea decorativa con gradiente */}
              <div 
                className="h-1 w-24 rounded-full"
                style={{
                  background: "linear-gradient(90deg, #B018A9 0%, #54F6C5 100%)"
                }}
              ></div>
            </div>

            {/* Logo y nombre clickeable */}
            <a
              href="https://www.elcomercio.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-4 transition-all duration-300 hover:scale-105"
              style={{ marginTop: "10px" }}
            >
              {/* Contenedor del logo con efecto */}
              <div className="relative bg-white rounded-2xl p-6 md:p-8 shadow-lg border border-gray-100 transition-all duration-300 group-hover:shadow-2xl group-hover:border-[#B018A9]/30">
                {/* Efecto de glow en hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#B018A9]/0 via-[#B018A9]/10 to-[#B018A9]/0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* Logo */}
                <img
                  src="/images/MediaPartner/LOGO EC.png"
                  alt="El Comercio"
                  className="relative z-10 w-full h-auto object-contain"
                  style={{ maxHeight: "120px" }}
                />
              </div>

              {/* Nombre */}
              <p
                className="text-lg sm:text-xl md:text-2xl font-medium text-gray-700 group-hover:text-[#B018A9] transition-colors duration-300"
                style={{
                  fontFamily: "'Gotham', sans-serif",
                  letterSpacing: "1px",
                }}
              >
                El Comercio
              </p>
            </a>
          </div>

          {/* Línea divisora */}
          <div className="w-full flex justify-center" style={{ marginTop: "60px", marginBottom: "60px" }}>
            <div className="w-full max-w-4xl h-px" style={{ backgroundColor: "#E9E6F2" }}></div>
          </div>

          {/* Sección Aliados Estratégicos */}
          <div className="w-full flex flex-col items-center justify-center" style={{ marginTop: "100px", marginBottom: "70px" }}>
            {/* Subtítulo */}
            <div className="flex flex-col items-center mb-8 md:mb-12">
              <h2
                className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-center uppercase mb-4"
                style={{
                  fontFamily: "'Anton', sans-serif",
                  color: "#7B3FE4",
                  letterSpacing: "0.08em",
                  fontWeight: 700,
                }}
              >
                ALIADOS ESTRATÉGICOS
              </h2>
              {/* Línea decorativa con gradiente */}
              <div 
                className="h-1 w-24 rounded-full"
                style={{
                  background: "linear-gradient(90deg, #B018A9 0%, #54F6C5 100%)"
                }}
              ></div>
            </div>

            {/* Grid de logos - 4 columnas */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 lg:gap-10 w-full max-w-6xl px-4" style={{marginTop: "10px"}}>

              {/* Logo 1: Prefectura Pichincha */}
              <a
                href="https://www.pichincha.gob.ec" // AQUÍ PONES EL LINK
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center gap-3 transition-all duration-300 hover:scale-105"
              >
                <div className="relative bg-white rounded-xl p-4 md:p-6 shadow-md border border-gray-100 transition-all duration-300 group-hover:shadow-xl group-hover:border-[#B018A9]/30 w-full">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#B018A9]/0 via-[#B018A9]/10 to-[#B018A9]/0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <img
                    src="/images/AliadosEstrategicos(link)/PREFECTURA-PICHINCHA.png"
                    alt="Prefectura de Pichincha"
                    className="relative z-10 w-full h-auto object-contain"
                    style={{ maxHeight: "120px" }}
                  />
                </div>
                <p
                  className="text-sm sm:text-base md:text-lg font-medium text-gray-700 group-hover:text-[#B018A9] transition-colors duration-300 text-center"
                  style={{ fontFamily: "'Gotham', sans-serif"}}
                >
                  Mitad del Mundo - Prefectura de Pichincha
                </p>
              </a>

              {/* Logo 2: KAO-LOTTO */}
              <a
                href="https://www.kaosport.com" // AQUÍ PONES EL LINK
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center gap-3 transition-all duration-300 hover:scale-105"
              >
                <div className="relative bg-white rounded-xl p-4 md:p-6 shadow-md border border-gray-100 transition-all duration-300 group-hover:shadow-xl group-hover:border-[#B018A9]/30 w-full">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#B018A9]/0 via-[#B018A9]/10 to-[#B018A9]/0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <img
                    src="/images/AliadosEstrategicos(link)/KAO-LOTTO-LOGO.png"
                    alt="KAO LOTTO"
                    className="relative z-10 w-full h-auto object-contain"
                    style={{ maxHeight: "120px" }}
                  />
                </div>
                <p
                  className="text-sm sm:text-base md:text-lg font-medium text-gray-700 group-hover:text-[#B018A9] transition-colors duration-300 text-center"
                  style={{ fontFamily: "'Gotham', sans-serif" }}
                >
                  KAO – Lotto
                </p>
              </a>

              {/* Logo 3: Keefort */}
              <a
                href="https://keefort.com.ec" // AQUÍ PONES EL LINK
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center gap-3 transition-all duration-300 hover:scale-105"
              >
                <div className="relative bg-white rounded-xl p-4 md:p-6 shadow-md border border-gray-100 transition-all duration-300 group-hover:shadow-xl group-hover:border-[#B018A9]/30 w-full">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#B018A9]/0 via-[#B018A9]/10 to-[#B018A9]/0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <img
                    src="/images/AliadosEstrategicos(link)/Keefort.png"
                    alt="Keefort"
                    className="relative z-10 w-full h-auto object-contain"
                    style={{ maxHeight: "120px" }}
                  />
                </div>
                <p
                  className="text-sm sm:text-base md:text-lg font-medium text-gray-700 group-hover:text-[#B018A9] transition-colors duration-300 text-center"
                  style={{ fontFamily: "'Gotham', sans-serif" }}
                >
                  Kee Fort
                </p>
              </a>

              {/* Logo 4: Fit&Flex */}
              <a
                href="https://www.fitflex.ec" // AQUÍ PONES EL LINK
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center gap-3 transition-all duration-300 hover:scale-105"
              >
                <div className="relative bg-white rounded-xl p-4 md:p-6 shadow-md border border-gray-100 transition-all duration-300 group-hover:shadow-xl group-hover:border-[#B018A9]/30 w-full">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#B018A9]/0 via-[#B018A9]/10 to-[#B018A9]/0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <img
                    src="/images/AliadosEstrategicos(link)/Fit&Flex.png"
                    alt="Fit&Flex"
                    className="relative z-10 w-full h-auto object-contain"
                    style={{ maxHeight: "120px" }}
                  />
                </div>
                <p
                  className="text-sm sm:text-base md:text-lg font-medium text-gray-700 group-hover:text-[#B018A9] transition-colors duration-300 text-center"
                  style={{ fontFamily: "'Gotham', sans-serif" }}
                >
                  Fit & Flex
                </p>
              </a>

            </div>

            {/* Grid de logos SIN link - 3 columnas */}
            <div className="grid grid-cols-3 gap-6 md:gap-8 lg:gap-10 w-full max-w-4xl px-4 mt-8 md:mt-12" style={{marginTop: "30px"}}>
              
              {/* Logo 1: KINU */}
              <div className="flex flex-col items-center">
                <div className="relative bg-white rounded-xl p-4 md:p-6 shadow-md border border-gray-100 w-full">
                  <img
                    src="/images/AliadosEstrategicos(nolink)/LOGO KINU.png"
                    alt="KINU"
                    className="w-full h-auto object-contain"
                    style={{ maxHeight: "120px" }}
                  />
                </div>
              </div>

              {/* Logo 2: Lux */}
              <div className="flex flex-col items-center">
                <div className="relative bg-white rounded-xl p-4 md:p-6 shadow-md border border-gray-100 w-full">
                  <img
                    src="/images/AliadosEstrategicos(nolink)/Lux.png"
                    alt="Lux"
                    className="w-full h-auto object-contain"
                    style={{ maxHeight: "120px" }}
                  />
                </div>
              </div>

              {/* Logo 3: Risk */}
              <div className="flex flex-col items-center">
                <div className="relative bg-white rounded-xl p-4 md:p-6 shadow-md border border-gray-100 w-full">
                  <img
                    src="/images/AliadosEstrategicos(nolink)/Risk-LOGO.png"
                    alt="Risk"
                    className="w-full h-auto object-contain"
                    style={{ maxHeight: "120px" }}
                  />
                </div>
              </div>

            </div>
          </div>

          {/* Línea divisora */}
          <div className="w-full flex justify-center" style={{ marginTop: "60px", marginBottom: "60px" }}>
            <div className="w-full max-w-4xl h-px" style={{ backgroundColor: "#E9E6F2" }}></div>
          </div>

          {/* Sección Expositores */}
          <div className="w-full flex flex-col items-center justify-center" style={{ marginTop: "100px", marginBottom: "70px" }}>
            {/* Subtítulo */}
            <div className="flex flex-col items-center mb-8 md:mb-12">
              <h2
                className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-center uppercase mb-4"
                style={{
                  fontFamily: "'Anton', sans-serif",
                  color: "#7B3FE4",
                  letterSpacing: "0.08em",
                  fontWeight: 700,
                }}
              >
                EXPOSITORES
              </h2>
              {/* Línea decorativa con gradiente */}
              <div 
                className="h-1 w-24 rounded-full"
                style={{
                  background: "linear-gradient(90deg, #B018A9 0%, #54F6C5 100%)"
                }}
              ></div>
            </div>

            {/* Grid de logos - 4 columnas */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 lg:gap-10 w-full max-w-6xl px-4" style={{marginBottom: "60px"}}>
              
              {/* Logo 1: Ali */}
              <div className="flex flex-col items-center">
                <div className="relative bg-white rounded-xl p-4 md:p-6 shadow-md border border-gray-100 w-full">
                  <img
                    src="/images/expositores/Ali-Logo.png"
                    alt="Ali"
                    className="w-full h-auto object-contain"
                    style={{ maxHeight: "120px" }}
                  />
                </div>
              </div>

              {/* Logo 2: Amaseguros */}
              <div className="flex flex-col items-center">
                <div className="relative bg-white rounded-xl p-4 md:p-6 shadow-md border border-gray-100 w-full">
                  <img
                    src="/images/expositores/Amaseguros-LOGO.png"
                    alt="Amaseguros"
                    className="w-full h-auto object-contain"
                    style={{ maxHeight: "120px" }}
                  />
                </div>
              </div>

              {/* Logo 3: Go Run */}
              <div className="flex flex-col items-center">
                <div className="relative bg-white rounded-xl p-4 md:p-6 shadow-md border border-gray-100 w-full">
                  <img
                    src="/images/expositores/Go-Run-LOGO.png"
                    alt="Go Run"
                    className="w-full h-auto object-contain"
                    style={{ maxHeight: "120px" }}
                  />
                </div>
              </div>

              {/* Logo 4: Alkabird */}
              <div className="flex flex-col items-center">
                <div className="relative bg-white rounded-xl p-4 md:p-6 shadow-md border border-gray-100 w-full">
                  <img
                    src="/images/expositores/logo-alkabird.png"
                    alt="Alkabird"
                    className="w-full h-auto object-contain"
                    style={{ maxHeight: "120px" }}
                  />
                </div>
              </div>

              {/* Logo 5: Quski */}
              <div className="flex flex-col items-center">
                <div className="relative bg-white rounded-xl p-4 md:p-6 shadow-md border border-gray-100 w-full">
                  <img
                    src="/images/expositores/Logo-Quski-Oro.png"
                    alt="Quski"
                    className="w-full h-auto object-contain"
                    style={{ maxHeight: "120px" }}
                  />
                </div>
              </div>

              {/* Logo 6: Royal Prestige */}
              <div className="flex flex-col items-center">
                <div className="relative bg-white rounded-xl p-4 md:p-6 shadow-md border border-gray-100 w-full">
                  <img
                    src="/images/expositores/Logo-Royal-Prestige.png"
                    alt="Royal Prestige"
                    className="w-full h-auto object-contain"
                    style={{ maxHeight: "120px" }}
                  />
                </div>
              </div>

              {/* Logo 7: Warmi Nova */}
              <div className="flex flex-col items-center">
                <div className="relative bg-white rounded-xl p-4 md:p-6 shadow-md border border-gray-100 w-full">
                  <img
                    src="/images/expositores/LOGOWARMINOVA.png"
                    alt="Warmi Nova"
                    className="w-full h-auto object-contain"
                    style={{ maxHeight: "120px" }}
                  />
                </div>
              </div>

              {/* Logo 8: Maquita */}
              <div className="flex flex-col items-center">
                <div className="relative bg-white rounded-xl p-4 md:p-6 shadow-md border border-gray-100 w-full">
                  <img
                    src="/images/expositores/Maquita-LOGO.png"
                    alt="Maquita"
                    className="w-full h-auto object-contain"
                    style={{ maxHeight: "120px" }}
                  />
                </div>
              </div>

              {/* Logo 9: Minerva */}
              <div className="flex flex-col items-center">
                <div className="relative bg-white rounded-xl p-4 md:p-6 shadow-md border border-gray-100 w-full">
                  <img
                    src="/images/expositores/Minerva-LOGO.png"
                    alt="Minerva"
                    className="w-full h-auto object-contain"
                    style={{ maxHeight: "120px" }}
                  />
                </div>
              </div>

              {/* Logo 10: NEUS Dermo */}
              <div className="flex flex-col items-center">
                <div className="relative bg-white rounded-xl p-4 md:p-6 shadow-md border border-gray-100 w-full">
                  <img
                    src="/images/expositores/NEUS-Dermo.png"
                    alt="NEUS Dermo"
                    className="w-full h-auto object-contain"
                    style={{ maxHeight: "120px" }}
                  />
                </div>
              </div>

              {/* Logo 11: No Rules */}
              <div className="flex flex-col items-center">
                <div className="relative bg-white rounded-xl p-4 md:p-6 shadow-md border border-gray-100 w-full">
                  <img
                    src="/images/expositores/No-Rules-Logo-Negro.png"
                    alt="No Rules"
                    className="w-full h-auto object-contain"
                    style={{ maxHeight: "120px" }}
                  />
                </div>
              </div>

              {/* Logo 12: Sacadas la Madres */}
              <div className="flex flex-col items-center">
                <div className="relative bg-white rounded-xl p-4 md:p-6 shadow-md border border-gray-100 w-full">
                  <img
                    src="/images/expositores/Sacadaslamadres-LOGO.png"
                    alt="Sacadas la Madres"
                    className="w-full h-auto object-contain"
                    style={{ maxHeight: "120px" }}
                  />
                </div>
              </div>

              {/* Logo 13: Solange Hair Collection */}
              <div className="flex flex-col items-center md:col-start-2">
                <div className="relative bg-white rounded-xl p-4 md:p-6 shadow-md border border-gray-100 w-full">
                  <img
                    src="/images/expositores/Solange-Hair-Collection-Logo.png"
                    alt="Solange Hair Collection"
                    className="w-full h-auto object-contain"
                    style={{ maxHeight: "120px" }}
                  />
                </div>
              </div>

              {/* Logo 14: Wemi Falck */}
              <div className="flex flex-col items-center">
                <div className="relative bg-white rounded-xl p-4 md:p-6 shadow-md border border-gray-100 w-full">
                  <img
                    src="/images/expositores/Wemi-Falck-LOGO.png"
                    alt="Wemi Falck"
                    className="w-full h-auto object-contain"
                    style={{ maxHeight: "120px" }}
                  />
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Auspiciante;
