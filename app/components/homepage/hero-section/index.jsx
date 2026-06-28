// @flow strict
'use client';

import { personalData } from "@/utilitários/data/personal-data";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BsGithub, BsLinkedin } from "react-icons/bs";
import { MdDownload } from "react-icons/md";
import { RiContactsFill } from "react-icons/ri";
import { SiGmail } from "react-icons/si";

const roles = [
  "Desenvolvedor Full Stack",
  "Desenvolvedor Back-end",
  "Analista QA",
  "Entusiasta de DevOps",
];

function useTypewriter(texts, speed = 80, pause = 1800) {
  const [displayed, setDisplayed] = useState('');
  const [textIdx, setTextIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = texts[textIdx];
    let timeout;

    if (!deleting && charIdx < current.length) {
      timeout = setTimeout(() => setCharIdx(c => c + 1), speed);
    } else if (!deleting && charIdx === current.length) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && charIdx > 0) {
      timeout = setTimeout(() => setCharIdx(c => c - 1), speed / 2);
    } else if (deleting && charIdx === 0) {
      setDeleting(false);
      setTextIdx(i => (i + 1) % texts.length);
    }

    setDisplayed(current.slice(0, charIdx));
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, textIdx, texts, speed, pause]);

  return displayed;
}

function HeroSection() {
  const role = useTypewriter(roles);

  return (
    <section className="relative flex flex-col items-center justify-between py-4 lg:py-12">
      <Image
        src="/hero.svg"
        alt="Hero"
        width={1572}
        height={795}
        className="absolute -top-[98px] -z-10"
      />

      <div className="grid grid-cols-1 items-start lg:grid-cols-2 lg:gap-12 gap-y-8 w-full">
        {/* Left: Text */}
        <div className="order-2 lg:order-1 flex flex-col items-start justify-center p-2 pb-20 md:pb-10 lg:pt-10">
          {/* Available badge */}
          <div className="mb-5 flex items-center gap-2 px-3 py-1.5 rounded-full border border-green-500/30 bg-green-500/5">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-xs font-bold text-green-400 tracking-widest uppercase">Disponível para oportunidades</span>
          </div>

          <h1 className="text-3xl font-bold leading-10 text-white md:font-extrabold lg:text-[2.6rem] lg:leading-[3.5rem]">
            Olá, <br />
            Sou{' '}
            <span className="text-primary-purple">{personalData.name}</span>
          </h1>

          {/* Typewriter role */}
          <div className="mt-3 flex items-center gap-2 h-8">
            <span className="text-primary-cyan text-lg lg:text-xl font-semibold font-mono">
              {role}
              <span className="inline-block w-0.5 h-5 bg-primary-cyan ml-0.5 animate-pulse align-middle" />
            </span>
          </div>

          {/* Social icons */}
          <div className="my-10 flex items-center gap-4">
            {personalData.github && (
              <Link
                href={personalData.github}
                target='_blank'
                className="group w-10 h-10 flex items-center justify-center rounded-full border border-white/10 bg-white/5 text-gray-400 hover:text-primary-cyan hover:border-primary-cyan/50 hover:shadow-[0_0_14px_rgba(6,182,212,0.3)] transition-all duration-300"
              >
                <BsGithub size={20} />
              </Link>
            )}
            {personalData.linkedIn && (
              <Link
                href={personalData.linkedIn}
                target='_blank'
                className="group w-10 h-10 flex items-center justify-center rounded-full border border-white/10 bg-white/5 text-gray-400 hover:text-primary-purple hover:border-primary-purple/50 hover:shadow-[0_0_14px_rgba(124,58,237,0.3)] transition-all duration-300"
              >
                <BsLinkedin size={20} />
              </Link>
            )}
            {personalData.gmail && (
              <Link
                href={personalData.gmail}
                target='_blank'
                className="group w-10 h-10 flex items-center justify-center rounded-full border border-white/10 bg-white/5 text-gray-400 hover:text-primary-cyan hover:border-primary-cyan/50 hover:shadow-[0_0_14px_rgba(6,182,212,0.3)] transition-all duration-300"
              >
                <SiGmail size={20} />
              </Link>
            )}
          </div>

          {/* CTA Buttons */}
          <div className="flex items-center gap-3 flex-wrap">
            <Link href="#contact" className="bg-gradient-to-r to-primary-purple from-primary-cyan p-[1px] rounded-full transition-all duration-300 hover:shadow-[0_0_20px_rgba(124,58,237,0.4)]">
              <button className="px-6 py-3 bg-[#0d1224] rounded-full text-sm font-semibold uppercase tracking-wider text-white flex items-center gap-2 hover:gap-3 transition-all duration-200">
                <span>Entrar em Contato</span>
                <RiContactsFill size={16} />
              </button>
            </Link>

            <Link
              className="flex items-center gap-2 hover:gap-3 rounded-full bg-gradient-to-r from-primary-purple to-primary-cyan px-6 py-3 text-sm font-semibold uppercase tracking-wider text-white transition-all duration-200 hover:shadow-[0_0_20px_rgba(6,182,212,0.4)]"
              role="button"
              target="_blank"
              href={personalData.resume}
            >
              <span>Currículo</span>
              <MdDownload size={16} />
            </Link>
          </div>
        </div>

        {/* Right: Code block */}
        <div className="order-1 lg:order-2 from-[#0d1224] border-[#1b2c68a0] relative rounded-lg border bg-gradient-to-r to-[#0a0d37]">
          <div className="flex flex-row">
            <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-primary-purple to-primary-cyan"></div>
            <div className="h-[1px] w-full bg-gradient-to-r from-primary-cyan to-transparent"></div>
          </div>
          <div className="px-4 lg:px-8 py-5">
            <div className="flex flex-row space-x-2">
              <div className="h-3 w-3 rounded-full bg-red-400"></div>
              <div className="h-3 w-3 rounded-full bg-orange-400"></div>
              <div className="h-3 w-3 rounded-full bg-green-200"></div>
            </div>
          </div>
          <div className="overflow-hidden border-t-[2px] border-indigo-900 px-4 lg:px-8 py-4 lg:py-8">
            <code className="font-mono text-xs md:text-sm lg:text-base">
              <div className="blink">
                <span className="mr-2 text-pink-500">const</span>
                <span className="mr-2 text-white">coder</span>
                <span className="mr-2 text-pink-500">=</span>
                <span className="text-gray-400">{'{'}</span>
              </div>
              <div>
                <span className="ml-4 lg:ml-8 mr-2 text-white">name:</span>
                <span className="text-gray-400">{`'`}</span>
                <span className="text-amber-300">Vitor Hugo Braga</span>
                <span className="text-gray-400">{`',`}</span>
              </div>
              <div className="ml-4 lg:ml-8 mr-2">
                <span className=" text-white">skills:</span>
                <span className="text-gray-400">{`['`}</span>
                <span className="text-amber-300">React</span>
                <span className="text-gray-400">{"', '"}</span>
                <span className="text-amber-300">NextJS</span>
                <span className="text-gray-400">{"', '"}</span>
                <span className="text-amber-300">Node</span>
                <span className="text-gray-400">{"', '"}</span>
                <span className="text-amber-300">Firebase</span>
                <span className="text-gray-400">{"', '"}</span>
                <span className="text-amber-300">Docker</span>
                <span className="text-gray-400">{"'],"}
                </span>
              </div>
              <div>
                <span className="ml-4 lg:ml-8 mr-2 text-white">dedicado:</span>
                <span className="text-orange-400">true</span>
                <span className="text-gray-400">,</span>
              </div>
              <div>
                <span className="ml-4 lg:ml-8 mr-2 text-white">aprendizRápido:</span>
                <span className="text-orange-400">true</span>
                <span className="text-gray-400">,</span>
              </div>
              <div>
                <span className="ml-4 lg:ml-8 mr-2 text-white">resolveProblemas:</span>
                <span className="text-orange-400">true</span>
                <span className="text-gray-400">,</span>
              </div>
              <div>
                <span className="ml-4 lg:ml-8 mr-2 text-green-400">disponível:</span>
                <span className="text-orange-400">function</span>
                <span className="text-gray-400">{'() {'}</span>
              </div>
              <div>
                <span className="ml-8 lg:ml-16 mr-2 text-orange-400">return</span>
                <span className="text-gray-400">{`(`}</span>
              </div>
              <div>
                <span className="ml-12 lg:ml-24 text-cyan-400">this.</span>
                <span className="mr-2 text-white">dedicado</span>
                <span className="text-amber-300">&amp;&amp;</span>
              </div>
              <div>
                <span className="ml-12 lg:ml-24 text-cyan-400">this.</span>
                <span className="mr-2 text-white">skills.length</span>
                <span className="mr-2 text-amber-300">&gt;=</span>
                <span className="text-orange-400">5</span>
              </div>
              <div><span className="ml-8 lg:ml-16 mr-2 text-gray-400">{`);`}</span></div>
              <div><span className="ml-4 lg:ml-8 text-gray-400">{`};`}</span></div>
              <div><span className="text-gray-400">{`};`}</span></div>
            </code>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="mt-16 flex flex-col items-center gap-2 animate-bounce opacity-60">
        <span className="text-[10px] font-bold tracking-[4px] uppercase text-gray-500">Scroll</span>
        <svg width="16" height="24" viewBox="0 0 16 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="1" y="1" width="14" height="22" rx="7" stroke="#4b5563" strokeWidth="1.5"/>
          <circle className="animate-scroll-dot" cx="8" cy="7" r="2.5" fill="#06b6d4">
            <animate attributeName="cy" values="7;15;7" dur="2s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="1;0.2;1" dur="2s" repeatCount="indefinite"/>
          </circle>
        </svg>
      </div>
    </section>
  );
}

export default HeroSection;