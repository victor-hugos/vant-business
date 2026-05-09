import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="border-t border-white/10 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl grid gap-8 md:grid-cols-3">
        <div>
          <p className="font-bold text-white">VANT<span className="text-cyan-400">.business</span></p>
          <p className="mt-2 text-sm text-slate-400 leading-relaxed">
            Hub de ferramentas IA, ebooks, notícias e automações para negócios digitais.
          </p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-widest text-slate-500 mb-3">Navegação</p>
          <ul className="space-y-2 text-sm text-slate-400">
            <li><Link to="/blog" className="hover:text-cyan-300 transition">Notícias IA</Link></li>
            <li><Link to="/recursos" className="hover:text-cyan-300 transition">Ferramentas IA</Link></li>
            <li><Link to="/automatize" className="hover:text-cyan-300 transition">Automatize seu negócio</Link></li>
          </ul>
        </div>
        <div>
          <p className="text-xs uppercase tracking-widest text-slate-500 mb-3">Contato</p>
          <p className="text-sm text-slate-400">
            Por Victor Hugo — desenvolvedor de automação e IA.
          </p>
          <p className="mt-2 text-xs text-slate-600">
            Alguns links são de afiliados — sem custo extra pra você.
          </p>
          <Link
            to="/admin-vant?view=login"
            className="mt-6 inline-block text-[10px] lowercase text-slate-700 transition hover:text-slate-500"
          >
            admin
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
