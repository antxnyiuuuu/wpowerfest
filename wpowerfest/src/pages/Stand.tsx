import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Navigation from "../components/Navigation";

function Stand() {
  // DATA
  const standsData = [
    {
      id: 1,
      src: "/images/14.png",
      title: "ZONA NUTRITIVA",
    },
    {
      id: 2,
      src: "/images/13.png",
      title: "SALÓN WARMI CHALLENGE",
    },
  ];

  // ESTADOS
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStand, setSelectedStand] = useState(null);
  const [formData, setFormData] = useState({
    nombre: "",
    numeroStand: "",
  });

  // BLOQUEO DE SCROLL
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [isModalOpen]);

  // LOGICA
  const handleImageClick = (stand) => {
    setSelectedStand(stand);
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setSelectedStand(null);
    setFormData({ nombre: "", numeroStand: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.nombre || !formData.numeroStand) {
      alert("Por favor completa todos los campos");
      return;
    }

    const phoneNumber = "593963258709";
    const message = `Hola, mi nombre es *${formData.nombre}*. Quiero reservar el *Stand N° ${formData.numeroStand}* de la zona: *${selectedStand.title}*.`;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;

    window.open(whatsappUrl, "_blank");
    handleClose();
  };

  return (
    // Fondo forzado blanco y ignorando CSS global
    <div
      className="min-h-screen bg-[#ffffff] pb-20"
      style={{ backgroundColor: "#ffffff" }}
    >
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl md:text-6xl text-center text-[#A900A1] font-['Anton'] uppercase mb-12 mt-4">
          RESERVA TU ESPACIO
        </h1>

        <div className="flex flex-col items-center gap-20">
          {standsData.map((stand) => (
            <div key={stand.id} className="w-full max-w-5xl">
              <div
                onClick={() => handleImageClick(stand)}
                className="cursor-pointer active:scale-[0.98] transition-transform hover:shadow-xl rounded-xl overflow-hidden border border-[#eeeeee]"
              >
                <img
                  src={stand.src}
                  alt={stand.title}
                  className="w-full h-auto block"
                />
                <p
                  className="text-[#ffffff] text-center py-3 font-['Gotham'] text-sm tracking-wide uppercase"
                  style={{ backgroundColor: "#A900A1", color: "#ffffff" }}
                >
                  Toca la imagen para cotizar esta zona
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* PORTAL DEL MODAL */}
      {isModalOpen &&
        selectedStand &&
        createPortal(
          <div
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-8 bg-black/80 backdrop-blur-md"
            onClick={(e) => {
              if (e.target === e.currentTarget) handleClose();
            }}
          >
            {/* Botón Cerrar - Fuera del modal */}
            <button
              onClick={handleClose}
              className="absolute top-8 right-8 z-[10000] p-3 bg-white text-gray-700 hover:text-[#A900A1] hover:bg-gray-100 rounded-full transition-all shadow-lg"
              aria-label="Cerrar"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={3}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <div
              className="relative w-full max-w-[340px] md:max-w-[500px] bg-white rounded-[2rem] md:rounded-[3rem] shadow-2xl overflow-hidden animate-fadeInUp"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="px-3 py-6 md:px-24 md:py-20">
                {/* Header Minimalista */}
                <div className="text-center mb-16">
                  <h3
                    className="text-xl md:text-5xl text-[#A900A1] font-['Anton'] uppercase mb-8 md:mb-12 tracking-wide"
                    style={{ marginTop: "16px" }}
                  >
                    Cotiza tu Stand
                  </h3>
                  <div
                    className="inline-block px-3 py-1.5 md:px-8 md:py-4 bg-gray-50 rounded-full border border-gray-100"
                    style={{ marginBottom: "24px" }}
                  >
                    <div className="flex items-center justify-center gap-2 md:gap-3 text-xs md:text-lg text-gray-500 font-['Gotham']">
                      <span className="uppercase tracking-widest font-medium">Zona:</span>
                      <span className="font-bold text-[#A900A1] text-base md:text-xl">{selectedStand.title}</span>
                    </div>
                  </div>
                </div>

                {/* Formulario Centrado y Más Angosto */}
                <form onSubmit={handleSubmit} className="flex flex-col gap-6 md:gap-12 font-['Gotham'] w-full items-center">
                  <div className="space-y-3 md:space-y-5 w-full max-w-[260px] md:max-w-sm">
                    <label className="block text-sm font-bold text-gray-400 uppercase tracking-wider text-left" style={{ marginBottom: "20px" }}>
                      Tu Nombre
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Escribe tu nombre aquí"
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl md:rounded-2xl text-gray-900 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-4 focus:ring-[#A900A1]/5 focus:border-[#A900A1] transition-all duration-300 text-sm md:text-lg text-left"
                      style={{ paddingTop: "10px", paddingBottom: "10px", paddingLeft: "14px", paddingRight: "14px" }}
                      value={formData.nombre}
                      onChange={(e) =>
                        setFormData({ ...formData, nombre: e.target.value })
                      }
                    />
                  </div>

                  <div className="space-y-3 md:space-y-5 w-full max-w-[260px] md:max-w-sm">
                    <label className="block text-sm font-bold text-gray-400 uppercase tracking-wider text-left" style={{ marginBottom: "20px" }}>
                      Número de Stand
                    </label>
                    <input
                      type="number"
                      inputMode="numeric"
                      required
                      placeholder="Ej: 14"
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl md:rounded-2xl text-gray-900 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-4 focus:ring-[#A900A1]/5 focus:border-[#A900A1] transition-all duration-300 text-sm md:text-lg text-left"
                      style={{ paddingTop: "10px", paddingBottom: "10px", paddingLeft: "14px", paddingRight: "14px" }}
                      value={formData.numeroStand}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          numeroStand: e.target.value,
                        })
                      }
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full max-w-[260px] md:max-w-sm font-['Anton'] text-base md:text-xl rounded-xl md:rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-1 active:translate-y-0 active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2 md:gap-3 uppercase tracking-wide"
                    style={{
                      backgroundColor: "#25D366",
                      color: "#ffffff",
                      marginTop: "0px",
                      marginBottom: "32px",
                      paddingTop: "10px",
                      paddingBottom: "10px",
                      paddingLeft: "16px",
                      paddingRight: "16px",
                      border: "none",
                      borderRadius: "12px"
                    }}
                  >
                    <span>Enviar a WhatsApp</span>
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                    </svg>
                  </button>
                </form>
              </div>
            </div>
          </div>,
          document.body
        )
      }
    </div >
  );
}

export default Stand;
