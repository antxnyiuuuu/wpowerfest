function Footer() {
    return (
        <footer
            className="w-full bg-white border-t border-gray-100"
            style={{
                marginTop: '40px',
                paddingTop: '20px'
            }}
        >
            {/* Contenedor centrado */}
            <div className="relative z-10 py-8 md:py-10">
                <div className="flex flex-col items-center justify-center gap-4 md:gap-5 px-6">

                    {/* Texto "Organizado por:" */}
                    <p
                        className="text-gray-500 text-xs md:text-sm font-light tracking-widest uppercase text-center mb-2"
                        style={{
                            fontFamily: "'Gotham', sans-serif",
                            letterSpacing: '2px'
                        }}
                    >
                        Organizado por:
                    </p>

                    {/* Logo Buró con efecto premium */}
                    <div className="group relative">
                        {/* Glow effect detrás del logo */}
                        <div className="absolute inset-0 bg-gradient-to-r from-[#B018A9]/20 to-[#54F6C5]/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <img
                            src="/images/Buró-Logo.png"
                            alt="Buró Logo"
                            className="h-14 md:h-20 object-contain relative z-10 transform group-hover:scale-105 transition-all duration-300"
                            style={{
                                filter: 'drop-shadow(0 4px 12px rgba(0, 0, 0, 0.08))'
                            }}
                        />
                    </div>

                    {/* Línea decorativa */}
                    <div className="flex items-center justify-center gap-3">
                        <div className="h-px w-12 md:w-16 bg-gradient-to-r from-transparent via-[#B018A9]/30 to-transparent"></div>
                        <div className="w-2 h-2 rounded-full bg-[#B018A9]/40"></div>
                        <div className="h-px w-12 md:w-16 bg-gradient-to-r from-transparent via-[#54F6C5]/30 to-transparent"></div>
                    </div>

                    {/* Copyright con estilo mejorado */}
                    <div className="flex flex-col items-center justify-center gap-1">
                        <p
                            className="text-gray-600 text-sm md:text-base font-light tracking-wide text-center"
                            style={{ fontFamily: "'Gotham', sans-serif" }}
                        >
                            © {new Date().getFullYear()} <span className="font-medium text-[#B018A9]">Warmi Power Fest</span>
                        </p>
                        <p className="text-gray-400 text-xs md:text-sm font-light text-center">
                            Todos los derechos reservados
                        </p>
                    </div>

                    {/* Redes sociales con efectos premium - CON ESPACIO INFERIOR FORZADO */}
                    <div
                        className="flex items-center justify-center gap-5 md:gap-6"
                        style={{
                            paddingBottom: '2.5rem',
                            marginBottom: '1rem'
                        }}
                    >
                        <a
                            href="https://www.facebook.com/share/1QTkj16eR5/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group relative"
                            aria-label="Facebook"
                        >
                            <div className="absolute inset-0 bg-[#B018A9]/10 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <div className="relative w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-full bg-white border border-gray-200 text-gray-600 hover:text-white hover:bg-[#B018A9] hover:border-[#B018A9] shadow-sm hover:shadow-lg transform hover:scale-110 hover:-translate-y-1 transition-all duration-300">
                                <svg
                                    className="w-5 h-5 md:w-6 md:h-6"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                </svg>
                            </div>
                        </a>

                        <a
                            href="https://www.instagram.com/warmipowerfest?utm_source=qr&igsh=c2phN2VxYmFkcGpk"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group relative"
                            aria-label="Instagram"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-[#B018A9]/10 to-[#54F6C5]/10 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <div className="relative w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-full bg-white border border-gray-200 text-gray-600 hover:text-white hover:bg-gradient-to-br hover:from-[#B018A9] hover:to-[#54F6C5] hover:border-transparent shadow-sm hover:shadow-lg transform hover:scale-110 hover:-translate-y-1 transition-all duration-300">
                                <svg
                                    className="w-5 h-5 md:w-6 md:h-6"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                </svg>
                            </div>
                        </a>

                        <a
                            href="https://www.tiktok.com/@warmipowerfest?_r=1&_t=ZM-925NkKxnCoN"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group relative"
                            aria-label="TikTok"
                        >
                            <div className="absolute inset-0 bg-[#54F6C5]/10 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <div className="relative w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-full bg-white border border-gray-200 text-gray-600 hover:text-white hover:bg-[#54F6C5] hover:border-[#54F6C5] shadow-sm hover:shadow-lg transform hover:scale-110 hover:-translate-y-1 transition-all duration-300">
                                <svg
                                    className="w-5 h-5 md:w-6 md:h-6"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                                </svg>
                            </div>
                        </a>
                    </div>

                </div>
            </div>
        </footer>
    );
}

export default Footer;
