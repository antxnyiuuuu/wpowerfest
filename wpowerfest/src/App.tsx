import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Info from "./pages/Info";
import Mapa from "./pages/Mapa";
import Auspiciante from "./pages/Auspiciante";
import WarmiTalks from "./pages/WarmiTalks";
import Pasaporte from "./pages/Pasaporte";
import Premios from "./pages/Premios";
import Stand from "./pages/Stand";
import WS from "./pages/WS";
import RegistroLayout from "./pages/registro/RegistroLayout";
import PageTransition from "./components/PageTransition";
import WhatsAppButton from "./components/WhatsAppButton";
import CountdownTimer from "./components/CountdownTimer";
import PassportButton from "./components/PassportButton";
import ScrollToTop from "./components/ScrollToTop";
import BackButton from "./components/BackButton";

// Importar EscapeRoom
import { EscapeRoomApp } from "./escaperoom/EscapeRoomApp";

// Componente para controlar la visibilidad de los botones globales
function GlobalComponents() {
  const location = useLocation();
  const isEscapeRoom = location.pathname.startsWith('/escaperoom');

  if (isEscapeRoom) {
    return null;
  }

  return (
    <>
      <BackButton />
      <WhatsAppButton />
      <CountdownTimer />
      <PassportButton />
    </>
  );
}

function App() {
  return (
    <div
      style={{ minHeight: "100dvh", backgroundColor: "#ffffff" }}
      className="min-h-screen"
    >
      <BrowserRouter
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/info"
            element={
              <PageTransition>
                <Info />
              </PageTransition>
            }
          />
          <Route
            path="/mapa"
            element={
              <PageTransition>
                <Mapa />
              </PageTransition>
            }
          />
          <Route
            path="/auspiciante"
            element={
              <PageTransition>
                <Auspiciante />
              </PageTransition>
            }
          />
          <Route
            path="/warmi-talks"
            element={
              <PageTransition>
                <WarmiTalks />
              </PageTransition>
            }
          />
          <Route
            path="/pasaporte"
            element={
              <PageTransition>
                <Pasaporte />
              </PageTransition>
            }
          />
          <Route
            path="/premios"
            element={
              <PageTransition>
                <Premios />
              </PageTransition>
            }
          />
          <Route
            path="/stand"
            element={
              <PageTransition>
                <Stand />
              </PageTransition>
            }
          />
          <Route
            path="/ws"
            element={
              <PageTransition>
                <WS />
              </PageTransition>
            }
          />
          <Route
            path="/registro"
            element={
              <PageTransition>
                <RegistroLayout />
              </PageTransition>
            }
          />

          {/* Ruta EscapeRoom */}
          <Route path="/escaperoom/*" element={<EscapeRoomApp />} />
        </Routes>
        <GlobalComponents />
        <ScrollToTop />
      </BrowserRouter>
    </div>
  );
}

export default App;
