import ButtonLink from './ui/ButtonLink.jsx';
import SectionHeader from './ui/SectionHeader.jsx';

const contactLinks = [
  {
    label: 'Email',
    href: 'mailto:victor.hsj5133@gmail.com',
    external: false,
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/victor-hugos',
    external: true,
  },
  {
    label: 'GitHub',
    href: 'https://github.com/victor-hugos',
    external: true,
  },
  {
    label: 'Currículo',
    href: '/curriculo-victor-hugo.pdf',
    external: false,
  },
];

function ContactSection() {
  return (
    <section id="contato" className="rounded-3xl border border-white/10 bg-slate-900/75 p-6 shadow-xl shadow-slate-950/30 sm:p-8">
      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
        <SectionHeader
          eyebrow="Contato"
          title="Vamos conversar?"
          subtitle="Estou aberto a oportunidades, projetos, parcerias e desafios relacionados a automação, backend, APIs, integração de sistemas e produtos digitais."
        />

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
          {contactLinks.map((link, index) => (
            <ButtonLink
              key={link.label}
              href={link.href}
              external={link.external}
              variant={index === 0 ? 'primary' : 'secondary'}
              className="w-full"
              ariaLabel={`${link.label} de Victor Hugo`}
            >
              {link.label}
            </ButtonLink>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ContactSection;
