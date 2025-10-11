import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../../../api/client";

export default function ThreeColumnSection() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["three-column-posts"],
    queryFn: () => getPosts(4), // Use the section number you want
  });

  if (isLoading) return <p className="p-6">Loading...</p>;
  if (isError)
    return (
      <p className="p-6 text-red-500">Error loading section: {error.message}</p>
    );

  const postsArray = Object.values(data?.articles || []);
  const slicedArticles = postsArray.slice(100); // keep your slice logic

  if (!slicedArticles.length) {
    return (
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1400px] mx-auto py-10 text-center text-gray-500">
          No articles available
        </div>
      </div>
    );
  }

  const columns = [[], [], []];
  slicedArticles.forEach((article, index) => {
    columns[index % 3].push(article);
  });

  const renderBigPost = (article) => (
    <div
      key={article._id}
      className="flex flex-col border-b border-gray-200 pb-6">
      <span className="w-fit bg-slate-700 text-white text-xs px-2 py-1 rounded">
        {article.category || "NEWS"}
      </span>
      <Link
        to={`/article/${article.slug}`}
        className="font-bold text-xl mt-2 block hover:text-blue-600 transition">
        {article.title}
      </Link>
      <p className="text-sm text-gray-600 mt-2 flex-1">
        {article.excerpt?.slice(0, 150) || ""}
      </p>
      <div className="flex items-center text-xs text-gray-500 mt-3 space-x-4">
        <span>📅 {new Date(article.createdAt).toLocaleDateString()}</span>
        {article.author?.name && <span>✍️ {article.author.name}</span>}
      </div>
      {article.featuredImage && (
        <Link to={`/article/${article.slug}`}>
          <img
            src={article.featuredImage}
            alt={article.title}
            className="w-full h-[230px] object-cover mt-4 cursor-pointer transition-transform duration-300 hover:scale-105"
          />
        </Link>
      )}
    </div>
  );

  const renderSmallPost = (article) => (
    <div
      key={article._id}
      className="flex justify-between items-center border-b border-gray-200 pb-4">
      <div className="flex-1 pr-3">
        <span className="bg-slate-700 text-white text-xs px-2 py-1 rounded">
          {article.category || "NEWS"}
        </span>
        <Link
          to={`/article/${article.slug}`}
          className="font-semibold text-sm mt-2 block hover:text-blue-600 transition">
          {article.title}
        </Link>
      </div>
      {article.featuredImage && (
        <Link to={`/article/${article.slug}`}>
          <img
            src={article.featuredImage}
            alt={article.title}
            className="w-[100px] h-[80px] object-cover"
          />
        </Link>
      )}
    </div>
  );

  return (
    <div className="bg-white pt-4 pb-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6">
          {columns.map((column, colIndex) => (
            <div key={colIndex} className="flex flex-col space-y-6">
              {column[0] && renderBigPost(column[0])}
              {column.slice(1, 4).map((article) => renderSmallPost(article))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
