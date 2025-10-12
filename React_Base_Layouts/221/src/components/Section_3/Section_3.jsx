import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../../../api/client";

export default function Section1() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["section1-posts"],
    queryFn: () => getPosts(1),
  });

  if (isLoading) return <p className="p-6">Loading...</p>;
  if (isError)
    return (
      <p className="p-6 text-red-500">
        Error loading Section 1: {error.message}
      </p>
    );

  const articles = Object.values(data?.articles || []);
  if (articles.length < 10) return null;

  const mainArticle = articles[0];
  const sideArticles = articles.slice(1, 3);
  const gridArticles = articles.slice(3, 11);

  return (
    <div className="w-full text-white">
      <div className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-6 py-6">
        {/* ====== Top Featured Section ====== */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Left: Big Feature */}
          <Link
            to={`/article/${mainArticle.slug}`}
            className="relative md:col-span-2 h-[300px] sm:h-[400px] md:h-[500px] rounded-2xl overflow-hidden group">
            <img
              src={mainArticle.featuredImage || "https://placehold.co/800x500"}
              alt={mainArticle.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-6">
              <h1 className="text-2xl md:text-4xl font-extrabold mb-2 group-hover:text-yellow-400 transition-colors">
                {mainArticle.title}
              </h1>
              <p className="text-sm text-gray-300">
                {mainArticle.author?.name || "Unknown"} •{" "}
                {mainArticle.category || "News"} •{" "}
                {new Date(mainArticle.createdAt).toLocaleDateString()}
              </p>
            </div>
          </Link>

          {/* Right: Two Small Highlights */}
          <div className="flex flex-col gap-4">
            {sideArticles.map((article) => (
              <Link
                key={article._id}
                to={`/article/${article.slug}`}
                className="relative h-[180px] sm:h-[230px] rounded-2xl overflow-hidden group">
                <img
                  src={article.featuredImage || "https://placehold.co/400x250"}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-4">
                  <h2 className="text-lg md:text-xl font-bold group-hover:text-yellow-400 transition-colors">
                    {article.title}
                  </h2>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* ====== Bottom Grid Section ====== */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {gridArticles.map((article) => (
            <Link
              key={article._id}
              to={`/article/${article.slug}`}
              className="bg-[#111] rounded-2xl overflow-hidden hover:shadow-lg hover:shadow-yellow-500/10 group transition-all">
              <div className="h-[180px] sm:h-[200px] overflow-hidden">
                <img
                  src={article.featuredImage || "https://placehold.co/400x250"}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-4">
                <h3 className="text-base md:text-lg font-semibold line-clamp-2 group-hover:text-yellow-400 transition-colors">
                  {article.title}
                </h3>
                <p className="text-xs text-gray-400 mt-2">
                  {article.category || "News"} •{" "}
                  {new Date(article.createdAt).toLocaleDateString()}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
