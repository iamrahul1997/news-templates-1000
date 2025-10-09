import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { getPosts } from "../../../api/client";

export default function Section_1() {
  const [page, setPage] = useState(1);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["posts", page],
    queryFn: () => getPosts(page),
    keepPreviousData: true,
  });

  if (isLoading) return <p className="p-6">Loading...</p>;
  if (isError)
    return <p className="p-6 text-red-500">Error: {error.message}</p>;

  console.log("Fetched data:", data);

  const postsArray = Object.values(data?.articles || []);
  const hotTopic = postsArray[0];
  const middleCards = postsArray.slice(1, 5);
  const recentPosts = postsArray.slice(6, 10);

  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch mb-10">
      {/* LEFT: Hot Topic */}
      {hotTopic && (
        <div className="md:col-span-1 bg-white rounded shadow-sm p-6 flex flex-col">
          <h3 className="text-2xl font-bold mb-4 border-l-4 border-red-600 pl-3">
            {hotTopic.category || "Hot Topic"}
          </h3>
          <div className="flex flex-col md:flex-row gap-6 items-stretch">
            <div className="flex-1 flex flex-col bg-white">
              <Link to={`/article/${hotTopic.slug}`}>
                <img
                  src={hotTopic.featuredImage}
                  alt={hotTopic.name}
                  className="w-full h-44 md:h-56 object-cover rounded"
                />
                <div className="mt-4">
                  <span className="inline-block text-xs font-bold uppercase bg-orange-500 text-white px-2 py-1 rounded">
                    {hotTopic.tags?.[0]?.name || "General"}
                  </span>
                  <h4 className="mt-4 text-2xl font-semibold">
                    {hotTopic.name}
                  </h4>
                  <p className="mt-2 text-sm text-gray-600">
                    {hotTopic.title?.slice(0, 150) ||
                      "No description available"}
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* MIDDLE: 4 cards */}
      <div className="md:col-span-1 bg-white rounded shadow-sm p-4 flex flex-col">
        <div className="grid grid-cols-2 gap-4 flex-grow items-stretch">
          {middleCards.map((post) => (
            <Link
              to={`/article/${post.slug}`}
              key={post._id}
              className="bg-white rounded overflow-hidden shadow-sm flex flex-col">
              <img
                src={post.featuredImage}
                alt={post.name}
                className="w-full h-28 object-cover"
              />
              <div className="p-3 flex flex-col flex-grow">
                <h5 className="text-sm font-semibold mt-auto">{post.name}</h5>
                <p className="text-xs text-gray-500 mt-1">
                  {post.title || "content not available"} {post.section}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* RIGHT: Recent posts */}
      <aside className="md:col-span-1 bg-white rounded shadow-sm p-6 flex flex-col">
        <h4 className="text-lg font-semibold mb-4 border-b pb-3">Recent</h4>
        <div className="space-y-4">
          {recentPosts.map((post) => (
            <Link
              key={post._id}
              to={`/article/${post.slug}`}
              className="flex items-center gap-3">
              <img
                src={post.featuredImage}
                className="w-20 h-20 object-cover rounded"
                alt={post.name}
              />
              <div>
                <h5 className="text-sm font-semibold">{post.name}</h5>
                <p className="text-xs text-gray-500">
                  {post.title || "Unknown"} — {post.section}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </aside>
    </section>
  );
}
