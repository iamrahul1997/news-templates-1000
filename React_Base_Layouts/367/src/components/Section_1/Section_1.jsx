import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../../../api/client";
import { Link } from "react-router-dom";

export default function Section5() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["posts-section5"],
    queryFn: () => getPosts(5),
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  const articles = data?.articles || [];

  const mainArticles = articles.slice(30, 36);
  const trendingArticles = articles.slice(36, 42);
  const paginationArticles = articles.slice(24, 26);
  const extraFeatureArticles = articles.slice(36, 38);
  const paginationArticles1 = articles.slice(42, 44);

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-8 bg-white text-gray-900 dark:text-gray-100">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        {/* LEFT SECTION */}
        <div className="space-y-8 md:col-span-2">
          {/* Header + Hero */}
          <div className="text-center bg-gray-100 dark:bg-[#1a1a1a] py-4 pb-0">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-100">
              ROCK & ROLL
            </h1>
            <p className="text-gray-500 mt-1">This is an optional subtitle</p>

            {mainArticles[0] && (
              <Link
                to={`/article/${mainArticles[0].slug}`}
                className="relative w-full mt-4 border-t-4 border-sky-400 overflow-hidden group">
                <img
                  src={
                    mainArticles[0].featuredImage ||
                    "https://placehold.co/600x400"
                  }
                  alt={mainArticles[0].title}
                  className="w-full h-[300px] object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center text-white">
                  <h2 className="text-sm font-semibold px-2 text-center">
                    {mainArticles[0].title.length > 60
                      ? mainArticles[0].title.slice(0, 60) + "…"
                      : mainArticles[0].title}
                  </h2>
                </div>
              </Link>
            )}
          </div>

          {/* BLOCK WITH PAGINATION */}
          <div className="bg-gray-200 text-center py-6 border-b-2 border-blue-500">
            <h2 className="text-2xl md:text-3xl font-bold tracking-wide text-gray-800 uppercase">
              BLOCK WITH PAGINATION
            </h2>
            <p className="text-gray-500 mt-1">This is an optional subtitle</p>
          </div>

          <div className="max-w-full mx-auto space-y-4">
            {paginationArticles.map((item) => (
              <Link
                key={item._id}
                to={`/article/${item.slug}`}
                className="grid md:grid-cols-2 gap-6 items-center bg-gray-200 p-4 rounded-md group">
                <div className="overflow-hidden group">
                  <img
                    src={item.featuredImage || "https://placehold.co/600x400"}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-gray-800 group-hover:text-amber-500 transition">
                    {item.title}
                  </h3>
                  <div className="flex flex-wrap gap-4 text-gray-600 text-sm mt-2">
                    <span>👤 {item.author?.name || "Unknown"}</span>
                    <span>📂 {item.category}</span>
                    <span>
                      📅 {new Date(item.createdAt).toLocaleDateString()}
                    </span>
                    <span>👁️ {item.views || 0}</span>
                  </div>
                  <p className="text-gray-600 mt-3 text-sm leading-relaxed">
                    {item.excerpt || "Click to read more about this article."}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          {/* Articles Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* COLUMN 1 - LATEST POSTS */}
            <div className="bg-gray-200 dark:bg-[#1a1a1a] p-4 rounded-md">
              <div className="text-center mb-4">
                <h2 className="font-bold text-lg">LATEST POSTS</h2>
                <div className="border-b-4 border-blue-500 mt-2 w-20 mx-auto"></div>
              </div>

              {mainArticles.slice(1, 4).map((item) => (
                <Link
                  key={item._id}
                  to={`/article/${item.slug}`}
                  className="pb-4 mb-4 border-b border-gray-300 last:border-none block">
                  <h3 className="text-lg font-semibold mb-2 hover:text-blue-500 transition">
                    {item.title.length > 80
                      ? item.title.slice(0, 80) + "…"
                      : item.title}
                  </h3>
                  <div className="text-sm text-gray-600 dark:text-gray-300 flex flex-wrap gap-2">
                    <span>👤 {item.author?.name || "Unknown"}</span>
                    <span>📂 {item.category}</span>
                    <span>
                      📅 {new Date(item.createdAt).toLocaleDateString()}
                    </span>
                    <span>👁️ {item.views || 0}</span>
                  </div>
                  <p className="text-sm text-gray-700 dark:text-gray-400 mt-2">
                    {item.excerpt || "Click to read more about this article."}
                  </p>
                </Link>
              ))}
            </div>

            {/* COLUMN 2 - FEATURED + EXTRA ARTICLES */}
            <div className="bg-gray-200 dark:bg-[#1a1a1a] p-4 rounded-md">
              <div className="text-center mb-4">
                <h2 className="font-bold text-lg">FEATURED</h2>
                <div className="border-b-4 border-yellow-400 mt-2 w-20 mx-auto"></div>
              </div>

              {mainArticles[4] && (
                <Link
                  to={`/article/${mainArticles[4].slug}`}
                  className="overflow-hidden mb-3 rounded-md block">
                  <img
                    src={
                      mainArticles[4].featuredImage ||
                      "https://placehold.co/600x400"
                    }
                    alt={mainArticles[4].title}
                    className="w-full h-56 object-cover transform transition duration-500 hover:scale-110"
                  />
                  <h3 className="text-lg font-semibold mt-2 hover:text-yellow-400 transition">
                    {mainArticles[4].title.length > 80
                      ? mainArticles[4].title.slice(0, 80) + "…"
                      : mainArticles[4].title}
                  </h3>
                  <p className="text-sm text-gray-400 mt-1">
                    {mainArticles[4].excerpt ||
                      "Click to read more about this article."}
                  </p>
                </Link>
              )}

              {extraFeatureArticles.map((item) => (
                <Link
                  key={item._id}
                  to={`/article/${item.slug}`}
                  className="mb-3 p-2 border-b border-gray-300 block">
                  <h3 className="text-md font-semibold hover:text-yellow-400 transition">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-700 dark:text-gray-400">
                    {item.excerpt || "Click to read more."}
                  </p>
                </Link>
              ))}
            </div>
          </div>

          {/* PAGINATION BLOCK */}
          <div className="bg-gray-200 text-center py-6 border-b-2 border-blue-500 mt-6">
            <h2 className="text-2xl md:text-3xl font-bold tracking-wide text-gray-800 uppercase">
              PAGINATION BLOCK
            </h2>
            <p className="text-gray-500 mt-1">This is an optional subtitle</p>
          </div>

          <div className="max-w-full mx-auto space-y-4">
            {paginationArticles1.map((item) => (
              <Link
                key={item._id}
                to={`/article/${item.slug}`}
                className="grid md:grid-cols-2 gap-6 items-center bg-gray-200 p-4 rounded-md group">
                <div className="overflow-hidden group">
                  <img
                    src={item.featuredImage || "https://placehold.co/600x400"}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-gray-800 group-hover:text-amber-500 transition">
                    {item.title}
                  </h3>
                  <div className="flex flex-wrap gap-4 text-gray-600 text-sm mt-2">
                    <span>👤 {item.author?.name || "Unknown"}</span>
                    <span>📂 {item.category}</span>
                    <span>
                      📅 {new Date(item.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-gray-600 mt-3 text-sm leading-relaxed">
                    {item.excerpt || "Click to read more about this article."}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* RIGHT SECTION - TRENDING */}
        <div className="bg-gray-200 dark:bg-[#1a1a1a] p-4 rounded-md shadow-md md:sticky md:top-18 self-start h-fit">
          <div className="flex border-b mb-6">
            <button className="px-4 py-2 font-semibold text-gray-800 dark:text-gray-100 border-b-4 border-orange-500">
              TRENDING
            </button>
          </div>

          <div className="space-y-6">
            {trendingArticles.map((item, i) => (
              <Link
                key={item._id}
                to={`/article/${item.slug}`}
                className="flex items-start gap-3">
                <div className="relative w-20 h-20 flex-shrink-0 overflow-hidden rounded-md">
                  <img
                    src={item.featuredImage || "https://placehold.co/100x100"}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-0 left-0 bg-black text-white text-xs font-bold px-2 py-1">
                    {i + 1}
                  </span>
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-[15px] hover:text-orange-500 transition">
                    {item.title.length > 60
                      ? item.title.slice(0, 60) + "…"
                      : item.title}
                  </h3>
                  <p className="text-[14px] text-gray-500 flex flex-wrap gap-2">
                    📅 {new Date(item.createdAt).toLocaleDateString()}
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
