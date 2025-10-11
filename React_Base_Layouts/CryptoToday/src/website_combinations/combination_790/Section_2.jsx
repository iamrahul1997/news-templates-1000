import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../../../api/client";

export default function Section4() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["section4-posts"],
    queryFn: () => getPosts(4),
  });

  if (isLoading) return <p className="p-6">Loading...</p>;
  if (isError)
    return (
      <p className="p-6 text-red-500">Error loading section: {error.message}</p>
    );

  const postsArray = Object.values(data?.articles || []);
  if (postsArray.length < 6) return null;

  const sectionArticles = postsArray.slice(0, 6); // first 6 articles
  const [a1, a2, a3, a4, a5, a6] = sectionArticles;

  return (
    <div className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-6 py-12 space-y-12">
      {/* Section Title */}
      <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 text-center mb-10">
        BITCOIN HIGHLIGHTS
      </h2>

      {/* First Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Big article */}
        {a1 && (
          <Link
            to={`/article/${a1.slug}`}
            className="group flex flex-col justify-start">
            <div className="overflow-hidden rounded-lg h-[220px] md:h-[260px]">
              <img
                src={a1.featuredImage || "https://placehold.co/700x400"}
                alt={a1.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="mt-3">
              <span className="text-xs font-semibold text-yellow-600">
                {a1.category || "Bitcoin"}
              </span>
              <h3 className="text-xl md:text-2xl font-bold mt-1">{a1.title}</h3>
              <p className="text-gray-600 text-sm mt-1 line-clamp-2">
                {a1.excerpt || "No description available."}
              </p>
            </div>
          </Link>
        )}

        {/* Right: Two horizontal articles */}
        <div className="grid grid-cols-2 gap-6 h-full">
          {[a2, a3].map((article, idx) =>
            article ? (
              <Link
                key={article._id || idx}
                to={`/article/${article.slug}`}
                className="group flex flex-col justify-start">
                <div className="overflow-hidden rounded-lg h-[220px] md:h-[260px]">
                  <img
                    src={
                      article.featuredImage || "https://placehold.co/400x400"
                    }
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="mt-3">
                  <span className="text-xs font-semibold text-yellow-600">
                    {article.category || "Bitcoin"}
                  </span>
                  <h4 className="text-lg font-bold mt-1">{article.title}</h4>
                  <p className="text-gray-600 text-sm mt-1 line-clamp-2">
                    {article.excerpt || "No description available."}
                  </p>
                </div>
              </Link>
            ) : null
          )}
        </div>
      </div>

      {/* Second Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Right: Two horizontal articles */}
        <div className="grid grid-cols-2 gap-6 h-full">
          {[a4, a5].map((article, idx) =>
            article ? (
              <Link
                key={article._id || idx}
                to={`/article/${article.slug}`}
                className="group flex flex-col justify-start">
                <div className="overflow-hidden rounded-lg h-[220px] md:h-[260px]">
                  <img
                    src={
                      article.featuredImage || "https://placehold.co/400x400"
                    }
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="mt-3">
                  <span className="text-xs font-semibold text-yellow-600">
                    {article.category || "Bitcoin"}
                  </span>
                  <h4 className="text-lg font-bold mt-1">{article.title}</h4>
                  <p className="text-gray-600 text-sm mt-1 line-clamp-2">
                    {article.excerpt || "No description available."}
                  </p>
                </div>
              </Link>
            ) : null
          )}
        </div>

        {/* Left: Big article */}
        {a6 && (
          <Link
            to={`/article/${a6.slug}`}
            className="group flex flex-col justify-start">
            <div className="overflow-hidden rounded-lg h-[220px] md:h-[260px]">
              <img
                src={a6.featuredImage || "https://placehold.co/700x400"}
                alt={a6.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="mt-3">
              <span className="text-xs font-semibold text-yellow-600">
                {a6.category || "Bitcoin"}
              </span>
              <h3 className="text-xl md:text-2xl font-bold mt-1">{a6.title}</h3>
              <p className="text-gray-600 text-sm mt-1 line-clamp-2">
                {a6.excerpt || "No description available."}
              </p>
            </div>
          </Link>
        )}
      </div>
    </div>
  );
}
