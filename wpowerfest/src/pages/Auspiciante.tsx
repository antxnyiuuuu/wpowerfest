import Navigation from "../components/Navigation";

function Auspiciante() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Sección principal */}
      <div
        className="w-full flex items-center justify-center min-h-[calc(100vh-150px)]"
        style={{ paddingTop: "60px", paddingBottom: "60px" }}
      >
        <div
          className="max-w-7xl w-full"
          style={{ paddingLeft: "20px", paddingRight: "20px" }}
        >
          <div className="p-12 md:p-20 lg:p-24">
            {/* Título principal */}
            <h1
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-center mb-24"
              style={{
                fontFamily: "'Anton', sans-serif",
                color: "#B018A9",
                letterSpacing: "2px",
              }}
            >
              AUSPICIANTES
            </h1>

            {/* Grid de dos columnas */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Columna izquierda - Contenido */}
              <div className="space-y-12 order-2 lg:order-1">
                {/* Primer párrafo */}
                <p
                  className="text-2xl md:text-3xl lg:text-4xl text-center lg:text-left leading-relaxed"
                  style={{
                    fontFamily: "'Gotham', sans-serif",
                    color: "#B018A9",
                    fontWeight: 700,
                    marginBottom: "40px",
                  }}
                >
                  Tu marca estará presente en la entrega de los Premios Warmi.
                </p>

                {/* Segundo párrafo */}
                <p
                  className="text-xl md:text-2xl lg:text-3xl text-center lg:text-left leading-relaxed"
                  style={{
                    fontFamily: "'Gotham', sans-serif",
                    color: "#B018A9",
                    fontWeight: 500,
                    lineHeight: "2",
                    marginBottom: "30px",
                  }}
                >
                  En esta edición histórica, la Warmi Runner 2026 rendirá
                  homenaje a mujeres que han dejado huella en el camino
                  recorrido durante estos 15 años.
                </p>

                {/* Tercer párrafo - Mensaje motivador */}
                <p
                  className="text-xl md:text-2xl lg:text-3xl text-center lg:text-left leading-relaxed"
                  style={{
                    fontFamily: "'Gotham', sans-serif",
                    color: "#B018A9",
                    fontWeight: 600,
                    lineHeight: "2",
                    marginBottom: "50px",
                  }}
                >
                  ¡Únete a esta celebración única y haz que tu marca brille
                  junto a las mujeres más inspiradoras del país!
                </p>

                {/* Botón mejorado - MÁS GRANDE Y CENTRADO */}
                <div className="flex justify-center mt-16">
                  <a
                    href="https://forms.office.com/r/iCDQaAQjjS?origin=lprLink"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative inline-block"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-[#B018A9] to-[#54F6C5] rounded-full blur-2xl opacity-70 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
                    <button
                      className="relative px-20 py-10 text-white font-bold text-3xl md:text-4xl lg:text-5xl rounded-full shadow-2xl transform group-hover:scale-110 transition-all duration-300"
                      style={{
                        fontFamily: "'Gotham', sans-serif",
                        backgroundColor: "#B018A9",
                        letterSpacing: "4px",
                        border: "5px solid #B018A9",
                        boxShadow:
                          "0 15px 50px rgba(176, 24, 169, 0.5), 0 0 30px rgba(84, 246, 197, 0.4)",
                      }}
                    >
                      SER AUSPICIANTE
                    </button>
                  </a>
                </div>
              </div>

              {/* Columna derecha - Imagen */}
              <div className="order-1 lg:order-2 flex items-center justify-center">
                <div className="relative w-full max-w-md">
                  {/* Decoración de fondo */}
                  <div className="absolute -top-6 -left-6 w-32 h-32 bg-[#B018A9]/10 rounded-full blur-3xl"></div>
                  <div className="absolute -bottom-6 -right-6 w-40 h-40 bg-[#54F6C5]/10 rounded-full blur-3xl"></div>

                  {/* Imagen */}
                  <div className="relative overflow-hidden rounded-2xl">
                    <img
                      src="/images/Jefferson perez.jpg"
                      alt="Jefferson Pérez"
                      className="w-full h-auto object-cover rounded-2xl relative z-10 shadow-2xl"
                      style={{
                        border: "5px solid white",
                        boxShadow:
                          "0 20px 50px rgba(0, 0, 0, 0.3), 0 10px 25px rgba(0, 0, 0, 0.2)",
                      }}
                    />
                    {/* Overlay sutil */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent pointer-events-none z-20"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Decoración */}
            <div className="mt-16 flex justify-center items-center gap-4">
              <div className="h-1.5 w-16 bg-[#54F6C5]"></div>
              <div className="h-1.5 w-8 bg-[#B018A9]"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Auspiciante;
