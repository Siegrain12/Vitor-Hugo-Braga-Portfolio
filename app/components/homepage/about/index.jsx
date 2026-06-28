// @flow strict
'use client';

import { personalData } from "@/utilitários/data/personal-data";
import Image from "next/image";

const stats = [
  { value: "4+", label: "Anos de Experiência", color: "text-primary-cyan" },
  { value: "3",  label: "Projetos Finalizados", color: "text-primary-purple" },
  { value: "20+", label: "Tecnologias",         color: "text-pink-400" },
  { value: "1",  label: "Certificado Acadêmico", color: "text-amber-400" },
];

function AboutSection() {
  return (
    <div id="about" className="my-12 lg:my-16 relative">
      <div className="hidden lg:flex flex-col items-center absolute top-16 -right-8">
        <span className="bg-gradient-purple-cyan bg-clip-text text-transparent rotate-90 p-2 px-5 text-xl rounded-md font-bold">
          SOBRE MIM
        </span>
        <span className="h-36 w-[2px] bg-gradient-to-b from-primary-purple to-primary-cyan"></span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
        {/* Left: Text + Stats */}
        <div className="order-2 lg:order-1 flex flex-col gap-6">
          <p className="font-medium mb-1 text-primary-cyan text-xl uppercase tracking-widest">
            Quem sou eu?
          </p>
          <p className="text-gray-300 text-sm lg:text-base leading-relaxed">
            {personalData.description}
          </p>

          {/* Stats grid */}
          <div className="grid grid-cols-2 gap-3 mt-2">
            {stats.map((stat, i) => (
              <div
                key={i}
                className="group relative flex flex-col items-center justify-center py-4 px-3 rounded-xl border border-white/5 bg-[#0a0e1a] hover:border-white/15 transition-all duration-300 hover:shadow-[0_0_20px_rgba(124,58,237,0.1)] overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary-purple/5 to-primary-cyan/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className={`text-2xl lg:text-3xl font-extrabold ${stat.color} z-10`}>{stat.value}</span>
                <span className="text-[11px] text-gray-500 text-center mt-1 font-medium tracking-wide z-10">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Profile photo with animated ring */}
        <div className="flex justify-center items-center order-1 lg:order-2">
          <div className="relative group">
            {/* Animated rotating gradient ring */}
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-primary-cyan via-primary-purple to-pink-500 opacity-75 blur-sm group-hover:opacity-100 transition-opacity duration-500 animate-spin-slow" />

            {/* Photo container */}
            <div className="relative rounded-xl overflow-hidden border-2 border-transparent bg-[#0d1224]">
              <Image
                src={personalData.profile}
                width={300}
                height={300}
                alt="Vitor Hugo Braga"
                className="rounded-xl transition-all duration-700 grayscale group-hover:grayscale-0 group-hover:scale-105 cursor-pointer object-cover"
              />
              {/* Overlay gradient at bottom */}
              <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-[#0d1224]/80 to-transparent" />
            </div>

            {/* Floating status badge */}
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-1.5 rounded-full border border-green-500/40 bg-[#0d1224] shadow-lg whitespace-nowrap">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-[11px] font-bold text-green-400 tracking-widest uppercase">Open to Work</span>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 6s linear infinite;
        }
      `}</style>
    </div>
  );
}

export default AboutSection;