import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function ScrollToTop() {
    const [isVisible, setIsVisible] = useState(false);
    const location = useLocation();

    // Mostrar el botón cuando el usuario hace scroll hacia abajo
    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);

        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        };
    }, []);

    // No mostrar en la página de inicio
    if (location.pathname === '/') {
        return null;
    }

    // Función para hacer scroll hacia arriba
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <>
            {isVisible && (
                <button
                    onClick={scrollToTop}
                    className="fixed bottom-6 md:bottom-36 left-8 z-[110] group overflow-hidden"
                    aria-label="Volver arriba"
                    style={{
                        animation: 'fadeInUp 0.3s ease-out',
                        borderRadius: '100%',
                        border: 'none',
                        outline: 'none',
                        boxShadow: 'none',
                        background: 'transparent !important',
                        backgroundColor: 'transparent !important',
                        padding: '0',
                        margin: '0'
                    }}
                >
                    <div
                        className="relative w-9 h-9 md:w-16 md:h-16 flex items-center justify-center rounded-full bg-gradient-to-br from-[#B018A9] to-[#54F6C5]"
                        style={{
                            borderRadius: '100%',
                            border: 'none'
                        }}
                    >
                        {/* Icono de flecha */}
                        <svg
                            className="w-5 h-5 md:w-7 md:h-7 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            strokeWidth={2.5}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M5 10l7-7m0 0l7 7m-7-7v18"
                            />
                        </svg>
                    </div>
                </button>
            )}

            <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
        </>
    );
}

export default ScrollToTop;
