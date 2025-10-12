import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../../../api/client";

export default function Section1() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["section1-posts"],
    queryFn: () => getPosts(1), // adjust number for API section if needed
  });

  if (isLoading) return <p className="p-6">Loading...</p>;
  if (isError)
    return (
      <p className="p-6 text-red-500">Error loading section: {error.message}</p>
    );

  const postsArray = Object.values(data?.articles || []);
  if (postsArray.length < 14) return null;

  const sectionArticles = postsArray.slice(40, 54); // 14 articles
  const mainArticle = sectionArticles[0];
  const secondaryArticles = sectionArticles.slice(1, 4);
  const gridArticles = sectionArticles.slice(4);

  return (
    <section className="max-w-[1400px] mx-auto px-4 md:px-6 py-12 space-y-12">
      {/* Main Article */}
      {mainArticle && (
        <Link to={`/article/${mainArticle.slug}`} className="group block">
          <div className="overflow-hidden rounded-lg h-[400px] md:h-[500px]">
            <img
              src={mainArticle.featuredImage || "https://placehold.co/800x500"}
              alt={mainArticle.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          <div className="mt-4">
            <span className="text-xs font-semibold text-yellow-600">
              {mainArticle.category || "Bitcoin"}
            </span>
            <h2 className="text-2xl md:text-4xl font-bold mt-1">
              {mainArticle.title}
            </h2>
            {mainArticle.excerpt && (
              <p className="text-gray-700 mt-2 line-clamp-3">
                {mainArticle.excerpt}
              </p>
            )}
            <p className="text-xs text-gray-500 mt-1">
              {mainArticle.author?.name || "Unknown"} •{" "}
              {mainArticle.createdAt
                ? new Date(mainArticle.createdAt).toLocaleDateString()
                : "Recent"}
            </p>
          </div>
        </Link>
      )}

      {/* Secondary Articles */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {secondaryArticles.map((article) => (
          <Link
            key={article._id}
            to={`/article/${article.slug}`}
            className="group block">
            <div className="overflow-hidden rounded-lg h-[250px] md:h-[300px]">
              <img
                src={article.featuredImage || "https://placehold.co/400x300"}
                alt={article.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="mt-3">
              <span className="text-xs font-semibold text-yellow-600">
                {article.category || "Bitcoin"}
              </span>
              <h3 className="font-bold text-lg md:text-xl mt-1">
                {article.title}
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                {article.author?.name || "Unknown"} •{" "}
                {article.createdAt
                  ? new Date(article.createdAt).toLocaleDateString()
                  : "Recent"}
              </p>
            </div>
          </Link>
        ))}
      </div>

      {/* Grid Articles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {gridArticles.map((article) => (
          <Link
            key={article._id}
            to={`/article/${article.slug}`}
            className="group block">
            <div className="overflow-hidden rounded-lg h-[200px]">
              <img
                src={article.featuredImage || "https://placehold.co/400x250"}
                alt={article.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="mt-2">
              <span className="text-xs font-semibold text-yellow-600">
                {article.category || "Bitcoin"}
              </span>
              <h4 className="font-semibold text-sm md:text-base mt-1 line-clamp-2">
                {article.title}
              </h4>
              <p className="text-xs text-gray-500 mt-1">
                {article.author?.name || "Unknown"}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
