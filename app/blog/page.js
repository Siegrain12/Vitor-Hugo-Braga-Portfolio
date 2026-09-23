// @flow strict

import { personalData } from "@/utilitários/data/personal-data";
import BlogCard from "../components/homepage/blog/blog-card";

export const metadata = {
  title: "Artigos | Vitor Hugo Braga",
  description: "Artigos escritos por Vitor Hugo Braga.",
};

async function getBlogs() {
  if (!personalData.devUsername) return [];

  try {
    const res = await fetch(
      `https://dev.to/api/articles?username=${personalData.devUsername}`,
      { next: { revalidate: 3600 } }
    );

    if (!res.ok) return [];

    const data = await res.json();
    return Array.isArray(data) ? data.filter((blog) => blog?.cover_image) : [];
  } catch (error) {
    console.error('Falha ao buscar artigos do dev.to:', error.message);
    return [];
  }
};

async function page() {
  const blogs = await getBlogs();

  return (
    <div className="py-8">
      <div className="flex flex-col items-center my-8 lg:py-4 gap-2">
        <h1 className="text-2xl lg:text-4xl font-extrabold tracking-widest text-white uppercase">
          Todos os Artigos
        </h1>
        <p className="text-primary-cyan font-mono text-sm">
          {'>'} cat ~/blog/*.md
        </p>
      </div>

      {blogs.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-5 lg:gap-8 xl:gap-10">
          {blogs.map((blog) => (
            <BlogCard blog={blog} key={blog.id} />
          ))}
        </div>
      ) : (
        <p className="text-center py-16 text-gray-600 font-mono text-sm">
          {'>'} Nenhum artigo publicado ainda...
        </p>
      )}
    </div>
  );
};

export default page;