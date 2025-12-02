import { useState, useEffect } from 'react'
import Navigation from '../components/Navigation'

function Stand() {
  const standImages = [
    '/images/stands.jpg',
    '/images/stands2.jpg',
  ]

  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % standImages.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [standImages.length])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % standImages.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + standImages.length) % standImages.length)
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Carrusel de imágenes */}
      <div className="relative overflow-hidden" style={{ height: 'calc(100vh - 150px)', minHeight: '600px' }}>
        {standImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-700 ease-in-out flex items-center justify-center ${
              index === currentSlide ? 'opacity-100 translate-x-0 scale-100' : 
              index < currentSlide ? 'opacity-0 -translate-x-full scale-95' : 
              'opacity-0 translate-x-full scale-95'
            }`}
          >
            <img
              src={image}
              alt={`Stand ${index + 1}`}
              className="w-full h-full object-contain"
            />
          </div>
        ))}

        {/* Botones de navegación */}
        <button
          onClick={prevSlide}
          className="absolute left-8 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-[#913889] hover:text-[#7FBFA9] rounded-full p-4 md:p-5 shadow-lg transition-all duration-300 hover:scale-110 z-10"
          aria-label="Anterior"
        >
          <svg className="w-8 h-8 md:w-12 md:h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-8 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-[#913889] hover:text-[#7FBFA9] rounded-full p-4 md:p-5 shadow-lg transition-all duration-300 hover:scale-110 z-10"
          aria-label="Siguiente"
        >
          <svg className="w-8 h-8 md:w-12 md:h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default Stand
