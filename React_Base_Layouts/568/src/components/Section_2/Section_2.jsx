// component 13

import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../../../api/client";

export default function HeroSection() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["hero-posts"],
    queryFn: () => getPosts(1),
  });

  if (isLoading) return <p className="p-6">Loading...</p>;
  if (isError)
    return (
      <p className="p-6 text-red-500">
        Error loading hero section: {error.message}
      </p>
    );

  const postsArray = Object.values(data?.articles || []);
  const bigPost = postsArray[0];
  const rightPosts = postsArray.slice(1, 3);

  return (
    <section className="max-w-7xl mx-auto px-4 py-14">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Big Post */}
        {bigPost && (
          <div className="relative col-span-2 group rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-500">
            <div className="overflow-hidden">
              <Link to={`/article/${bigPost.slug}`}>
                <img
                  src={bigPost.featuredImage}
                  alt={bigPost.name || bigPost.title}
                  className="w-full h-96 object-cover rounded-xl transition-transform duration-500 group-hover:scale-110"
                />
              </Link>
            </div>
            <div className="absolute top-4 left-4 bg-pink-600 text-white text-xs px-3 py-1 rounded shadow-md group-hover:scale-105 transition">
              {bigPost.section || "General"}
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-xl">
              <h2 className="text-white text-2xl font-semibold mb-2 group-hover:text-pink-400 transition">
                {bigPost.title || bigPost.name}
              </h2>
              <div className="flex items-center text-white text-sm space-x-4">
                <span>
                  {typeof bigPost.author === "string"
                    ? bigPost.author
                    : bigPost.author?.name || "Unknown"}
                </span>
                {/* <span>📅 {bigPost.publishedAt}</span>
                <span>🔥 {bigPost.views || 0}</span> */}
              </div>
            </div>
          </div>
        )}

        {/* Right Column */}
        <div className="flex flex-col gap-6">
          {rightPosts.map((post, idx) => (
            <div
              key={post._id}
              className="relative group rounded-xl overflow-hidden shadow hover:shadow-xl transition duration-500">
              <div className="overflow-hidden">
                <Link to={`/article/${post.slug}`}>
                  <img
                    src={post.featuredImage}
                    alt={post.name || post.title}
                    className="w-full h-44 object-cover rounded-xl transition-transform duration-500 group-hover:scale-110"
                  />
                </Link>
              </div>
              <div
                className={`absolute top-3 left-3 text-white text-xs px-2 py-1 rounded group-hover:scale-105 transition ${
                  idx === 0 ? "bg-pink-600" : "bg-green-600"
                }`}>
                {post.section || "General"}
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 rounded-b-xl">
                <h3
                  className={`text-white text-lg font-semibold transition ${
                    idx === 0
                      ? "group-hover:text-pink-300"
                      : "group-hover:text-green-300"
                  }`}>
                  {post.title || post.name}
                </h3>
                {/* <p className="text-white text-xs mt-1">📅 {post.publishedAt}</p> */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
