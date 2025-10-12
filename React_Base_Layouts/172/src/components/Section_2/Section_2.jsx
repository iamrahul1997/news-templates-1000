// component 3

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { getPosts } from "../../../api/client";

export default function Section_3() {
  const [page, setPage] = useState(1);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["latest-news", page],
    queryFn: () => getPosts(page),
    keepPreviousData: true,
  });

  if (isLoading) return <p className="p-6">Loading...</p>;
  if (isError)
    return <p className="p-6 text-red-500">Error: {error.message}</p>;

  const postsArray = Object.values(data?.articles || []);
  const column1Top = postsArray[15];
  const column1Small = postsArray.slice(16, 18);
  const column2Top = postsArray[19];
  const column2Small = postsArray.slice(20, 22);

  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      {/* Title + Tabs */}
      <div className="flex items-end justify-between mb-8">
        <h2 className="text-2xl font-extrabold tracking-wide border-b border-gray-200 pb-2">
          LATEST NEWS
        </h2>
      </div>

      {/* Grid: 2 equal columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Column 1 */}
        <div className="space-y-6">
          {column1Top && (
            <article className="relative overflow-hidden rounded-sm">
              <Link to={`/article/${column1Top.slug}`}>
                <img
                  src={column1Top.featuredImage}
                  alt={column1Top.name}
                  className="w-full h-[420px] object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/75 to-transparent">
                  <p className="text-sm text-gray-200 mb-1">
                    <span className="font-semibold">{column1Top.section}</span>{" "}
                    · {column1Top.publishedAt}
                  </p>
                  <h3 className="text-3xl lg:text-4xl font-extrabold text-white leading-tight">
                    {column1Top.name}
                  </h3>
                  <p className="text-sm text-gray-200 mt-3 max-w-[70%]">
                    {column1Top.title?.slice(0, 120) ||
                      "No description available"}
                  </p>
                </div>
              </Link>
            </article>
          )}

          {/* Two stacked small cards */}
          <div className="space-y-4">
            {column1Small.map((post) => (
              <article key={post._id} className="flex items-start space-x-4">
                <Link
                  to={`/article/${post.slug}`}
                  className="flex items-start space-x-4 w-full">
                  <img
                    src={post.featuredImage}
                    alt={post.name}
                    className="w-32 h-24 object-cover rounded-sm flex-shrink-0"
                  />
                  <div className="flex-1">
                    <p className="text-xs text-gray-500 mb-1">
                      <span className="font-semibold text-gray-700">
                        {post.section}
                      </span>{" "}
                      · {post.publishedAt}
                    </p>
                    <h4 className="text-lg font-extrabold leading-tight">
                      {post.name}
                    </h4>
                    <p className="text-sm text-gray-600 mt-1">
                      {post.title?.slice(0, 100) || "No description available"}
                    </p>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>

        {/* Column 2 */}
        <div className="space-y-6">
          {column2Top && (
            <article className="relative overflow-hidden rounded-sm">
              <Link to={`/article/${column2Top.slug}`}>
                <img
                  src={column2Top.featuredImage}
                  alt={column2Top.name}
                  className="w-full h-[420px] object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/75 to-transparent">
                  <p className="text-sm text-gray-200 mb-1">
                    <span className="font-semibold">{column2Top.section}</span>{" "}
                    · {column2Top.publishedAt}
                  </p>
                  <h3 className="text-3xl lg:text-4xl font-extrabold text-white leading-tight">
                    {column2Top.name}
                  </h3>
                  <p className="text-sm text-gray-200 mt-3 max-w-[70%]">
                    {column2Top.title?.slice(0, 120) ||
                      "No description available"}
                  </p>
                </div>
              </Link>
            </article>
          )}

          <div className="space-y-4">
            {column2Small.map((post) => (
              <article key={post._id} className="flex items-start space-x-4">
                <Link
                  to={`/article/${post.slug}`}
                  className="flex items-start space-x-4 w-full">
                  <img
                    src={post.featuredImage}
                    alt={post.name}
                    className="w-32 h-24 object-cover rounded-sm flex-shrink-0"
                  />
                  <div className="flex-1">
                    <p className="text-xs text-gray-500 mb-1">
                      <span className="font-semibold text-gray-700">
                        {post.section}
                      </span>{" "}
                      · {post.publishedAt}
                    </p>
                    <h4 className="text-lg font-extrabold leading-tight">
                      {post.name}
                    </h4>
                    <p className="text-sm text-gray-600 mt-1">
                      {post.title?.slice(0, 100) || "No description available"}
                    </p>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
