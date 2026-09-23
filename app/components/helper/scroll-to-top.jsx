"use client";

import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa6";

const SCROLL_THRESHOLD = 300;

const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > SCROLL_THRESHOLD);

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const onClickBtn = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <button
      // bottom-24 e não bottom-6: o botão do assistente ocupa o canto inferior
      // direito, então este fica empilhado acima dele.
      className={`fixed bottom-24 right-6 z-40 flex items-center justify-center w-11 h-11 rounded-full border border-primary-cyan/30 bg-surface-raised text-primary-cyan-light hover:border-primary-cyan hover:shadow-[0_0_18px_rgba(6,182,212,0.35)] hover:scale-110 transition-all duration-300 ${
        visible ? "opacity-100" : "opacity-0 pointer-events-none translate-y-2"
      }`}
      onClick={onClickBtn}
      aria-label="Voltar ao topo"
      tabIndex={visible ? 0 : -1}
    >
      <FaArrowUp size={16} />
    </button>
  );
};

export default ScrollToTop;
