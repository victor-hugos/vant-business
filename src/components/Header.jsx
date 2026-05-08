import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

const navItems = [
  { label: 'Blog', to: '/blog' },
  { label: 'Ferramentas IA', to: '/recursos' },
  { label: 'Automatize', to: '/automatize' },
  { label: 'Portfolio', to: '/' },
];

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function closeMenu() {
    setIsMenuOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0a0a0f]/90 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex min-h-16 items-center justify-between gap-4 py-3">
          <Link
            to="/"
            onClick={closeMenu}
            className="flex flex-col transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300"
          >
            <span className="text-lg font-bold text-white tracking-tight">
              VANT<span className="text-cyan-400">.business</span>
            </span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-slate-400">
              IA · Automação · Ferramentas
            </span>
          </Link>

          <nav className="hidden items-center gap-1 text-sm text-slate-300 md:flex">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                onClick={closeMenu}
                className={({ isActive }) =>
                  `rounded-full border px-4 py-2 transition text-sm font-medium ${
                    isActive
                      ? 'border-cyan-400/40 bg-cyan-400/10 text-cyan-300'
                      : 'border-transparent text-slate-300 hover:border-white/20 hover:bg-white/5 hover:text-white'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <button
            type="button"
            aria-controls="mobile-menu"
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((v) => !v)}
            className="inline-flex rounded-full border border-white/15 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:border-cyan-300/40 hover:bg-cyan-300/10 md:hidden"
          >
            {isMenuOpen ? 'Fechar' : 'Menu'}
          </button>
        </div>

        {isMenuOpen && (
          <nav
            id="mobile-menu"
            className="grid gap-2 border-t border-white/10 py-3 text-sm text-slate-200 md:hidden"
          >
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                onClick={closeMenu}
                className={({ isActive }) =>
                  `rounded-xl border px-4 py-3 transition ${
                    isActive
                      ? 'border-cyan-400/40 bg-cyan-400/10 text-cyan-300'
                      : 'border-white/10 bg-slate-900/80 hover:border-cyan-300/40 hover:bg-cyan-300/10'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}

export default Header;
