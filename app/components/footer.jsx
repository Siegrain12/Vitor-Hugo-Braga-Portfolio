// @flow strict
import Link from 'next/link';
import { BsGithub, BsLinkedin } from 'react-icons/bs';
import { SiGmail } from 'react-icons/si';
import { personalData } from '@/utilitários/data/personal-data';

const navLinks = [
  { label: 'Sobre', href: '/#about' },
  { label: 'Experiência', href: '/#experience' },
  { label: 'Habilidades', href: '/#skills' },
  { label: 'Projetos', href: '/#projects' },
  { label: 'Formação', href: '/#education' },
  { label: 'Contato', href: '/#contact' },
];

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-[#1a1f3a] bg-[#080c1a] text-white">
      {/* Top gradient line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-primary-purple to-transparent" />

      <div className="mx-auto px-6 sm:px-12 lg:max-w-[70rem] xl:max-w-[76rem] 2xl:max-w-[92rem] py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div className="flex flex-col gap-3">
            <Link href="/" className="text-2xl font-extrabold tracking-tight">
              <span className="bg-gradient-to-r from-primary-cyan to-primary-purple bg-clip-text text-transparent">
                &lt;VHB /&gt;
              </span>
            </Link>
            <p className="text-xs text-gray-500 leading-relaxed max-w-[200px]">
              Desenvolvedor Full Stack apaixonado por criar soluções escaláveis e experiências digitais memoráveis.
            </p>
            {/* Status */}
            <div className="flex items-center gap-2 mt-1">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-[11px] font-bold text-green-400 tracking-wider">Disponível para trabalho</span>
            </div>
          </div>

          {/* Quick links */}
          <div className="flex flex-col gap-3">
            <p className="text-[11px] font-bold tracking-widest uppercase text-gray-500">{'>'} Navegação</p>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2">
              {navLinks.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-xs text-gray-500 hover:text-primary-cyan transition-colors duration-200 flex items-center gap-1 group"
                  >
                    <span className="text-primary-cyan opacity-0 group-hover:opacity-100 transition-opacity">›</span>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social + Contact */}
          <div className="flex flex-col gap-3">
            <p className="text-[11px] font-bold tracking-widest uppercase text-gray-500">{'>'} Conecte-se</p>
            <div className="flex gap-3">
              {personalData.github && (
                <Link
                  href={personalData.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 flex items-center justify-center rounded-xl border border-[#1a2040] bg-[#0a0e1a] text-gray-500 hover:text-primary-cyan hover:border-primary-cyan/40 hover:shadow-[0_0_12px_rgba(6,182,212,0.2)] transition-all duration-300"
                  aria-label="GitHub"
                >
                  <BsGithub size={16} />
                </Link>
              )}
              {personalData.linkedIn && (
                <Link
                  href={personalData.linkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 flex items-center justify-center rounded-xl border border-[#1a2040] bg-[#0a0e1a] text-gray-500 hover:text-primary-purple hover:border-primary-purple/40 hover:shadow-[0_0_12px_rgba(124,58,237,0.2)] transition-all duration-300"
                  aria-label="LinkedIn"
                >
                  <BsLinkedin size={15} />
                </Link>
              )}
              {personalData.gmail && (
                <a
                  href={personalData.gmail}
                  className="w-9 h-9 flex items-center justify-center rounded-xl border border-[#1a2040] bg-[#0a0e1a] text-gray-500 hover:text-primary-cyan hover:border-primary-cyan/40 hover:shadow-[0_0_12px_rgba(6,182,212,0.2)] transition-all duration-300"
                  aria-label="Gmail"
                >
                  <SiGmail size={15} />
                </a>
              )}
            </div>
            <a
              href={`mailto:${personalData.email}`}
              className="text-xs text-gray-500 hover:text-primary-cyan transition-colors font-mono"
            >
              {personalData.email}
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-[#1a1f3a] flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-gray-600">
            © {year} Portfólio por{' '}
            <Link
              target="_blank"
              href={personalData.linkedIn}
              className="text-primary-cyan hover:text-white transition-colors font-medium"
            >
              Vitor Hugo Braga
            </Link>
            . Todos os direitos reservados.
          </p>
          <p className="text-xs text-gray-700 font-mono flex items-center gap-1.5">
            Feito com{' '}
            <span className="text-pink-500">♥</span>{' '}
            usando Next.js
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;