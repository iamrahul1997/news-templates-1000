import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../../../api/client";

export default function Section4() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["section4-posts"],
    queryFn: () => getPosts(4),
  });

  if (isLoading) return <p className="p-6">Loading...</p>;
  if (isError)
    return (
      <p className="p-6 text-red-500">Error loading section: {error.message}</p>
    );

  const postsArray = Object.values(data?.articles || []);
  if (postsArray.length < 8) return null;

  const featuredArticle = postsArray[0]; // featured
  const leftArticles = postsArray.slice(1, 3);
  const rightArticles = postsArray.slice(3, 7);

  return (
    <section className="w-full py-6 lg:py-10 bg-white px-2 sm:px-4 lg:px-0 xl:px-0">
      {/* Section Title */}
      <div className="max-w-[76.25rem] mx-auto flex items-center mt-6">
        <div className="flex-1 border-t border-gray-400"></div>
        <div className="text-[18px] bg-pink-600 text-white font-bold text-center px-4 py-1 tracking-wider mx-4">
          BUSINESS
        </div>
        <div className="flex-1 border-t border-gray-400"></div>
      </div>

      {/* Grid Layout */}
      <div className="max-w-[76.25rem] mx-auto mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1fr_32.5rem_1fr] gap-6 mb-8">
        {/* Left Column */}
        <div>
          <div className="space-y-4 w-full">
            {leftArticles.map((article) => (
              <Link
                key={article._id}
                to={`/article/${article.slug}`}
                className="block">
                <div className="relative overflow-hidden rounded-md">
                  <img
                    src={
                      article.featuredImage || "https://placehold.co/400x300"
                    }
                    alt={article.title}
                    className="w-full h-[11.25rem] sm:h-[12rem] object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <div className="mt-2">
                  <div className="text-xs text-gray-500 uppercase font-semibold">
                    {article.category} /{" "}
                    {article.createdAt
                      ? new Date(article.createdAt).toLocaleDateString()
                      : "Recent"}
                  </div>
                  <h3 className="text-sm sm:text-base font-bold mt-1 leading-tight hover:text-pink-600 transition-colors">
                    {article.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Middle Column - Featured Article */}
        {featuredArticle && (
          <Link
            to={`/article/${featuredArticle.slug}`}
            className="relative font-sans block">
            <div className="relative overflow-hidden rounded-md">
              <img
                src={
                  featuredArticle.featuredImage ||
                  "https://placehold.co/600x400"
                }
                alt={featuredArticle.title}
                className="w-full h-full sm:h-[35rem] lg:h-[35rem] object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black via-black/70 to-transparent text-white rounded-b-md">
              <div className="text-xs sm:text-sm font-semibold uppercase mb-1">
                <span className="text-white opacity-75">
                  {featuredArticle.category}
                </span>
                <span className="text-white opacity-50">
                  {" "}
                  /{" "}
                  {featuredArticle.createdAt
                    ? new Date(featuredArticle.createdAt).toLocaleDateString()
                    : "Recent"}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold leading-snug mt-1 hover:text-pink-600 transition-colors">
                {featuredArticle.title}
              </h2>
              {featuredArticle.excerpt && (
                <p className="text-xs sm:text-sm opacity-90 mt-2">
                  {featuredArticle.excerpt}
                </p>
              )}
            </div>
          </Link>
        )}

        {/* Right Column */}
        <div className="max-w-sm space-y-4">
          {rightArticles.map((article) => (
            <Link
              key={article._id}
              to={`/article/${article.slug}`}
              className="flex items-center space-x-3 sm:space-x-4 block">
              <div className="relative w-20 h-20 flex-shrink-0 overflow-hidden rounded-md">
                <img
                  src={article.featuredImage || "https://placehold.co/100x100"}
                  alt={article.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              <div className="flex-1">
                <div className="text-xs text-gray-500 uppercase font-semibold">
                  {article.category} /{" "}
                  {article.createdAt
                    ? new Date(article.createdAt).toLocaleDateString()
                    : "Recent"}
                </div>
                <div className="text-sm font-semibold mt-1 hover:text-pink-600 transition-colors">
                  {article.title}
                </div>
              </div>
            </Link>
          ))}

          {/* More Button */}
          <div className="flex justify-start mt-6">
            <Link
              to="/"
              className="flex items-center text-pink-600 font-bold uppercase text-xs hover:text-pink-700 transition-colors">
              MORE NEWS
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 ml-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
