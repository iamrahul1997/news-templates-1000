import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../../../api/client";

export default function Section3() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["section3-posts"],
    queryFn: () => getPosts(3), // Adjust the section number as needed
  });

  if (isLoading) return <p className="p-6">Loading...</p>;
  if (isError)
    return (
      <p className="p-6 text-red-500">
        Error loading section 3: {error.message}
      </p>
    );

  const postsArray = Object.values(data?.articles || []);
  if (postsArray.length <= 9) return null;

  // Slice articles from index 9 (10th article) and take 9 articles
  const slicedArticles = postsArray.slice(9, 18);

  // Split sliced articles into 3 columns
  const columns = [[], [], []];
  slicedArticles.forEach((article, idx) => {
    columns[idx % 3].push(article);
  });

  const renderCard = (article) => (
    <div
      key={article._id}
      className="flex flex-col sm:flex-row items-stretch gap-4 bg-white rounded-lg overflow-hidden border-b border-gray-300 hover:shadow-lg transition-shadow duration-300">
      {/* Image */}
      <div className="w-full sm:w-32 flex-shrink-0">
        <Link to={`/article/${article.slug}`}>
          <img
            src={article.featuredImage || "https://placehold.co/150x150"}
            alt={article.title}
            className="w-full h-24 sm:h-full object-cover rounded-md sm:rounded-none"
          />
        </Link>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-between p-3 sm:p-4">
        <div>
          {article.category && (
            <div className="flex items-center text-xs text-purple-700 mb-1">
              <span className="w-2 h-2 rounded-full bg-purple-600 mr-2"></span>
              <span className="font-medium">{article.category}</span>
            </div>
          )}
          <h3 className="font-bold text-[14px] sm:text-base leading-snug mb-2">
            <Link to={`/article/${article.slug}`}>
              {article.title.length > 80
                ? article.title.slice(0, 80) + "…"
                : article.title}
            </Link>
          </h3>
        </div>
        <div className="flex items-center text-xs text-gray-500 mt-1 sm:mt-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>
            {article.createdAt
              ? new Date(article.createdAt).toLocaleDateString()
              : "Recent"}
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <section className="w-full px-4 sm:px-6 py-6 sm:py-8 lg:py-10">
      <div className="max-w-[1220px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {columns.map((col, colIdx) => (
          <div key={colIdx} className="space-y-4">
            {col.map((article) => renderCard(article))}
          </div>
        ))}
      </div>
    </section>
  );
}
