import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination, EffectFade } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

const HeroCarousel = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  // Todas las imágenes del carrusel con sus secciones de destino
  const slides = [
    { 
      image: '/images/Warmi Power Fest Web Final_compressed_page-0001.jpg', 
      sectionId: null // Primera imagen, no tiene sección específica
    },
    { 
      image: '/images/Warmi Power Fest Web Final_compressed_page-0002.jpg', 
      sectionId: 'warmi-passport' 
    },
    { 
      image: '/images/Warmi Power Fest Web Final_compressed_page-0003.jpg', 
      sectionId: 'warmi-impacto' 
    },
    { 
      image: '/images/Warmi Power Fest Web Final_compressed_page-0004.jpg', 
      sectionId: 'zona-stands' 
    },
    { 
      image: '/images/Warmi Power Fest Web Final_compressed_page-0005.jpg', 
      sectionId: 'section-5' 
    },
    { 
      image: '/images/Warmi Power Fest Web Final_compressed_page-0006.jpg', 
      sectionId: 'section-6' 
    },
    { 
      image: '/images/Warmi Power Fest Web Final_compressed_page-0007.jpg', 
      sectionId: 'section-7' 
    },
    { 
      image: '/images/Warmi Power Fest Web Final_compressed_page-0008.jpg', 
      sectionId: 'section-8' 
    },
    { 
      image: '/images/Warmi Power Fest Web Final_compressed_page-0009.jpg', 
      sectionId: 'section-9' 
    },
    { 
      image: '/images/Warmi Power Fest Web Final_compressed_page-0010.jpg', 
      sectionId: 'section-10' 
    },
    { 
      image: '/images/Warmi Power Fest Web Final_compressed_page-0011.jpg', 
      sectionId: 'section-11' 
    },
    { 
      image: '/images/Warmi Power Fest Web Final_compressed_page-0012.jpg', 
      sectionId: null,
      whatsappUrl: 'https://wa.me/message/6VRABHAF55GXA1'
    },
    { 
      image: '/images/Warmi Power Fest Web Final_compressed_page-0013.jpg', 
      sectionId: null,
      whatsappUrl: 'https://wa.me/message/6VRABHAF55GXA1'
    },
  ];

  const handleImageClick = (slide) => {
    // Si tiene WhatsApp URL, redirigir a WhatsApp
    if (slide.whatsappUrl) {
      window.open(slide.whatsappUrl, '_blank');
      return;
    }
    
    // Si tiene sectionId, hacer scroll a esa sección
    if (slide.sectionId) {
      const element = document.getElementById(slide.sectionId);
      if (element) {
        const headerOffset = 100;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    } else {
      // Si no tiene sectionId, scroll al top
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="w-full relative overflow-hidden" style={{ height: 'calc(100vh - 100px)', minHeight: 'calc(100vh - 100px)' }}>
      <Swiper
        modules={[Autoplay, Navigation, Pagination, EffectFade]}
        effect={isMobile ? 'slide' : 'fade'}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        navigation={!isMobile}
        pagination={{
          clickable: true,
          dynamicBullets: true,
          type: isMobile ? 'bullets' : 'bullets',
        }}
        loop={slides.length > 1}
        slidesPerView={isMobile ? 1 : 1}
        spaceBetween={isMobile ? 0 : 0}
        className="w-full h-full"
        style={{ height: '100%' }}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div 
              className="w-full h-full flex items-center justify-center cursor-pointer relative group bg-gray-100"
              onClick={() => handleImageClick(slide)}
              style={{ width: '100%', height: '100%' }}
            >
              <img
                src={slide.image}
                alt={`Slide ${index + 1}`}
                className={`w-full h-full transition-transform duration-500 ${isMobile ? 'object-cover' : 'object-contain'}`}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: isMobile ? 'cover' : 'contain',
                  objectPosition: 'center',
                  maxWidth: '100%',
                  maxHeight: '100%'
                }}
                loading={index === 0 ? "eager" : "lazy"}
              />
              {/* Overlay informativo */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center pb-20 pointer-events-none">
                <div className="text-center text-white">
                  <p className="text-xl sm:text-2xl font-bold mb-2">
                    {slide.whatsappUrl ? 'Haz clic para contactarnos' : 'Haz clic para explorar'}
                  </p>
                  <div className="w-16 h-1 bg-gradient-to-r from-[#AB00A4] to-[#58F5C8] mx-auto rounded-full" />
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroCarousel;

