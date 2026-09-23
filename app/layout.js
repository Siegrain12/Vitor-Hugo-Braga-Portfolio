import { GoogleTagManager } from "@next/third-parties/google";
import { Inter, JetBrains_Mono } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Assistant from "./components/assistant";
import Footer from "./components/footer";
import ScrollToTop from "./components/helper/scroll-to-top";
import CursorGlow from "./components/helper/cursor-glow";
import Navbar from "./components/navbar";
import "./css/globals.css";
import "./css/card.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

const siteUrl =
  process.env.NEXT_PUBLIC_APP_URL || "https://vitor-hugo-braga-portfolio.vercel.app";
const title = "Vitor Hugo Braga | Desenvolvedor Full Stack";
const description =
  "Sou Vitor Hugo Braga, desenvolvedor Full Stack com foco em back-end, APIs REST e banco de dados. Tenho experiência com Node.js, Firebase e desenvolvimento de sistemas, além de atuar com testes, análise e melhoria de sistemas. Atualmente curso Análise e Desenvolvimento de Sistemas pela PUC Minas.";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  keywords: [
    "Vitor Hugo Braga",
    "desenvolvedor full stack",
    "desenvolvedor back-end",
    "React",
    "Next.js",
    "Node.js",
    "Belo Horizonte",
    "portfólio",
  ],
  authors: [{ name: "Vitor Hugo Braga", url: "https://github.com/Siegrain12" }],
  creator: "Vitor Hugo Braga",
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  openGraph: {
    title,
    description,
    url: siteUrl,
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
    title,
    description,
    images: ["/image/logo.png"],
  },
};

export const viewport = {
  themeColor: "#0d1224",
  colorScheme: "dark",
};

export default function RootLayout({ children }) {
  const gtmId = process.env.NEXT_PUBLIC_GTM;

  return (
    <html lang="pt-BR" className={`${inter.variable} ${jetbrains.variable}`}>
      <body className="font-sans antialiased">
        {gtmId && <GoogleTagManager gtmId={gtmId} />}
        <CursorGlow />
        <ToastContainer theme="dark" position="bottom-left" autoClose={4000} />
        <main className="min-h-screen relative mx-auto px-6 sm:px-12 lg:max-w-[70rem] xl:max-w-[76rem] 2xl:max-w-[92rem] text-white">
          <Navbar />
          {children}
          <ScrollToTop />
        </main>
        <Footer />
        <Assistant />
      </body>
    </html>
  );
}
