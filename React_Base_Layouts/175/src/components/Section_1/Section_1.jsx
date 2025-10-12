import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../../../api/client";

export default function Section1() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["section1-posts"],
    queryFn: () => getPosts(1),
  });

  if (isLoading) return <p className="p-6">Loading...</p>;
  if (isError)
    return (
      <p className="p-6 text-red-500">Error loading section: {error.message}</p>
    );

  const postsArray = Object.values(data?.articles || []);
  if (!postsArray.length) {
    return (
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1400px] mx-auto py-10 text-center text-gray-500">
          No articles available
        </div>
      </div>
    );
  }

  const topArticles = postsArray.slice(0, 2);

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1400px] mx-auto border-b border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-gray-200">
          {topArticles.map((article, index) => (
            <div
              key={article._id}
              className={`py-6 ${
                index === 0
                  ? "md:pl-0 md:pr-6 md:border-r border-gray-200"
                  : "md:pr-0 md:pl-6"
              }`}>
              {/* Category */}
              <span className="bg-gray-800 text-white text-xs font-semibold px-2 py-1 rounded">
                {article.category || "NEWS"}
              </span>

              {/* Title */}
              <Link
                to={`/article/${article.slug}`}
                className="text-2xl font-bold mt-3 mb-2 block hover:text-blue-600 transition">
                {article.title}
              </Link>

              {/* Excerpt */}
              <p className="text-gray-600 mb-4">
                {article.excerpt?.slice(0, 150) || ""}
              </p>

              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-4 text-gray-500 text-sm mb-4">
                <span className="flex items-center gap-1">
                  <i className="ri-calendar-line"></i>
                  {new Date(article.createdAt).toLocaleDateString()}
                </span>
                {article.author?.name && (
                  <span className="flex items-center gap-1">
                    <i className="ri-user-3-line"></i>
                    By {article.author.name}
                  </span>
                )}
              </div>

              {/* Image */}
              <Link to={`/article/${article.slug}`}>
                <div className="overflow-hidden rounded">
                  <img
                    src={article.featuredImage}
                    alt={article.title}
                    className="w-full h-[300px] md:h-[370px] object-cover transition-transform duration-300 cursor-pointer hover:scale-105"
                  />
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
