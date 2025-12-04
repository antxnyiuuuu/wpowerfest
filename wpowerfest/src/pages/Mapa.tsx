import { useState, useRef, useEffect } from 'react'
import Navigation from '../components/Navigation'

function Mapa() {
  const [scale, setScale] = useState(1)
  const [initialScale, setInitialScale] = useState(1)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [isZooming, setIsZooming] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)
  const zoomTimeoutRef = useRef<number | null>(null)
  const scaleRef = useRef(1)
  const positionRef = useRef({ x: 0, y: 0 })

  const handleWheel = (e: React.WheelEvent) => {
    // Solo funcionar si Shift está presionado
    if (!e.shiftKey) return
    
    e.preventDefault()
    if (!containerRef.current || !imageRef.current) return
    
    setIsZooming(true)
    
    // Limpiar timeout anterior
    if (zoomTimeoutRef.current) {
      clearTimeout(zoomTimeoutRef.current)
    }
    
    // Resetear isZooming después de un breve delay
    zoomTimeoutRef.current = window.setTimeout(() => {
      setIsZooming(false)
    }, 150)
    
    const container = containerRef.current
    const rect = container.getBoundingClientRect()
    
    // Obtener valores actuales de los refs
    const currentScale = scaleRef.current
    const currentPos = positionRef.current
    
    // Posición del cursor relativa al contenedor
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    
    // Centro del contenedor
    const containerCenterX = rect.width / 2
    const containerCenterY = rect.height / 2
    
    // Posición del cursor relativa al centro del contenedor
    const pointX = mouseX - containerCenterX
    const pointY = mouseY - containerCenterY
    
    // Calcular el nuevo scale (más rápido al alejar)
    const delta = e.deltaY > 0 ? 0.85 : 1.1 // Alejar más rápido (0.85 en lugar de 0.9)
    const newScale = Math.min(Math.max(currentScale * delta, 0.05), 5)
    const scaleChange = newScale / currentScale
    
    // Calcular la nueva posición para mantener el punto del cursor fijo
    const newX = pointX - (pointX - currentPos.x) * scaleChange
    const newY = pointY - (pointY - currentPos.y) * scaleChange
    
    // Actualizar refs y estados
    scaleRef.current = newScale
    positionRef.current = { x: newX, y: newY }
    setScale(newScale)
    setPosition({ x: newX, y: newY })
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button === 0) {
      setIsDragging(true)
      setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y })
    }
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      const newPos = {
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      }
      positionRef.current = newPos
      setPosition(newPos)
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      setIsDragging(true)
      setDragStart({ x: e.touches[0].clientX - position.x, y: e.touches[0].clientY - position.y })
    }
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isDragging && e.touches.length === 1) {
      setPosition({
        x: e.touches[0].clientX - dragStart.x,
        y: e.touches[0].clientY - dragStart.y
      })
    }
  }

  const handleTouchEnd = () => {
    setIsDragging(false)
  }

  const calculateInitialScale = () => {
    if (!containerRef.current || !imageRef.current) return 1
    
    const container = containerRef.current
    const img = imageRef.current
    
    const containerWidth = container.clientWidth
    const containerHeight = container.clientHeight
    const imgWidth = img.naturalWidth || img.width
    const imgHeight = img.naturalHeight || img.height
    
    const scaleX = containerWidth / imgWidth
    const scaleY = containerHeight / imgHeight
    
    // Usar el menor para que la imagen quepa completamente
    return Math.min(scaleX, scaleY) * 0.95 // 0.95 para dejar un poco de margen
  }

  const resetView = () => {
    setIsDragging(false)
    const newScale = calculateInitialScale()
    scaleRef.current = newScale
    positionRef.current = { x: 0, y: 0 }
    setScale(newScale)
    setPosition({ x: 0, y: 0 })
  }

  useEffect(() => {
    const handleGlobalMouseUp = () => {
      setIsDragging(false)
    }

    window.addEventListener('mouseup', handleGlobalMouseUp)
    return () => window.removeEventListener('mouseup', handleGlobalMouseUp)
  }, [])

  // Sincronizar refs con el estado
  useEffect(() => {
    scaleRef.current = scale
  }, [scale])

  useEffect(() => {
    positionRef.current = position
  }, [position])

  useEffect(() => {
    const handleImageLoad = () => {
      const newScale = calculateInitialScale()
      setInitialScale(newScale)
      setScale(newScale)
      scaleRef.current = newScale
      positionRef.current = { x: 0, y: 0 }
    }

    if (imageRef.current?.complete) {
      handleImageLoad()
    } else {
      imageRef.current?.addEventListener('load', handleImageLoad)
    }

    return () => {
      imageRef.current?.removeEventListener('load', handleImageLoad)
    }
  }, [])

  useEffect(() => {
    const handleResize = () => {
      const newScale = calculateInitialScale()
      setInitialScale(newScale)
      if (scale === initialScale) {
        setScale(newScale)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
      if (zoomTimeoutRef.current) {
        clearTimeout(zoomTimeoutRef.current)
      }
    }
  }, [scale, initialScale])

  return (
    <div className="min-h-screen bg-white" style={{ paddingTop: '10px', paddingBottom: '10px' }}>
      <Navigation />

      {/* Card con mapa interactivo */}
      <div 
        className="mx-auto bg-white rounded-lg shadow-lg overflow-hidden"
        style={{ 
          width: '95%',
          maxWidth: '1400px',
          marginTop: '10px',
          marginBottom: '10px',
          marginLeft: 'auto',
          marginRight: 'auto',
          display: 'block'
        }}
      >
        <div 
          ref={containerRef}
          className="relative overflow-hidden bg-gray-100"
          style={{ 
            height: '70vh',
            maxHeight: '800px',
            minHeight: '400px',
            cursor: isDragging ? 'grabbing' : 'grab',
            touchAction: 'none'
          }}
          onWheel={handleWheel}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: `translate(calc(-50% + ${position.x}px), calc(-50% + ${position.y}px)) scale(${scale})`,
              transition: (isDragging || isZooming) ? 'none' : 'transform 0.3s ease-out',
              willChange: 'transform',
              backfaceVisibility: 'hidden',
              perspective: 1000
            }}
          >
            <img
              ref={imageRef}
              src="/images/Maqueta3D-Warmi-Power-Fest.png"
              alt="Maqueta 3D Warmi Power Fest"
              className="max-w-none"
              style={{
                display: 'block',
                userSelect: 'none',
                pointerEvents: 'none'
              }}
              draggable={false}
            />
          </div>

          {/* Controles de zoom */}
          <div className="absolute top-4 right-4 z-10 flex flex-row gap-2">
            <button
              onClick={() => {
                const newScale = Math.min(scaleRef.current + 0.2, 5)
                scaleRef.current = newScale
                setScale(newScale)
              }}
              className="bg-white hover:bg-gray-50 text-gray-700 hover:text-gray-900 px-3 py-2 rounded-lg shadow-lg border border-gray-200 transition-all duration-300 hover:scale-105 font-medium text-sm"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              +
            </button>
            <button
              onClick={() => {
                const newScale = Math.max(scaleRef.current - 0.2, 0.05)
                scaleRef.current = newScale
                setScale(newScale)
              }}
              className="bg-white hover:bg-gray-50 text-gray-700 hover:text-gray-900 px-3 py-2 rounded-lg shadow-lg border border-gray-200 transition-all duration-300 hover:scale-105 font-medium text-sm"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              −
            </button>
            <button
              onClick={resetView}
              className="bg-white hover:bg-gray-50 text-gray-700 hover:text-gray-900 px-3 py-2 rounded-lg shadow-lg border border-gray-200 transition-all duration-300 hover:scale-105 font-medium text-xs"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Mapa
