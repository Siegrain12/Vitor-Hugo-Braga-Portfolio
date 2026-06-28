// @flow strict
'use client';

import { projectsData } from '@/utilitários/data/projects-data';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FaCode, FaExternalLinkAlt, FaGithub, FaTimes } from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi';

// Gather unique techs from all projects
const allTechs = ['Todos', ...Array.from(new Set(projectsData.flatMap(p => p.tools)))];

function StatusBadge({ project }) {
  if (project.demo) return <span className="bg-green-500/20 border border-green-500/40 text-green-400 text-[10px] font-bold px-2 py-0.5 rounded tracking-widest uppercase">ATIVO</span>;
  if (project.code) return <span className="bg-blue-500/20 border border-blue-500/40 text-blue-400 text-[10px] font-bold px-2 py-0.5 rounded tracking-widest uppercase">CONCLUÍDO</span>;
  return <span className="bg-orange-500/20 border border-orange-500/40 text-orange-400 text-[10px] font-bold px-2 py-0.5 rounded tracking-widest uppercase">EM DEV</span>;
}

function ProjectModal({ project, onClose }) {
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="relative w-full max-w-lg bg-[#080c1a] border border-[#1a2040] rounded-2xl shadow-[0_0_60px_rgba(0,229,255,0.1)] overflow-hidden animate-modal-in">
        {/* Top gradient line */}
        <div className="h-[2px] w-full bg-gradient-to-r from-primary-cyan via-primary-purple to-pink-500" />

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full border border-white/10 bg-white/5 text-gray-400 hover:text-white hover:border-white/30 transition-all z-10"
        >
          <FaTimes size={12} />
        </button>

        <div className="p-6">
          {/* Header */}
          <div className="flex items-start gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-primary-cyan/10 border border-primary-cyan/20 flex items-center justify-center flex-shrink-0">
              <FaCode size={18} className="text-primary-cyan" />
            </div>
            <div>
              <h3 className="text-white font-extrabold text-xl uppercase tracking-wider">{project.name}</h3>
              <div className="flex items-center gap-2 mt-1">
                <StatusBadge project={project} />
                <span className="text-[10px] text-gray-600 font-mono uppercase tracking-wider">{project.role}</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <p className="text-gray-300 text-sm leading-relaxed mb-5">{project.description}</p>

          {/* Tech stack */}
          <div className="mb-5">
            <p className="text-[11px] font-bold tracking-widest uppercase text-gray-500 mb-2">{'>'} Stack utilizada</p>
            <div className="flex flex-wrap gap-1.5">
              {project.tools.map((tool, i) => (
                <span
                  key={i}
                  className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-primary-cyan/10 border border-primary-cyan/20 text-cyan-300"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            {project.code && (
              <Link
                href={project.code}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-2.5 text-xs font-bold uppercase tracking-wider border border-pink-500/40 text-pink-400 hover:bg-pink-500/10 hover:border-pink-400 rounded-xl transition-all duration-200"
              >
                <FaGithub size={14} />
                Ver Código
              </Link>
            )}
            {project.demo && (
              <Link
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-2.5 text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-primary-cyan/20 to-primary-purple/20 border border-primary-cyan/30 text-cyan-300 hover:border-primary-cyan/60 rounded-xl transition-all duration-200"
              >
                <FaExternalLinkAlt size={12} />
                Ver Demo
              </Link>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes modal-in {
          from { opacity: 0; transform: scale(0.95) translateY(10px); }
          to   { opacity: 1; transform: scale(1)   translateY(0);     }
        }
        .animate-modal-in { animation: modal-in 0.2s ease forwards; }
      `}</style>
    </div>
  );
}

function ProjectCard({ project, onClick }) {
  return (
    <div
      className="group flex flex-col bg-[#080c1a] border border-[#1a2040] rounded-xl overflow-hidden transition-all duration-300 hover:border-cyan-500/50 hover:shadow-[0_0_30px_rgba(0,229,255,0.1)] cursor-pointer"
      onClick={() => onClick(project)}
    >
      {/* Thumbnail */}
      <div className="relative h-40 bg-[#0a0e1a] flex items-center justify-center overflow-hidden">
        {project.image ? (
          <img src={project.image} alt={project.name} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" />
        ) : (
          <div className="flex flex-col items-center gap-3 text-[#1a3050]">
            <FaCode size={48} className="group-hover:text-cyan-800 transition-colors duration-300" />
          </div>
        )}
        {/* Top glow line */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        {/* Status */}
        <div className="absolute bottom-2 right-2">
          <StatusBadge project={project} />
        </div>
        {/* "Click to expand" hint */}
        <div className="absolute inset-0 bg-primary-cyan/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <span className="text-[10px] font-bold tracking-widest uppercase text-cyan-400 bg-[#080c1a]/80 px-3 py-1.5 rounded-full border border-cyan-500/30">
            Ver Detalhes
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5 gap-3">
        <h3 className="text-white font-extrabold text-sm uppercase tracking-wider group-hover:text-cyan-400 transition-colors duration-300">
          {project.name}
        </h3>
        <p className="text-gray-500 text-xs leading-relaxed flex-1 line-clamp-3">
          {project.description}
        </p>

        {/* Tech tags (first 4) */}
        <div className="flex flex-wrap gap-1.5">
          {project.tools.slice(0, 4).map((tool, i) => (
            <span key={i} className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#0d1224] border border-[#1f2a4a] text-cyan-300">
              {tool}
            </span>
          ))}
          {project.tools.length > 4 && (
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#0d1224] border border-[#1f2a4a] text-gray-500">
              +{project.tools.length - 4}
            </span>
          )}
        </div>

        {/* Action bar */}
        <div className="flex gap-2 pt-2 border-t border-[#1a2040]">
          {project.code ? (
            <Link
              href={project.code}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-2 text-xs font-bold uppercase tracking-wider border border-pink-500/40 text-pink-400 hover:bg-pink-500/10 hover:border-pink-400 rounded-lg transition-all duration-200"
              onClick={e => e.stopPropagation()}
            >
              <FaGithub size={13} />
              Código
            </Link>
          ) : (
            <span className="flex-1 flex items-center justify-center gap-2 py-2 text-xs font-bold uppercase tracking-wider border border-gray-700 text-gray-600 rounded-lg cursor-not-allowed opacity-50">
              <FaGithub size={13} />
              Código
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

const Projects = () => {
  const [activeTech, setActiveTech] = useState('Todos');
  const [selectedProject, setSelectedProject] = useState(null);

  const visibleProjects = projectsData.filter(p => p.id !== 4);

  const filtered = activeTech === 'Todos'
    ? visibleProjects
    : visibleProjects.filter(p => p.tools.includes(activeTech));

  // Only show techs that appear in visible projects
  const visibleTechs = ['Todos', ...Array.from(new Set(visibleProjects.flatMap(p => p.tools)))];

  return (
    <div id='projects' className="relative z-50 my-12 lg:my-24 border-t border-[#25213b]">
      <div className="w-[80px] h-[80px] bg-primary-purple rounded-full absolute -top-3 left-0 translate-x-1/2 filter blur-3xl opacity-30" />

      <div className="flex justify-center -translate-y-[1px]">
        <div className="w-3/4">
          <div className="h-[1px] bg-gradient-to-r from-transparent via-primary-purple to-transparent w-full" />
        </div>
      </div>

      {/* Header */}
      <div className="flex flex-col items-center my-8 lg:py-4 gap-2">
        <h2 className="text-2xl lg:text-4xl font-extrabold tracking-widest text-white uppercase flex items-center gap-3">
          <HiSparkles className="text-primary-cyan" />
          DIÁRIO DE QUESTS
          <HiSparkles className="text-primary-purple" />
        </h2>
        <p className="text-primary-cyan font-mono text-sm">
          {'>'} missões completadas e ativas
        </p>
      </div>

      {/* Tech filter */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {visibleTechs.map(tech => (
          <button
            key={tech}
            onClick={() => setActiveTech(tech)}
            className={`text-xs font-bold tracking-widest uppercase px-3 py-1.5 rounded-full border transition-all duration-200 ${
              activeTech === tech
                ? 'border-cyan-400 text-cyan-400 bg-cyan-400/10 shadow-[0_0_12px_rgba(6,182,212,0.2)]'
                : 'border-gray-700/60 text-gray-500 hover:border-gray-500 hover:text-gray-300'
            }`}
          >
            {tech}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
        {filtered.length > 0 ? (
          filtered.map((project) => (
            <ProjectCard key={project.id} project={project} onClick={setSelectedProject} />
          ))
        ) : (
          <div className="col-span-3 text-center py-16 text-gray-600 font-mono text-sm">
            {'>'} Nenhum projeto com essa tecnologia ainda...
          </div>
        )}
      </div>

      {/* More projects card */}
      <div className="mt-6 border border-dashed border-[#1a2040] rounded-xl p-8 flex flex-col items-center justify-center gap-3 text-center hover:border-cyan-500/30 transition-colors duration-300">
        <FaCode size={28} className="text-[#1a3050]" />
        <p className="text-gray-600 text-sm font-mono">{'>'} mais projetos em desenvolvimento...</p>
        <Link
          href="https://github.com/Siegrain12"
          target="_blank"
          className="text-xs font-bold uppercase tracking-wider text-cyan-500 hover:text-cyan-300 transition-colors border border-cyan-500/30 hover:border-cyan-400/50 px-4 py-2 rounded-full"
        >
          Ver GitHub completo →
        </Link>
      </div>

      {/* Modal */}
      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}
    </div>
  );
};

export default Projects;