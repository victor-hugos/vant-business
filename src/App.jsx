import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import ScrollToTop from './components/ScrollToTop.jsx';
import HomePage from './pages/HomePage.jsx';
import SobrePage from './pages/SobrePage.jsx';
import RecursosPage from './pages/RecursosPage.jsx';
import AutomatizePage from './pages/AutomatizePage.jsx';
import EbookPage from './pages/EbookPage.jsx';
import AdminPublishingPage from './pages/AdminPublishingPage.jsx';

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen text-[#f0f0f0] antialiased">
        <Header />
        <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/sobre" element={<SobrePage />} />
            <Route path="/recursos" element={<RecursosPage />} />
            <Route path="/solucoes-digitais" element={<AutomatizePage />} />
            <Route path="/automatize" element={<AutomatizePage />} />
            <Route path="/ebook/:slug" element={<EbookPage />} />
            <Route path="/admin-vant" element={<AdminPublishingPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
