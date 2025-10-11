import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../../../api/client";

export default function Section1() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["section1-posts"],
    queryFn: () => getPosts(1), // fetch posts for Section1
  });

  if (isLoading) return <p className="p-6">Loading...</p>;
  if (isError)
    return (
      <p className="p-6 text-red-500">Error loading section: {error.message}</p>
    );

  const postsArray = Object.values(data?.articles || []);
  if (postsArray.length < 18) return null; // ensure enough articles

  // Distribute articles
  const trendingArticles = postsArray.slice(0, 5); // Left column
  const featuredArticle = postsArray[5]; // Middle big
  const middleArticles = postsArray.slice(6, 9); // Middle below featured
  const latestArticles = postsArray.slice(9, 18); // Right column

  return (
    <section className="w-full">
      <div
        className="
          max-w-[76.25rem] mx-auto
          px-2 sm:px-4 md:px-6 xl:px-0
          py-6 sm:py-8 lg:py-10
          grid grid-cols-1
          lg:grid-cols-[1fr_1.3fr]
          xl:grid-cols-[1fr_minmax(20rem,32rem)_1fr]
          gap-8
        ">
        {/* LEFT COLUMN - TRENDING */}
        <div>
          <div className="w-full">
            <div className="relative inline-block mb-4">
              <div className="relative bg-pink-600 text-white font-bold text-lg px-4 py-1 z-10">
                TRENDING
              </div>
              <div className="absolute top-0 right-[-10px] w-4 h-full bg-pink-600 transform skew-x-[25deg]" />
            </div>

            {trendingArticles.map((item, index) => (
              <Link
                to={`/article/${item.slug}`}
                key={item._id || index}
                className="space-y-2 mb-4 group block">
                <div className="relative overflow-hidden rounded-md">
                  <img
                    src={item.featuredImage || "https://placehold.co/400x250"}
                    alt={item.title}
                    className="w-full h-[160px] sm:h-[180px] lg:h-[190px] object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex items-start space-x-4">
                  <div className="text-3xl font-bold text-gray-300">
                    {index + 1}
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 uppercase font-semibold">
                      {item.category} /{" "}
                      {item.createdAt
                        ? new Date(item.createdAt).toLocaleDateString()
                        : "Recent"}
                    </div>
                    <h3
                      className="
                        text-[15px] sm:text-[16px] font-bold mt-1 leading-tight
                        transition-colors duration-300 group-hover:text-pink-600
                      ">
                      {item.title}
                    </h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* MIDDLE COLUMN - FEATURED + SMALL ARTICLES */}
        <div>
          {featuredArticle && (
            <Link
              to={`/article/${featuredArticle.slug}`}
              className="relative w-full mb-6 group block overflow-hidden rounded-lg">
              <div className="relative h-[260px] sm:h-[360px] md:h-[450px] lg:h-[520px] xl:h-[580px] w-full overflow-hidden">
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
                <h2
                  className="
                    text-2xl sm:text-3xl lg:text-4xl font-extrabold leading-tight mt-1
                    transition-colors duration-300 group-hover:text-pink-500
                  ">
                  {featuredArticle.title}
                </h2>
                {featuredArticle.excerpt && (
                  <p className="text-white text-sm sm:text-base opacity-90 mt-2 line-clamp-3">
                    {featuredArticle.excerpt}
                  </p>
                )}
              </div>
            </Link>
          )}

          {/* Smaller Middle Articles */}
          <div className="space-y-6">
            {middleArticles.map((item, index) => (
              <Link
                to={`/article/${item.slug}`}
                key={item._id || index}
                className="relative w-full font-sans group block overflow-hidden rounded-lg">
                <div className="relative h-[200px] sm:h-[250px] md:h-[280px] w-full overflow-hidden">
                  <img
                    src={item.featuredImage || "https://placehold.co/600x400"}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black via-black/70 to-transparent text-white rounded-b-lg">
                  <div className="text-xs sm:text-sm font-semibold uppercase mb-1">
                    <span className="opacity-75">{item.category}</span>
                    <span className="opacity-50">
                      {" "}
                      /{" "}
                      {item.createdAt
                        ? new Date(item.createdAt).toLocaleDateString()
                        : "Recent"}
                    </span>
                  </div>
                  <h2
                    className="
                      text-lg sm:text-xl md:text-2xl font-bold leading-tight mt-1
                      transition-colors duration-300 group-hover:text-pink-500
                    ">
                    {item.title}
                  </h2>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN - LATEST */}
        <div className="lg:col-span-2 xl:col-span-1 lg:sticky lg:top-18 self-start h-fit">
          <div className="max-w-2xl xl:max-w-sm space-y-4">
            <div className="flex border-b border-gray-300 mb-4 text-gray-500 font-bold text-sm">
              <div className="relative pb-2 mr-6 text-pink-600">
                LATEST
                <span className="absolute bottom-0 left-0 w-full h-[3px] bg-pink-600"></span>
              </div>
              <div className="pb-2 mr-6 hover:text-pink-600 cursor-pointer">
                VIDEOS
              </div>
              <div className="pb-2 hover:text-pink-600 cursor-pointer">
                GALLERIES
              </div>
            </div>

            {latestArticles.map((item, index) => (
              <Link
                to={`/article/${item.slug}`}
                key={item._id || index}
                className="flex items-center space-x-4 group">
                <div className="relative w-20 h-20 flex-shrink-0 overflow-hidden rounded">
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
                  <div
                    className="
                      text-[14px] font-semibold mt-1 line-clamp-2
                      transition-colors duration-300 group-hover:text-pink-600
                    ">
                    {item.title}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
