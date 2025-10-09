import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../../../api/client";
import { Link } from "react-router-dom";

function Recommended() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["recommended"],
    queryFn: () => getPosts("recommended"),
  });

  if (isLoading) return <p className="p-6">Loading...</p>;
  if (isError)
    return (
      <p className="p-6 text-red-500">
        Failed to load recommendations: {error.message}
      </p>
    );

  const postsArray = Object.values(data?.articles || []).slice(25, 29);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      <h2 className="font-bold text-2xl mb-8 uppercase tracking-wide">
        Recommended For You
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {postsArray.map((post) => (
          <article key={post._id} className="flex flex-col h-full">
            <img
              src={post.featuredImage}
              alt={post.name || post.title}
              className="w-full h-56 sm:h-64 object-cover rounded mb-4"
            />
            <p className="text-sm text-gray-500 mb-1">
              {post.section || "General"}{" "}
              <span className="ml-1">{post.publishedAt}</span>
            </p>
            <h3 className="font-semibold text-lg leading-snug flex-1">
              <Link to={`/article/${post.slug}`}>
                {post.name || post.title}
              </Link>
            </h3>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Recommended;
