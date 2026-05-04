import { useState } from 'react';

const navItems = [
  { label: 'Início', href: '#inicio' },
  { label: 'Modo Recrutador', href: '#modo-recrutador' },
  { label: 'Projetos', href: '#projetos' },
  { label: 'Habilidades', href: '#habilidades' },
  { label: 'Currículo', href: '#curriculo' },
  { label: 'Contato', href: '#contato' },
];

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function closeMenu() {
    setIsMenuOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex min-h-20 items-center justify-between gap-4 py-3">
          <div>
            <a
              href="#inicio"
              onClick={closeMenu}
              className="block text-xl font-semibold text-white transition hover:text-cyan-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300 sm:text-2xl"
            >
              VANT Business
            </a>
            <p className="mt-1 text-xs uppercase tracking-[0.22em] text-cyan-300">
              Portfólio Inteligente
            </p>
          </div>

          <nav className="hidden items-center gap-1 text-sm text-slate-300 md:flex">
            {navItems.map((item) => (
              <a
                key={item.href}
                className="rounded-full border border-transparent px-3 py-2 transition hover:border-cyan-400/30 hover:bg-cyan-400/10 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300"
                href={item.href}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <button
            type="button"
            aria-controls="mobile-menu"
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((current) => !current)}
            className="inline-flex rounded-full border border-white/15 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:border-cyan-300/40 hover:bg-cyan-300/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300 md:hidden"
          >
            Menu
          </button>
        </div>

        {isMenuOpen ? (
          <nav
            id="mobile-menu"
            className="grid gap-2 border-t border-white/10 py-3 text-sm text-slate-200 md:hidden"
          >
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={closeMenu}
                className="rounded-xl border border-white/10 bg-slate-900/80 px-4 py-3 transition hover:border-cyan-300/40 hover:bg-cyan-300/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300"
              >
                {item.label}
              </a>
            ))}
          </nav>
        ) : null}
      </div>
    </header>
  );
}

export default Header;
