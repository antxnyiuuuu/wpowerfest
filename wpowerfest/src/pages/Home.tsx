import { useState, useEffect } from "react";
import Navigation from "../components/Navigation";
import WhatsAppButtonHome from "../components/WhatsAppButtonHome";

function Home() {
  // Contador regresivo
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const targetDate = new Date("2026-03-06T00:00:00").getTime();
    const startDate = new Date("2025-01-01T00:00:00").getTime(); // Fecha de inicio para calcular progreso
    const totalDuration = targetDate - startDate;

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;
      const elapsed = now - startDate;

      // Calcular porcentaje de progreso
      const progressPercent = Math.min(
        Math.max((elapsed / totalDuration) * 100, 0),
        100
      );
      setProgress(progressPercent);

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor(
            (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          ),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      } else {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        });
        setProgress(100);
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-full">
      <Navigation />

      {/* Imagen principal */}
      <div className="w-full z-45 relative" style={{ marginBottom: "10px" }}>
        <div className="relative overflow-hidden h-[200px] md:h-[500px] lg:h-[calc(100vh-200px)] md:min-h-[600px] flex items-center justify-center">
          <img
            src="/images/inicio.png"
            alt="Warmi Power Fest"
            className="w-full h-full object-cover"
            style={{ width: "100%", objectFit: "cover" }}
          />
        </div>
      </div>

      {/* Sección de presentación */}
      <div
        className="w-full bg-gradient-to-br from-[#54F6C5]/10 via-white to-[#B018A9]/10"
        style={{
          paddingTop: "60px",
          paddingBottom: "60px",
          marginTop: "10px",
          marginBottom: "10px",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "1200px",
            margin: "0 auto",
            paddingLeft: "20px",
            paddingRight: "20px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              width: "100%",
            }}
          >
            <h1
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#B018A9] leading-tight"
              style={{
                fontFamily: "'Anton', sans-serif",
                letterSpacing: "3px",
                marginTop: "10px",
                marginBottom: "40px",
                width: "100%",
                maxWidth: "900px",
                paddingLeft: "20px",
                paddingRight: "20px",
              }}
            >
              EL FESTIVAL FEMENINO MÁS INSPIRADOR DEL PAÍS
            </h1>
            <p
              className="text-base md:text-lg lg:text-xl text-gray-700 leading-relaxed"
              style={{
                fontFamily: "'Gotham', sans-serif",
                letterSpacing: "1px",
                marginTop: "10px",
                marginBottom: "50px",
                width: "100%",
                maxWidth: "800px",
                paddingLeft: "20px",
                paddingRight: "20px",
              }}
            >
              Celebramos los 15 años de la Warmi Runner presentando el{" "}
              <span className="font-semibold text-[#B018A9]">
                Warmi Power Fest
              </span>
              . Un espacio donde mujeres de todas las edades podrán entrenar,
              aprender, disfrutar y conectar con marcas y experiencias creadas
              especialmente para ellas.
            </p>

            {/* Contador regresivo */}
            <div
              className="w-full mt-8 md:mt-12"
              style={{
                maxWidth: "1200px",
                marginTop: "30px",
                marginBottom: "10px",
                marginLeft: "auto",
                marginRight: "auto",
                paddingLeft: "20px",
                paddingRight: "20px",
              }}
            >
              <div
                className="bg-white rounded-xl p-8 md:p-10 shadow-lg transition-all duration-300 border border-gray-200 text-center"
                style={{ marginTop: "10px", marginBottom: "10px" }}
              >
                <h3
                  className="text-lg md:text-xl font-light text-gray-700 uppercase tracking-wider"
                  style={{
                    fontFamily: "'Anton', sans-serif",
                    marginTop: "10px",
                    marginBottom: "20px",
                  }}
                >
                  El festival se acerca
                </h3>
                <div
                  className="flex items-center justify-center gap-3 md:gap-4"
                  style={{ marginTop: "10px", marginBottom: "10px" }}
                >
                  <div className="flex flex-col items-center">
                    <div
                      className="text-3xl md:text-4xl lg:text-5xl font-mono font-light text-[#B018A9]"
                      style={{
                        fontFamily: "monospace",
                        letterSpacing: "1px",
                        marginTop: "10px",
                        marginBottom: "10px",
                      }}
                    >
                      {String(timeLeft.days).padStart(3, "0")}
                    </div>
                    <span
                      className="text-xs md:text-sm text-gray-500 font-light uppercase tracking-wider"
                      style={{
                        fontFamily: "'Gotham', sans-serif",
                        marginTop: "10px",
                        marginBottom: "10px",
                      }}
                    >
                      Días
                    </span>
                  </div>
                  <span
                    className="text-2xl md:text-3xl font-mono font-light text-gray-400"
                    style={{ marginTop: "10px", marginBottom: "10px" }}
                  >
                    :
                  </span>
                  <div className="flex flex-col items-center">
                    <div
                      className="text-3xl md:text-4xl lg:text-5xl font-mono font-light text-[#B018A9]"
                      style={{
                        fontFamily: "monospace",
                        letterSpacing: "1px",
                        marginTop: "10px",
                        marginBottom: "10px",
                      }}
                    >
                      {String(timeLeft.hours).padStart(2, "0")}
                    </div>
                    <span
                      className="text-xs md:text-sm text-gray-500 font-light uppercase tracking-wider"
                      style={{
                        fontFamily: "'Gotham', sans-serif",
                        marginTop: "10px",
                        marginBottom: "10px",
                      }}
                    >
                      Horas
                    </span>
                  </div>
                  <span
                    className="text-2xl md:text-3xl font-mono font-light text-gray-400"
                    style={{ marginTop: "10px", marginBottom: "10px" }}
                  >
                    :
                  </span>
                  <div className="flex flex-col items-center">
                    <div
                      className="text-3xl md:text-4xl lg:text-5xl font-mono font-light text-[#B018A9]"
                      style={{
                        fontFamily: "monospace",
                        letterSpacing: "1px",
                        marginTop: "10px",
                        marginBottom: "10px",
                      }}
                    >
                      {String(timeLeft.minutes).padStart(2, "0")}
                    </div>
                    <span
                      className="text-xs md:text-sm text-gray-500 font-light uppercase tracking-wider"
                      style={{
                        fontFamily: "'Gotham', sans-serif",
                        marginTop: "10px",
                        marginBottom: "10px",
                      }}
                    >
                      Min
                    </span>
                  </div>
                  <span
                    className="text-2xl md:text-3xl font-mono font-light text-gray-400"
                    style={{ marginTop: "10px", marginBottom: "10px" }}
                  >
                    :
                  </span>
                  <div className="flex flex-col items-center">
                    <div
                      className="text-3xl md:text-4xl lg:text-5xl font-mono font-light text-[#B018A9]"
                      style={{
                        fontFamily: "monospace",
                        letterSpacing: "1px",
                        marginTop: "10px",
                        marginBottom: "10px",
                      }}
                    >
                      {String(timeLeft.seconds).padStart(2, "0")}
                    </div>
                    <span
                      className="text-xs md:text-sm text-gray-500 font-light uppercase tracking-wider"
                      style={{
                        fontFamily: "'Gotham', sans-serif",
                        marginTop: "10px",
                        marginBottom: "10px",
                      }}
                    >
                      Seg
                    </span>
                  </div>
                </div>

                {/* Barra de progreso */}
                <div
                  style={{
                    marginTop: "20px",
                    marginBottom: "10px",
                    paddingLeft: "20px",
                    paddingRight: "20px",
                  }}
                >
                  <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-1000 ease-out"
                      style={{
                        width: `${progress}%`,
                        background: "#B018A9",
                      }}
                    ></div>
                  </div>
                </div>

                <p
                  className="text-gray-400 text-xs md:text-sm font-light"
                  style={{
                    fontFamily: "'Gotham', sans-serif",
                    marginTop: "10px",
                    marginBottom: "10px",
                  }}
                >
                  6 de marzo 2026
                </p>
              </div>
            </div>

            {/* Mapa de ubicación */}
            <div
              className="w-full mt-8 md:mt-12"
              style={{
                maxWidth: "1200px",
                marginTop: "30px",
                marginBottom: "10px",
                marginLeft: "auto",
                marginRight: "auto",
                paddingLeft: "20px",
                paddingRight: "20px",
              }}
            >
              <div
                className="bg-white rounded-xl shadow-xl overflow-hidden border border-[#54F6C5]/30"
                style={{
                  boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
                  marginTop: "10px",
                  marginBottom: "10px",
                }}
              >
                <div className="p-5 md:p-6 bg-white">
                  <h3
                    className="text-xl md:text-2xl font-bold text-[#B018A9] text-center flex items-center justify-center gap-3"
                    style={{
                      fontFamily: "'Anton', sans-serif",
                      marginTop: "10px",
                      marginBottom: "10px",
                    }}
                  >
                    <span
                      className="text-2xl md:text-3xl"
                      style={{ marginTop: "10px", marginBottom: "10px" }}
                    >
                      📍
                    </span>
                    <span style={{ marginTop: "10px", marginBottom: "10px" }}>
                      Ubicación del Evento
                    </span>
                  </h3>
                </div>
                <div
                  className="relative w-full overflow-hidden bg-gray-100"
                  style={{ height: "400px", minHeight: "350px" }}
                >
                  <iframe
                    src="https://www.google.com/maps?q=Centro+de+Exposiciones+Quito&output=embed&hl=es"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Ubicación del Warmi Power Fest - Centro de Exposiciones, Quito"
                    className="w-full h-full"
                  ></iframe>
                  <div className="absolute bottom-4 right-4 z-10">
                    <a
                      href="https://maps.app.goo.gl/QoXDHQgyjr8zyaGk6"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white hover:bg-gray-50 text-gray-700 hover:text-gray-900 px-4 py-2 md:px-6 md:py-3 rounded-lg shadow-xl border border-gray-200 transition-all duration-300 hover:scale-105 font-medium text-sm md:text-base flex items-center gap-2"
                    >
                      <svg
                        className="w-4 h-4 md:w-5 md:h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                      </svg>
                      Abrir en Google Maps
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer simple */}
      <footer className="w-full bg-white shadow-lg">
        <div className="container mx-auto px-4 pt-8 pb-16 md:pt-12 md:pb-20">
          <div className="flex flex-col items-center justify-center gap-2">
            <p className="text-gray-600 text-xs md:text-sm text-center">
              © {new Date().getFullYear()} Warmi Power Fest. Todos los derechos
              reservados.
            </p>
            <div className="flex items-center justify-center gap-6 -mb-4">
              <a
                href="https://www.facebook.com/share/1QTkj16eR5/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-[#B018A9] transition-colors duration-300 "
                aria-label="Facebook"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/warmipowerfest?utm_source=qr&igsh=c2phN2VxYmFkcGpk"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-[#B018A9] transition-colors duration-300"
                aria-label="Instagram"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href="https://www.tiktok.com/@warmi.power.fest?_r=1&_t=ZM-91yTssjWal9"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-[#B018A9] transition-colors duration-300"
                aria-label="TikTok"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Botón de WhatsApp solo para la página de inicio */}
      <WhatsAppButtonHome />
    </div>
  );
}

export default Home;
