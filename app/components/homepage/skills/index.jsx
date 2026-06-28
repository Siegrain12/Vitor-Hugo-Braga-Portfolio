// @flow strict
'use client';

import { skillsData } from "@/utilitários/data/skills";
import { skillsImage } from "@/utilitários/skill-image";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const levelConfig = {
  'Avançado':      { pct: 90, border: '#00e5ff', badge: 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40',    bar: 'bg-gradient-to-r from-cyan-500 to-cyan-300' },
  'Intermediário': { pct: 65, border: '#a855f7', badge: 'bg-purple-500/20 text-purple-300 border border-purple-500/40', bar: 'bg-gradient-to-r from-purple-500 to-purple-300' },
  'Básico':        { pct: 35, border: '#6366f1', badge: 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40', bar: 'bg-gradient-to-r from-indigo-500 to-indigo-300' },
};

const categoryColors = {
  'Frontend':       'text-cyan-400',
  'Backend':        'text-purple-400',
  'Banco de Dados': 'text-pink-400',
  'DevOps':         'text-orange-400',
  'Ferramentas':    'text-green-400',
};

const categories = ['Todos', 'Frontend', 'Backend', 'Banco de Dados', 'DevOps', 'Ferramentas'];

function SkillCard({ skill, index, inView }) {
  const image = skillsImage(skill.name);
  const cfg = levelConfig[skill.level] || levelConfig['Básico'];
  const catColor = categoryColors[skill.category] || 'text-gray-400';
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="group relative flex flex-col p-4 rounded-xl border bg-[#0a0e1a] transition-all duration-300 hover:scale-105 cursor-default"
      style={{
        borderColor: hovered ? cfg.border : 'rgba(255,255,255,0.07)',
        boxShadow: hovered ? `0 0 22px ${cfg.border}28` : 'none',
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(20px)',
        transition: `opacity 0.5s ease ${index * 0.04}s, transform 0.5s ease ${index * 0.04}s, border-color 0.3s, box-shadow 0.3s, scale 0.3s`,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Icon + Name row */}
      <div className="flex items-center gap-3 mb-3">
        <div className="flex-shrink-0 h-9 w-9 flex items-center justify-center">
          {image?.src ? (
            <Image
              src={image.src}
              alt={skill.name}
              width={36}
              height={36}
              className="h-full w-auto object-contain drop-shadow-lg"
            />
          ) : (
            <span className="text-xl font-bold text-cyan-400">{skill.name.slice(0, 2).toUpperCase()}</span>
          )}
        </div>
        <div className="min-w-0">
          <p className="text-white font-bold text-sm tracking-wide truncate">{skill.name}</p>
          <p className={`text-[10px] tracking-wider uppercase ${catColor}`}>{skill.category}</p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="mt-auto">
        <div className="flex items-center justify-between mb-1">
          <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${cfg.badge}`}>
            {skill.level}
          </span>
          <span className="text-[10px] text-gray-600 font-mono">{cfg.pct}%</span>
        </div>
        <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
          <div
            className={`h-full ${cfg.bar} rounded-full transition-all duration-1000 ease-out`}
            style={{
              width: inView ? `${cfg.pct}%` : '0%',
              transitionDelay: `${index * 0.04 + 0.3}s`,
            }}
          />
        </div>
      </div>
    </div>
  );
}

function Skills() {
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [inView, setInView] = useState(false);
  const containerRef = useRef(null);

  const filtered = activeCategory === 'Todos'
    ? skillsData
    : skillsData.filter(s => s.category === activeCategory);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.1 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Reset animation when category changes
  const handleCategory = (cat) => {
    setInView(false);
    setActiveCategory(cat);
    setTimeout(() => setInView(true), 50);
  };

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
            onClick={() => handleCategory(cat)}
            className={`text-xs font-bold tracking-widest uppercase px-4 py-2 rounded-full border transition-all duration-200 ${
              activeCategory === cat
                ? 'border-cyan-400 text-cyan-400 bg-cyan-400/10 shadow-[0_0_12px_rgba(6,182,212,0.2)]'
                : 'border-gray-700 text-gray-400 hover:border-gray-500 hover:text-gray-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Skills Grid */}
      <div ref={containerRef} className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {filtered.map((skill, i) => (
          <SkillCard key={`${skill.name}-${i}`} skill={skill} index={i} inView={inView} />
        ))}
      </div>
    </div>
  );
}

export default Skills;