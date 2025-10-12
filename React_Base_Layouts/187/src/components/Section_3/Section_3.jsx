//component 4

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { getPosts } from "../../../api/client";

export default function Section_4() {
  const [page, setPage] = useState(1);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["section4-posts", page],
    queryFn: () => getPosts(page),
    keepPreviousData: true,
  });

  if (isLoading) return <p className="p-6">Loading...</p>;
  if (isError)
    return <p className="p-6 text-red-500">Error: {error.message}</p>;

  const postsArray = Object.values(data?.articles || []);
  const heroPost = postsArray[0]; // Full-width image
  const cards = postsArray.slice(1, 4); // 3 cards

  return (
    <section className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 gap-8">
      {/* Row 1 : Full-width Image */}
      {heroPost && (
        <div className="col-span-1">
          <Link to={`/article/${heroPost.slug}`}>
            <img
              src={heroPost.featuredImage}
              alt={heroPost.name}
              className="w-full h-64 md:h-80 lg:h-96 object-cover rounded"
            />
          </Link>
        </div>
      )}

      {/* Row 2 : 3 Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {cards.map((post) => (
          <Link
            key={post._id}
            to={`/article/${post.slug}`}
            className="flex gap-4 items-center">
            <img
              src={post.featuredImage}
              className="w-32 h-24 object-cover rounded flex-shrink-0"
              alt={post.name}
            />
            <div>
              <p className="text-sm font-semibold text-gray-500">
                {post.section || "Category"}
              </p>
              <h3 className="font-extrabold leading-snug">
                {post.title?.slice(0, 80) || post.name}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
