import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../../../api/client";

export default function Section5() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["section5-posts"],
    queryFn: () => getPosts(5),
  });

  if (isLoading) return <p className="p-6">Loading...</p>;
  if (isError)
    return (
      <p className="p-6 text-red-500">Error loading section: {error.message}</p>
    );

  const postsArray = Object.values(data?.articles || []);
  if (postsArray.length < 8) return null;

  const sectionArticles = postsArray.slice(0, 8); // first 8 for this section
  const [left1, left2, left3, middle1, middle2, right1, right2, right3] =
    sectionArticles;

  return (
    <div className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-6 py-12">
      <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 text-center mb-12">
        BITCOIN INSIGHTS
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: 3 small articles */}
        <div className="lg:col-span-3 flex flex-col gap-6">
          {[left1, left2, left3].map((article, idx) =>
            article ? (
              <Link
                key={article._id || idx}
                to={`/article/${article.slug}`}
                className="flex flex-col h-full group">
                <div className="overflow-hidden rounded-lg h-[calc((100% - 1rem)/3)] relative">
                  <img
                    src={
                      article.featuredImage || "https://placehold.co/400x200"
                    }
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-20 transition-opacity"></div>
                </div>
                <div className="mt-2 flex-1 flex flex-col justify-end">
                  <span className="text-xs font-semibold text-yellow-600">
                    {article.category || "Bitcoin"}
                  </span>
                  <h5 className="text-sm font-bold mt-1">{article.title}</h5>
                  <p className="text-gray-600 text-xs mt-1 line-clamp-2">
                    {article.excerpt || "No description available."}
                  </p>
                </div>
              </Link>
            ) : null
          )}
        </div>

        {/* Middle Column: 2 larger articles */}
        <div className="lg:col-span-6 flex flex-col gap-6">
          {[middle1, middle2].map((article, idx) =>
            article ? (
              <Link
                key={article._id || idx}
                to={`/article/${article.slug}`}
                className="flex flex-col h-full group">
                <div className="overflow-hidden rounded-lg h-[calc((100% - 1.5rem)/2)] relative">
                  <img
                    src={
                      article.featuredImage || "https://placehold.co/800x400"
                    }
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-20 transition-opacity"></div>
                </div>
                <div className="mt-3 flex-1 flex flex-col justify-end">
                  <span className="text-xs font-semibold text-yellow-600">
                    {article.category || "Bitcoin"}
                  </span>
                  <h3 className="text-xl md:text-2xl font-bold mt-1">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 text-sm mt-1 line-clamp-3">
                    {article.excerpt || "No description available."}
                  </p>
                </div>
              </Link>
            ) : null
          )}
        </div>

        {/* Right Column: 3 small articles */}
        <div className="lg:col-span-3 flex flex-col gap-6">
          {[right1, right2, right3].map((article, idx) =>
            article ? (
              <Link
                key={article._id || idx}
                to={`/article/${article.slug}`}
                className="flex flex-col h-full group">
                <div className="overflow-hidden rounded-lg h-[calc((100% - 1rem)/3)] relative">
                  <img
                    src={
                      article.featuredImage || "https://placehold.co/400x200"
                    }
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-20 transition-opacity"></div>
                </div>
                <div className="mt-2 flex-1 flex flex-col justify-end">
                  <span className="text-xs font-semibold text-yellow-600">
                    {article.category || "Bitcoin"}
                  </span>
                  <h5 className="text-sm font-bold mt-1">{article.title}</h5>
                  <p className="text-gray-600 text-xs mt-1 line-clamp-2">
                    {article.excerpt || "No description available."}
                  </p>
                </div>
              </Link>
            ) : null
          )}
        </div>
      </div>
    </div>
  );
}
