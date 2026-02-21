import { useState, useEffect } from "react";
import Navigation from "../components/Navigation";
import WhatsAppButtonHome from "../components/WhatsAppButtonHome";
import PassportButton from "../components/PassportButton";
import Footer from "../components/Footer";

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
    <div className="relative w-full min-h-screen" style={{ backgroundColor: '#ffffff' }}>
      <Navigation />

      {/* Imagen principal */}
      <div className="w-full relative" style={{ marginBottom: "10px" }}>
        <div className="relative overflow-hidden h-[200px] md:h-[500px] lg:h-[calc(100vh-200px)] md:min-h-[600px] flex items-center justify-center bg-gray-100" style={{ minHeight: '200px' }}>
          <img
            src="/images/inicio.png"
            alt="Warmi Power Fest"
            className="w-full h-full object-cover"
            style={{ 
              width: "100%", 
              height: "100%",
              objectFit: "cover", 
              display: "block",
              minHeight: '200px'
            }}
            loading="eager"
            decoding="async"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              const parent = target.parentElement;
              if (parent) {
                parent.style.backgroundColor = '#f3f4f6';
                parent.innerHTML = '<div style="padding: 20px; text-align: center; color: #666;">Imagen no disponible</div>';
              }
            }}
          />
        </div>
      </div>
    
      {/* Botón de Registro */}
      {/* codigo en wh */}
      {/* Animación shimmer personalizada */}
      <style>{`
        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
        
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        
        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }
        
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>

      {/* Sección de presentación */}
      <div
        className="w-full bg-gradient-to-br from-[#54F6C5]/10 via-white to-[#B018A9]/10"
        style={{
          paddingTop: "60px",
          paddingBottom: "60px",
          marginTop: "10px",
          marginBottom: "10px",
          backgroundColor: "#ffffff",
          minHeight: "auto",
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
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-[#B018A9] leading-tight"
              style={{
                fontFamily: "'Anton', sans-serif",
                letterSpacing: "2px",
                marginTop: "10px",
                marginBottom: "30px",
                width: "100%",
                maxWidth: "900px",
                paddingLeft: "15px",
                paddingRight: "15px",
              }}
            >
              EL FESTIVAL FEMENINO MÁS INSPIRADOR DEL PAÍS
            </h1>
            <p
              className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-gray-700 leading-relaxed"
              style={{
                fontFamily: "'Gotham', sans-serif",
                letterSpacing: "0.5px",
                marginTop: "10px",
                marginBottom: "40px",
                width: "100%",
                maxWidth: "800px",
                paddingLeft: "15px",
                paddingRight: "15px",
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
                className="bg-white rounded-xl p-4 sm:p-6 md:p-8 lg:p-10 shadow-lg transition-all duration-300 border border-gray-200 text-center"
                style={{ marginTop: "10px", marginBottom: "10px" }}
              >
                <h3
                  className="text-base sm:text-lg md:text-xl lg:text-2xl font-light text-gray-700 uppercase tracking-wider"
                  style={{
                    fontFamily: "'Anton', sans-serif",
                    marginTop: "10px",
                    marginBottom: "15px",
                  }}
                >
                  El festival se acerca
                </h3>
                <div
                  className="flex items-center justify-center gap-2 sm:gap-3 md:gap-4"
                  style={{ marginTop: "10px", marginBottom: "10px" }}
                >
                  <div className="flex flex-col items-center min-w-[50px] sm:min-w-[60px]">
                    <div
                      className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-mono font-light text-[#B018A9]"
                      style={{
                        fontFamily: "monospace",
                        letterSpacing: "1px",
                        marginTop: "5px",
                        marginBottom: "5px",
                      }}
                    >
                      {String(timeLeft.days).padStart(2, "0")}
                    </div>
                    <span
                      className="text-[10px] sm:text-xs md:text-sm text-gray-500 font-light uppercase tracking-wider"
                      style={{
                        fontFamily: "'Gotham', sans-serif",
                        marginTop: "5px",
                        marginBottom: "5px",
                      }}
                    >
                      Días
                    </span>
                  </div>
                  <span
                    className="text-xl sm:text-2xl md:text-3xl font-mono font-light text-gray-400"
                    style={{ marginTop: "5px", marginBottom: "5px" }}
                  >
                    :
                  </span>
                  <div className="flex flex-col items-center min-w-[50px] sm:min-w-[60px]">
                    <div
                      className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-mono font-light text-[#B018A9]"
                      style={{
                        fontFamily: "monospace",
                        letterSpacing: "1px",
                        marginTop: "5px",
                        marginBottom: "5px",
                      }}
                    >
                      {String(timeLeft.hours).padStart(2, "0")}
                    </div>
                    <span
                      className="text-[10px] sm:text-xs md:text-sm text-gray-500 font-light uppercase tracking-wider"
                      style={{
                        fontFamily: "'Gotham', sans-serif",
                        marginTop: "5px",
                        marginBottom: "5px",
                      }}
                    >
                      Horas
                    </span>
                  </div>
                  <span
                    className="text-xl sm:text-2xl md:text-3xl font-mono font-light text-gray-400"
                    style={{ marginTop: "5px", marginBottom: "5px" }}
                  >
                    :
                  </span>
                  <div className="flex flex-col items-center min-w-[50px] sm:min-w-[60px]">
                    <div
                      className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-mono font-light text-[#B018A9]"
                      style={{
                        fontFamily: "monospace",
                        letterSpacing: "1px",
                        marginTop: "5px",
                        marginBottom: "5px",
                      }}
                    >
                      {String(timeLeft.minutes).padStart(2, "0")}
                    </div>
                    <span
                      className="text-[10px] sm:text-xs md:text-sm text-gray-500 font-light uppercase tracking-wider"
                      style={{
                        fontFamily: "'Gotham', sans-serif",
                        marginTop: "5px",
                        marginBottom: "5px",
                      }}
                    >
                      Min
                    </span>
                  </div>
                  <span
                    className="text-xl sm:text-2xl md:text-3xl font-mono font-light text-gray-400"
                    style={{ marginTop: "5px", marginBottom: "5px" }}
                  >
                    :
                  </span>
                  <div className="flex flex-col items-center min-w-[50px] sm:min-w-[60px]">
                    <div
                      className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-mono font-light text-[#B018A9]"
                      style={{
                        fontFamily: "monospace",
                        letterSpacing: "1px",
                        marginTop: "5px",
                        marginBottom: "5px",
                      }}
                    >
                      {String(timeLeft.seconds).padStart(2, "0")}
                    </div>
                    <span
                      className="text-[10px] sm:text-xs md:text-sm text-gray-500 font-light uppercase tracking-wider"
                      style={{
                        fontFamily: "'Gotham', sans-serif",
                        marginTop: "5px",
                        marginBottom: "5px",
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
                <div className="p-4 sm:p-5 md:p-6 bg-white">
                  <h3
                    className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-[#B018A9] text-center flex items-center justify-center gap-2 sm:gap-3"
                    style={{
                      fontFamily: "'Anton', sans-serif",
                      marginTop: "10px",
                      marginBottom: "10px",
                    }}
                  >
                    <span
                      className="text-xl sm:text-2xl md:text-3xl"
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
                  <div className="absolute bottom-2 right-2 sm:bottom-4 sm:right-4 z-10">
                    <a
                      href="https://maps.app.goo.gl/QoXDHQgyjr8zyaGk6"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white hover:bg-gray-50 text-gray-700 hover:text-gray-900 px-3 py-2 sm:px-4 sm:py-2 md:px-6 md:py-3 rounded-lg shadow-xl border border-gray-200 transition-all duration-300 hover:scale-105 font-medium text-xs sm:text-sm md:text-base flex items-center gap-1 sm:gap-2"
                    >
                      <svg
                        className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                      </svg>
                      <span className="hidden sm:inline">Abrir en Google Maps</span>
                      <span className="sm:hidden">Ver Mapa</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />

      {/* Botón de WhatsApp solo para la página de inicio */}
      <WhatsAppButtonHome />

      {/* Botón de Pasaporte flotante solo en móvil/Android */}
      <PassportButton mobileOnly={true} />
    </div>
  );
}

export default Home;
