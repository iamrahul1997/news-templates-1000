import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../../../api/client";

export default function Section4() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["section4-posts"],
    queryFn: () => getPosts(4), // Use appropriate section number
  });

  if (isLoading) return <p className="p-6">Loading...</p>;
  if (isError)
    return (
      <p className="p-6 text-red-500">Error loading section: {error.message}</p>
    );

  const articles = Object.values(data?.articles || []);
  const slicedArticles = articles.slice(20, 24); // Keep original slice logic

  return (
    <section className="w-full px-4 sm:px-6 py-6 sm:py-8 lg:py-10">
      <div className="max-w-[1220px] mx-auto">
        {/* Section heading */}
        <div className="flex items-center mb-4">
          <span className="w-3 h-3 bg-purple-600 rounded-sm mr-2"></span>
          <span className="text-black font-bold text-lg">BlockBusters</span>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {slicedArticles.map((article) => (
            <div
              key={article._id}
              className="bg-white rounded-lg shadow-md overflow-hidden group relative">
              {/* Image */}
              <div className="relative w-full">
                <Link to={`/article/${article.slug}`}>
                  <img
                    src={
                      article.featuredImage || "https://placehold.co/400x340"
                    }
                    alt={article.title}
                    className="w-full h-[340px] object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                </Link>
              </div>

              {/* Content with gradient overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black via-black/70 to-transparent text-white flex flex-col justify-end">
                {article.category && (
                  <div className="bg-purple-600 text-white text-xs px-2 py-1 rounded w-fit mb-2">
                    {article.category}
                  </div>
                )}

                <Link to={`/article/${article.slug}`}>
                  <h2 className="text-[20px] sm:text-2xl font-bold leading-[24px] group-hover:underline mb-2">
                    {article.title.length > 80
                      ? article.title.slice(0, 80)
                      : article.title}
                  </h2>
                </Link>

                <div className="flex items-center text-xs opacity-75 mt-2">
                  <span>{article.author?.name || "Unknown"}</span>
                  <span className="mx-2">•</span>
                  <span>
                    {article.createdAt
                      ? new Date(article.createdAt).toLocaleDateString()
                      : "Recent"}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
