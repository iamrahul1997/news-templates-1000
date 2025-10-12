import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../../../api/client";

export default function CryptoNewsSection() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["crypto-news"],
    queryFn: () => getPosts(4),
  });

  if (isLoading) return <p className="p-6">Loading...</p>;
  if (isError)
    return (
      <p className="p-6 text-red-500">
        Error loading crypto news: {error.message}
      </p>
    );

  const articles = Object.values(data?.articles || []);
  if (!articles.length) return null;

  // Use first 12 posts for this section
  const sectionArticles = articles.slice(0, 12);

  return (
    <section className="w-full bg-[#0e0e0e] text-white py-12 px-4 sm:px-6 lg:px-0">
      <div className="max-w-[76.25rem] mx-auto">
        {/* Section Header */}
        <div className="border-b-2 border-gray-700 pb-2 mb-8">
          <h2 className="text-2xl font-bitter font-bold uppercase tracking-wider text-white">
            CRYPTO NEWS
          </h2>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Left Column */}
          <div className="flex flex-col h-full">
            {/* Featured Article */}
            {sectionArticles[0] && (
              <Link
                to={`/article/${sectionArticles[0].slug}`}
                className="group flex-1 flex flex-col overflow-hidden">
                <div className="relative overflow-hidden mb-4 rounded-md">
                  <img
                    src={
                      sectionArticles[0].featuredImage ||
                      "https://placehold.co/600x400"
                    }
                    alt={sectionArticles[0].title}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <span className="text-red-500 uppercase text-[14px] font-bold mb-2">
                  {sectionArticles[0].category || "BUSINESS"}
                </span>
                <h3 className="text-lg font-bitter font-bold leading-tight mb-3 text-white group-hover:text-red-500 transition">
                  {sectionArticles[0].title}
                </h3>
                <p className="text-xs text-gray-400 mt-auto">
                  {sectionArticles[0].author?.name || "Unknown"} •{" "}
                  {sectionArticles[0].createdAt
                    ? new Date(
                        sectionArticles[0].createdAt
                      ).toLocaleDateString()
                    : "Recent"}
                </p>
              </Link>
            )}

            {/* Small Article Below */}
            {sectionArticles[1] && (
              <Link
                to={`/article/${sectionArticles[1].slug}`}
                className="group mt-6 flex gap-4 overflow-hidden">
                <div className="relative overflow-hidden flex-shrink-0 rounded-md">
                  <img
                    src={
                      sectionArticles[1].featuredImage ||
                      "https://placehold.co/200x150"
                    }
                    alt={sectionArticles[1].title}
                    className="w-20 h-16 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-col justify-between">
                  <h4 className="text-sm font-bitter font-bold leading-tight mb-2 text-white group-hover:text-red-500 transition">
                    {sectionArticles[1].title}
                  </h4>
                  <p className="text-xs text-gray-400">
                    {sectionArticles[1].createdAt
                      ? new Date(
                          sectionArticles[1].createdAt
                        ).toLocaleDateString()
                      : "Recent"}
                  </p>
                </div>
              </Link>
            )}
          </div>

          {/* Middle Column */}
          <div className="flex flex-col h-full">
            {/* Top Small Article */}
            {sectionArticles[2] && (
              <Link
                to={`/article/${sectionArticles[2].slug}`}
                className="group mb-6 flex gap-3 overflow-hidden">
                <div className="relative overflow-hidden flex-shrink-0 rounded-md">
                  <img
                    src={
                      sectionArticles[2].featuredImage ||
                      "https://placehold.co/150x120"
                    }
                    alt={sectionArticles[2].title}
                    className="w-16 h-12 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-col justify-between">
                  <h4 className="text-sm font-bitter font-semibold leading-tight mb-1 text-white group-hover:text-red-500 transition">
                    {sectionArticles[2].title}
                  </h4>
                  <p className="text-xs text-gray-400">
                    {sectionArticles[2].createdAt
                      ? new Date(
                          sectionArticles[2].createdAt
                        ).toLocaleDateString()
                      : "Recent"}
                  </p>
                </div>
              </Link>
            )}

            {/* Featured Middle Article */}
            {sectionArticles[3] && (
              <Link
                to={`/article/${sectionArticles[3].slug}`}
                className="group flex-1 flex flex-col overflow-hidden">
                <div className="relative overflow-hidden mb-4 rounded-md">
                  <img
                    src={
                      sectionArticles[3].featuredImage ||
                      "https://placehold.co/600x400"
                    }
                    alt={sectionArticles[3].title}
                    className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <span className="text-red-500 uppercase text-xs font-bold mb-2">
                  {sectionArticles[3].category || "BUSINESS"}
                </span>
                <h3 className="text-lg font-bitter font-bold leading-tight mb-3 text-white group-hover:text-red-500 transition">
                  {sectionArticles[3].title}
                </h3>
                <p className="text-xs text-gray-400 mt-auto">
                  {sectionArticles[3].author?.name || "Unknown"} •{" "}
                  {sectionArticles[3].createdAt
                    ? new Date(
                        sectionArticles[3].createdAt
                      ).toLocaleDateString()
                    : "Recent"}
                </p>
              </Link>
            )}
          </div>

          {/* Right Column */}
          <div className="flex flex-col h-full">
            {/* Featured Article */}
            {sectionArticles[4] && (
              <Link
                to={`/article/${sectionArticles[4].slug}`}
                className="group flex-1 flex flex-col overflow-hidden">
                <div className="relative overflow-hidden mb-4 rounded-md">
                  <img
                    src={
                      sectionArticles[4].featuredImage ||
                      "https://placehold.co/600x400"
                    }
                    alt={sectionArticles[4].title}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <span className="text-red-500 uppercase text-xs font-bold mb-2">
                  {sectionArticles[4].category || "BUSINESS"}
                </span>
                <h3 className="text-lg font-bitter font-bold leading-tight mb-3 text-white group-hover:text-red-500 transition">
                  {sectionArticles[4].title}
                </h3>
                <p className="text-xs text-gray-400 mt-auto">
                  {sectionArticles[4].author?.name || "Unknown"} •{" "}
                  {sectionArticles[4].createdAt
                    ? new Date(
                        sectionArticles[4].createdAt
                      ).toLocaleDateString()
                    : "Recent"}
                </p>
              </Link>
            )}

            {/* Small Article Below */}
            {sectionArticles[5] && (
              <Link
                to={`/article/${sectionArticles[5].slug}`}
                className="group mt-6 flex gap-4 overflow-hidden">
                <div className="relative overflow-hidden flex-shrink-0 rounded-md">
                  <img
                    src={
                      sectionArticles[5].featuredImage ||
                      "https://placehold.co/200x150"
                    }
                    alt={sectionArticles[5].title}
                    className="w-20 h-16 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-col justify-between">
                  <h4 className="text-sm font-bitter font-bold leading-tight mb-2 text-white group-hover:text-red-500 transition">
                    {sectionArticles[5].title}
                  </h4>
                  <p className="text-xs text-gray-400">
                    {sectionArticles[5].createdAt
                      ? new Date(
                          sectionArticles[5].createdAt
                        ).toLocaleDateString()
                      : "Recent"}
                  </p>
                </div>
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
