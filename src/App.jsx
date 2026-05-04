import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import RecruiterMode from './components/RecruiterMode.jsx';
import ProjectsSection from './components/ProjectsSection.jsx';
import SkillsSection from './components/SkillsSection.jsx';
import ResumeSection from './components/ResumeSection.jsx';
import ContactSection from './components/ContactSection.jsx';
import Footer from './components/Footer.jsx';

function App() {
  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,rgba(2,6,23,0.96)_0%,rgba(15,23,42,0.78)_48%,rgba(2,6,23,1)_100%)] text-slate-100 antialiased">
      <Header />

      <main className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-8 sm:gap-10 sm:px-6 sm:py-10 lg:px-8">
        <Hero />
        <RecruiterMode />
        <ProjectsSection />
        <SkillsSection />
        <ResumeSection />
        <ContactSection />
      </main>

      <Footer />
    </div>
  );
}

export default App;
