import React from 'react';
import { useLocation } from 'react-router-dom';

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const location = useLocation();
  const isAdminPage = location.pathname === '/admin';

  return (
    <div className="relative min-h-screen">
      {/* Logos solo si NO es página de admin */}
      {!isAdminPage && (
        <>
          {/* Header con logos - Desktop */}
          <div className="hidden md:flex absolute top-0 left-0 right-0 justify-between items-start px-8 py-20 bg-gradient-to-b from-gray-900/80 to-transparent z-30 pointer-events-none">
            <img 
              src="/escaperoom/img/michimoney.jfif" 
              alt="MichiMoney" 
              className="w-50 lg:w-56 xl:w-64 opacity-70 rounded-full"
            />
            <img 
              src="/escaperoom/img/movilis.png" 
              alt="Movilis" 
              className="w-32 lg:w-40 xl:w-48 opacity-70 rounded-3xl -mt-12"
            />
            <img 
              src="/escaperoom/img/krake.png" 
              alt="KrakeDev" 
              className="w-50 lg:w-56 xl:w-64 opacity-70 rounded-full"
            />
          </div>
          

          {/* Logos responsive - Mobile (todos arriba) */}
          <div className="md:hidden absolute top-0 left-0 right-0 flex items-center justify-center gap-4 py-3 bg-gradient-to-b from-gray-900/90 to-transparent z-30 pointer-events-none">
            <img 
              src="/escaperoom/img/michimoney.jfif" 
              alt="MichiMoney" 
              className="w-14 opacity-60 rounded-lg"
            />
            <img 
              src="/escaperoom/img/krake.png" 
              alt="KrakeDev" 
              className="w-14 opacity-60"
            />
            <img 
              src="/escaperoom/img/movilis.png" 
              alt="Movilis" 
              className="w-20 opacity-40"
            />
          </div>
        </>
      )}

      {/* Contenido principal */}
      <div className={`relative z-20 ${!isAdminPage ? 'pt-32 md:pt-48' : ''}`}>
        {children}
      </div>
    </div>
  );
};
