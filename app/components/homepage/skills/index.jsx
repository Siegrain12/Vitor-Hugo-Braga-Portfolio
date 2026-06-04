// @flow strict
'use client';

import { skillsData } from "@/utilitários/data/skills";
import { skillsImage } from "@/utilitários/skill-image";
import Image from "next/image";
import { useState } from "react";

const levelColors = {
  'Avançado':      { border: '#00e5ff', badge: 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' },
  'Intermediário': { border: '#a855f7', badge: 'bg-purple-500/20 text-purple-300 border border-purple-500/40' },
  'Básico':        { border: '#6366f1', badge: 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40' },
};

const categoryColors = {
  'Frontend':      'text-cyan-400',
  'Backend':       'text-purple-400',
  'Banco de Dados':'text-pink-400',
  'DevOps':        'text-orange-400',
  'Ferramentas':   'text-green-400',
};

const categories = ['Todos', 'Frontend', 'Backend', 'Banco de Dados', 'DevOps', 'Ferramentas'];

function SkillCard({ skill }) {
  const image = skillsImage(skill.name);
  const colors = levelColors[skill.level] || levelColors['Básico'];
  const catColor = categoryColors[skill.category] || 'text-gray-400';

  return (
    <div
      className="group relative flex flex-col items-center justify-center p-5 rounded-lg border bg-[#0a0e1a] transition-all duration-300 hover:scale-105 cursor-default"
      style={{ borderColor: 'rgba(255,255,255,0.08)', '--hover-border': colors.border }}
      onMouseEnter={e => e.currentTarget.style.borderColor = colors.border}
      onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'}
    >
      {/* Glow effect on hover */}
      <div
        className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ boxShadow: `0 0 20px ${colors.border}30, inset 0 0 20px ${colors.border}08` }}
      />

      {/* Icon */}
      <div className="mb-3 h-12 w-12 flex items-center justify-center">
        {image?.src ? (
          <Image
            src={image.src}
            alt={skill.name}
            width={44}
            height={44}
            className="h-full w-auto object-contain drop-shadow-lg"
          />
        ) : (
          <span className="text-2xl font-bold text-cyan-400">{skill.name.slice(0, 2).toUpperCase()}</span>
        )}
      </div>

      {/* Name */}
      <p className="text-white font-bold text-sm tracking-widest uppercase text-center mb-1">
        {skill.name}
      </p>

      {/* Category */}
      <p className={`text-xs tracking-wider uppercase mb-2 ${catColor}`}>
        {skill.category}
      </p>

      {/* Level badge */}
      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded tracking-wider ${colors.badge}`}>
        {skill.level}
      </span>
    </div>
  );
}

function Skills() {
  const [activeCategory, setActiveCategory] = useState('Todos');

  const filtered = activeCategory === 'Todos'
    ? skillsData
    : skillsData.filter(s => s.category === activeCategory);

  return (
    <div id="skills" className="relative z-50 border-t my-12 lg:my-24 border-[#25213b]">
      <div className="w-[100px] h-[100px] bg-primary-purple rounded-full absolute top-6 left-[42%] translate-x-1/2 filter blur-3xl opacity-20" />

      <div className="flex justify-center -translate-y-[1px]">
        <div className="w-3/4">
          <div className="h-[1px] bg-gradient-to-r from-transparent via-primary-purple to-transparent w-full" />
        </div>
      </div>

      {/* Header */}
      <div className="flex flex-col items-center my-8 lg:py-4 gap-2">
        <h2 className="text-2xl lg:text-4xl font-extrabold tracking-widest text-white uppercase">
          ÁRVORE DE SKILLS
        </h2>
        <p className="text-primary-cyan font-mono text-sm">
          {'>'} habilidades e power-ups desbloqueados
        </p>
      </div>

      {/* Category filter tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`text-xs font-bold tracking-widest uppercase px-4 py-2 rounded border transition-all duration-200 ${
              activeCategory === cat
                ? 'border-cyan-400 text-cyan-400 bg-cyan-400/10'
                : 'border-gray-700 text-gray-400 hover:border-gray-500 hover:text-gray-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {filtered.map((skill, i) => (
          <SkillCard key={`${skill.name}-${i}`} skill={skill} />
        ))}
      </div>
    </div>
  );
}

export default Skills;