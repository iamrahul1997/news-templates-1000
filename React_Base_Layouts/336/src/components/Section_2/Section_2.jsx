import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../../../api/client";

export default function SpotlightArticles() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["spotlight-articles"],
    queryFn: () => getPosts(1),
  });

  if (isLoading) return <p className="p-6">Loading...</p>;
  if (isError)
    return (
      <p className="p-6 text-red-500">
        Error loading Spotlight Articles: {error.message}
      </p>
    );

  const articles = Object.values(data?.articles || []);
  const sectionArticles = articles.slice(145, 149); // same slice as before

  if (!sectionArticles.length) return null;

  return (
    <section className="w-full bg-gray-100 py-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Spotlight <span className="text-blue-600">Articles</span>
          </h2>
          <p className="mt-3 text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
            Dive deep into our carefully curated articles — highlighting trends,
            analysis, and insights.
          </p>
        </div>

        {/* Row 1 - 3 articles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {sectionArticles.slice(0, 3).map((article) => (
            <Link
              key={article._id}
              to={`/article/${article.slug}`}
              className="group rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500">
              <div className="relative w-full h-64 overflow-hidden">
                <img
                  src={
                    article.featuredImage ||
                    "https://placehold.co/400x250?text=No+Image"
                  }
                  alt={article.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent"></div>
              </div>
              <div className="p-5 bg-white">
                <span className="text-xs bg-blue-600 text-white px-2 py-1 rounded-sm font-semibold uppercase">
                  {article.category || "Article"}
                </span>
                <h4 className="text-gray-900 font-bold text-lg mt-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                  {article.title}
                </h4>
                <p className="text-gray-500 text-xs mt-2 line-clamp-2">
                  {article.excerpt || "Click to read more..."}
                </p>
                <p className="text-xs text-gray-500 mt-3">
                  👤 {article.author?.name || "Safe Chain"} •{" "}
                  {article.createdAt
                    ? new Date(article.createdAt).toLocaleDateString()
                    : ""}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* Row 2 - 1 large article */}
        {sectionArticles[3] && (
          <Link
            to={`/article/${sectionArticles[3].slug}`}
            className="group rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500">
            <div className="relative w-full h-80 md:h-96 overflow-hidden">
              <img
                src={
                  sectionArticles[3].featuredImage ||
                  "https://placehold.co/800x400?text=No+Image"
                }
                alt={sectionArticles[3].title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent"></div>
            </div>
            <div className="p-6 bg-white">
              <span className="text-xs bg-blue-600 text-white px-2 py-1 rounded-sm font-semibold uppercase">
                {sectionArticles[3].category || "Article"}
              </span>
              <h4 className="text-gray-900 font-bold text-2xl mt-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                {sectionArticles[3].title}
              </h4>
              <p className="text-gray-500 text-sm mt-3 line-clamp-3">
                {sectionArticles[3].excerpt || "Click to read more..."}
              </p>
              <p className="text-xs text-gray-500 mt-3">
                👤 {sectionArticles[3].author?.name || "Safe Chain"} •{" "}
                {sectionArticles[3].createdAt
                  ? new Date(sectionArticles[3].createdAt).toLocaleDateString()
                  : ""}
              </p>
            </div>
          </Link>
        )}
      </div>
    </section>
  );
}
