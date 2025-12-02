import { motion } from 'framer-motion';

const ImageSection = ({ imageSrc, index, whatsappUrl }) => {
  const handleClick = () => {
    if (whatsappUrl) {
      window.open(whatsappUrl, '_blank');
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`w-full overflow-hidden relative ${whatsappUrl ? 'cursor-pointer' : ''}`}
      onClick={handleClick}
    >
      {/* Efectos visuales decorativos */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Formas flotantes animadas */}
        <motion.div
          className="absolute top-10 left-10 w-20 h-20 bg-gradient-to-br from-[#AB00A4]/20 to-[#58F5C8]/20 rounded-full blur-xl"
          animate={{
            y: [0, -20, 0],
            x: [0, 10, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-32 h-32 bg-gradient-to-br from-[#58F5C8]/15 to-[#AB00A4]/15 rounded-full blur-2xl"
          animate={{
            y: [0, 15, 0],
            x: [0, -10, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 0.5,
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/4 w-16 h-16 bg-gradient-to-br from-[#AB00A4]/10 to-transparent rounded-lg blur-lg rotate-45"
          animate={{
            rotate: [45, 90, 45],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1,
          }}
        />
      </div>
      
      <div className="w-full h-auto overflow-hidden relative z-10 group">
        <motion.img
          src={imageSrc}
          alt={`Page ${index + 1}`}
          className="w-full h-auto object-contain transition-all duration-300 hover:shadow-2xl"
          style={{
            maxWidth: '100%',
            width: '100%',
            height: 'auto',
            display: 'block',
          }}
          whileHover={{ scale: whatsappUrl ? 1.02 : 1.01 }}
          loading="lazy"
        />
        {/* Overlay para imágenes con WhatsApp */}
        {whatsappUrl && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center pb-20 pointer-events-none">
            <div className="text-center text-white">
              <p className="text-xl sm:text-2xl font-bold mb-2">Haz clic para contactarnos</p>
              <div className="w-16 h-1 bg-gradient-to-r from-[#25D366] to-[#20BA5A] mx-auto rounded-full" />
            </div>
          </div>
        )}
      </div>
    </motion.section>
  );
};

export default ImageSection;

