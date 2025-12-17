import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import PageTransition from "./components/PageTransition";
import WhatsAppButton from "./components/WhatsAppButton";
import CountdownTimer from "./components/CountdownTimer";
import PassportButton from "./components/PassportButton";
import ScrollToTop from "./components/ScrollToTop";
import BackButton from "./components/BackButton";

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
        </Routes>
        <BackButton />
        <WhatsAppButton />
        <CountdownTimer />
        <PassportButton />
        <ScrollToTop />
      </BrowserRouter>
    </div>
  );
}

export default App;
