// component    | dark theme | left verticle slider with right sticky bar

import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../../../api/client";

export default function Section3() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["section3-posts"],
    queryFn: () => getPosts(3),
  });

  if (isLoading) return <p className="p-6">Loading...</p>;
  if (isError)
    return (
      <p className="p-6 text-red-500">
        Error loading latest updates: {error.message}
      </p>
    );

  const articles = Object.values(data?.articles || []);
  if (articles.length < 33) return null;

  const mainArticles = articles.slice(19, 29); // Left column
  const sidebarArticles = articles.slice(29, 33); // Right sticky sidebar

  return (
    <div className="w-full py-12 bg-black">
      <div className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-6">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl text-white md:text-4xl font-bold border-l-4 border-blue-500 pl-3">
            Latest Updates
          </h2>
          <button className="text-sm font-medium text-gray-400 hover:text-blue-500 transition">
            View All →
          </button>
        </div>

        {/* Grid Layout */}
        <div className="lg:grid lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {mainArticles.map((article) => (
              <Link
                key={article._id}
                to={`/article/${article.slug}`}
                className="relative h-[250px] md:h-[300px] lg:h-[350px] rounded-2xl overflow-hidden group">
                <img
                  src={article.featuredImage || "https://placehold.co/600x350"}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex flex-col justify-end p-5 rounded-2xl">
                  <span className="text-blue-500 text-xs uppercase font-semibold">
                    {article.category || "News"}
                  </span>
                  <h3 className="text-lg md:text-2xl font-bold text-white group-hover:text-blue-400 transition">
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
            ))}
          </div>

          {/* Right Sticky Sidebar */}
          <aside className="lg:col-span-1 flex flex-col gap-6 mt-8 lg:mt-0 md:sticky md:top-18 lg:sticky lg:top-20 self-start h-fit">
            <h3 className="text-xl font-bold text-white">Trending Now</h3>
            {sidebarArticles.map((article) => (
              <Link
                key={article._id}
                to={`/article/${article.slug}`}
                className="flex gap-3 items-start bg-white rounded-xl overflow-hidden shadow-md group hover:shadow-lg transition p-2">
                <div className="w-24 h-20 flex-shrink-0 overflow-hidden rounded-lg">
                  <img
                    src={article.featuredImage || "https://placehold.co/100x80"}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="flex-1">
                  <h4 className="text-sm md:text-base font-semibold group-hover:text-blue-500 transition line-clamp-2">
                    {article.title}
                  </h4>
                  <p className="text-xs text-gray-400 mt-1">
                    {article.createdAt
                      ? new Date(article.createdAt).toLocaleDateString()
                      : "Recent"}
                  </p>
                </div>
              </Link>
            ))}
          </aside>
        </div>
      </div>
    </div>
  );
}
