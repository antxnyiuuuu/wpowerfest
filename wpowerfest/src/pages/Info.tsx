import { Link } from "react-router-dom";
import Navigation from "../components/Navigation";
import RuletaInfo from "../components/RuletaInfo";
import Footer from "../components/Footer";

function Info() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Sección principal - Diseño minimalista */}
      <div
        className="w-full flex items-center justify-center min-h-[calc(100vh-200px)]"
        style={{ paddingTop: "60px", paddingBottom: "60px" }}
      >
        <div
          className="max-w-7xl w-full"
          style={{ paddingLeft: "20px", paddingRight: "20px" }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 md:gap-12 lg:gap-16 items-center">
            {/* Lado izquierdo - Imagen con estilo minimalista */}
            <div
              className="relative flex items-center justify-center order-1 lg:order-2"
              style={{
                marginTop: "15px",
                marginBottom: "35px",
                padding: "20px",
              }}
            >
              <div
                className="relative w-full max-w-[240px] sm:max-w-xs md:max-w-sm"
                style={{ overflow: "visible" }}
              >
                {/* Decoración sutil de fondo */}
                <div className="absolute -top-6 -left-6 sm:-top-8 sm:-left-8 w-24 h-24 sm:w-32 sm:h-32 bg-[#B018A9]/5 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-6 -right-6 sm:-bottom-8 sm:-right-8 w-32 h-32 sm:w-40 sm:h-40 bg-[#54F6C5]/5 rounded-full blur-3xl"></div>

                {/* Imagen principal */}
                <div className="relative overflow-visible rounded-2xl">
                  <img
                    src="/images/con-chica-runner.jpg"
                    alt="Warmi Power Fest"
                    className="w-full h-auto object-cover rounded-2xl relative z-10"
                    style={{
                      border: "5px solid white",
                      boxShadow:
                        "0 20px 50px rgba(0, 0, 0, 0.5), 0 10px 25px rgba(0, 0, 0, 0.3)",
                    }}
                  />
                  {/* Overlay sutil para dar profundidad */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent pointer-events-none z-20"></div>

                  {/* Imagen de collage en esquina inferior derecha */}
                  <div
                    className="absolute -bottom-6 -right-6 sm:-bottom-8 sm:-right-8 md:-bottom-10 md:-right-10 lg:-bottom-12 lg:-right-12 z-30"
                    style={{
                      filter: "drop-shadow(0 8px 16px rgba(0, 0, 0, 0.25))",
                    }}
                  >
                    <img
                      src="/images/Chica Runner.jpg"
                      alt="Collage Warmi"
                      className="w-32 h-32 sm:w-40 sm:h-40 md:w-52 md:h-52 lg:w-64 lg:h-64 object-cover rounded-lg"
                      style={{
                        transform: "rotate(12deg)",
                        border: "5px solid white",
                        boxShadow:
                          "0 15px 35px rgba(0, 0, 0, 0.4), 0 5px 15px rgba(0, 0, 0, 0.2)",
                        transition: "transform 0.3s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform =
                          "rotate(15deg) scale(1.05)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform =
                          "rotate(12deg) scale(1)";
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Lado derecho - Contenido minimalista */}
            <div className="flex flex-col space-y-10 md:space-y-8 order-2 lg:order-1 items-center text-center lg:text-left lg:items-start">
              {/* Logo pequeño y discreto - centrado - oculto en móvil */}
              <div
                className="hidden md:flex justify-center lg:justify-center w-full"
                style={{ marginTop: "20px", marginBottom: "30px" }}
              >
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
                    lineHeight: "1.7",
                    fontWeight: 300,
                    letterSpacing: "0.3px",
                    marginTop: "20px",
                    marginBottom: "30px",
                    textAlign: "justify",
                  }}
                >
                  El festival femenino más inspirador y completo del país. Un
                  espacio donde mujeres de todas las edades podrán entrenar,
                  aprender, disfrutar y conectar con marcas y experiencias
                  creadas especialmente para ellas.
                </p>

                <div
                  className="h-px w-12 sm:w-16 bg-gradient-to-r from-[#B018A9]/30 to-transparent"
                  style={{ marginTop: "20px", marginBottom: "30px" }}
                ></div>

                <p
                  className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 leading-relaxed"
                  style={{
                    fontFamily: "'Gotham', sans-serif",
                    lineHeight: "2.5",
                    fontWeight: 500,
                    letterSpacing: "0.2px",
                    marginTop: "20px",
                    marginBottom: "30px",
                  }}
                >
                  Además, celebramos los{" "}
                  <span className="font-medium text-[#B018A9]">
                    15 años de la Warmi Runner.{" "}
                  </span>
                </p>
              </div>

              {/* Elemento decorativo minimalista */}
              <div
                className="flex items-center gap-3"
                style={{ marginTop: "30px", marginBottom: "20px" }}
              >
                <div className="h-1 w-12 bg-[#54F6C5]"></div>
                <div className="h-1 w-6 bg-[#B018A9]"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Componente RuletaInfo debajo del card principal */}
      <div style={{ marginTop: "35px", marginBottom: "35px" }}>
        <RuletaInfo />
      </div>

      {/* Sección ¿Qué habrá en el WPF? */}
      <div
        className="w-full flex items-center justify-center"
        style={{ paddingTop: "60px", paddingBottom: "60px" }}
      >
        <div
          className="max-w-7xl w-full"
          style={{ paddingLeft: "20px", paddingRight: "20px" }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-8 lg:gap-12">
            {/* Lado izquierdo - Lista de actividades */}
            <div className="p-8 sm:p-8 md:p-10 order-2 lg:order-1">
              {/* Título */}
              <h2
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight"
                style={{
                  fontFamily: "'Anton', sans-serif",
                  letterSpacing: "2px",
                  marginTop: "20px",
                  marginBottom: "40px",
                }}
              >
                <span style={{ color: "#54F6C5" }}>¿Qué</span>{" "}
                <span style={{ color: "#B018A9" }}>habrá en el WPF?</span>
              </h2>

              {/* Lista de actividades */}
              <div
                className="space-y-6"
                style={{ marginTop: "20px", marginBottom: "30px" }}
              >
                {/* Salón Warmi Challenge */}
                <div>
                  <Link to="/mapa">
                    <h3
                      className="text-xl sm:text-2xl md:text-3xl font-medium text-[#B018A9] hover:text-[#54F6C5] transition-colors duration-200"
                      style={{
                        fontFamily: "'Gotham', sans-serif",
                        marginTop: "20px",
                        marginBottom: "15px",
                        textDecoration: "underline",
                        textDecorationThickness: "2px",
                        textUnderlineOffset: "4px",
                        cursor: "pointer",
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
                        position: "relative",
                        paddingLeft: "20px",
                      }}
                    >
                      <span
                        className="absolute left-0 top-2 w-2 h-2 rounded-full bg-[#B018A9]"
                        style={{ marginTop: "6px" }}
                      ></span>
                      Stands de exhibición
                    </li>
                    <li
                      className="text-base sm:text-lg md:text-xl text-gray-700"
                      style={{
                        fontFamily: "'Gotham', sans-serif",
                        fontWeight: 300,
                        position: "relative",
                        paddingLeft: "20px",
                      }}
                    >
                      <span
                        className="absolute left-0 top-2 w-2 h-2 rounded-full bg-[#B018A9]"
                        style={{ marginTop: "6px" }}
                      ></span>
                      Desafíos deportivos
                    </li>
                    <li
                      className="text-base sm:text-lg md:text-xl text-gray-700"
                      style={{
                        fontFamily: "'Gotham', sans-serif",
                        fontWeight: 300,
                        position: "relative",
                        paddingLeft: "20px",
                      }}
                    >
                      <span
                        className="absolute left-0 top-2 w-2 h-2 rounded-full bg-[#B018A9]"
                        style={{ marginTop: "6px" }}
                      ></span>
                      Pasarela de moda deportiva
                    </li>
                  </ul>
                </div>

                {/* Warmi Talks */}
                <div>
                  <Link to="/warmi-talks">
                    <h3
                      className="text-xl sm:text-2xl md:text-3xl font-medium text-[#B018A9] hover:text-[#54F6C5] transition-colors duration-200"
                      style={{
                        fontFamily: "'Gotham', sans-serif",
                        marginTop: "20px",
                        marginBottom: "15px",
                        textDecoration: "underline",
                        textDecorationThickness: "2px",
                        textUnderlineOffset: "4px",
                        cursor: "pointer",
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
                        position: "relative",
                        paddingLeft: "20px",
                      }}
                    >
                      <span
                        className="absolute left-0 top-2 w-2 h-2 rounded-full bg-[#B018A9]"
                        style={{ marginTop: "6px" }}
                      ></span>
                      Masterclass y conferencias
                    </li>
                    <li
                      className="text-base sm:text-lg md:text-xl text-gray-700"
                      style={{
                        fontFamily: "'Gotham', sans-serif",
                        fontWeight: 300,
                        position: "relative",
                        paddingLeft: "20px",
                      }}
                    >
                      <span
                        className="absolute left-0 top-2 w-2 h-2 rounded-full bg-[#B018A9]"
                        style={{ marginTop: "6px" }}
                      ></span>
                      Entrenamientos y exhibiciones deportivas
                    </li>
                    <li
                      className="text-base sm:text-lg md:text-xl text-gray-700"
                      style={{
                        fontFamily: "'Gotham', sans-serif",
                        fontWeight: 300,
                        position: "relative",
                        paddingLeft: "20px",
                      }}
                    >
                      <span
                        className="absolute left-0 top-2 w-2 h-2 rounded-full bg-[#B018A9]"
                        style={{ marginTop: "6px" }}
                      ></span>
                      Lanzamiento de productos
                    </li>
                  </ul>
                </div>

                {/* Otras actividades */}
                <div className="space-y-3">
                  {/* Premios Warmi 2026 */}
                  <div>
                    <Link to="/premios">
                      <h3
                        className="text-xl sm:text-2xl md:text-3xl font-medium text-[#B018A9] hover:text-[#54F6C5] transition-colors duration-200"
                        style={{
                          fontFamily: "'Gotham', sans-serif",
                          marginTop: "20px",
                          marginBottom: "15px",
                          textDecoration: "underline",
                          textDecorationThickness: "2px",
                          textUnderlineOffset: "4px",
                          cursor: "pointer",
                        }}
                      >
                        Premios Warmi 2026
                      </h3>
                    </Link>
                  </div>
                  <div
                    className="text-base sm:text-lg md:text-xl text-gray-700"
                    style={{
                      fontFamily: "'Gotham', sans-serif",
                      fontWeight: 300,
                    }}
                  >
                    <strong className="text-[#B018A9]">
                      Business Warmi Zone
                    </strong>
                  </div>
                  {/* Zona Nutritiva */}
                  <div>
                    <Link to="/mapa">
                      <h3
                        className="text-xl sm:text-2xl md:text-3xl font-medium text-[#B018A9] hover:text-[#54F6C5] transition-colors duration-200"
                        style={{
                          fontFamily: "'Gotham', sans-serif",
                          marginTop: "20px",
                          marginBottom: "15px",
                          textDecoration: "underline",
                          textDecorationThickness: "2px",
                          textUnderlineOffset: "4px",
                          cursor: "pointer",
                        }}
                      >
                        Zona nutritiva
                      </h3>
                    </Link>
                  </div>
                  <div
                    className="text-base sm:text-lg md:text-xl text-gray-700"
                    style={{
                      fontFamily: "'Gotham', sans-serif",
                      fontWeight: 300,
                    }}
                  >
                    <strong className="text-[#B018A9]">
                      Kids zone (zona de niños)
                    </strong>
                  </div>
                </div>
              </div>
            </div>

            {/* Lado derecho - Imagen de la chica */}
            <div className="p-8 sm:p-8 md:p-10 order-1 lg:order-2 flex items-center justify-center">
              <div
                className="relative w-full max-w-md sm:max-w-lg md:max-w-xl"
                style={{ overflow: "visible" }}
              >
                {/* Decoración sutil de fondo */}
                <div className="absolute -top-6 -left-6 sm:-top-8 sm:-left-8 w-24 h-24 sm:w-32 sm:h-32 bg-[#B018A9]/5 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-6 -right-6 sm:-bottom-8 sm:-right-8 w-32 h-32 sm:w-40 sm:h-40 bg-[#54F6C5]/5 rounded-full blur-3xl"></div>

                {/* Imagen principal */}
                <div className="relative overflow-visible rounded-2xl">
                  <img
                    src="/images/Chica señalando.jpg"
                    alt="¿Qué habrá en el WPF?"
                    className="w-full h-auto object-cover rounded-2xl relative z-10"
                    style={{
                      border: "5px solid white",
                      boxShadow:
                        "0 20px 50px rgba(0, 0, 0, 0.5), 0 10px 25px rgba(0, 0, 0, 0.3)",
                    }}
                  />
                  {/* Overlay sutil para dar profundidad */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent pointer-events-none z-20"></div>
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

export default Info;
