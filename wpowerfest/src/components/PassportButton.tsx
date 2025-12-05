import { Link } from 'react-router-dom'
import { useState } from 'react'

function PassportButton() {
  const [showTooltip, setShowTooltip] = useState(false)
  const [isHovering, setIsHovering] = useState(false)

  return (
    <div 
      className="fixed bottom-6 left-6 md:left-16 z-50"
      onMouseEnter={() => {
        setIsHovering(true)
        setShowTooltip(true)
      }}
      onMouseLeave={() => {
        setIsHovering(false)
        setShowTooltip(false)
      }}
    >
      <Link
        to="/pasaporte"
        className="group block"
        aria-label="Ir al Pasaporte"
      >
        <div className="relative" style={{ width: isHovering ? '160px' : '96px', height: isHovering ? '128px' : '128px' }}>
          <img 
            src={isHovering ? "/images/passport-open.png" : "/images/passport-portada.png"}
            alt="Pasaporte Warmi Power Fest"
            className="w-full h-full object-contain transition-all duration-500 ease-in-out group-hover:scale-110 drop-shadow-lg"
            style={{
              width: isHovering ? '160px' : '96px',
              height: '128px',
              objectFit: 'contain'
            }}
          />
        </div>
      </Link>

      {/* Tooltip */}
      {showTooltip && (
        <div 
          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 tooltip-container"
          style={{
            pointerEvents: 'none',
            zIndex: 60
          }}
        >
          <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-xl border border-gray-200 px-4 py-3 whitespace-nowrap">
            <p className="text-sm font-medium text-gray-800" style={{ fontFamily: "'Gotham', sans-serif" }}>
              Ver info sobre Warmi Passport →
            </p>
          </div>
          {/* Flecha del tooltip */}
          <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1">
            <div className="w-3 h-3 bg-white/95 backdrop-blur-sm border-r border-b border-gray-200 transform rotate-45"></div>
          </div>
        </div>
      )}
    </div>
  )
}

export default PassportButton

