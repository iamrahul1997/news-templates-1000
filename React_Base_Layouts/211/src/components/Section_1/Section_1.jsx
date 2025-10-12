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
  if (postsArray.length < 26) return null; // ensure enough articles

  const featuredArticle = postsArray[18];
  const middleArticles = postsArray.slice(19, 21);
  const rightArticles = postsArray.slice(21, 26);

  return (
    <section className="w-full py-6 sm:py-8 lg:py-10">
      <div className="mx-auto max-w-[76.25rem] px-2 sm:px-4 md:px-6 lg:px-0 xl:px-0">
        {/* Section Title */}
        <div className="flex items-center mb-6">
          <div className="flex-1 border-t border-gray-400"></div>
          <div className="text-[1.125rem] bg-pink-600 text-white font-bold text-center px-4 py-1 tracking-wider mx-4">
            ENTERTAINMENT
          </div>
          <div className="flex-1 border-t border-gray-400"></div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[32.5rem_1fr_1fr] gap-6">
          {/* Left Column (Featured) */}
          {featuredArticle && (
            <Link
              to={`/article/${featuredArticle.slug}`}
              className="relative font-sans group overflow-hidden rounded-lg w-full">
              <div className="w-full h-full">
                <img
                  src={
                    featuredArticle.featuredImage ||
                    "https://placehold.co/800x600"
                  }
                  alt={featuredArticle.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 bg-gradient-to-t from-black via-black/70 to-transparent text-white rounded-b-lg">
                <div className="text-xs sm:text-sm font-semibold uppercase mb-1">
                  <span className="opacity-75">{featuredArticle.category}</span>
                  <span className="opacity-50">
                    {" "}
                    /{" "}
                    {featuredArticle.createdAt
                      ? new Date(featuredArticle.createdAt).toLocaleDateString()
                      : "Recent"}
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold leading-snug mt-1 transition-colors duration-300 group-hover:text-pink-600">
                  {featuredArticle.title}
                </h2>
                {featuredArticle.excerpt && (
                  <p className="text-xs sm:text-sm opacity-90 mt-2 line-clamp-3">
                    {featuredArticle.excerpt}
                  </p>
                )}
              </div>
            </Link>
          )}

          {/* Middle Column */}
          <div className="space-y-4 max-w-full">
            {middleArticles.map((item, index) => (
              <Link
                key={item._id || index}
                to={`/article/${item.slug}`}
                className="group overflow-hidden rounded-lg block">
                <div className="relative h-[11rem] sm:h-[12rem] md:h-[14rem] lg:h-[16rem] w-full overflow-hidden">
                  <img
                    src={item.featuredImage || "https://placehold.co/600x400"}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity" />
                </div>
                <div className="mt-2">
                  <div className="text-xs text-gray-500 uppercase font-semibold">
                    {item.category} /{" "}
                    {item.createdAt
                      ? new Date(item.createdAt).toLocaleDateString()
                      : "Recent"}
                  </div>
                  <h3 className="text-sm sm:text-base font-bold mt-1 leading-tight transition-colors duration-300 group-hover:text-pink-600">
                    {item.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>

          {/* Right Column */}
          <div className="max-w-sm space-y-4">
            {rightArticles.map((item, index) => (
              <Link
                key={item._id || index}
                to={`/article/${item.slug}`}
                className="flex items-center space-x-3 sm:space-x-4 group overflow-hidden rounded-lg">
                <div className="relative w-20 h-20 flex-shrink-0 overflow-hidden rounded-lg">
                  <img
                    src={item.featuredImage || "https://placehold.co/100x100"}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity" />
                </div>
                <div className="flex-1">
                  <div className="text-xs text-gray-500 uppercase font-semibold">
                    {item.category} /{" "}
                    {item.createdAt
                      ? new Date(item.createdAt).toLocaleDateString()
                      : "Recent"}
                  </div>
                  <div className="text-sm font-semibold mt-1 line-clamp-2 transition-colors duration-300 group-hover:text-pink-600">
                    {item.title}
                  </div>
                </div>
              </Link>
            ))}

            {/* More Button */}
            <div className="flex justify-start mt-6">
              <Link
                to="/entertainment"
                className="flex items-center text-pink-600 font-bold uppercase text-xs hover:text-pink-700 transition-colors">
                MORE ENTERTAINMENT
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
      </div>
    </section>
  );
}
