import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../../../api/client";
import { Link } from "react-router-dom";

export default function Section4() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["posts-section4"],
    queryFn: () => getPosts(4),
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  const articles = data?.articles || [];
  if (!articles || articles.length < 6) return null;

  return (
    <div className="max-w-[1200px] bg-white mx-auto px-2 md:px-0">
      <div className="max-w-full mx-auto py-6 space-y-1">
        {/* 🔹 Top Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-1">
          {/* Left Big Image */}
          <Link
            to={`/article/${articles[0].slug}`}
            className="md:col-span-2 relative overflow-hidden group">
            <img
              src={articles[0].featuredImage || "https://placehold.co/600x400"}
              alt={articles[0].title}
              className="w-full h-[250px] object-cover transform transition duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-4 text-white">
              <h2 className="text-2xl font-bold group-hover:text-yellow-400 transition">
                {articles[0].title}
              </h2>
              <p className="text-sm text-gray-200">
                👤 {articles[0].author?.name || "Unknown"} • 📂{" "}
                {articles[0].category || "News"} • 📅{" "}
                {new Date(articles[0].createdAt).toLocaleDateString()}
              </p>
            </div>
          </Link>

          {/* Right two smaller images */}
          {articles.slice(1, 3).map((article, idx) => (
            <Link
              key={article._id || idx}
              to={`/article/${article.slug}`}
              className="relative overflow-hidden group">
              <img
                src={article.featuredImage || "https://placehold.co/400x300"}
                alt={article.title}
                className="w-full h-[250px] object-cover transform transition duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-3 text-white">
                <h2 className="text-lg font-bold group-hover:text-yellow-400 transition">
                  {article.title.length > 40
                    ? article.title.slice(0, 40) + "…"
                    : article.title}
                </h2>
                <p className="text-sm text-gray-200">
                  👤 {article.author?.name || "Unknown"} • 📂{" "}
                  {article.category || "General"} • 📅{" "}
                  {new Date(article.createdAt).toLocaleDateString()}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* 🔹 Bottom Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-1">
          {/* Left two small images */}
          {articles.slice(3, 5).map((article, idx) => (
            <Link
              key={article._id || idx}
              to={`/article/${article.slug}`}
              className="relative overflow-hidden group">
              <img
                src={article.featuredImage || "https://placehold.co/400x300"}
                alt={article.title}
                className="w-full h-[250px] object-cover transform transition duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-3 text-white">
                <h2 className="text-lg font-bold group-hover:text-yellow-400 transition">
                  {article.title.length > 40
                    ? article.title.slice(0, 40) + "…"
                    : article.title}
                </h2>
                <p className="text-sm text-gray-200">
                  👤 {article.author?.name || "Unknown"} • 📂{" "}
                  {article.category || "General"} • 📅{" "}
                  {new Date(article.createdAt).toLocaleDateString()}
                </p>
              </div>
            </Link>
          ))}

          {/* Right Big Image */}
          <Link
            to={`/article/${articles[5].slug}`}
            className="md:col-span-2 relative overflow-hidden group">
            <img
              src={articles[5].featuredImage || "https://placehold.co/600x400"}
              alt={articles[5].title}
              className="w-full h-[250px] object-cover transform transition duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-4 text-white">
              <h2 className="text-2xl font-bold group-hover:text-yellow-400 transition">
                {articles[5].title}
              </h2>
              <p className="text-sm text-gray-200">
                👤 {articles[5].author?.name || "Unknown"} • 📂{" "}
                {articles[5].category || "News"} • 📅{" "}
                {new Date(articles[5].createdAt).toLocaleDateString()}
              </p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
