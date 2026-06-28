'use client';

import Link from "next/link";
import { useEffect, useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

const navLinks = [
  { label: "SOBRE", href: "/#about", section: "about" },
  { label: "EXPERIÊNCIA", href: "/#experience", section: "experience" },
  { label: "HABILIDADES", href: "/#skills", section: "skills" },
  { label: "PROJETOS", href: "/#projects", section: "projects" },
  { label: "FORMAÇÃO", href: "/#education", section: "education" },
  { label: "CONTATO", href: "/#contact", section: "contact" },
];

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  // Glassmorphism on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Active section detection using IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
    );

    navLinks.forEach(({ section }) => {
      const el = document.getElementById(section);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0d1224]/80 backdrop-blur-xl border-b border-white/5 shadow-[0_4px_30px_rgba(0,0,0,0.4)]'
          : 'bg-transparent'
      }`}
    >
      <div className="flex items-center justify-between py-4 px-1">
        {/* Logo */}
        <div className="flex flex-shrink-0 items-center">
          <Link
            href="/"
            className="group relative text-xl font-extrabold tracking-tight"
            onClick={closeMenu}
          >
            <span className="bg-gradient-to-r from-primary-cyan via-primary-purple to-primary-cyan bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient-x">
              &lt;VHB /&gt;
            </span>
          </Link>
        </div>

        {/* Hamburger */}
        <button
          onClick={toggleMenu}
          className="text-white hover:text-primary-cyan focus:outline-none md:hidden p-2 transition-colors duration-300 rounded-lg hover:bg-white/5"
          aria-label="Alternar menu de navegação"
        >
          {isOpen ? <FiX size={22} /> : <FiMenu size={22} />}
        </button>

        {/* Navigation links */}
        <ul
          className={`
            absolute top-full left-0 w-full bg-[#0d1224]/95 backdrop-blur-xl border border-[#1b2c68a0] md:border-0 rounded-lg p-4 md:p-0 md:bg-transparent md:static md:flex md:w-auto md:flex-row md:space-x-1 transition-all duration-300 ease-in-out
            ${isOpen ? 'opacity-100 flex flex-col scale-100' : 'opacity-0 hidden md:opacity-100 md:flex'}
          `}
          id="navbar-default"
        >
          {navLinks.map(({ label, href, section }) => {
            const isActive = activeSection === section;
            return (
              <li key={section}>
                <Link
                  className="block px-4 py-2 no-underline outline-none hover:no-underline relative group"
                  href={href}
                  onClick={closeMenu}
                >
                  <div
                    className={`text-xs font-bold tracking-widest transition-colors duration-300 ${
                      isActive ? 'text-primary-cyan' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    {label}
                  </div>
                  {/* Active indicator */}
                  <span
                    className={`absolute bottom-0 left-4 right-4 h-[2px] rounded-full bg-gradient-to-r from-primary-cyan to-primary-purple transition-all duration-300 ${
                      isActive ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
                    }`}
                  />
                  {/* Hover indicator */}
                  <span className="absolute bottom-0 left-4 right-4 h-[2px] rounded-full bg-white/10 scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      <style jsx>{`
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient-x {
          animation: gradient-x 4s ease infinite;
        }
      `}</style>
    </nav>
  );
}

export default Navbar;