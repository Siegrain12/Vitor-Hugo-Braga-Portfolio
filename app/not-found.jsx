// @flow strict

import Link from "next/link";

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center gap-6 py-16">
      <div className="w-full max-w-md rounded-xl border border-surface-line bg-surface-sunken overflow-hidden text-left">
        <div className="flex items-center gap-2 px-4 py-3 border-b border-surface-line bg-surface-raised">
          <span className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-green-400/80" />
          <span className="ml-2 text-[11px] font-mono text-gray-500">bash — 80×24</span>
        </div>

        <div className="p-5 font-mono text-sm leading-relaxed">
          <p className="text-gray-400">
            <span className="text-primary-cyan">vitor@portfolio</span>
            <span className="text-gray-600">:~$</span> cd {'"'}essa-pagina{'"'}
          </p>
          <p className="text-red-400 mt-2">
            bash: cd: essa-pagina: No such file or directory
          </p>
          <p className="text-gray-600 mt-2">exit status 404</p>
          <p className="text-gray-400 mt-4">
            <span className="text-primary-cyan">vitor@portfolio</span>
            <span className="text-gray-600">:~$</span>{' '}
            <span className="inline-block w-[7px] h-[14px] align-middle bg-primary-cyan animate-caret" />
          </p>
        </div>
      </div>

      <div>
        <h1 className="text-5xl font-extrabold text-white tracking-widest">404</h1>
        <p className="mt-3 text-gray-400">
          A página que você procura não existe (ou foi refatorada).
        </p>
      </div>

      <Link
        className="flex items-center gap-1 hover:gap-3 rounded-full bg-gradient-purple-cyan px-6 py-3 text-center text-xs md:text-sm font-semibold uppercase tracking-wider text-white no-underline transition-all duration-200 ease-out hover:text-white hover:no-underline"
        href="/"
      >
        cd ~/início
      </Link>
    </div>
  );
};

export default NotFound;
