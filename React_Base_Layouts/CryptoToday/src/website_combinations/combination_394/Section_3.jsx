import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../../../api/client";

export default function TrendingSafeChain() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["trending-safe-chain"],
    queryFn: () => getPosts(2),
  });

  if (isLoading) return <p className="p-6">Loading...</p>;
  if (isError)
    return (
      <p className="p-6 text-red-500">
        Error loading trending articles: {error.message}
      </p>
    );

  const articles = Object.values(data?.articles || []);
  if (!articles.length) return null;

  // Use next articles (after section1)
  const mainArticle = articles[0]; // Adjust index if necessary
  const sideArticles = articles.slice(1, 5);

  return (
    <section className="w-full bg-white py-20 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Trending on <span className="text-blue-600">Safe Chain</span>
          </h2>
          <p className="mt-3 text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
            Discover what’s trending now — insights that shape the future of
            blockchain and data security.
          </p>
        </div>

        {/* Main layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {/* Left - Big Featured Article */}
          {mainArticle && (
            <Link
              to={`/article/${mainArticle.slug}`}
              className="group col-span-2 relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500">
              <img
                src={
                  mainArticle.featuredImage ||
                  "https://placehold.co/800x500?text=No+Image"
                }
                alt={mainArticle.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>

              {/* Text overlay */}
              <div className="absolute bottom-0 left-0 p-6 text-white">
                <span className="text-xs bg-blue-600 px-2 py-1 rounded-sm font-semibold uppercase">
                  {mainArticle.category || "Featured"}
                </span>
                <h3 className="text-2xl md:text-3xl font-semibold mt-3 group-hover:text-blue-300 transition-colors">
                  {mainArticle.title}
                </h3>
                {mainArticle.excerpt && (
                  <p className="text-gray-200 text-sm mt-2 line-clamp-2">
                    {mainArticle.excerpt}
                  </p>
                )}
                <p className="text-xs mt-3 opacity-80">
                  👤 {mainArticle.author?.name || "Safe Chain Team"} •{" "}
                  {mainArticle.createdAt
                    ? new Date(mainArticle.createdAt).toLocaleDateString()
                    : "Recently Published"}
                </p>
              </div>
            </Link>
          )}

          {/* Right - Smaller Articles */}
          <div className="flex flex-col gap-6">
            {sideArticles.map((article) => (
              <Link
                key={article._id}
                to={`/article/${article.slug}`}
                className="group flex items-center gap-4 bg-gray-50 hover:bg-blue-50 transition-all duration-300 p-3 rounded-lg border border-gray-100 hover:border-blue-200">
                <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                  <img
                    src={
                      article.featuredImage ||
                      "https://placehold.co/200x200?text=No+Image"
                    }
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 text-base leading-tight group-hover:text-blue-600 transition-colors line-clamp-2">
                    {article.title}
                  </h4>
                  <p className="text-xs text-gray-500 mt-1">
                    {article.author?.name || "Safe Chain Team"} •{" "}
                    {article.createdAt
                      ? new Date(article.createdAt).toLocaleDateString()
                      : ""}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Fallback */}
        {!mainArticle && (
          <p className="text-center text-gray-500 mt-10">
            No trending articles available right now.
          </p>
        )}
      </div>
    </section>
  );
}
