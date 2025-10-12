// component 12

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../../../api/client";
import { extractAllLinkText } from "../../utils/extractLinks";
import { Link } from "react-router-dom";

export default function Section_7() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["posts-section7"],
    queryFn: () => getPosts(7),
  });

  if (isLoading) return <p className="p-6">Loading...</p>;
  if (error) return <p className="p-6 text-red-500">Error loading posts</p>;

  const articles = data?.articles || [];
  const displayArticles = articles.slice(66, 75);

  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-3xl font-bold text-gray-800">Latest Discoveries</h2>
      </div>

      <div className="flex flex-wrap gap-6 pb-4">
        {displayArticles.map((post, index) => (
          <Link
            key={post._id || index}
            to={`/article/${post.slug}`}
            className="bg-white shadow-md rounded-xl flex-1 min-w-[280px] hover:shadow-lg transition">
            <img
              src={
                post.featuredImage ||
                `https://picsum.photos/300/200?random=${41 + index}`
              }
              className="w-full h-40 object-cover rounded-t-xl"
              alt={post.title}
            />
            <div className="p-4">
              <h3 className="font-semibold text-lg">{post.title}</h3>
              <p className="text-gray-500 text-sm">
                {post.excerpt || "Short description here"}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
