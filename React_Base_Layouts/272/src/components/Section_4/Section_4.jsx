import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../../../api/client";

export default function Section2() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["section2-posts"],
    queryFn: () => getPosts(2),
  });

  if (isLoading) return <p className="p-6">Loading...</p>;
  if (isError)
    return (
      <p className="p-6 text-red-500">Error loading section: {error.message}</p>
    );

  const postsArray = Object.values(data?.articles || []);
  if (postsArray.length < 6) return null; // Ensure enough articles

  const sectionArticles = postsArray.slice(0, 6);
  const mainArticle = sectionArticles[0];
  const sideArticles = sectionArticles.slice(1, 3);
  const gridArticles = sectionArticles.slice(3);

  return (
    <section className="bg-white text-gray-200 py-12 border-t border-gray-800">
      <div className="max-w-[1400px] mx-auto px-4 md:px-6 space-y-12">
        {/* ========== Top Section (Large + 2 Stacked) ========== */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {/* Left: Main Article */}
          {mainArticle && (
            <Link
              to={`/article/${mainArticle.slug}`}
              className="relative rounded-lg overflow-hidden lg:col-span-2 group">
              <div className="overflow-hidden">
                <img
                  src={
                    mainArticle.featuredImage || "https://placehold.co/800x500"
                  }
                  alt={mainArticle.title}
                  className="w-full h-[450px] md:h-[500px] object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-6">
                <div>
                  <span className="bg-[#00c003] text-black text-xs font-bold px-2 py-1 rounded mb-2 inline-block">
                    {mainArticle.category || "News"}
                  </span>
                  <h2 className="text-2xl md:text-4xl font-bold text-white group-hover:text-[#00c003] transition-colors duration-300">
                    {mainArticle.title}
                  </h2>
                  <p className="text-sm text-gray-300 mt-2 line-clamp-2">
                    {mainArticle.excerpt || "No description available."}
                  </p>
                </div>
              </div>
            </Link>
          )}

          {/* Right: 2 Vertical Medium Articles */}
          <div className="flex flex-col gap-6">
            {sideArticles.map((article, idx) => (
              <Link
                key={idx}
                to={`/article/${article.slug}`}
                className="group bg-[#111] rounded-lg overflow-hidden flex flex-col transition-transform duration-300 hover:scale-[1.02]">
                <div className="overflow-hidden">
                  <img
                    src={
                      article.featuredImage || "https://placehold.co/400x250"
                    }
                    alt={article.title}
                    className="w-full h-[200px] object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="p-4 flex flex-col justify-between">
                  <div>
                    <span className="text-xs text-[#00c003] font-semibold uppercase">
                      {article.category || "News"}
                    </span>
                    <h3 className="text-lg font-semibold mt-1 text-white group-hover:text-[#00c003] transition-colors duration-300 line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-sm text-gray-400 mt-2 line-clamp-2">
                      {article.excerpt || "No description available."}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* ========== Bottom Grid (More Articles) ========== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {gridArticles.map((article, idx) => (
            <Link
              key={idx}
              to={`/article/${article.slug}`}
              className="bg-[#111] rounded-lg overflow-hidden group hover:shadow-[0_0_10px_#00c00360] transition duration-300">
              <div className="overflow-hidden">
                <img
                  src={article.featuredImage || "https://placehold.co/400x250"}
                  alt={article.title}
                  className="w-full h-[220px] object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="p-4">
                <span className="text-xs text-[#00c003] font-semibold uppercase">
                  {article.category || "News"}
                </span>
                <h4 className="font-bold text-base mt-1 text-white group-hover:text-[#00c003] transition-colors duration-300 line-clamp-2">
                  {article.title}
                </h4>
                <p className="text-sm text-gray-400 mt-2 line-clamp-2">
                  {article.excerpt || "No description available."}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
