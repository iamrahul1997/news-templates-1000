import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../../api/client";
import { Link } from "react-router-dom";

function PopularPosts() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["popular-posts"],
    queryFn: () => getPosts("popular"),
  });

  if (isLoading) return <p className="p-6">Loading...</p>;
  if (isError)
    return (
      <p className="p-6 text-red-500">
        Failed to load popular posts: {error.message}
      </p>
    );

  const postsArray = Object.values(data?.articles || []).slice(5, 11);

  return (
    <section className="max-w-7xl mx-auto px-4 py-14">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Popular Posts</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {postsArray.map((post) => (
          <div
            key={post._id}
            className="relative group rounded-xl overflow-hidden shadow hover:shadow-2xl transition duration-500">
            <div className="overflow-hidden">
              <img
                src={post.featuredImage}
                alt={post.name || post.title}
                className="w-full h-48 object-cover rounded-xl transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <div
              className={`absolute top-3 left-3 text-white text-xs px-2 py-1 rounded group-hover:scale-105 transition ${
                post.section === "Music" ? "bg-purple-600" : "bg-pink-600"
              }`}>
              {post.section || "General"}
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 rounded-b-xl">
              <h3 className="text-white font-semibold text-lg group-hover:text-purple-300 transition">
                <Link to={`/article/${post.slug}`}>
                  {post.name || post.title}
                </Link>
              </h3>
              {/* <p className="text-white text-xs mt-1">📅 {post.publishedAt}</p> */}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default PopularPosts;
