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
            Soluções digitais para presença, captação, atendimento, automação e crescimento.
          </p>
        </div>
        <div>
          <p className="brand-kicker mb-3">Navegação</p>
          <ul className="space-y-2 text-sm text-[#a6a6a6]">
            <li><Link to="/conversao" className="transition hover:text-white">Conversão de leads</Link></li>
            <li><Link to="/solucoes-digitais#briefing-form" className="transition hover:text-white">Soluções digitais</Link></li>
          </ul>
        </div>
        <div>
          <p className="brand-kicker mb-3">Contato</p>
          <p className="text-sm text-[#a6a6a6]">
            Por Victor Hugo — desenvolvedor de automação e IA.
          </p>
          <p className="mt-2 text-xs text-[#6f6f6f]">
            Diagnóstico, estruturação e implementação para empresas que querem crescer no digital.
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
