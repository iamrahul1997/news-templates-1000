// component 17

import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../../../api/client";

export default function TopHeadlines() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["top-headlines"],
    queryFn: () => getPosts(10),
  });

  if (isLoading) return <p className="p-6">Loading top headlines...</p>;
  if (isError)
    return <p className="p-6 text-red-500">Error: {error.message}</p>;

  const postsArray = Object.values(data?.articles || []);
  const leftBigPost = postsArray[50];
  const leftSidePosts = postsArray.slice(51, 55);
  const rightTopPost = postsArray[60];
  const rightGridPosts = postsArray.slice(61, 64);

  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex items-end justify-between mb-8">
        <h2 className="text-2xl font-extrabold tracking-wide border-b border-gray-200 pb-2">
          TOP HEADLINES
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
        {/* LEFT COLUMN */}
        <div className="lg:col-span-3 space-y-6">
          {leftBigPost && (
            <div className="relative h-72 rounded-lg overflow-hidden shadow">
              <Link to={`/article/${leftBigPost.slug}`}>
                <img
                  src={leftBigPost.featuredImage}
                  alt={leftBigPost.title}
                  className="w-full h-full object-cover"
                />
              </Link>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                <div className="p-4 text-white">
                  <p className="text-pink-400 text-sm font-semibold">
                    {leftBigPost.section} • {leftBigPost.publishedAt}
                  </p>
                  <h2 className="text-xl font-extrabold leading-tight">
                    {leftBigPost.title}
                  </h2>
                </div>
              </div>
            </div>
          )}

          {/* Small Side Cards */}
          <div className="space-y-4">
            {leftSidePosts.map((post) => (
              <div key={post._id} className="flex items-start gap-4">
                <Link to={`/article/${post.slug}`}>
                  <div className="w-28 h-20 flex-shrink-0 overflow-hidden rounded-lg">
                    <img
                      src={post.featuredImage}
                      className="w-full h-full object-cover"
                      alt={post.title}
                    />
                  </div>
                </Link>
                <div>
                  <p className="text-gray-500 text-sm font-semibold">
                    {post.section} • {post.publishedAt}
                  </p>
                  <h3 className="font-bold text-sm">{post.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="lg:col-span-7 space-y-6">
          {rightTopPost && (
            <div className="bg-white rounded-lg overflow-hidden shadow h-72 flex flex-col lg:flex-row">
              <div className="lg:w-1/2 h-48 lg:h-auto">
                <Link to={`/article/${rightTopPost.slug}`}>
                  <img
                    src={rightTopPost.featuredImage}
                    className="w-full h-full object-cover"
                    alt={rightTopPost.title}
                  />
                </Link>
              </div>
              <div className="lg:w-1/2 p-6 flex flex-col justify-center border-t lg:border-t-0 lg:border-l border-gray-200">
                <p className="text-gray-600 text-sm font-semibold mb-2">
                  {rightTopPost.section} • {rightTopPost.publishedAt}
                </p>
                <h2 className="text-2xl font-extrabold leading-tight">
                  {rightTopPost.title}
                </h2>
                <p className="text-gray-700 mt-4">{rightTopPost.summary}</p>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {rightGridPosts.map((post) => (
              <article
                key={post._id}
                className="rounded-lg overflow-hidden shadow">
                <Link to={`/article/${post.slug}`}>
                  <img
                    src={post.featuredImage}
                    className="w-full h-56 object-cover"
                    alt={post.title}
                  />
                </Link>
                <div className="p-4">
                  <p className="text-gray-500 text-sm font-semibold">
                    {post.section} • {post.publishedAt}
                  </p>
                  <h3 className="font-bold">{post.title}</h3>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
