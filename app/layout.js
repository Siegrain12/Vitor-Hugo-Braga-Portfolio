import { GoogleTagManager } from "@next/third-parties/google";
import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Assistant from "./components/assistant";
import Footer from "./components/footer";
import ScrollToTop from "./components/helper/scroll-to-top";
import CursorGlow from "./components/helper/cursor-glow";
import Navbar from "./components/navbar";
import "./css/card.scss";
import "./css/globals.scss";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://vitor-hugo-braga-portfolio.vercel.app'),
  title: "Vitor Hugo Braga | Desenvolvedor Back-end",
  description:
    "Sou Vitor Hugo Braga, desenvolvedor com foco em back-end, APIs REST e banco de dados. Tenho experiência com Node.js, Firebase e desenvolvimento de sistemas, além de atuar com testes, análise e melhoria de sistemas. Atualmente curso Análise e Desenvolvimento de Sistemas pela PUC Minas.",
  openGraph: {
    title: "Vitor Hugo Braga | Desenvolvedor Back-end",
    description:
      "Sou Vitor Hugo Braga, desenvolvedor com foco em back-end, APIs REST e banco de dados. Tenho experiência com Node.js, Firebase e desenvolvimento de sistemas, além de atuar com testes, análise e melhoria de sistemas.",
    url: "https://github.com/Siegrain12",
    siteName: "Vitor Hugo Braga | Portfólio",
    images: [
      {
        url: "/image/logo.png",
        width: 800,
        height: 800,
        alt: "Vitor Hugo Braga Logo",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vitor Hugo Braga | Desenvolvedor Back-end",
    description:
      "Sou Vitor Hugo Braga, desenvolvedor com foco em back-end, APIs REST e banco de dados. Tenho experiência com Node.js, Firebase e desenvolvimento de sistemas, além de atuar com testes, análise e melhoria de sistemas.",
    images: ["/image/logo.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <CursorGlow />
        <ToastContainer />
        <main className="min-h-screen relative mx-auto px-6 sm:px-12 lg:max-w-[70rem] xl:max-w-[76rem] 2xl:max-w-[92rem] text-white">
          <Navbar />
          {children}
          <ScrollToTop />
        </main>
        <Footer />
        <Assistant />
      </body>
      <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM} />
    </html>
  );
}