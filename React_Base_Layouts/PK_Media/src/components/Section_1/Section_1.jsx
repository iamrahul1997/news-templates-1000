import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { getPosts } from "../../../api/client";

export default function Section_1() {
  const [page, setPage] = useState(1);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["posts-section1", page],
    queryFn: () => getPosts(page),
    keepPreviousData: true,
  });

  console.log(data);
  if (isLoading) return <p className="p-6">Loading...</p>;
  if (isError)
    return <p className="p-6 text-red-500">Error: {error.message}</p>;

  const postsArray = Object.values(data?.articles || []);

  // Assign posts for each column
  const leftColumnPosts = postsArray.slice(0, 3); // What's Happening
  const middlePost = postsArray[4]; // Main middle feature
  const rightColumnPosts = postsArray.slice(5, 8); // Just In

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
      {/* Left Column */}
      <div className="lg:col-span-3 flex flex-col space-y-6">
        <h2 className="font-bold text-lg uppercase tracking-wide">
          What's Happening
        </h2>
        {leftColumnPosts.map((post) => (
          <article key={post._id}>
            <Link to={`/article/${post.slug}`}>
              <img
                src={post.featuredImage}
                className="w-full h-48 object-cover rounded mb-2"
                alt={post.name}
              />
              <p className="text-xs text-gray-500">
                {post.section} <span className="ml-1">{post.publishedAt}</span>
              </p>
              <h3 className="font-extrabold text-xl leading-tight">
                {post.title}
              </h3>
            </Link>
          </article>
        ))}
      </div>

      {/* Middle Column */}
      <div className="lg:col-span-6 flex flex-col">
        {middlePost && (
          <>
            <p className="text-xs text-gray-500 mb-2">
              {middlePost.section || "General"}
              <span className="ml-1">{middlePost.publishedAt}</span>
            </p>
            <h2 className="font-extrabold text-3xl sm:text-4xl mb-2 leading-tight">
              {middlePost.name}
            </h2>
            <p className="text-gray-600 mb-4 text-sm sm:text-base">
              {middlePost.title || "No description available."}
            </p>
            <div className="flex-1">
              <Link to={`/article/${middlePost.slug}`}>
                <img
                  src={middlePost.featuredImage}
                  className="w-full h-full object-fit rounded"
                  alt={middlePost.name}
                />
              </Link>
            </div>
          </>
        )}
      </div>

      {/* Right Column */}
      <div className="lg:col-span-3 flex flex-col space-y-6">
        <h2 className="font-bold text-lg uppercase tracking-wide">Just In</h2>
        {rightColumnPosts.map((post) => (
          <article key={post._id}>
            <Link to={`/article/${post.slug}`}>
              <img
                src={post.featuredImage}
                className="w-full h-40 object-cover rounded mb-2"
                alt={post.name}
              />
              <p className="text-xs text-gray-500">
                {post.section} <span className="ml-1">{post.publishedAt}</span>
              </p>
              <h3 className="font-extrabold text-lg leading-tight">
                {post.title}
              </h3>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
