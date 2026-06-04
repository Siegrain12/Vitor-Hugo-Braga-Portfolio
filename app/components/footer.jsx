// @flow strict
import Link from 'next/link';

function Footer() {
  return (
    <div className="relative border-t bg-[#0d1224] border-[#353951] text-white">
      <div className="mx-auto px-6 sm:px-12 lg:max-w-[70rem] xl:max-w-[76rem] 2xl:max-w-[92rem] py-6 lg:py-10">
        <div className="flex justify-center -z-40">
          <div className="absolute top-0 h-[1px] w-1/2  bg-gradient-to-r from-transparent via-violet-500 to-transparent"></div>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between">
          <p className="text-sm">
            © Portfólio de Desenvolvedor por <Link target="_blank" href="https://www.linkedin.com/in/vitor-hugo-braga-da-silva-b40842257/" className="text-[#16f2b3]">Vitor Hugo Braga</Link>
          </p>
        </div>
      </div>
    </div >
  );
};

export default Footer;