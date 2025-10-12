import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../../../api/client";

export default function Section1() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["section1-posts"],
    queryFn: () => getPosts(1), // replace 1 with your section ID
  });

  if (isLoading) return <p className="p-6">Loading...</p>;
  if (isError)
    return (
      <p className="p-6 text-red-500">Error loading section: {error.message}</p>
    );

  const postsArray = Object.values(data?.articles || []);
  if (!postsArray.length) return null;

  const displayArticles = postsArray.slice(0, 3);

  return (
    <div className="w-full bg-white">
      {/* Wrapper with same padding as header */}
      <div className="w-full px-4 sm:px-6 lg:px-8">
        {/* Center content and restrict to 1400px */}
        <div className="max-w-[1400px] mx-auto mt-8 mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayArticles.map((article, idx) => (
              <Link
                key={idx}
                to={`/article/${article.slug}`}
                className="flex items-start gap-3 transition-transform duration-300 hover:scale-105">
                {/* Thumbnail */}
                <img
                  src={
                    article.featuredImage ||
                    article.image ||
                    "https://placehold.co/80x70"
                  }
                  alt={article.title}
                  className="w-[80px] h-[70px] object-cover rounded-md"
                />
                {/* Title + Desc */}
                <div>
                  <h3 className="font-semibold text-gray-800 text-sm leading-tight transition-colors duration-300 hover:text-blue-600">
                    {article.title || "Untitled Article"}
                  </h3>
                  <p className="text-gray-500 text-xs leading-tight">
                    {article.excerpt || "No description available."}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
