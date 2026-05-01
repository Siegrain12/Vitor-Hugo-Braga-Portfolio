// @flow strict

import * as React from 'react';

function ProjectCard({ project, onOpenModal }) {

  return (
    <div 
      onClick={() => onOpenModal && onOpenModal(project)}
      className="from-[#0d1224] border-[#1b2c68a0] relative rounded-lg border bg-gradient-to-r to-[#0a0d37] w-full cursor-pointer transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/50 hover:border-purple-500/50 transform hover:scale-105"
    >
      <div className="flex flex-row">
        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-primary-purple to-primary-cyan"></div>
        <div className="h-[1px] w-full bg-gradient-to-r from-primary-cyan to-transparent"></div>
      </div>
      <div className="px-4 lg:px-8 py-3 lg:py-5 relative">
        <div className="flex flex-row space-x-1 lg:space-x-2 absolute top-1/2 -translate-y-1/2">
          <div className="h-2 w-2 lg:h-3 lg:w-3 rounded-full bg-primary-purple"></div>
          <div className="h-2 w-2 lg:h-3 lg:w-3 rounded-full bg-primary-cyan"></div>
          <div className="h-2 w-2 lg:h-3 lg:w-3 rounded-full bg-primary-indigo"></div>
        </div>
        <p className="text-center ml-3 text-primary-cyan text-base lg:text-xl font-semibold">
          {project.name}
        </p>
      </div>
      <div className="overflow-hidden border-t-[2px] border-primary-indigo/30 px-4 lg:px-8 py-4 lg:py-8">
        <code className="font-mono text-xs md:text-sm lg:text-base">
          <div className="blink">
            <span className="mr-2 text-primary-purple">const</span>
            <span className="mr-2 text-white">project</span>
            <span className="mr-2 text-primary-purple">=</span>
            <span className="text-gray-400">{'{'}</span>
          </div>
          <div>
            <span className="ml-4 lg:ml-8 mr-2 text-white">name:</span>
            <span className="text-gray-400">{`'`}</span>
            <span className="text-primary-cyan">{project.name}</span>
            <span className="text-gray-400">{`',`}</span>
          </div>

          <div className="ml-4 lg:ml-8 mr-2">
            <span className=" text-white">tools:</span>
            <span className="text-gray-400">{` ['`}</span>
            {
              project.tools.map((tag, i) => (
                <React.Fragment key={i}>
                  <span className="text-primary-cyan">{tag}</span>
                  {
                    project.tools?.length - 1 !== i &&
                    <span className="text-gray-400">{`', '`}</span>
                  }
                </React.Fragment>
              ))
            }
            <span className="text-gray-400">{"],"}</span>
          </div>
          <div>
            <span className="ml-4 lg:ml-8 mr-2 text-white">myRole:</span>
            <span className="text-primary-indigo">{project.role}</span>
            <span className="text-gray-400">,</span>
          </div>
          <div className="ml-4 lg:ml-8 mr-2">
            <span className="text-white">Descrição:</span>
            <span className="text-primary-cyan">{' ' + project.description.substring(0, 50)}...</span>
            <span className="text-gray-400">,</span>
          </div>
          <div><span className="text-gray-400">{`};`}</span></div>
          <div className="mt-3 text-center">
            <span className="text-primary-cyan text-sm font-semibold">Clique para ver mais detalhes →</span>
          </div>
        </code>
      </div>
    </div>
  );
};

export default ProjectCard;