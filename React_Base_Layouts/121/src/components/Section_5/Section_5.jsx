import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../../../api/client";

export default function TopSection() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["posts-section1"],
    queryFn: () => getPosts(1),
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading posts</p>;

  const articles = data?.articles || [];

  const newsItems = articles.slice(0, 4);
  const leftArticle = articles[4];
  const middleArticles = articles.slice(5, 8);
  const trendingArticles = articles.slice(8, 13);

  return (
    <section className="w-full bg-[#0e0e0e] text-white px-4 sm:px-6 md:px-6 lg:px-0">
      <div className="max-w-[76.25rem] mx-auto w-full">
        {/* ---- IN THE NEWS ---- */}
        <div className="w-full pb-12 pt-6">
          <h2 className="font-semibold text-[0.875rem] leading-6 mb-6 text-gray-300 uppercase tracking-wide">
            In The News
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {newsItems.map((item) => (
              <Link
                key={item._id}
                to={`/article/${item.slug}`}
                className="flex gap-4 items-start group">
                <div className="w-28 h-20 overflow-hidden flex-shrink-0 rounded-lg shadow-md">
                  <img
                    src={item.featuredImage || "https://placehold.co/300x200"}
                    alt={item.title}
                    className="w-full h-full object-cover transition duration-300 group-hover:scale-110 group-hover:opacity-90"
                  />
                </div>
                <p className="font-semibold text-sm leading-5 text-gray-200 transition duration-300 group-hover:text-red-500">
                  {item.title.length > 65
                    ? item.title.slice(0, 65) + "…"
                    : item.title}
                </p>
              </Link>
            ))}
          </div>
        </div>

        {/* ---- HERO SECTION ---- */}
        <div className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* LEFT */}
            {leftArticle && (
              <div className="flex flex-col h-full">
                <div className="flex flex-col flex-1">
                  <div>
                    <span className="text-red-500 font-bold uppercase text-xs">
                      {leftArticle.category || "General"}
                    </span>
                    <Link
                      to={`/article/${leftArticle.slug}`}
                      className="text-2xl sm:text-3xl font-bold mt-2 text-white hover:text-red-500 transition duration-300">
                      {leftArticle.title}
                    </Link>
                    <p className="text-gray-400 text-xs mt-1">
                      {leftArticle.author?.name || "Unknown"} •{" "}
                      {leftArticle.createdAt
                        ? new Date(leftArticle.createdAt).toLocaleDateString()
                        : "Recent"}
                    </p>
                    <p className="text-gray-300 text-[15px] mt-2 line-clamp-3">
                      {leftArticle.excerpt || "No description available."}
                    </p>
                  </div>
                  <div className="mt-4 flex-1 overflow-hidden">
                    <Link to={`/article/${leftArticle.slug}`}>
                      <img
                        src={
                          leftArticle.featuredImage ||
                          "https://placehold.co/600x400"
                        }
                        alt={leftArticle.title}
                        className="w-full h-full object-cover rounded-md hover:scale-105 hover:opacity-90 transition duration-500"
                      />
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {/* MIDDLE */}
            <div className="flex flex-col h-full space-y-6 overflow-hidden">
              {middleArticles.map((article) => (
                <div key={article._id} className="group">
                  <Link to={`/article/${article.slug}`}>
                    <img
                      src={
                        article.featuredImage || "https://placehold.co/400x250"
                      }
                      alt={article.title}
                      className="w-full h-40 object-cover transition duration-500 group-hover:scale-105 group-hover:opacity-90 rounded-md"
                    />
                    <h3 className="mt-2 font-semibold text-[0.9rem] sm:text-[1rem] leading-snug text-white group-hover:text-red-500 transition duration-300">
                      {article.title.length > 80
                        ? article.title.slice(0, 80) + "…"
                        : article.title}
                    </h3>
                  </Link>
                  <p className="text-gray-400 text-sm mt-1">
                    {article.createdAt
                      ? new Date(article.createdAt).toLocaleDateString()
                      : "Recent"}{" "}
                    • 0 comments
                  </p>
                </div>
              ))}
            </div>

            {/* RIGHT */}
            <div className="flex flex-col h-full justify-between">
              <div className="border border-gray-700 rounded-md p-4 mb-6 bg-[#1a1a1a] shadow-md">
                <span className="bg-red-600 text-white text-sm font-semibold px-2 py-1 rounded">
                  Trending Now
                </span>
                <ul className="divide-y divide-gray-700 mt-4">
                  {trendingArticles.map((trend) => (
                    <li
                      key={trend._id}
                      className="py-2 text-gray-300 hover:text-red-500 text-[15px] transition duration-300">
                      <Link to={`/article/${trend.slug}`}>
                        {trend.title.length > 90
                          ? trend.title.slice(0, 90) + "…"
                          : trend.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {articles[13] && (
                <Link
                  to={`/article/${articles[13].slug}`}
                  className="rounded-md overflow-hidden flex-1 min-h-48">
                  <img
                    src={
                      articles[13].featuredImage ||
                      "https://placehold.co/600x400"
                    }
                    alt="extra"
                    className="w-full h-full object-cover hover:scale-105 hover:opacity-90 transition duration-500"
                  />
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
