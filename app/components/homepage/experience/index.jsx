// @flow strict
'use client';

import { experiences } from "@/utilitários/data/experience";
import Image from "next/image";
import { BsBriefcaseFill } from "react-icons/bs";
import { MdWorkHistory } from "react-icons/md";

const expColors = [
  { dot: 'bg-primary-cyan', border: 'border-primary-cyan/40', badge: 'bg-primary-cyan/10 text-primary-cyan border-primary-cyan/30', glow: 'shadow-[0_0_20px_rgba(6,182,212,0.15)]' },
  { dot: 'bg-primary-purple', border: 'border-primary-purple/40', badge: 'bg-primary-purple/10 text-primary-purple border-primary-purple/30', glow: 'shadow-[0_0_20px_rgba(124,58,237,0.15)]' },
  { dot: 'bg-pink-500', border: 'border-pink-500/40', badge: 'bg-pink-500/10 text-pink-400 border-pink-500/30', glow: 'shadow-[0_0_20px_rgba(236,72,153,0.15)]' },
];

const expSkills = [
  ['Node.js', 'Firebase', 'TypeScript', 'Testing', 'APIs REST', 'SQL'],
  ['JavaScript', 'Node.js', 'REST API', 'Git'],
  ['React', 'Next.js', 'Node.js', 'MongoDB', 'Docker', 'TypeScript'],
];

function Experience() {
  return (
    <div id="experience" className="relative z-50 border-t my-12 lg:my-24 border-[#25213b]">
      <Image
        src="/section.svg"
        alt="Hero"
        width={1572}
        height={795}
        className="absolute top-0 -z-10"
      />

      <div className="flex justify-center my-5 lg:py-8">
        <div className="flex items-center">
          <span className="w-24 h-[2px] bg-gradient-to-r from-primary-purple to-primary-cyan"></span>
          <span className="bg-gradient-purple-cyan bg-clip-text text-transparent p-2 px-5 text-xl rounded-md font-bold">
            Experiências
          </span>
          <span className="w-24 h-[2px] bg-gradient-to-r from-primary-cyan to-primary-purple"></span>
        </div>
      </div>

      <div className="py-8">
        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-4 lg:left-6 top-0 bottom-0 w-[2px] bg-gradient-to-b from-primary-cyan via-primary-purple to-pink-500 opacity-30" />

          <div className="flex flex-col gap-8">
            {experiences.map((exp, idx) => {
              const color = expColors[idx % expColors.length];
              const skills = expSkills[idx] || [];

              return (
                <div key={exp.id} className="relative flex gap-6 lg:gap-10 group">
                  {/* Timeline dot */}
                  <div className="relative flex-shrink-0 flex flex-col items-center" style={{ minWidth: '2rem' }}>
                    <div className={`w-8 h-8 lg:w-12 lg:h-12 rounded-full border-2 ${color.border} bg-[#0a0e1a] flex items-center justify-center z-10 transition-all duration-300 group-hover:${color.glow}`}>
                      <BsBriefcaseFill size={14} className={color.dot.replace('bg-', 'text-')} />
                    </div>
                    {/* Dot pulse */}
                    <div className={`absolute top-1 left-1 w-6 h-6 lg:w-10 lg:h-10 rounded-full ${color.dot} opacity-10 animate-ping`} style={{ animationDuration: '3s' }} />
                  </div>

                  {/* Card */}
                  <div className={`flex-1 bg-[#080c1a] border ${color.border} rounded-xl p-5 transition-all duration-300 group-hover:${color.glow} group-hover:border-opacity-100 -mt-1`}>
                    {/* Duration badge */}
                    <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                      <span className={`text-xs font-bold px-3 py-1 rounded-full border ${color.badge} tracking-wider uppercase`}>
                        {exp.duration}
                      </span>
                      <MdWorkHistory size={16} className="text-gray-600" />
                    </div>

                    {/* Title & Company */}
                    <h3 className="text-base lg:text-lg font-bold text-white uppercase tracking-wide mb-1">
                      {exp.title}
                    </h3>
                    <p className="text-sm text-gray-400 mb-4 flex items-center gap-2">
                      <span className={`w-1.5 h-1.5 rounded-full ${color.dot}`} />
                      {exp.company}
                    </p>

                    {/* Tech tags */}
                    {skills.length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {skills.map((skill, i) => (
                          <span
                            key={i}
                            className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-white/5 border border-white/8 text-gray-400"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Experience;