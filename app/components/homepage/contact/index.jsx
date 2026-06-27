// @flow strict
'use client';
import { personalData } from '@/utilitários/data/personal-data';
import Link from 'next/link';
import { BiLogoLinkedin } from "react-icons/bi";
import { IoLogoGithub } from "react-icons/io";
import { MdAlternateEmail } from "react-icons/md";
import { SiGmail } from "react-icons/si";
import ContactForm from './contact-form';

function ContactSection() {
  return (
    <div id="contact" className="my-12 lg:my-24 relative border-t border-[#25213b]">
      <div className="flex justify-center -translate-y-[1px]">
        <div className="w-3/4">
          <div className="h-[1px] bg-gradient-to-r from-transparent via-primary-purple to-transparent w-full" />
        </div>
      </div>

      {/* Header */}
      <div className="flex flex-col items-center my-8 lg:py-4 gap-2">
        <h2 className="text-2xl lg:text-4xl font-extrabold tracking-widest text-white uppercase">
          ENTRE EM CONTATO
        </h2>
        <p className="text-primary-cyan font-mono text-sm">
          {'>'} Procurando companheiros? Vamos nos conectar e construir algo épico
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
        {/* Contact form */}
        <ContactForm />

        {/* Right side: info + socials */}
        <div className="flex flex-col gap-8">
          {/* Info */}
          <div className="flex flex-col gap-4">
            <a
              href={`mailto:${personalData.email}`}
              className="group flex items-center gap-4 text-gray-300 hover:text-cyan-400 transition-colors duration-300"
            >
              <div className="w-10 h-10 flex items-center justify-center rounded border border-[#1a2040] bg-[#0a0e1a] group-hover:border-cyan-500/50 group-hover:shadow-[0_0_12px_rgba(0,229,255,0.15)] transition-all duration-300">
                <MdAlternateEmail size={20} className="text-cyan-400" />
              </div>
              <span className="text-sm font-mono">{personalData.email}</span>
            </a>
          </div>

          {/* Divider */}
          <div>
            <p className="text-xs font-bold tracking-widest uppercase text-gray-500 mb-4 font-mono">
              {'>'} OU ENCONTRE-ME AQUI
            </p>

            {/* Social icons — only GitHub, LinkedIn, Email */}
            <div className="flex items-center gap-4">
              <Link
                target="_blank"
                href={personalData.github}
                className="group w-12 h-12 flex items-center justify-center rounded border border-[#1a2040] bg-[#0a0e1a] hover:border-cyan-500/60 hover:shadow-[0_0_16px_rgba(0,229,255,0.2)] transition-all duration-300"
                aria-label="GitHub"
              >
                <IoLogoGithub size={24} className="text-gray-400 group-hover:text-cyan-400 transition-colors duration-300" />
              </Link>

              <Link
                target="_blank"
                href={personalData.linkedIn}
                className="group w-12 h-12 flex items-center justify-center rounded border border-[#1a2040] bg-[#0a0e1a] hover:border-purple-500/60 hover:shadow-[0_0_16px_rgba(168,85,247,0.2)] transition-all duration-300"
                aria-label="LinkedIn"
              >
                <BiLogoLinkedin size={24} className="text-gray-400 group-hover:text-purple-400 transition-colors duration-300" />
              </Link>

              <a
                href={personalData.gmail || `mailto:${personalData.email}`}
                className="group w-12 h-12 flex items-center justify-center rounded border border-[#1a2040] bg-[#0a0e1a] hover:border-cyan-500/60 hover:shadow-[0_0_16px_rgba(0,229,255,0.2)] transition-all duration-300"
                aria-label="Gmail"
              >
                <SiGmail size={24} className="text-gray-400 group-hover:text-cyan-400 transition-colors duration-300" />
              </a>

              <a
                href={`mailto:${personalData.email}`}
                className="group w-12 h-12 flex items-center justify-center rounded border border-[#1a2040] bg-[#0a0e1a] hover:border-pink-500/60 hover:shadow-[0_0_16px_rgba(236,72,153,0.2)] transition-all duration-300"
                aria-label="E-mail"
              >
                <MdAlternateEmail size={24} className="text-gray-400 group-hover:text-pink-400 transition-colors duration-300" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactSection;