// component  | left vertical scroll with right sticky sidebar

import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../../../api/client";

export default function Section5() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["section5-posts"],
    queryFn: () => getPosts(5),
  });

  if (isLoading) return <p className="p-6">Loading...</p>;
  if (isError)
    return (
      <p className="p-6 text-red-500">
        Error loading Section 5: {error.message}
      </p>
    );

  const postsArray = Object.values(data?.articles || []);
  const mainArticles = postsArray.slice(0, 7); // Left column articles
  const trendingArticles = postsArray.slice(6, 12); // Right sidebar trending

  return (
    <div className="w-full bg-white py-12">
      <div className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-8">
          {/* Big Article Top */}
          {mainArticles[0] && (
            <div className="relative h-[400px] md:h-[500px] rounded-3xl overflow-hidden group">
              <Link to={`/article/${mainArticles[0].slug}`}>
                <img
                  src={
                    mainArticles[0].featuredImage ||
                    "https://placehold.co/1200x500"
                  }
                  alt={mainArticles[0].title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex flex-col justify-end p-8">
                  <span className="text-blue-400 text-sm uppercase font-semibold mb-2">
                    {mainArticles[0].category || "News"}
                  </span>
                  <h2 className="text-2xl md:text-4xl font-bold text-white group-hover:text-blue-300 transition">
                    {mainArticles[0].title}
                  </h2>
                  <p className="text-xs md:text-sm text-gray-300 mt-1">
                    {mainArticles[0].author?.name || "Unknown"} •{" "}
                    {mainArticles[0].createdAt
                      ? new Date(mainArticles[0].createdAt).toLocaleDateString()
                      : "Recent"}
                  </p>
                </div>
              </Link>
            </div>
          )}

          {/* Smaller Articles Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {mainArticles.slice(1).map((article) => (
              <div
                key={article._id}
                className="relative h-[220px] md:h-[250px] rounded-2xl overflow-hidden group">
                <Link to={`/article/${article.slug}`}>
                  <img
                    src={
                      article.featuredImage || "https://placehold.co/400x250"
                    }
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent flex flex-col justify-end p-4 rounded-2xl">
                    <span className="text-blue-400 text-xs uppercase font-semibold">
                      {article.category || "News"}
                    </span>
                    <h3 className="text-sm md:text-base font-bold text-white group-hover:text-blue-300 line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-xs text-gray-300 mt-1">
                      {article.author?.name || "Unknown"} •{" "}
                      {article.createdAt
                        ? new Date(article.createdAt).toLocaleDateString()
                        : "Recent"}
                    </p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column (Sticky Trending) */}
        <aside className="lg:col-span-1 lg:sticky lg:top-24 self-start space-y-6">
          <h3 className="text-xl font-bold text-gray-800 border-b-2 border-blue-400 pb-2">
            Trending
          </h3>

          {trendingArticles.map((article, idx) => (
            <Link
              key={article._id}
              to={`/article/${article.slug}`}
              className="flex gap-3 hover:bg-gray-50 rounded-md p-2 transition">
              <div className="flex-shrink-0 w-24 h-24 overflow-hidden rounded-lg">
                <img
                  src={article.featuredImage || "https://placehold.co/100x100"}
                  alt={article.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col justify-center">
                <span className="text-xs text-blue-500 font-semibold">
                  {article.category || "News"}
                </span>
                <h4 className="text-sm font-bold line-clamp-2 hover:text-blue-400">
                  {article.title}
                </h4>
                <span className="text-xs text-gray-400">
                  {article.createdAt
                    ? new Date(article.createdAt).toLocaleDateString()
                    : "Recent"}
                </span>
              </div>
            </Link>
          ))}
        </aside>
      </div>
    </div>
  );
}
