import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../../../api/client";

export default function Section6() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["section6-posts"],
    queryFn: () => getPosts(6), // fetch posts for this section
  });

  if (isLoading) return <p className="p-6">Loading...</p>;
  if (isError)
    return (
      <p className="p-6 text-red-500">Error loading section: {error.message}</p>
    );

  const postsArray = Object.values(data?.articles || []);
  if (postsArray.length < 5) return null; // ensure enough articles

  const featuredArticle = postsArray[0];
  const smallCards = postsArray.slice(1, 5);

  return (
    <section className="w-full py-8 px-4 sm:px-6 sm:py-8 lg:py-10">
      <div className="max-w-[1220px] mx-auto ">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="flex items-center font-bold text-xl">
            <span className="w-3 h-3 bg-teal-500 rounded-sm mr-2"></span>
            World Series
          </h2>
          <span className="text-red-600 hover:underline cursor-pointer">
            Find more →
          </span>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Left Big Card */}
          {featuredArticle && (
            <Link
              to={`/article/${featuredArticle.slug}`}
              className="lg:col-span-2 relative rounded-xl overflow-hidden group h-80 sm:h-[400px] lg:h-[600px]">
              <img
                src={
                  featuredArticle.featuredImage ||
                  "https://placehold.co/600x600"
                }
                alt={featuredArticle.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent p-6 flex flex-col justify-end">
                {featuredArticle.category && (
                  <span className="w-fit inline-block px-3 py-1 bg-white text-blue-600 text-xs font-semibold rounded-full mb-3">
                    {featuredArticle.category}
                  </span>
                )}
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3 hover:underline cursor-pointer">
                  {featuredArticle.title}
                </h3>
                {featuredArticle.excerpt && (
                  <p className="text-gray-200 text-sm mb-4">
                    {featuredArticle.excerpt}
                  </p>
                )}
                <div className="flex items-center text-gray-300 text-xs">
                  <span>{featuredArticle.author?.name || "Unknown"}</span>
                  <span className="mx-2">•</span>
                  <span>
                    {featuredArticle.createdAt
                      ? new Date(featuredArticle.createdAt).toLocaleDateString()
                      : "Recent"}
                  </span>
                </div>
              </div>
            </Link>
          )}

          {/* Right Small Cards */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {smallCards.map((article, idx) => (
              <Link
                key={article._id}
                to={`/article/${article.slug}`}
                className={`border rounded-xl p-5 shadow-sm hover:shadow-md transition group ${
                  idx >= 2 ? "sm:col-span-2 lg:col-span-1" : ""
                }`}>
                {article.category && (
                  <span
                    className={`flex items-center font-medium text-sm mb-2 ${
                      article.categoryColor || "text-green-600"
                    }`}>
                    ● {article.category}
                  </span>
                )}
                <h3 className="font-bold text-lg mb-2 hover:underline hover:text-blue-600">
                  {article.title}
                </h3>
                {article.excerpt && (
                  <p className="text-sm text-gray-600 mb-4">
                    {article.excerpt}
                  </p>
                )}
                <div className="flex items-center text-xs text-gray-500">
                  <span>{article.author?.name || "Unknown"}</span>
                  <span className="mx-2">•</span>
                  <span>
                    {article.createdAt
                      ? new Date(article.createdAt).toLocaleDateString()
                      : "Recent"}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
