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
  if (!postsArray.length) {
    return (
      <div className="max-w-[1400px] mx-auto py-10 text-center text-gray-500">
        No articles available
      </div>
    );
  }

  const sectionArticles = postsArray.slice(3, 6);

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 border-b border-gray-200 py-8">
        {sectionArticles.map((article, index) => (
          <div key={article._id || index} className="flex flex-col gap-3">
            {/* Categories */}
            <div className="flex flex-wrap items-center gap-2">
              {article.tags?.length ? (
                article.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="bg-gray-800 text-white text-xs font-semibold px-2 py-1 rounded">
                    {tag}
                  </span>
                ))
              ) : (
                <span className="bg-gray-800 text-white text-xs font-semibold px-2 py-1 rounded">
                  NEWS
                </span>
              )}
            </div>

            {/* Title */}
            <Link
              to={`/article/${article.slug}`}
              className="text-xl font-bold hover:text-blue-600 transition block">
              {article.title}
            </Link>

            {/* Meta */}
            <div className="flex items-center gap-4 text-gray-500 text-sm">
              <span className="flex items-center gap-1">
                <i className="ri-calendar-line"></i>
                {new Date(article.createdAt).toLocaleDateString()}
              </span>
            </div>

            {/* Image */}
            <Link
              to={`/article/${article.slug}`}
              className="relative overflow-hidden rounded aspect-[4/3] block">
              <img
                src={article.featuredImage}
                alt={article.title}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
              {article.type === "video" && (
                <div className="absolute inset-0 flex justify-center items-center">
                  <div className="w-12 h-12 bg-black bg-opacity-60 text-white rounded-full flex justify-center items-center">
                    ▶
                  </div>
                </div>
              )}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
