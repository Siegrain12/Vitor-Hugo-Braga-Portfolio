// @flow strict
'use client';
import { personalData } from '@/utilitários/data/personal-data';
import Link from 'next/link';
import { BiLogoLinkedin } from "react-icons/bi";
import { IoLogoGithub } from "react-icons/io";
import { MdAlternateEmail, MdLocationOn } from "react-icons/md";
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
      <div className="flex flex-col items-center my-8 lg:py-4 gap-3">
        <h2 className="text-2xl lg:text-4xl font-extrabold tracking-widest text-white uppercase">
          ENTRE EM CONTATO
        </h2>
        <p className="text-primary-cyan font-mono text-sm text-center">
          {'>'} Procurando companheiros? Vamos nos conectar e construir algo épico
        </p>

        {/* Available for work badge */}
        <div className="mt-2 flex items-center gap-3 px-5 py-2 rounded-full border border-green-500/30 bg-green-500/5">
          <div className="relative">
            <span className="w-2.5 h-2.5 rounded-full bg-green-400 inline-block" />
            <span className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-40" />
          </div>
          <span className="text-sm font-bold text-green-400 tracking-wide">Disponível para novas oportunidades</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
        {/* Contact form */}
        <ContactForm />

        {/* Right: info + socials */}
        <div className="flex flex-col gap-6">
          {/* Info cards */}
          <div className="flex flex-col gap-3">
            {/* Email */}
            <a
              href={`mailto:${personalData.email}`}
              className="group flex items-center gap-4 p-4 rounded-xl border border-[#1a2040] bg-[#0a0e1a] hover:border-cyan-500/40 hover:shadow-[0_0_20px_rgba(0,229,255,0.08)] transition-all duration-300"
            >
              <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-cyan-500/10 border border-cyan-500/20 group-hover:bg-cyan-500/20 transition-colors">
                <MdAlternateEmail size={20} className="text-cyan-400" />
              </div>
              <div>
                <p className="text-[10px] font-bold tracking-widest uppercase text-gray-600 mb-0.5">Email</p>
                <span className="text-sm font-mono text-gray-300 group-hover:text-white transition-colors">{personalData.email}</span>
              </div>
            </a>

            {/* Location */}
            <div className="flex items-center gap-4 p-4 rounded-xl border border-[#1a2040] bg-[#0a0e1a]">
              <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-purple-500/10 border border-purple-500/20">
                <MdLocationOn size={20} className="text-purple-400" />
              </div>
              <div>
                <p className="text-[10px] font-bold tracking-widest uppercase text-gray-600 mb-0.5">Localização</p>
                <span className="text-sm font-mono text-gray-300">{personalData.address}</span>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div>
            <p className="text-xs font-bold tracking-widest uppercase text-gray-500 mb-3 font-mono">
              {'>'} OU ENCONTRE-ME AQUI
            </p>

            <div className="flex items-center gap-3">
              <Link
                target="_blank"
                href={personalData.github}
                className="group flex-1 flex items-center gap-3 p-3 rounded-xl border border-[#1a2040] bg-[#0a0e1a] hover:border-cyan-500/50 hover:shadow-[0_0_16px_rgba(0,229,255,0.15)] transition-all duration-300"
                aria-label="GitHub"
              >
                <IoLogoGithub size={20} className="text-gray-500 group-hover:text-cyan-400 transition-colors" />
                <span className="text-xs font-bold text-gray-500 group-hover:text-gray-200 transition-colors">GitHub</span>
              </Link>

              <Link
                target="_blank"
                href={personalData.linkedIn}
                className="group flex-1 flex items-center gap-3 p-3 rounded-xl border border-[#1a2040] bg-[#0a0e1a] hover:border-purple-500/50 hover:shadow-[0_0_16px_rgba(168,85,247,0.15)] transition-all duration-300"
                aria-label="LinkedIn"
              >
                <BiLogoLinkedin size={20} className="text-gray-500 group-hover:text-purple-400 transition-colors" />
                <span className="text-xs font-bold text-gray-500 group-hover:text-gray-200 transition-colors">LinkedIn</span>
              </Link>

              <a
                href={personalData.gmail || `mailto:${personalData.email}`}
                className="group flex-1 flex items-center gap-3 p-3 rounded-xl border border-[#1a2040] bg-[#0a0e1a] hover:border-cyan-500/50 hover:shadow-[0_0_16px_rgba(0,229,255,0.15)] transition-all duration-300"
                aria-label="Gmail"
              >
                <SiGmail size={18} className="text-gray-500 group-hover:text-cyan-400 transition-colors" />
                <span className="text-xs font-bold text-gray-500 group-hover:text-gray-200 transition-colors">Gmail</span>
              </a>
            </div>
          </div>

          {/* Response time note */}
          <div className="flex items-center gap-2 text-xs text-gray-600 font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            Tempo de resposta médio: menos de 24h
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactSection;