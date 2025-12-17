import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

function Mapa() {
  const navigate = useNavigate();
  const [scale, setScale] = useState(1);
  const [initialScale, setInitialScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [isZooming, setIsZooming] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [hasMoved, setHasMoved] = useState(false);
  const [showWelcomeOverlay, setShowWelcomeOverlay] = useState(true);
  const welcomeTimeoutRef = useRef<number | null>(null);
  const [activeMaqueta, setActiveMaqueta] = useState<"salon" | "nutritiva">(
    "salon"
  );
  const [showTitleAnimation, setShowTitleAnimation] = useState(false);
  const [isChangingMaqueta, setIsChangingMaqueta] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [isMapNavigationActive, setIsMapNavigationActive] = useState(false); // Nuevo estado para activar navegación del mapa
  const longPressTimeoutRef = useRef<number | null>(null); // Timeout para detectar long press

  const maquetas = {
    salon: {
      name: "Salón Warmi Challenge",
      image: "/images/Maqueta3D-Warmi-Power-Fest.png",
    },
    nutritiva: {
      name: "Zona Nutritiva",
      image: "/images/ZonaNutritiva3D-Warmi-Power-Fest.png",
    },
  };
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const zoomTimeoutRef = useRef<number | null>(null);
  const scaleRef = useRef(1);
  const positionRef = useRef({ x: 0, y: 0 });
  const clickStartRef = useRef({ x: 0, y: 0 });
  const tooltipTimeoutRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);
  const pendingUpdateRef = useRef<{
    scale?: number;
    position?: { x: number; y: number };
  } | null>(null);
  const lastUpdateTime = useRef<number>(0);
  const imageTransformRef = useRef<HTMLDivElement>(null);

  const applyTransform = (scale: number, pos: { x: number; y: number }) => {
    if (imageTransformRef.current) {
      imageTransformRef.current.style.transform = `translate(calc(-50% + ${pos.x}px), calc(-50% + ${pos.y}px)) scale(${scale})`;
    }
  };

  const handleWheel = (e: React.WheelEvent) => {
    // --- MODIFICACIÓN: Lógica de Shift + Scroll ---

    // Si NO se presiona Shift (y no es un gesto de pellizco evidente con Ctrl),
    // permitimos el comportamiento normal (scroll de la página).
    // Nota: Mantenemos e.ctrlKey para permitir pellizco en trackpads si el navegador lo soporta así.
    if (!e.shiftKey && !e.ctrlKey) return;

    // Si se usa Shift, prevenimos el scroll de la página y hacemos zoom
    e.preventDefault();

    if (!containerRef.current || !imageRef.current) return;

    // Throttling agresivo - máximo 60fps (16ms entre actualizaciones)
    const now = performance.now();
    if (now - lastUpdateTime.current < 16) {
      return;
    }
    lastUpdateTime.current = now;

    // Detectar si es un gesto de pellizco (ctrlKey) o scroll normal
    const isPinch = e.ctrlKey;

    setIsZooming(true);

    // Limpiar timeout anterior
    if (zoomTimeoutRef.current) {
      clearTimeout(zoomTimeoutRef.current);
    }

    // Resetear isZooming después de un breve delay
    zoomTimeoutRef.current = window.setTimeout(() => {
      setIsZooming(false);
    }, 150);

    const container = containerRef.current;
    const rect = container.getBoundingClientRect();

    // Obtener valores actuales de los refs
    const currentScale = scaleRef.current;
    const currentPos = positionRef.current;

    // Posición del cursor relativa al contenedor
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Centro del contenedor
    const containerCenterX = rect.width / 2;
    const containerCenterY = rect.height / 2;

    // Posición del cursor relativa al centro del contenedor
    const pointX = mouseX - containerCenterX;
    const pointY = mouseY - containerCenterY;

    // Calcular el nuevo scale con delta más pequeño para zoom más suave
    let delta: number;
    if (isPinch) {
      // Para pellizco, usar delta más pequeño
      delta = e.deltaY < 0 ? 1.05 : 0.95;
    } else {
      // Para scroll normal, usar delta más pequeño
      delta = e.deltaY > 0 ? 0.95 : 1.05;
    }
    const newScale = Math.min(Math.max(currentScale * delta, 0.05), 5);
    const scaleChange = newScale / currentScale;

    // Calcular la nueva posición para mantener el punto del cursor fijo
    const newX = pointX - (pointX - currentPos.x) * scaleChange;
    const newY = pointY - (pointY - currentPos.y) * scaleChange;

    // Actualizar refs inmediatamente
    scaleRef.current = newScale;
    positionRef.current = { x: newX, y: newY };

    // Aplicar transform directamente al DOM para mejor rendimiento
    applyTransform(newScale, { x: newX, y: newY });

    // Actualizar estado solo ocasionalmente para sincronización
    if (rafRef.current === null) {
      rafRef.current = requestAnimationFrame(() => {
        setScale(scaleRef.current);
        setPosition(positionRef.current);
        rafRef.current = null;
      });
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button === 0) {
      setIsDragging(true);
      setHasMoved(false);
      setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
      clickStartRef.current = { x: e.clientX, y: e.clientY };
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      // Detectar si el mouse se movió significativamente (más de 5px)
      const moveDistance = Math.sqrt(
        Math.pow(e.clientX - clickStartRef.current.x, 2) +
        Math.pow(e.clientY - clickStartRef.current.y, 2)
      );
      if (moveDistance > 5) {
        setHasMoved(true);
      }

      const newPos = {
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      };
      positionRef.current = newPos;
      setPosition(newPos);
    }
  };

  const handleMouseUp = (e?: React.MouseEvent) => {
    // Si no se movió significativamente, es un click
    if (isDragging && !hasMoved && e) {
      const target = e.target as HTMLElement;
      // No mostrar tooltip si se hizo clic en los botones de control de zoom, en las flechas de cambio de maqueta, o en cualquier botón
      if (
        target.closest(".zoom-controls") ||
        target.closest('button[aria-label="Anterior"]') ||
        target.closest('button[aria-label="Siguiente"]') ||
        target.tagName === "BUTTON" ||
        target.closest("button")
      ) {
        setIsDragging(false);
        setHasMoved(false);
        return;
      }

      // No mostrar tooltip si la animación de título está activa, si estamos cambiando de maqueta, o si el mensaje de bienvenida está visible
      if (showTitleAnimation || isChangingMaqueta || showWelcomeOverlay) {
        setIsDragging(false);
        setHasMoved(false);
        return;
      }

      const rect = containerRef.current?.getBoundingClientRect();
      if (rect) {
        setTooltipPosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
        setShowTooltip(true);

        // Ocultar el tooltip después de 3 segundos
        if (tooltipTimeoutRef.current) {
          clearTimeout(tooltipTimeoutRef.current);
        }
        tooltipTimeoutRef.current = window.setTimeout(() => {
          setShowTooltip(false);
        }, 3000);
      }
    }
    setIsDragging(false);
    setHasMoved(false);
  };

  const initialDistanceRef = useRef<number | null>(null);
  const initialScaleRef = useRef<number>(1);

  const handleTouchStart = (e: React.TouchEvent) => {
    // Si hay dos dedos, es un gesto de pinch to zoom
    if (e.touches.length === 2) {
      // Limpiar el timeout de long press si existe
      if (longPressTimeoutRef.current) {
        clearTimeout(longPressTimeoutRef.current);
        longPressTimeoutRef.current = null;
      }

      setIsDragging(false);
      setIsZooming(true);
      setIsMapNavigationActive(true); // Activar navegación inmediatamente para pinch zoom

      const touch1 = e.touches[0];
      const touch2 = e.touches[1];
      const distance = Math.sqrt(
        Math.pow(touch2.clientX - touch1.clientX, 2) +
        Math.pow(touch2.clientY - touch1.clientY, 2)
      );
      initialDistanceRef.current = distance;
      initialScaleRef.current = scaleRef.current;
      return;
    }

    // Un solo dedo - activar navegación INMEDIATAMENTE
    if (e.touches.length === 1) {
      setHasMoved(false);
      setIsMapNavigationActive(true); // Activar inmediatamente
      setIsDragging(true); // Activar arrastre inmediatamente
      clickStartRef.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
      };
      setDragStart({
        x: e.touches[0].clientX - position.x,
        y: e.touches[0].clientY - position.y,
      });
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    // Si hay dos dedos, hacer pinch to zoom
    if (e.touches.length === 2 && initialDistanceRef.current !== null) {
      e.preventDefault(); // Prevenir scroll solo durante pinch to zoom
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];
      const currentDistance = Math.sqrt(
        Math.pow(touch2.clientX - touch1.clientX, 2) +
        Math.pow(touch2.clientY - touch1.clientY, 2)
      );

      const scaleChange = currentDistance / initialDistanceRef.current;
      const newScale = Math.min(
        Math.max(initialScaleRef.current * scaleChange, 0.05),
        5
      );

      // Calcular el punto medio entre los dos dedos para centrar el zoom
      const midX = (touch1.clientX + touch2.clientX) / 2;
      const midY = (touch1.clientY + touch2.clientY) / 2;

      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const containerCenterX = rect.width / 2;
        const containerCenterY = rect.height / 2;
        const pointX = midX - rect.left - containerCenterX;
        const pointY = midY - rect.top - containerCenterY;

        const scaleRatio = newScale / scaleRef.current;
        const newX = pointX - (pointX - positionRef.current.x) * scaleRatio;
        const newY = pointY - (pointY - positionRef.current.y) * scaleRatio;

        scaleRef.current = newScale;
        positionRef.current = { x: newX, y: newY };
        applyTransform(newScale, { x: newX, y: newY });
        setScale(newScale);
        setPosition({ x: newX, y: newY });
      }
      return;
    }

    // Un solo dedo - si estamos arrastrando, prevenir scroll y mover el mapa
    if (e.touches.length === 1 && isDragging) {
      e.preventDefault(); // SIEMPRE prevenir scroll cuando se está arrastrando

      const moveDistance = Math.sqrt(
        Math.pow(e.touches[0].clientX - clickStartRef.current.x, 2) +
        Math.pow(e.touches[0].clientY - clickStartRef.current.y, 2)
      );

      if (moveDistance > 5) {
        setHasMoved(true);
      }

      setPosition({
        x: e.touches[0].clientX - dragStart.x,
        y: e.touches[0].clientY - dragStart.y,
      });
    }
  };

  const handleTouchEnd = (e?: React.TouchEvent) => {
    // Limpiar el timeout de long press
    if (longPressTimeoutRef.current) {
      clearTimeout(longPressTimeoutRef.current);
      longPressTimeoutRef.current = null;
    }

    // Resetear el estado de navegación del mapa
    setIsMapNavigationActive(false);

    // Limpiar estado de pinch to zoom
    if (initialDistanceRef.current !== null) {
      initialDistanceRef.current = null;
      setIsZooming(false);
    }

    // Para touch, también mostrar tooltip si no hubo movimiento significativo
    if (isDragging && !hasMoved && e && e.changedTouches.length > 0) {
      const target = document.elementFromPoint(
        e.changedTouches[0].clientX,
        e.changedTouches[0].clientY
      ) as HTMLElement;

      // No mostrar tooltip si se tocó un botón de control de zoom o cambio de maqueta
      if (
        target?.closest(".zoom-controls") ||
        target?.closest('button[aria-label="Anterior"]') ||
        target?.closest('button[aria-label="Siguiente"]') ||
        target?.tagName === "BUTTON"
      ) {
        setIsDragging(false);
        setHasMoved(false);
        return;
      }

      // No mostrar tooltip si la animación de título está activa, si estamos cambiando de maqueta, o si el mensaje de bienvenida está visible
      if (showTitleAnimation || isChangingMaqueta || showWelcomeOverlay) {
        setIsDragging(false);
        setHasMoved(false);
        return;
      }

      const rect = containerRef.current?.getBoundingClientRect();
      if (rect) {
        setTooltipPosition({
          x: e.changedTouches[0].clientX - rect.left,
          y: e.changedTouches[0].clientY - rect.top,
        });
        setShowTooltip(true);

        // Ocultar el tooltip después de 3 segundos
        if (tooltipTimeoutRef.current) {
          clearTimeout(tooltipTimeoutRef.current);
        }
        tooltipTimeoutRef.current = window.setTimeout(() => {
          setShowTooltip(false);
        }, 3000);
      }
    }
    setIsDragging(false);
    setHasMoved(false);
  };

  const calculateInitialScale = () => {
    if (!containerRef.current || !imageRef.current) return 1;

    const container = containerRef.current;
    const img = imageRef.current;

    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;
    const imgWidth = img.naturalWidth || img.width;
    const imgHeight = img.naturalHeight || img.height;

    const scaleX = containerWidth / imgWidth;
    const scaleY = containerHeight / imgHeight;

    // Detectar si es móvil (ancho menor a 768px)
    const isMobile = window.innerWidth < 768;

    // En móvil, usar un zoom SÚPER extremo (25x), en desktop mantener el margen (0.95x)
    const zoomMultiplier = isMobile ? 25 : 0.95;

    // Usar el menor para que la imagen quepa completamente
    return Math.min(scaleX, scaleY) * zoomMultiplier;
  };

  const resetView = () => {
    setIsDragging(false);
    const newScale = calculateInitialScale();
    scaleRef.current = newScale;
    positionRef.current = { x: 0, y: 0 };
    setScale(newScale);
    setPosition({ x: 0, y: 0 });
  };

  const changeMaqueta = (maqueta: "salon" | "nutritiva") => {
    // Resetear el estado de carga cuando cambia la maqueta
    setImageLoaded(false);
    if (maqueta === activeMaqueta) return;

    // Marcar que estamos cambiando de maqueta
    setIsChangingMaqueta(true);

    // Cerrar tooltip si está abierto
    setShowTooltip(false);
    if (tooltipTimeoutRef.current) {
      clearTimeout(tooltipTimeoutRef.current);
      tooltipTimeoutRef.current = null;
    }

    // Forzar mostrar animación incluso si cambia rápido
    setShowTitleAnimation(false);
    // Pequeño delay para forzar re-render de la animación
    setTimeout(() => {
      setActiveMaqueta(maqueta);
      setShowTitleAnimation(true);

      // Ocultar después de la animación
      setTimeout(() => {
        setShowTitleAnimation(false);
        setIsChangingMaqueta(false);
      }, 2000);
    }, 10);

    // Resetear vista cuando se cambia de maqueta
    setTimeout(() => {
      resetView();
    }, 100);
  };

  useEffect(() => {
    const handleGlobalMouseUp = () => {
      setIsDragging(false);
    };

    window.addEventListener("mouseup", handleGlobalMouseUp);
    return () => window.removeEventListener("mouseup", handleGlobalMouseUp);
  }, []);

  // Cerrar tooltip cuando se hace clic fuera
  useEffect(() => {
    if (!showTooltip) return;

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // No cerrar si se hace clic en el tooltip mismo o en su botón
      if (target.closest(".tooltip-container")) {
        return;
      }
      // Cerrar el tooltip si se hace clic en cualquier otro lugar
      setShowTooltip(false);
      if (tooltipTimeoutRef.current) {
        clearTimeout(tooltipTimeoutRef.current);
        tooltipTimeoutRef.current = null;
      }
    };

    // Agregar listener con un pequeño delay para evitar que se cierre inmediatamente
    const timeoutId = setTimeout(() => {
      document.addEventListener("click", handleClickOutside);
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener("click", handleClickOutside);
    };
  }, [showTooltip]);

  // Cerrar mensaje de bienvenida automáticamente después de 3 segundos
  useEffect(() => {
    if (!showWelcomeOverlay) return;

    // Cerrar automáticamente después de 3 segundos
    welcomeTimeoutRef.current = window.setTimeout(() => {
      setShowWelcomeOverlay(false);
    }, 3000);

    // También permitir cerrar con click, pero solo después de un pequeño delay
    const handleClick = (e: MouseEvent) => {
      // Cerrar el overlay de bienvenida
      setShowWelcomeOverlay(false);
      if (welcomeTimeoutRef.current) {
        clearTimeout(welcomeTimeoutRef.current);
        welcomeTimeoutRef.current = null;
      }
      // Prevenir que se abra el tooltip cuando se cierra el mensaje
      e.stopPropagation();
    };

    // Agregar listener con un pequeño delay para evitar que se cierre inmediatamente
    const timeoutId = setTimeout(() => {
      document.addEventListener("click", handleClick, true); // Usar capture phase
    }, 500); // Delay de 500ms para que no se cierre inmediatamente

    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener("click", handleClick, true);
      if (welcomeTimeoutRef.current) {
        clearTimeout(welcomeTimeoutRef.current);
        welcomeTimeoutRef.current = null;
      }
    };
  }, [showWelcomeOverlay]);

  // Sincronizar refs con el estado
  useEffect(() => {
    scaleRef.current = scale;
  }, [scale]);

  useEffect(() => {
    positionRef.current = position;
  }, [position]);

  useEffect(() => {
    const handleImageLoad = () => {
      setImageLoaded(true);
      const newScale = calculateInitialScale();
      setInitialScale(newScale);
      setScale(newScale);
      scaleRef.current = newScale;
      positionRef.current = { x: 0, y: 0 };
      setPosition({ x: 0, y: 0 });
      // Marcar como listo después de un pequeño delay para asegurar que el layout esté completo
      setTimeout(() => {
        setIsReady(true);
      }, 100);
    };

    // Resetear estado de carga cuando cambia la maqueta
    setImageLoaded(false);

    // Resetear cuando cambia la maqueta
    if (imageRef.current?.complete) {
      handleImageLoad();
    } else {
      imageRef.current?.addEventListener("load", handleImageLoad);
      imageRef.current?.addEventListener("error", () => {
        setImageLoaded(true); // Mostrar incluso si hay error
      });
    }

    return () => {
      imageRef.current?.removeEventListener("load", handleImageLoad);
      imageRef.current?.removeEventListener("error", () => { });
    };
  }, [activeMaqueta]);

  useEffect(() => {
    const handleResize = () => {
      const newScale = calculateInitialScale();
      setInitialScale(newScale);
      if (scale === initialScale) {
        setScale(newScale);
      }
    };

    // --- MODIFICACIÓN: Listener Global ---
    // Prevenir zoom de página con touchpad/rueda SOLO cuando se usa Shift
    const handleWheelPrevent = (e: WheelEvent) => {
      if (
        containerRef.current &&
        containerRef.current.contains(e.target as Node)
      ) {
        // Solo prevenimos si es Shift (para el zoom)
        // O si es Ctrl (para no romper pellizco de trackpad)
        if (e.shiftKey || e.ctrlKey) {
          e.preventDefault();
        }
      }
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("wheel", handleWheelPrevent, { passive: false });

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("wheel", handleWheelPrevent);
      if (zoomTimeoutRef.current) {
        clearTimeout(zoomTimeoutRef.current);
      }
      if (tooltipTimeoutRef.current) {
        clearTimeout(tooltipTimeoutRef.current);
      }
      if (welcomeTimeoutRef.current) {
        clearTimeout(welcomeTimeoutRef.current);
      }
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [scale, initialScale]);

  return (
    <div
      className="min-h-screen bg-white"
      style={{
        paddingTop: "10px",
        paddingBottom: "10px",
        overscrollBehavior: "none"
      }}
    >
      <Navigation />

      {/* Card con mapa interactivo */}
      <div
        className="mx-auto bg-white rounded-lg shadow-lg overflow-hidden"
        style={{
          width: "95%",
          maxWidth: "1400px",
          marginTop: "10px",
          marginBottom: "10px",
          marginLeft: "auto",
          marginRight: "auto",
          display: "block",
          minHeight: window.innerWidth < 768 ? "50vh" : "70vh",
        }}
      >
        <div
          ref={containerRef}
          className="relative overflow-hidden bg-gray-100"
          style={{
            height: window.innerWidth < 768 ? "50vh" : "70vh",
            maxHeight: window.innerWidth < 768 ? "500px" : "800px",
            minHeight: window.innerWidth < 768 ? "250px" : "400px",
            cursor: isDragging ? "grabbing" : "grab",
            touchAction: "pan-y pinch-zoom", // Permitir scroll vertical y pinch zoom
            willChange: "auto",
            backfaceVisibility: "hidden",
          }}
          onWheel={handleWheel}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={(e) => handleMouseUp(e)}
          onMouseLeave={() => {
            setIsDragging(false);
            setHasMoved(false);
          }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Flecha izquierda */}
          <button
            onClick={() =>
              changeMaqueta(activeMaqueta === "salon" ? "nutritiva" : "salon")
            }
            className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white/95 text-gray-600 hover:text-[#B018A9] rounded-full p-2 md:p-2.5 shadow-md transition-all duration-200 hover:scale-105"
            aria-label="Anterior"
          >
            <svg
              className="w-5 h-5 md:w-6 md:h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          {/* Flecha derecha */}
          <button
            onClick={() =>
              changeMaqueta(activeMaqueta === "salon" ? "nutritiva" : "salon")
            }
            className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white/95 text-gray-600 hover:text-[#B018A9] rounded-full p-2 md:p-2.5 shadow-md transition-all duration-200 hover:scale-105"
            aria-label="Siguiente"
          >
            <svg
              className="w-5 h-5 md:w-6 md:h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          {/* Animación de título al cambiar de maqueta */}
          {showTitleAnimation && (
            <div
              className="absolute top-0 left-0 right-0 z-50 flex items-center justify-center pt-6 md:pt-8 pointer-events-none"
              style={{ fontFamily: "'Gotham', sans-serif" }}
            >
              <h2
                className="text-2xl md:text-3xl lg:text-4xl font-bold text-center animate-slide-down-up"
                style={{
                  fontFamily: "'Anton', sans-serif",
                  letterSpacing: "2px",
                  color: "#54F6C5",
                  textShadow: "0 2px 8px rgba(0,0,0,0.5)",
                }}
              >
                {maquetas[activeMaqueta].name}
              </h2>
            </div>
          )}

          <div
            ref={imageTransformRef}
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: `translate(calc(-50% + ${position.x}px), calc(-50% + ${position.y}px)) scale(${scale})`,
              transition: "none",
              willChange: "transform",
              backfaceVisibility: "hidden",
              perspective: 1000,
              transformOrigin: "center center",
            }}
          >
            {/* Spinner de carga */}
            {!imageLoaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-200 z-30">
                <div className="flex flex-col items-center gap-4">
                  <div className="w-12 h-12 border-4 border-[#B018A9] border-t-transparent rounded-full animate-spin"></div>
                  <p
                    className="text-gray-600 text-sm"
                    style={{ fontFamily: "'Gotham', sans-serif" }}
                  >
                    Cargando...
                  </p>
                </div>
              </div>
            )}

            <img
              ref={imageRef}
              src={maquetas[activeMaqueta].image}
              alt={maquetas[activeMaqueta].name}
              className="max-w-none transition-opacity duration-300"
              style={{
                display: "block",
                userSelect: "none",
                pointerEvents: "none",
                opacity: imageLoaded ? 1 : 0,
              }}
              draggable={false}
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageLoaded(true)} // En caso de error, también ocultar el spinner
            />
          </div>

          {/* Tooltip de información de Stands */}
          {showTooltip && (
            <div
              className="absolute z-50 tooltip-container"
              style={{
                left: `${tooltipPosition.x}px`,
                top: `${tooltipPosition.y - 60}px`,
                transform: "translateX(-50%)",
                fontFamily: "'Gotham', sans-serif",
              }}
            >
              <div className="bg-white rounded-md shadow-lg border border-gray-200 px-3 py-2 animate-fade-in pointer-events-auto">
                <button
                  onClick={() => {
                    setShowTooltip(false);
                    if (tooltipTimeoutRef.current) {
                      clearTimeout(tooltipTimeoutRef.current);
                    }
                    navigate("/stand");
                  }}
                  className="text-sm text-[#B018A9] font-medium hover:text-[#54F6C5] transition-colors whitespace-nowrap"
                >
                  Ver Info de Stands →
                </button>
                {/* Flecha apuntando hacia abajo */}
                <div
                  className="absolute left-1/2 bottom-0 transform -translate-x-1/2 translate-y-full"
                  style={{
                    width: 0,
                    height: 0,
                    borderLeft: "6px solid transparent",
                    borderRight: "6px solid transparent",
                    borderTop: "6px solid white",
                    filter: "drop-shadow(0 2px 2px rgba(0,0,0,0.1))",
                  }}
                />
              </div>
            </div>
          )}

          {/* Controles de zoom */}
          <div className="absolute top-4 right-4 z-10 flex flex-row gap-2 zoom-controls">
            <button
              onClick={() => {
                const newScale = Math.min(scaleRef.current + 0.2, 5);
                scaleRef.current = newScale;
                setScale(newScale);
              }}
              className="bg-white hover:bg-gray-50 text-gray-700 hover:text-gray-900 px-3 py-2 rounded-lg shadow-lg border border-gray-200 transition-all duration-300 hover:scale-105 font-medium text-sm"
              style={{ fontFamily: "'Gotham', sans-serif" }}
            >
              +
            </button>
            <button
              onClick={() => {
                const newScale = Math.max(scaleRef.current - 0.2, 0.05);
                scaleRef.current = newScale;
                setScale(newScale);
              }}
              className="bg-white hover:bg-gray-50 text-gray-700 hover:text-gray-900 px-3 py-2 rounded-lg shadow-lg border border-gray-200 transition-all duration-300 hover:scale-105 font-medium text-sm"
              style={{ fontFamily: "'Gotham', sans-serif" }}
            >
              −
            </button>
            <button
              onClick={resetView}
              className="bg-white hover:bg-gray-50 text-gray-700 hover:text-gray-900 px-3 py-2 rounded-lg shadow-lg border border-gray-200 transition-all duration-300 hover:scale-105 font-medium text-xs"
              style={{ fontFamily: "'Gotham', sans-serif" }}
            >
              Reset
            </button>
          </div>
        </div>
      </div>

      {/* Card separado con texto Salón Warmi Challenge */}
      <div
        className="mx-auto bg-white"
        style={{
          width: "95%",
          maxWidth: "1400px",
          marginTop: "20px",
          marginBottom: "20px",
          marginLeft: "auto",
          marginRight: "auto",
          display: "block",
        }}
      >
        <div className="flex justify-center px-6 md:px-12 py-8 md:py-12">
          {/* Contenedor de texto centrado */}
          <div className="max-w-3xl w-full">
            {/* Título */}
            <h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold uppercase text-center"
              style={{
                fontFamily: "'Anton', sans-serif",
                color: "#B018A9",
                letterSpacing: "2px",
                lineHeight: "1.2",
                marginBottom: "40px",
              }}
            >
              SALÓN W<span style={{ color: "#54F6C5" }}>A</span>RMI CH
              <span style={{ color: "#54F6C5" }}>A</span>LLENGE
            </h2>

            {/* Párrafos */}
            <div className="space-y-6 md:space-y-8">
              <p
                className="text-base md:text-lg text-[#B018A9] leading-relaxed"
                style={{
                  fontFamily: "'Gotham', sans-serif",
                  color: "#000000ff",
                  textAlign: "justify",
                  fontSize: window.innerWidth < 768 ? "16px" : "25px",
                  marginBottom: "10px",
                }}
              >
                El Salón Warmi Challenge es el corazón del WPF: el punto donde
                más de 15 mil mujeres se empoderan del bienestar, la salud, la
                nutrición, el deporte y el emprendimiento.
              </p>

              <p
                className="text-base md:text-lg text-[#B018A9] leading-relaxed"
                style={{
                  fontFamily: "'Gotham', sans-serif",
                  color: "#000000ff",
                  textAlign: "justify",
                  fontSize: window.innerWidth < 768 ? "16px" : "25px",
                  marginBottom: "10px",
                }}
              >
                Aquí, tu marca conecta directamente con una audiencia activa.
              </p>

              <p
                className="text-base md:text-lg text-[#B018A9] leading-relaxed"
                style={{
                  fontFamily: "'Gotham', sans-serif",
                  color: "#000000ff",
                  textAlign: "justify",
                  fontSize: window.innerWidth < 768 ? "16px" : "25px",
                  marginBottom: "10px",
                }}
              >
                Este espacio acogerá el Warmi Challenge, una experiencia
                interactiva con retos físicos, mentales y emocionales que
                garantiza alta interacción, tráfico constante y contenido viral.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Mapa;
