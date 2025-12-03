import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

function CountdownTimer() {
  const location = useLocation()
  
  // No mostrar en la página de inicio
  if (location.pathname === '/') {
    return null
  }
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const targetDate = new Date('2026-03-06T00:00:00').getTime()
    const startDate = new Date('2025-01-01T00:00:00').getTime()
    const totalDuration = targetDate - startDate

    const updateCountdown = () => {
      const now = new Date().getTime()
      const difference = targetDate - now
      const elapsed = now - startDate

      const progressPercent = Math.min(Math.max((elapsed / totalDuration) * 100, 0), 100)
      setProgress(progressPercent)

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        })
      } else {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0
        })
        setProgress(100)
      }
    }

    updateCountdown()
    const interval = setInterval(updateCountdown, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div 
      className="fixed bottom-4 left-4 z-50 bg-white rounded-lg shadow-lg border border-gray-200 text-center"
      style={{ 
        minWidth: '160px',
        maxWidth: '220px',
        padding: '12px 16px',
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
      }}
    >
      <h3 className="text-xs md:text-sm font-light text-gray-700 uppercase tracking-wider" style={{ fontFamily: "'Anton', sans-serif", marginTop: '5px', marginBottom: '8px' }}>
        El festival se acerca
      </h3>
      <div className="flex items-center justify-center gap-1.5 md:gap-2" style={{ marginTop: '5px', marginBottom: '5px' }}>
        <div className="flex flex-col items-center">
          <div className="text-lg md:text-xl font-mono font-light text-[#913889]" style={{ fontFamily: 'monospace', letterSpacing: '1px', marginTop: '5px', marginBottom: '5px' }}>
            {String(timeLeft.days).padStart(3, '0')}
          </div>
          <span className="text-[10px] text-gray-500 font-light uppercase tracking-wider" style={{ fontFamily: "'Montserrat', sans-serif", marginTop: '5px', marginBottom: '5px' }}>Días</span>
        </div>
        <span className="text-base md:text-lg font-mono font-light text-gray-400" style={{ marginTop: '5px', marginBottom: '5px' }}>:</span>
        <div className="flex flex-col items-center">
          <div className="text-lg md:text-xl font-mono font-light text-[#913889]" style={{ fontFamily: 'monospace', letterSpacing: '1px', marginTop: '5px', marginBottom: '5px' }}>
            {String(timeLeft.hours).padStart(2, '0')}
          </div>
          <span className="text-[10px] text-gray-500 font-light uppercase tracking-wider" style={{ fontFamily: "'Montserrat', sans-serif", marginTop: '5px', marginBottom: '5px' }}>Horas</span>
        </div>
        <span className="text-base md:text-lg font-mono font-light text-gray-400" style={{ marginTop: '5px', marginBottom: '5px' }}>:</span>
        <div className="flex flex-col items-center">
          <div className="text-lg md:text-xl font-mono font-light text-[#913889]" style={{ fontFamily: 'monospace', letterSpacing: '1px', marginTop: '5px', marginBottom: '5px' }}>
            {String(timeLeft.minutes).padStart(2, '0')}
          </div>
          <span className="text-[10px] text-gray-500 font-light uppercase tracking-wider" style={{ fontFamily: "'Montserrat', sans-serif", marginTop: '5px', marginBottom: '5px' }}>Min</span>
        </div>
        <span className="text-base md:text-lg font-mono font-light text-gray-400" style={{ marginTop: '5px', marginBottom: '5px' }}>:</span>
        <div className="flex flex-col items-center">
          <div className="text-lg md:text-xl font-mono font-light text-[#913889]" style={{ fontFamily: 'monospace', letterSpacing: '1px', marginTop: '5px', marginBottom: '5px' }}>
            {String(timeLeft.seconds).padStart(2, '0')}
          </div>
          <span className="text-[10px] text-gray-500 font-light uppercase tracking-wider" style={{ fontFamily: "'Montserrat', sans-serif", marginTop: '5px', marginBottom: '5px' }}>Seg</span>
        </div>
      </div>
      
      {/* Barra de progreso */}
      <div style={{ marginTop: '8px', marginBottom: '5px', paddingLeft: '8px', paddingRight: '8px' }}>
        <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
          <div 
            className="h-full rounded-full transition-all duration-1000 ease-out"
            style={{ 
              width: `${progress}%`,
              background: '#913889'
            }}
          ></div>
        </div>
      </div>
      
      <p className="text-gray-400 text-[10px] font-light" style={{ fontFamily: "'Montserrat', sans-serif", marginTop: '5px', marginBottom: '5px' }}>6 de marzo 2026</p>
    </div>
  )
}

export default CountdownTimer

