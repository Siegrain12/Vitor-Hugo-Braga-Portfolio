// @flow strict
'use client';

import { projectsData } from '@/utilitários/data/projects-data';
import Link from 'next/link';
import { FaGithub, FaExternalLinkAlt, FaCode } from 'react-icons/fa';
import { GiSwordman } from 'react-icons/gi';
import { useState } from 'react';

function ProjectCard({ project }) {
  const hasImage = project.image;

  return (
    <div className="group flex flex-col bg-[#080c1a] border border-[#1a2040] rounded-lg overflow-hidden transition-all duration-300 hover:border-cyan-500/50 hover:shadow-[0_0_25px_rgba(0,229,255,0.12)]">

      {/* Thumbnail area */}
      <div className="relative h-44 bg-[#0a0e1a] flex items-center justify-center overflow-hidden">
        {hasImage ? (
          <img src={project.image} alt={project.name} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" />
        ) : (
          <div className="flex flex-col items-center gap-3 text-[#1a3050]">
            <FaCode size={52} className="group-hover:text-cyan-800 transition-colors duration-300" />
          </div>
        )}
        {/* Top line decoration */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        {/* Bottom status badge */}
        <div className="absolute bottom-2 right-2 bg-green-500/20 border border-green-500/40 text-green-400 text-[10px] font-bold px-2 py-0.5 rounded tracking-widest uppercase">
          {project.demo ? 'ATIVO' : project.code ? 'CONCLUÍDO' : 'EM DEV'}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5 gap-4">
        <h3 className="text-white font-extrabold text-base uppercase tracking-wider group-hover:text-cyan-400 transition-colors duration-300">
          {project.name}
        </h3>

        <p className="text-gray-400 text-sm leading-relaxed flex-1">
          {project.description}
        </p>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-1.5">
          {project.tools.map((tool, i) => (
            <span
              key={i}
              className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#0d1224] border border-[#1f2a4a] text-cyan-300"
            >
              {tool}
            </span>
          ))}
        </div>

        {/* Action buttons */}
        <div className="flex gap-2 mt-auto pt-2 border-t border-[#1a2040]">
          {project.code ? (
            <Link
              href={project.code}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-2 text-xs font-bold uppercase tracking-wider border border-pink-500/50 text-pink-400 hover:bg-pink-500/10 hover:border-pink-400 rounded transition-all duration-200"
            >
              <FaGithub size={14} />
              CÓDIGO
            </Link>
          ) : (
            <span className="flex-1 flex items-center justify-center gap-2 py-2 text-xs font-bold uppercase tracking-wider border border-gray-700 text-gray-600 rounded cursor-not-allowed opacity-50">
              <FaGithub size={14} />
              CÓDIGO
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

const Projects = () => {
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
        <h2 className="text-2xl lg:text-4xl font-extrabold tracking-widest text-white uppercase">
          DIÁRIO DE QUESTS
        </h2>
        <p className="text-primary-cyan font-mono text-sm">
          {'>'} missões completadas e ativas
        </p>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
        {projectsData.filter(p => p.id !== 4).map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      {/* "More projects" card */}
      <div className="mt-6 border border-dashed border-[#1a2040] rounded-lg p-8 flex flex-col items-center justify-center gap-3 text-center hover:border-cyan-500/30 transition-colors duration-300">
        <FaCode size={32} className="text-[#1a3050]" />
        <p className="text-gray-500 text-sm font-mono">{'>'} mais projetos em desenvolvimento...</p>
        <Link
          href="https://github.com/Siegrain12"
          target="_blank"
          className="text-xs font-bold uppercase tracking-wider text-cyan-500 hover:text-cyan-300 transition-colors border border-cyan-500/30 hover:border-cyan-400/50 px-4 py-2 rounded"
        >
          Ver GitHub completo →
        </Link>
      </div>
    </div>
  );
};

export default Projects;