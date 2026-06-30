import { Link } from 'react-router-dom';
import VantLogo from './VantLogo.jsx';

function Footer() {
  return (
    <footer className="border-t border-white/10 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl grid gap-8 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-3">
            <VantLogo size={40} />
            <div>
              <p className="brand-title text-sm font-bold text-white">VANT.BUSINESS</p>
              <p className="mt-1 text-[10px] uppercase tracking-[0.18em] text-[#6f6f6f]">
                Automação. IA. Escala.
              </p>
            </div>
          </div>
          <p className="mt-4 text-sm text-[#a6a6a6] leading-relaxed">
            Agência e hub de IA para presença digital, ferramentas, conteúdo e soluções para negócios.
          </p>
        </div>
        <div>
          <p className="brand-kicker mb-3">Navegação</p>
          <ul className="space-y-2 text-sm text-[#a6a6a6]">
            <li><Link to="/sobre" className="transition hover:text-white">Sobre</Link></li>
            <li><Link to="/recursos" className="transition hover:text-white">Ferramentas IA</Link></li>
            <li><Link to="/solucoes-digitais" className="transition hover:text-white">Identidade digital</Link></li>
          </ul>
        </div>
        <div>
          <p className="brand-kicker mb-3">Contato</p>
          <p className="text-sm text-[#a6a6a6]">
            Por Victor Hugo — desenvolvedor de automação e IA.
          </p>
          <p className="mt-2 text-xs text-[#6f6f6f]">
            Alguns links são de afiliados — sem custo extra pra você.
          </p>
          <Link
            to="/admin-vant?view=login"
            className="mt-6 inline-block text-[10px] lowercase text-[#6f6f6f] transition hover:text-[#a6a6a6]"
          >
            admin
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
