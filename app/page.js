import { personalData } from "@/utilitários/data/personal-data";
import AboutSection from "./components/homepage/about";
import Blog from "./components/homepage/blog";
import ContactSection from "./components/homepage/contact";
import Education from "./components/homepage/education";
import Experience from "./components/homepage/experience";
import HeroSection from "./components/homepage/hero-section";
import Projects from "./components/homepage/projects";
import Skills from "./components/homepage/skills";

async function getData() {
  if (!personalData.devUsername) {
    return [];
  }

  // O blog é uma seção opcional: se o dev.to estiver fora do ar ou mudar a API,
  // a seção some em vez de derrubar a página inteira.
  try {
    const res = await fetch(
      `https://dev.to/api/articles?username=${personalData.devUsername}`,
      { next: { revalidate: 3600 } }
    );

    if (!res.ok) return [];

    const data = await res.json();

    if (!Array.isArray(data)) return [];

    return data.filter((item) => item?.cover_image);
  } catch (error) {
    console.error('Falha ao buscar artigos do dev.to:', error.message);
    return [];
  }
};

export default async function Home() {
  const blogs = await getData();

  return (
    <div suppressHydrationWarning >
      <HeroSection />
      <AboutSection />
      <Experience />
      <Skills />
      <Projects />
      <Education />
      {blogs.length > 0 && <Blog blogs={blogs} />}
      <ContactSection />
    </div>
  )
};