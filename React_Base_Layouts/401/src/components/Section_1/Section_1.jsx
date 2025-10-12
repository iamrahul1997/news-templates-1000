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

  // Ensure at least 9 articles (first 6 can be skipped if needed)
  if (postsArray.length <= 6) return null;

  const columnHeadings = ["Personal Finance", "Investment", "Market"];
  const columnArticles = postsArray.slice(6, 9);

  const renderCard = (article) => (
    <div
      key={article._id}
      className="relative group overflow-hidden rounded-lg bg-white shadow-md hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
      <Link to={`/article/${article.slug}`} className="flex flex-col h-full">
        {/* Image */}
        <div className="relative">
          <img
            src={article.featuredImage || "https://placehold.co/400x250"}
            alt={article.title}
            className="w-full h-[220px] sm:h-[250px] lg:h-[280px] object-cover transform transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col flex-1">
          {article.category && (
            <div className="bg-purple-600 text-white text-xs px-2 py-1 rounded w-fit mb-2">
              {article.category}
            </div>
          )}
          <h3 className="text-lg sm:text-xl font-bold leading-snug mb-2 group-hover:underline">
            {article.title}
          </h3>
          {article.excerpt && (
            <p className="text-gray-700 text-sm leading-relaxed mb-4 line-clamp-3 flex-1">
              {article.excerpt}
            </p>
          )}
          <div className="flex items-center text-xs text-gray-500 mt-auto">
            <span>{article.author?.name || "Unknown"}</span>
            <span className="mx-2">•</span>
            <span>
              {article.createdAt
                ? new Date(article.createdAt).toLocaleDateString()
                : "Recent"}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );

  return (
    <section className="w-full px-4 sm:px-6 py-6 sm:py-8 lg:py-10">
      <div className="max-w-[1220px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {columnHeadings.map((heading, idx) => {
          const article = columnArticles[idx];
          if (!article) return null;

          return (
            <div key={idx} className="flex flex-col">
              {/* Column heading */}
              <div className="flex items-center mb-4">
                <span className="w-3 h-3 bg-purple-600 rounded-sm mr-2"></span>
                <span className="text-black font-bold text-lg">{heading}</span>
              </div>

              {/* Article card */}
              {renderCard(article)}
            </div>
          );
        })}
      </div>
    </section>
  );
}
