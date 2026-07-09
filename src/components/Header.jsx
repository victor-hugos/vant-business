import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import VantLogo from './VantLogo.jsx';

const navItems = [
  { label: 'Início', to: '/' },
  { label: 'Soluções', to: '/solucoes' },
  { label: 'Cases', to: '/cases' },
  { label: 'Diagnóstico', to: '/diagnostico' },
];

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function closeMenu() {
    setIsMenuOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/95 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex min-h-[58px] items-center justify-between gap-4 py-2">
          <Link
            to="/"
            onClick={closeMenu}
            className="flex items-center gap-3 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            <VantLogo size={46} />
            <div className="flex flex-col">
              <span className="brand-title text-xs font-bold leading-none text-white sm:text-sm">
                VANT.BUSINESS
              </span>
              <span className="mt-1 hidden text-[9px] uppercase tracking-[0.2em] text-[var(--vant-accent)] sm:block">
                Estruture . Organize . Conecte.
              </span>
            </div>
          </Link>

          <nav className="hidden items-center gap-1 text-[10px] uppercase tracking-[0.14em] text-[#a6a6a6] lg:flex">
            {navItems.map((item) => (
              item.to ? (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === '/'}
                  onClick={closeMenu}
                  className={({ isActive }) =>
                    `border-b px-3 py-2 transition font-semibold ${
                      isActive
                        ? 'border-white text-white'
                        : 'border-transparent hover:border-white/35 hover:text-white'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ) : (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={closeMenu}
                  className="border-b border-transparent px-3 py-2 font-semibold transition hover:border-white/35 hover:text-white"
                >
                  {item.label}
                </a>
              )
            ))}
          </nav>

          <Link
            to="/diagnostico#briefing-form"
            className="brand-button-secondary !hidden px-5 py-2 text-[11px] lg:!inline-flex"
          >
            Falar sobre seu projeto ›
          </Link>

          <button
            type="button"
            aria-controls="mobile-menu"
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((v) => !v)}
            className="inline-flex border border-white/20 px-4 py-2 text-sm font-semibold text-white transition hover:border-white/45 hover:bg-white/[0.06] lg:hidden"
          >
            {isMenuOpen ? 'Fechar' : 'Menu'}
          </button>
        </div>

        {isMenuOpen && (
          <nav
            id="mobile-menu"
            className="grid gap-2 border-t border-white/10 py-3 text-sm text-[#c9c9c9] lg:hidden"
          >
            {navItems.map((item) => (
              item.to ? (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === '/'}
                  onClick={closeMenu}
                  className={({ isActive }) =>
                    `border px-4 py-3 transition ${
                      isActive
                        ? 'border-white/45 bg-white/[0.06] text-white'
                        : 'border-white/10 bg-black/80 hover:border-white/25 hover:bg-white/[0.04]'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ) : (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={closeMenu}
                  className="border border-white/10 bg-black/80 px-4 py-3 transition hover:border-white/25 hover:bg-white/[0.04]"
                >
                  {item.label}
                </a>
              )
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}

export default Header;
