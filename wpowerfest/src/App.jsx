import Header from './components/Header';
import HeroCarousel from './components/HeroCarousel';
import ImageSection from './components/ImageSection';
import ScrollProgress from './components/ScrollProgress';
import ScrollToTop from './components/ScrollToTop';
import SectionDivider from './components/SectionDivider';
import FloatingShapes from './components/FloatingShapes';
import WhatsAppButton from './components/WhatsAppButton';
import './App.css';

function App() {
  // Array con las rutas de las imágenes de la página 2 a la 13
  const imagePages = [
    '/images/Warmi Power Fest Web Final_compressed_page-0002.jpg',
    '/images/Warmi Power Fest Web Final_compressed_page-0003.jpg',
    '/images/Warmi Power Fest Web Final_compressed_page-0004.jpg',
    '/images/Warmi Power Fest Web Final_compressed_page-0005.jpg',
    '/images/Warmi Power Fest Web Final_compressed_page-0006.jpg',
    '/images/Warmi Power Fest Web Final_compressed_page-0007.jpg',
    '/images/Warmi Power Fest Web Final_compressed_page-0008.jpg',
    '/images/Warmi Power Fest Web Final_compressed_page-0009.jpg',
    '/images/Warmi Power Fest Web Final_compressed_page-0010.jpg',
    '/images/Warmi Power Fest Web Final_compressed_page-0011.jpg',
    '/images/Warmi Power Fest Web Final_compressed_page-0012.jpg',
    '/images/Warmi Power Fest Web Final_compressed_page-0013.jpg',
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50 overflow-x-hidden relative">
      {/* Elementos decorativos de fondo y formas flotantes */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-[#AB00A4]/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-[#58F5C8]/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>
      <FloatingShapes />

      <ScrollProgress />
      <Header />
      <ScrollToTop />
      <WhatsAppButton />
      
      <main className="w-full overflow-x-hidden relative z-10">
        {/* Sección Hero/Carrusel - No necesita ID, el botón Inicio lleva al top */}
        <section style={{ paddingTop: '100px' }}>
          <HeroCarousel />
        </section>
        
        <SectionDivider />
        
        {/* Sección Warmi Passport */}
        <section id="warmi-passport" className="relative">
          <ImageSection
            imageSrc={imagePages[0]}
            index={1}
          />
        </section>
        
        <SectionDivider />
        
        {/* Sección Warmi Impacto */}
        <section id="warmi-impacto" className="relative">
          <ImageSection
            imageSrc={imagePages[1]}
            index={2}
          />
        </section>
        
        <SectionDivider />
        
        {/* Sección Zona Stands */}
        <section id="zona-stands" className="relative">
          <ImageSection
            imageSrc={imagePages[2]}
            index={3}
          />
        </section>
        
        {/* Otras secciones con IDs */}
        {imagePages.slice(3, imagePages.length - 2).map((imagePath, index) => (
          <div key={index + 3}>
            <SectionDivider />
            <section id={`section-${index + 5}`} className="relative">
              <ImageSection
                imageSrc={imagePath}
                index={index + 4}
              />
            </section>
          </div>
        ))}
        
        <SectionDivider />
        
        {/* Sección Contacto (Footer) - Últimas dos imágenes con WhatsApp */}
        <section id="contacto" className="relative">
          <ImageSection
            imageSrc={imagePages[imagePages.length - 2]}
            index={imagePages.length - 1}
            whatsappUrl="https://wa.me/message/6VRABHAF55GXA1"
          />
        </section>
        
        <SectionDivider />
        
        <section className="relative">
          <ImageSection
            imageSrc={imagePages[imagePages.length - 1]}
            index={imagePages.length}
            whatsappUrl="https://wa.me/message/6VRABHAF55GXA1"
          />
        </section>
      </main>
    </div>
  );
}

export default App;

