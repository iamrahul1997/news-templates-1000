// component  | big cards on left scrollable verticle sidebar with sticky sidebar on right

import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../../../api/client";

export default function Section7() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["section7-posts"],
    queryFn: () => getPosts(7),
  });

  if (isLoading) return <p className="p-6">Loading...</p>;
  if (isError)
    return (
      <p className="p-6 text-red-500">Error loading section: {error.message}</p>
    );

  const postsArray = Object.values(data?.articles || []);
  if (postsArray.length < 9) return null; // ensure enough articles

  const leftArticles = postsArray.slice(0, 9);
  const featuredArticle = leftArticles[0];
  const smallArticles = leftArticles.slice(1);

  const rightArticles = postsArray.slice(9, 14);

  return (
    <section className="w-full py-8 px-4 sm:px-6 md:px-8 lg:py-10">
      <div className="max-w-[76.5625rem] mx-auto flex flex-col lg:flex-row gap-6">
        {/* Left Column */}
        <div className="flex-shrink-0 w-full lg:w-[52.8125rem] grid grid-cols-1 gap-4">
          {featuredArticle && (
            <Link
              to={`/article/${featuredArticle.slug}`}
              className="relative w-full rounded-md overflow-hidden group">
              <img
                src={
                  featuredArticle.featuredImage ||
                  "https://placehold.co/600x400"
                }
                alt={featuredArticle.title}
                className="w-full h-[28rem] sm:h-[20rem] md:h-[25rem] lg:h-[28rem] object-cover"
              />
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black via-black/70 to-transparent text-white">
                {featuredArticle.category && (
                  <div className="bg-white text-yellow-400 text-xs px-2 py-1 rounded-lg w-fit mb-2">
                    {featuredArticle.category}
                  </div>
                )}
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold leading-tight mt-1 hover:underline">
                  {featuredArticle.title}
                </h2>
                <div className="flex items-center text-xs sm:text-sm text-gray-300 pt-4">
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

          {/* Small Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {smallArticles.map((article) => (
              <Link
                key={article._id}
                to={`/article/${article.slug}`}
                className="bg-white rounded-lg overflow-hidden shadow-sm border group">
                <img
                  src={article.featuredImage || "https://placehold.co/400x300"}
                  alt={article.title}
                  className="w-full h-[12rem] sm:h-[10rem] md:h-[12rem] object-cover"
                />
                <div className="p-4">
                  {article.category && (
                    <span className="text-purple-600 text-sm font-semibold block mb-2">
                      {article.category}
                    </span>
                  )}
                  <h3 className="font-bold text-base sm:text-lg md:text-lg leading-snug mb-3 hover:underline hover:text-blue-600">
                    {article.title}
                  </h3>
                  <div className="flex items-center text-xs sm:text-sm text-gray-500">
                    <span>{article.author?.name || "Unknown"}</span>
                    <span className="mx-2">•</span>
                    <span>
                      {article.createdAt
                        ? new Date(article.createdAt).toLocaleDateString()
                        : "Recent"}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Right Column */}
        <div className="flex-1 lg:sticky lg:top-18 self-start w-full">
          <div className="w-full lg:max-w-[25rem] mx-auto">
            <h2 className="text-lg sm:text-xl font-bold mb-4">Explore More</h2>

            {/* Big Top Card */}
            {rightArticles[0] && (
              <Link
                to={`/article/${rightArticles[0].slug}`}
                className="relative h-[12.5rem] sm:h-[10rem] md:h-[12.5rem] w-full rounded-lg overflow-hidden mb-4 group">
                <img
                  src={
                    rightArticles[0].featuredImage ||
                    "https://placehold.co/400x200"
                  }
                  alt={rightArticles[0].title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40"></div>
                <div className="relative z-10 p-3 flex flex-col justify-end h-full">
                  {rightArticles[0].category && (
                    <span className="bg-green-100 text-green-600 text-xs px-2 py-0.5 rounded-full w-fit mb-2">
                      {rightArticles[0].category}
                    </span>
                  )}
                  <h3 className="text-white font-semibold text-base sm:text-lg md:text-lg leading-snug hover:underline">
                    {rightArticles[0].title}
                  </h3>
                  <div className="flex items-center text-xs sm:text-sm text-gray-200 mt-2 space-x-3">
                    <span>{rightArticles[0].author?.name || "Unknown"}</span>
                    <span>•</span>
                    <span>
                      {rightArticles[0].createdAt
                        ? new Date(
                            rightArticles[0].createdAt
                          ).toLocaleDateString()
                        : "Recent"}
                    </span>
                  </div>
                </div>
              </Link>
            )}

            {/* Small Cards */}
            <div className="space-y-4">
              {rightArticles.slice(1).map((article) => (
                <Link
                  key={article._id}
                  to={`/article/${article.slug}`}
                  className="flex flex-col sm:flex-row h-auto sm:h-[5.625rem] gap-3 group">
                  <img
                    src={article.featuredImage || "https://placehold.co/100x90"}
                    alt={article.title}
                    className="w-full sm:w-[6.25rem] h-[6rem] sm:h-full object-cover rounded-md"
                  />
                  <div className="flex flex-col justify-center mt-2 sm:mt-0">
                    {article.category && (
                      <span className="text-xs font-medium text-blue-600">
                        {article.category}
                      </span>
                    )}
                    <h4 className="font-semibold text-sm leading-snug hover:underline hover:text-blue-600">
                      {article.title.length > 40
                        ? article.title.slice(0, 40) + "…"
                        : article.title}
                    </h4>
                    <span className="text-xs text-gray-500">
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
      </div>
    </section>
  );
}
