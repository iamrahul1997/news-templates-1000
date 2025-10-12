import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../../../api/client";

export default function FeaturedStoriesSection() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["featured-stories"],
    queryFn: () => getPosts(4),
  });

  if (isLoading) return <p className="p-6">Loading...</p>;
  if (isError)
    return (
      <p className="p-6 text-red-500">
        Error loading featured stories: {error.message}
      </p>
    );

  const articles = Object.values(data?.articles || []);
  if (articles.length < 39) return null;

  const topArticle = articles[34]; // Full-width top article
  const bottomArticles = articles.slice(35, 39); // 4 smaller articles

  return (
    <div className="w-full bg-[#f9fafb] py-12">
      <div className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl md:text-4xl font-bold border-l-4 border-green-500 pl-3">
            Featured Stories
          </h2>
          <button className="text-sm font-medium text-gray-600 hover:text-green-500 transition">
            View All →
          </button>
        </div>

        {/* Top Article */}
        {topArticle && (
          <Link
            to={`/article/${topArticle.slug}`}
            className="relative w-full h-[400px] md:h-[500px] rounded-3xl overflow-hidden mb-8 group">
            <img
              src={topArticle.featuredImage || "https://placehold.co/1200x500"}
              alt={topArticle.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex flex-col justify-end p-8">
              <span className="text-green-500 text-sm uppercase font-semibold mb-2">
                {topArticle.category || "News"}
              </span>
              <h3 className="text-2xl md:text-4xl font-bold text-white group-hover:text-green-400 transition">
                {topArticle.title}
              </h3>
              <p className="text-xs md:text-sm text-gray-300 mt-1">
                {topArticle.author?.name || "Unknown"} •{" "}
                {topArticle.createdAt
                  ? new Date(topArticle.createdAt).toLocaleDateString()
                  : "Recent"}
              </p>
            </div>
          </Link>
        )}

        {/* Bottom Four Articles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bottomArticles.map((article) => (
            <Link
              key={article._id}
              to={`/article/${article.slug}`}
              className="relative h-[220px] md:h-[250px] rounded-2xl overflow-hidden group">
              <img
                src={article.featuredImage || "https://placehold.co/400x250"}
                alt={article.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent flex flex-col justify-end p-4 rounded-2xl">
                <span className="text-green-500 text-xs uppercase font-semibold">
                  {article.category || "News"}
                </span>
                <h4 className="text-sm md:text-base font-bold text-white group-hover:text-green-400 transition line-clamp-2">
                  {article.title}
                </h4>
                <p className="text-xs text-gray-300 mt-1">
                  {article.author?.name || "Unknown"} •{" "}
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
  );
}
