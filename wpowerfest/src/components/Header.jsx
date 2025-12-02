import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HiMenu, HiX } from 'react-icons/hi';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleScrollTo = (targetId) => {
    const element = document.getElementById(targetId);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setIsMobileMenuOpen(false);
    }
  };

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    setIsMobileMenuOpen(false);
  };

  const navItems = [
    { label: 'Passport', id: 'warmi-passport' },
    { label: 'Impacto', id: 'warmi-impacto' },
    { label: 'Stands', id: 'zona-stands' },
    { label: 'Contacto', id: 'contacto' },
  ];

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl shadow-lg"
      style={{
        paddingTop: isMobile ? '2px' : '10px',
        paddingBottom: isMobile ? '0px' : '0px',
      }}
    >
      <div className="w-full px-3 sm:px-4 md:px-8 lg:px-12">
        <div className="flex items-center justify-between w-full">
          {/* Logo */}
          <motion.button
            onClick={handleScrollToTop}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="cursor-pointer flex-shrink-0"
          >
            <img
              src="/images/logoheader.jpg"
              alt="WARMI POWER FEST"
              style={{ height: '67px', maxWidth: '210px', marginLeft: '28px' }}
              className="w-auto object-contain"
            />
          </motion.button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8 md:gap-10 lg:gap-12" style={{ marginRight: '20px' }}>
            {navItems.map((item, index) => (
              <motion.a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleScrollTo(item.id);
                }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                whileHover={{ y: -2 }}
                className="relative px-6 py-3 rounded-lg font-semibold text-lg md:text-xl transition-all duration-300 text-gray-700 hover:text-[#AB00A4]"
              >
                {item.label}
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#AB00A4] to-[#58F5C8] rounded-full"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 sm:p-3 rounded-lg transition-colors duration-300 text-gray-700 hover:bg-gray-100 active:bg-gray-200"
            aria-label="Menu"
          >
            {isMobileMenuOpen ? <HiX size={28} className="sm:w-8 sm:h-8" /> : <HiMenu size={28} className="sm:w-8 sm:h-8" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="lg:hidden bg-white/98 backdrop-blur-xl border-t border-gray-200 shadow-xl"
        >
          <nav className="w-full px-4 sm:px-6 py-4 sm:py-6 flex flex-col gap-2 sm:gap-3">
            {navItems.map((item, index) => (
              <motion.a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleScrollTo(item.id);
                }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-gray-800 active:text-[#AB00A4] transition-colors duration-300 py-3 sm:py-4 px-4 rounded-lg active:bg-gradient-to-r active:from-[#AB00A4]/10 active:to-[#58F5C8]/10 font-semibold text-base sm:text-lg touch-manipulation"
              >
                {item.label}
              </motion.a>
            ))}
          </nav>
        </motion.div>
      )}
    </motion.header>
  );
};

export default Header;
