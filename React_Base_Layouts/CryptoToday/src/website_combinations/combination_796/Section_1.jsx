import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../../../api/client";

export default function TechnologySection() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["technology-posts"],
    queryFn: () => getPosts(6), // fetch posts for Technology section
  });

  if (isLoading) return <p className="p-6">Loading...</p>;
  if (isError)
    return (
      <p className="p-6 text-red-500">
        Error loading Technology section: {error.message}
      </p>
    );

  const postsArray = Object.values(data?.articles || []);
  if (!postsArray.length) return null;

  // Slice posts for this section
  const topArticles = postsArray.slice(23, 25);
  const bottomArticles = postsArray.slice(26, 30);
  const mostViewed = postsArray.slice(91, 95);

  return (
    <div className="w-full bg-white">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row gap-6 mb-8">
          {/* Left Column */}
          <div className="flex-1 flex flex-col">
            <h2 className="text-2xl font-medium mb-6">Technology</h2>

            {/* Top Articles */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-4">
              {topArticles.map((article, idx) => (
                <Link
                  key={idx}
                  to={`/article/${article.slug}`}
                  className="group">
                  <div className="overflow-hidden rounded-md">
                    <img
                      src={
                        article.featuredImage ||
                        article.image ||
                        "https://placehold.co/400x230"
                      }
                      alt={article.title}
                      className="w-full h-[230px] object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    <span className="text-blue-600">
                      {article.category || "TECHNOLOGY"}
                    </span>{" "}
                    •{" "}
                    <span className="text-black">
                      {article.createdAt
                        ? new Date(article.createdAt).toLocaleDateString()
                        : "Unknown Date"}
                    </span>
                  </p>
                  <h3 className="mt-1 text-lg font-semibold transition-colors duration-300 group-hover:text-blue-600">
                    {article.title || "Untitled Article"}
                  </h3>
                  <p className="mt-1 text-[15px] text-gray-500 font-normal line-clamp-2">
                    {article.excerpt || "No description available."}
                  </p>
                </Link>
              ))}
            </div>

            {/* Bottom Articles */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 border-t border-dashed border-gray-300 pt-4">
              {bottomArticles.map((article, idx) => (
                <Link
                  key={idx}
                  to={`/article/${article.slug}`}
                  className="flex gap-3 group">
                  <div className="w-[120px] h-[80px] overflow-hidden rounded-md flex-shrink-0 bg-gray-200">
                    <img
                      src={
                        article?.featuredImage?.trim() ||
                        article?.image?.trim() ||
                        "https://placehold.co/120x80"
                      }
                      alt={article.title || "News"}
                      className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-110"
                      onError={(e) =>
                        (e.currentTarget.src = "https://placehold.co/120x80")
                      }
                    />
                  </div>
                  <div className="flex flex-col justify-between">
                    <p className="text-xs text-gray-500">
                      <span>{article.category || "TECHNOLOGY"}</span> •{" "}
                      <span className="text-black">
                        {article.createdAt
                          ? new Date(article.createdAt).toLocaleDateString()
                          : "Unknown Date"}
                      </span>
                    </p>
                    <h4 className="mt-1 text-[15px] sm:text-[16px] font-medium line-clamp-2 transition-colors duration-300 group-hover:text-blue-600">
                      {article.title || "Untitled Article"}
                    </h4>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Right Column - Most Viewed */}
          <div className="w-full lg:w-[340px]">
            <h2 className="text-2xl font-medium mb-4">Most View</h2>
            <div className="flex flex-col gap-4">
              {mostViewed.map((article, idx) => (
                <Link
                  key={idx}
                  to={`/article/${article.slug}`}
                  className="flex justify-between items-center group overflow-hidden py-3 border-b border-dashed border-gray-200">
                  <div className="flex gap-4">
                    <div className="w-[100px] h-[75px] overflow-hidden rounded-md flex-shrink-0">
                      <img
                        src={
                          article.featuredImage ||
                          article.image ||
                          "https://placehold.co/120x75"
                        }
                        alt={article.title}
                        className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>
                    <div className="flex flex-col justify-between">
                      <p className="text-[13px] text-gray-500">
                        <span className="text-blue-600">
                          {article.category || "BUSINESS"}
                        </span>{" "}
                        •{" "}
                        <span className="text-black">
                          {article.createdAt
                            ? new Date(article.createdAt).toLocaleDateString()
                            : "Unknown Date"}
                        </span>
                      </p>
                      <h4 className="text-[15px] sm:text-[16px] leading-[22px] font-medium transition-colors duration-300 group-hover:text-blue-600">
                        {article.title || "Untitled Article"}
                      </h4>
                    </div>
                  </div>
                  <span className="text-3xl font-bold text-gray-200">
                    {idx + 1}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
