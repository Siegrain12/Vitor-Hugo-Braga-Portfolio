'use client';

import { useState } from 'react';
import { MdClose } from 'react-icons/md';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

export default function ProjectModal({ project, isOpen, onClose }) {
  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-[#0d1224] rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-primary-cyan/20 animate-in fade-in zoom-in duration-300">
        {/* Header com título e botão fechar */}
        <div className="sticky top-0 bg-gradient-to-r from-[#0d1224] to-[#1a1443] border-b border-primary-cyan/20 p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold bg-gradient-purple-cyan bg-clip-text text-transparent">
            {project.name}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-primary-cyan transition-colors p-2 hover:bg-purple-500/10 rounded-full"
          >
            <MdClose size={24} />
          </button>
        </div>

        {/* Conteúdo */}
        <div className="p-6 space-y-6">
          {/* Descrição */}
          <div>
            <h3 className="text-sm font-semibold text-primary-cyan uppercase tracking-wider mb-3">
              Descrição
            </h3>
            <p className="text-gray-300 leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Papel/Role */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-primary-purple/10 rounded-lg p-4 border border-primary-purple/20">
              <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">
                Seu Papel
              </p>
              <p className="text-primary-purple font-semibold">
                {project.role}
              </p>
            </div>
            <div className="bg-primary-indigo/10 rounded-lg p-4 border border-primary-indigo/20">
              <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">
                Projeto
              </p>
              <p className="text-primary-indigo font-semibold">
                {project.id === 1 && 'Planit'}
                {project.id === 2 && 'VetConnect'}
                {project.id === 3 && 'SoluPlay'}
                {project.id === 4 && 'Portfólio'}
              </p>
            </div>
          </div>

          {/* Tecnologias */}
          <div>
            <h3 className="text-sm font-semibold text-primary-cyan uppercase tracking-wider mb-3">
              Tecnologias Utilizadas
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {project.tools.map((tool, index) => (
                <div
                  key={index}
                  className="bg-gradient-indigo-purple bg-opacity-10 rounded-lg px-3 py-2 border border-indigo-500/20 text-center"
                >
                  <span className="text-sm text-gray-300 font-medium">
                    {tool}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Botões de Ação */}
          <div className="flex gap-4 pt-4 border-t border-primary-cyan/20">
            {project.code ? (
              <a
                href={project.code}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-gradient-purple-cyan hover:shadow-lg hover:shadow-cyan-500/50 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
              >
                <FaGithub size={18} />
                Ver Código
              </a>
            ) : (
              <button className="flex-1 bg-gray-700 text-gray-400 font-semibold py-3 px-4 rounded-lg cursor-not-allowed opacity-50 flex items-center justify-center gap-2">
                <FaGithub size={18} />
                Código Disponível em Breve
              </button>
            )}

            {project.demo ? (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-gradient-indigo-purple hover:shadow-lg hover:shadow-purple-500/50 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
              >
                <FaExternalLinkAlt size={16} />
                Ver Demo
              </a>
            ) : (
              <button className="flex-1 bg-gray-700 text-gray-400 font-semibold py-3 px-4 rounded-lg cursor-not-allowed opacity-50 flex items-center justify-center gap-2">
                <FaExternalLinkAlt size={16} />
                Demo em Breve
              </button>
            )}
          </div>

          {/* Nota */}
          <div className="bg-primary-cyan/10 rounded-lg p-4 border border-primary-cyan/20 text-sm text-gray-400">
            <p>
              💡 <span className="text-primary-cyan font-semibold">Dica:</span> Você pode adicionar os links do GitHub e Demo nos arquivos de dados do projeto.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
