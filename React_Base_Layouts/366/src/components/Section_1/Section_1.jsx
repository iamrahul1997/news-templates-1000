import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../../../api/client";

export default function TopStoriesSection() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["top-stories"],
    queryFn: () => getPosts(2),
  });

  if (isLoading) return <p className="p-6">Loading...</p>;
  if (isError)
    return (
      <p className="p-6 text-red-500">
        Error loading top stories: {error.message}
      </p>
    );

  const articles = Object.values(data?.articles || []);
  if (articles.length < 18) return null;

  const featured = articles[12];
  const sideArticles = articles.slice(13, 15);
  const bottomArticles = articles.slice(15, 18);

  return (
    <div className="w-full bg-[#f9f9f9] py-12">
      <div className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-6">
        {/* ===== Section Header ===== */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl md:text-4xl font-bold border-l-4 border-pink-500 pl-3">
            Top Stories
          </h2>
          <button className="text-sm font-medium text-gray-600 hover:text-pink-500 transition">
            View All →
          </button>
        </div>

        {/* ===== Asymmetric Grid ===== */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Featured Article */}
          {featured && (
            <Link
              to={`/article/${featured.slug}`}
              className="relative lg:col-span-2 h-[400px] md:h-[500px] rounded-3xl overflow-hidden group">
              <img
                src={featured.featuredImage || "https://placehold.co/800x500"}
                alt={featured.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-6 rounded-3xl">
                <span className="text-pink-500 text-xs uppercase font-semibold">
                  {featured.category || "News"}
                </span>
                <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-2 group-hover:text-pink-400 transition">
                  {featured.title}
                </h2>
                <p className="text-gray-300 text-sm">
                  {featured.author?.name || "Unknown"} •{" "}
                  {featured.createdAt
                    ? new Date(featured.createdAt).toLocaleDateString()
                    : "Recent"}
                </p>
              </div>
            </Link>
          )}

          {/* Right Side Stack */}
          <div className="flex flex-col gap-6">
            {sideArticles.map((article) => (
              <Link
                key={article._id}
                to={`/article/${article.slug}`}
                className="relative h-[190px] md:h-[240px] rounded-2xl overflow-hidden group">
                <img
                  src={article.featuredImage || "https://placehold.co/400x240"}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex flex-col justify-end p-4 rounded-2xl">
                  <span className="text-pink-500 text-xs uppercase font-semibold">
                    {article.category || "News"}
                  </span>
                  <h3 className="text-lg md:text-xl font-bold text-white group-hover:text-pink-400 transition">
                    {article.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom Horizontal Scroll */}
        <div className="mt-10 overflow-x-auto lg:overflow-visible">
          <div className="flex lg:grid lg:grid-cols-3 gap-6">
            {bottomArticles.map((article) => (
              <Link
                key={article._id}
                to={`/article/${article.slug}`}
                className="min-w-[250px] lg:min-w-full bg-white rounded-2xl overflow-hidden shadow-md group flex-shrink-0">
                <div className="h-[160px] overflow-hidden rounded-t-2xl">
                  <img
                    src={
                      article.featuredImage || "https://placehold.co/400x160"
                    }
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-4">
                  <span className="text-pink-500 text-xs uppercase font-semibold">
                    {article.category || "News"}
                  </span>
                  <h3 className="text-base font-bold mt-1 line-clamp-2 group-hover:text-pink-400 transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-xs text-gray-400 mt-2">
                    {article.createdAt
                      ? new Date(article.createdAt).toLocaleDateString()
                      : "Recent"}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
