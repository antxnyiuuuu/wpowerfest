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
            // Aumenté el padding aquí a 'p-6' para separar el modal del borde del celular
            className="fixed inset-0 z-[9999] flex items-center justify-center p-6 bg-[#000000]/60 backdrop-blur-md h-screen w-screen"
            onClick={(e) => {
              if (e.target === e.currentTarget) handleClose();
            }}
          >
            <div
              className="rounded-3xl w-full max-w-lg relative border-t-8 border-[#A900A1] shadow-2xl animate-fadeInUp m-auto"
              style={{ backgroundColor: "#ffffff" }}
            >
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 text-[#9ca3af] hover:text-[#A900A1] hover:bg-[#f3f4f6] rounded-full p-2 transition-colors z-10"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              <div className="py-10 px-6 md:px-10 lg:px-12">
                <h3 className="text-4xl text-[#A900A1] font-['Anton'] uppercase mb-2 text-center">
                  INFORMACION DEL STAND
                </h3>

                <div className="text-center mb-8 border-b border-[#54F6C5] pb-4">
                  <p className="text-[#6b7280] font-['Gotham'] text-sm uppercase tracking-widest mb-1">
                    Zona seleccionada
                  </p>
                </div>

                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-8 font-['Gotham']"
                >
                  <div>
                    <label className="block text-[#A900A1] font-['Anton'] text-lg uppercase mb-3 tracking-wide">
                      Tu Nombre
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Escribe tu nombre"
                      className="w-full border-2 border-[#e5e7eb] focus:border-[#54F6C5] rounded-xl px-5 py-4 outline-none transition-colors text-lg placeholder-[#9ca3af]"
                      style={{ backgroundColor: "#f9fafb", color: "#000000" }}
                      value={formData.nombre}
                      onChange={(e) =>
                        setFormData({ ...formData, nombre: e.target.value })
                      }
                    />
                  </div>

                  <div>
                    <label className="block text-[#A900A1] font-['Anton'] text-lg uppercase mb-3 tracking-wide">
                      Número de Stand
                    </label>
                    <input
                      type="number"
                      inputMode="numeric"
                      required
                      placeholder="Ej: 14"
                      className="w-full border-2 border-[#e5e7eb] focus:border-[#54F6C5] rounded-xl px-5 py-4 outline-none transition-colors text-lg placeholder-[#9ca3af]"
                      style={{ backgroundColor: "#f9fafb", color: "#000000" }}
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
                    className="w-full font-['Anton'] text-xl py-5 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 active:translate-y-0 active:scale-[0.98] transition-all flex items-center justify-center gap-3 uppercase tracking-wider mt-4"
                    style={{ backgroundColor: "#25D366", color: "#ffffff" }}
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
        )}
    </div>
  );
}

export default Stand;
