import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

function BackButton() {
    const navigate = useNavigate();
    const location = useLocation();
    const [canGoBack, setCanGoBack] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        // Verificar si hay historial disponible
        const hasHistory = window.history.length > 1;
        setCanGoBack(hasHistory && location.pathname !== "/");
    }, [location]);

    // Detectar cuando el menú móvil está abierto
    useEffect(() => {
        const checkMobileMenu = () => {
            const isOpen = document.body.hasAttribute('data-mobile-menu-open');
            setIsMobileMenuOpen(isOpen);
        };

        // Verificar inicialmente
        checkMobileMenu();

        // Observar cambios en el body
        const observer = new MutationObserver(checkMobileMenu);
        observer.observe(document.body, { attributes: true, attributeFilter: ['data-mobile-menu-open'] });

        return () => observer.disconnect();
    }, []);

    const handleBack = () => {
        if (canGoBack) {
            navigate(-1);
        }
    };

    // No mostrar el botón si el menú móvil está abierto
    if (isMobileMenuOpen) {
        return null;
    }

    return (
        <button
            onClick={handleBack}
            className={`fixed top-20 md:top-32 left-3 z-[60] group transition-all duration-300 ${canGoBack ? "opacity-100" : "opacity-40 cursor-not-allowed"
                }`}
            aria-label="Volver atrás"
            disabled={!canGoBack}
        >
            <div className="relative">
                {/* Glow effect - solo visible cuando está activo */}
                {canGoBack && (
                    <div className="absolute inset-0 bg-gradient-to-r from-[#B018A9] to-[#54F6C5] rounded-full blur-lg opacity-40 group-hover:opacity-60 transition-opacity duration-300"></div>
                )}

                {/* Botón principal */}
                <div
                    className={`relative w-9 h-9 md:w-14 md:h-14 rounded-full flex items-center justify-center shadow-md transition-all duration-300 backdrop-blur-sm ${canGoBack
                        ? "bg-gradient-to-r from-[#B018A9]/70 to-[#8B1A8F]/70 group-hover:scale-110 group-hover:from-[#B018A9]/90 group-hover:to-[#8B1A8F]/90"
                        : "bg-gray-400/50"
                        }`}
                >
                    <svg
                        className="w-4 h-4 md:w-7 md:h-7 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        strokeWidth={2.5}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M10 19l-7-7m0 0l7-7m-7 7h18"
                        />
                    </svg>
                </div>
            </div>
        </button>
    );
}

export default BackButton;
