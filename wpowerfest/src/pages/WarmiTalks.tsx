import { useState } from 'react'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'

function WarmiTalks() {
  const [activeDay, setActiveDay] = useState<'viernes' | 'sabado' | 'domingo'>('viernes')

  const agendaData = {
    viernes: [
      { hora: '09h00 am <--', actividad: 'Apertura al público' },
      { hora: '09h30 - 10h10 am <--', actividad: 'Clase de Hatha Yoga by Fer Franco' },
      { hora: '10h30 - 11h30 am <--', actividad: 'Panel: Género en el deporte:\nLola Valladares: ONU MUJERES\nMgs. Karina Escobar: Vicepresidente de Liga Deportiva Universitaria / Delegada de Clubes Femeninos a la FEF\nMishell Duque: Periodista Deportiva' },
      { hora: '11h30 am - 12h20 pm <-', actividad: 'Entrenamiento en vivo con Mónica Crespo y Karolina Salas by Fit&Flex' },
      { hora: '12h30 - 13h00 pm <--', actividad: 'Charla Nutrición para mujeres "Warmi con Kinu sin azúcar"\nMSc. Camila Vela nutricionista deportiva & funcional' },
      { hora: '13h00 - 13h30 pm <--', actividad: 'Masterclass Creatina y energía femenina by Salud y Fitness' },
      { hora: '14h30 - 14h45 pm <--', actividad: 'Presentación By Lola Baila: Flamenco' },
      { hora: '14h50 - 15h15 pm <--', actividad: 'Masterclass Blast Power Jump' },
      { hora: '15h30 - 16h00 pm <--', actividad: 'Masterclass de cuidado capilar by Pilopeptan Women\nDra. Andrea Naranjo' },
      { hora: '16h15 - 17h15 pm <--', actividad: 'Conversatorio "En sus cuerpos, list@s, ¡YA!: Igualdad de género y deporte\nby Prefectura de Pichincha' },
      { hora: '17h30 - 18h30 pm <--', actividad: 'PodCast Live: Sacadas la Madre by El Comercio' },
      { hora: '19h30 - 20h30 pm <--', actividad: 'Gala de premiación Premios Warmi 2026' },
    ],
    sabado: [
      { hora: '09h00 am <--', actividad: 'Apertura del evento' },
      { hora: '09h30 - 10h30 am <--', actividad: 'Clase de Hatha Yoga by Fer Franco' },
      { hora: '10h30 - 11h30 am <--', actividad: 'Entrenamiento en vivo by Fit&flex' },
      { hora: '11h30 - 12h00 am <--', actividad: 'Masterclass de Body Combat by KAO SPORT' },
      { hora: '12h00 - 13h00 pm <--', actividad: 'Clase magistral: Fuerza y Resistencia con Mónica Crespo' },
      { hora: '13h30 - 14h00 pm <--', actividad: 'Masterclass Wellnes Conciente by Salud y Fitness' },
      { hora: '14h00 - 14h30 pm <--', actividad: 'Lanzamiento oficial de NOVOLUX by Lux del Ecuador' },
      { hora: '14h30 - 15h00 pm <--', actividad: 'Introducción a genética aplicada al alto rendimiento by Gen Be Health' },
      { hora: '15h10 - 15h30 pm <--' , actividad: 'Masterclass Blast Power Jump' },
      { hora: '15h30 - 16h00 pm <--', actividad: 'Masterclass Importancia de la Salud Mental en mujeres by PensArte\nDra. Katherine Bahamonde' },
      { hora: '16h30 - 17h00 pm <--', actividad: 'Desfile Warmi Moda 2026: tendencias, identidad y estilo femenino' },
      { hora: '19h00 - 20h00 pm <--', actividad: 'Electro Warmi Experience by Lara Klart- Dj femenina ecuatoriana' },
    ],
    domingo: [
      { hora: '7h00 am <--', actividad: 'Calentamiento precarrera by Fit&Flex con Mónica Crespo, Karo Salas, Micka Calisto' },
      { hora: '08h00 am <--', actividad: 'Carrera Warmi Runner 2026' },
      { hora: '11h00 am <--', actividad: 'Evento de premiación de la carrera Warmi Runner 2026' },
      { hora: '14h00 pm <--', actividad: 'Cierre del evento más inspirador del año\nWarmi Power Fest' },
    ]
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Sección de Agenda */}
      <div className="w-full px-4 py-8 md:py-12" style={{ maxWidth: '1200px', margin: '0 auto', marginTop: '40px', marginBottom: '40px' }}>
        
        {/* Título */}
        <h2
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-8 md:mb-12"
          style={{ fontFamily: "'Anton', sans-serif", color: '#B018A9', letterSpacing: '2px' }}
        >
          AGENDA DEL EVENTO
        </h2>

        {/* Tabs de días */}
        <div className="flex justify-center gap-3 mb-10 md:mb-14 flex-wrap" style={{marginTop: '20px', marginBottom: '20px'}}>
          <button
            onClick={() => setActiveDay('viernes')}
            className={`px-6 py-3 md:px-10 md:py-4 rounded-full font-bold text-sm md:text-base transition-all duration-300 ${
              activeDay === 'viernes'
                ? 'bg-gradient-to-r from-[#B018A9] to-[#54F6C5] text-white shadow-xl scale-105'
                : 'bg-white text-gray-600 border-2 border-gray-200 hover:border-[#B018A9] hover:text-[#B018A9]'
            }`}
            style={{ fontFamily: "'Gotham', sans-serif" }}
          >
            Viernes 6
          </button>
          <button
            onClick={() => setActiveDay('sabado')}
            className={`px-6 py-3 md:px-10 md:py-4 rounded-full font-bold text-sm md:text-base transition-all duration-300 ${
              activeDay === 'sabado'
                ? 'bg-gradient-to-r from-[#B018A9] to-[#54F6C5] text-white shadow-xl scale-105'
                : 'bg-white text-gray-600 border-2 border-gray-200 hover:border-[#B018A9] hover:text-[#B018A9]'
            }`}
            style={{ fontFamily: "'Gotham', sans-serif" }}
          >
            Sábado 7
          </button>
          <button
            onClick={() => setActiveDay('domingo')}
            className={`px-6 py-3 md:px-10 md:py-4 rounded-full font-bold text-sm md:text-base transition-all duration-300 ${
              activeDay === 'domingo'
                ? 'bg-gradient-to-r from-[#B018A9] to-[#54F6C5] text-white shadow-xl scale-105'
                : 'bg-white text-gray-600 border-2 border-gray-200 hover:border-[#B018A9] hover:text-[#B018A9]'
            }`}
            style={{ fontFamily: "'Gotham', sans-serif" }}
          >
            Domingo 8
          </button>
        </div>

        {/* Timeline Vertical */}
        <div className="relative">
          {/* Línea vertical del timeline - solo visible en desktop */}
          <div className="hidden md:block absolute left-[220px] top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#B018A9] via-[#D41CC4] to-[#54F6C5]"></div>

          {/* Items del timeline */}
          <div className="space-y-12 md:space-y-20">
            {agendaData[activeDay].map((item, index) => (
              <div key={index} className="relative">
                {/* Layout Desktop: 2 columnas */}
                <div className="md:grid md:grid-cols-[220px_1fr] md:gap-10 md:items-start">
                  
                  {/* Columna Izquierda: Hora (Desktop) */}
                  <div className="hidden md:flex md:justify-end md:pr-8 md:pt-2" style={{marginBottom: '20px'}}>
                    <div className="text-right">
                      <div className="inline-flex items-center gap-3 bg-white border-2 border-[#B018A9] px-5 py-3 rounded-xl shadow-lg">
                        <span className="text-2xl">🕐</span>
                        <span className="font-bold text-base text-[#B018A9]" style={{ fontFamily: "'Anton', sans-serif", letterSpacing: '1px' }}>
                          {item.hora}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Punto del timeline - solo desktop */}
                  <div className="hidden md:block absolute left-[220px] top-3 w-4 h-4 bg-white border-4 border-[#B018A9] rounded-full transform -translate-x-1/2 z-10 shadow-lg"></div>

                  {/* Columna Derecha: Contenido */}
                  <div className="md:pl-0">
                    <div className="bg-white rounded-2xl border-2 border-gray-200 p-5 md:p-6 shadow-lg hover:shadow-xl hover:border-[#B018A9]/30 transition-all duration-300">
                      
                      {/* Hora en móvil */}
                      <div className="md:hidden flex items-center gap-3 mb-4 pb-4 border-b-2 border-gray-100">
                        <div className="flex-shrink-0 w-12 h-12 bg-white border-2 border-[#B018A9] rounded-xl flex items-center justify-center shadow-md">
                          <span className="text-xl">🕐</span>
                        </div>
                        <span className="text-[#B018A9] font-bold text-lg" style={{ fontFamily: "'Anton', sans-serif", letterSpacing: '1px' }}>
                          {item.hora}
                        </span>
                      </div>

                      {/* Contenido de la actividad */}
                      <div className="space-y-2">
                        {item.actividad.split('\n').map((line, i) => (
                          <p
                            key={i}
                            className={i === 0 ? 'text-gray-900 font-bold text-base md:text-lg leading-relaxed' : 'text-gray-600 text-sm md:text-base leading-relaxed pl-0 md:pl-4'}
                            style={{ fontFamily: "'Gotham', sans-serif" }}
                          >
                            {i > 0 && <span className="text-[#54F6C5] mr-2 font-bold">→</span>}
                            {line}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default WarmiTalks
