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
  if (postsArray.length < 6) return null;

  const sectionArticles = postsArray.slice(0, 6); // take first 6 for this section
  const leftArticle = sectionArticles[0]; // featured left
  const rightArticles = sectionArticles.slice(1); // remaining 5 on right

  return (
    <section className="max-w-[1400px] mx-auto px-4 md:px-6 py-12 grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Left Featured Article */}
      {leftArticle && (
        <Link
          to={`/article/${leftArticle.slug}`}
          className="lg:col-span-7 relative h-[450px] rounded-lg overflow-hidden group">
          <img
            src={leftArticle.featuredImage || "https://placehold.co/800x450"}
            alt={leftArticle.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/30 flex items-end p-6 text-white">
            <div>
              <span className="bg-yellow-500 text-black px-2 py-1 rounded text-xs font-semibold mb-2 inline-block">
                {leftArticle.category || "Bitcoin"}
              </span>
              <h2 className="text-2xl md:text-3xl font-bold">
                {leftArticle.title}
              </h2>
              <p className="text-sm mt-1">
                {leftArticle.author?.name || "Unknown"} •{" "}
                {leftArticle.createdAt
                  ? new Date(leftArticle.createdAt).toLocaleDateString()
                  : "Recent"}
              </p>
            </div>
          </div>
        </Link>
      )}

      {/* Right Articles Grid */}
      <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {rightArticles.map((article) => (
          <Link
            key={article._id}
            to={`/article/${article.slug}`}
            className="relative h-[200px] md:h-[220px] rounded-lg overflow-hidden group">
            <img
              src={article.featuredImage || "https://placehold.co/400x220"}
              alt={article.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/20 flex items-end p-3 text-white">
              <div>
                <h3 className="font-semibold text-sm md:text-base line-clamp-2">
                  {article.title}
                </h3>
                <p className="text-xs text-gray-200">
                  {article.author?.name || "Unknown"}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
