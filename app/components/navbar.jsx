'use client';

import Link from "next/link";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav className="bg-transparent relative z-50">
      <div className="flex items-center justify-between py-5">
        <div className="flex flex-shrink-0 items-center">
          <Link
            href="/"
            className="text-[#16f2b3] text-3xl font-bold"
            onClick={closeMenu}
          >
            Vitor Hugo Braga
          </Link>
        </div>

        {/* Hamburger Menu Button for Mobile */}
        <button
          onClick={toggleMenu}
          className="text-white hover:text-[#16f2b3] focus:outline-none md:hidden p-2 transition-colors duration-300"
          aria-label="Alternar menu de navegação"
        >
          {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>

        {/* Navigation links */}
        <ul
          className={`
            absolute top-full left-0 w-full bg-[#0d1224]/95 border border-[#1b2c68a0] md:border-0 rounded-lg p-4 md:p-0 md:bg-transparent md:static md:flex md:w-auto md:flex-row md:space-x-1 transition-all duration-300 ease-in-out
            ${isOpen ? 'opacity-100 flex flex-col scale-100' : 'opacity-0 hidden md:opacity-100 md:flex'}
          `}
          id="navbar-default"
        >
          <li>
            <Link className="block px-4 py-2 no-underline outline-none hover:no-underline" href="/#about" onClick={closeMenu}>
              <div className="text-sm text-white transition-colors duration-300 hover:text-pink-600">SOBRE</div>
            </Link>
          </li>
          <li>
            <Link className="block px-4 py-2 no-underline outline-none hover:no-underline" href="/#experience" onClick={closeMenu}>
              <div className="text-sm text-white transition-colors duration-300 hover:text-pink-600">EXPERIÊNCIA</div>
            </Link>
          </li>
          <li>
            <Link className="block px-4 py-2 no-underline outline-none hover:no-underline" href="/#skills" onClick={closeMenu}>
              <div className="text-sm text-white transition-colors duration-300 hover:text-pink-600">HABILIDADES</div>
            </Link>
          </li>
          <li>
            <Link className="block px-4 py-2 no-underline outline-none hover:no-underline" href="/#education" onClick={closeMenu}>
              <div className="text-sm text-white transition-colors duration-300 hover:text-pink-600">FORMAÇÃO</div>
            </Link>
          </li>
          <li>
            <Link className="block px-4 py-2 no-underline outline-none hover:no-underline" href="/blog" onClick={closeMenu}>
              <div className="text-sm text-white transition-colors duration-300 hover:text-pink-600">BLOG</div>
            </Link>
          </li>
          <li>
            <Link className="block px-4 py-2 no-underline outline-none hover:no-underline" href="/#projects" onClick={closeMenu}>
              <div className="text-sm text-white transition-colors duration-300 hover:text-pink-600">PROJETOS</div>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;