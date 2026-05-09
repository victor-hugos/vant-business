import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import HomePage from './pages/HomePage.jsx';
import BlogPage from './pages/BlogPage.jsx';
import BlogPostPage from './pages/BlogPostPage.jsx';
import RecursosPage from './pages/RecursosPage.jsx';
import AutomatizePage from './pages/AutomatizePage.jsx';
import EbookPage from './pages/EbookPage.jsx';
import AdminPage from './pages/AdminPage.jsx';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#0a0a0f] text-slate-100 antialiased">
        <Header />
        <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:slug" element={<BlogPostPage />} />
            <Route path="/recursos" element={<RecursosPage />} />
            <Route path="/automatize" element={<AutomatizePage />} />
            <Route path="/ebook/:slug" element={<EbookPage />} />
            <Route path="/admin-vant" element={<AdminPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
