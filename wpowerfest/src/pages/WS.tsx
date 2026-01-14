import Navigation from '../components/Navigation'

function WS() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Contenido */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-gradient-to-r from-[#54F6C5] to-[#B018A9] rounded-2xl p-8 shadow-lg">
            <div className="bg-white rounded-xl p-6">
              <h2 className="text-3xl font-bold text-[#B018A9] mb-4">Contáctanos por WhatsApp</h2>
              <p className="text-gray-700 mb-6">
                Escríbenos para más información sobre el Warmi Power Fest
              </p>
              <a
                href="https://wa.me/message/QXAL5MELZ7BJJ1"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-[#25D366] hover:bg-[#20BA5A] text-white font-bold py-3 px-6 rounded-full transition-all duration-300 hover:scale-105 shadow-lg"
              >
                Abrir WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WS

