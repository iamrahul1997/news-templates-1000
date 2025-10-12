import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../../../api/client";
import { Link } from "react-router-dom";

function TopPicks() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["top-picks"],
    queryFn: () => getPosts("top-picks"),
  });

  if (isLoading) return <p className="p-6">Loading...</p>;
  if (isError)
    return (
      <p className="p-6 text-red-500">
        Failed to load top picks: {error.message}
      </p>
    );

  const postsArray = Object.values(data?.articles || []).slice(15, 21);

  return (
    <section className="max-w-7xl mx-auto px-4 py-14">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Top pick by authors
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {postsArray.map((post) => (
          <div key={post._id}>
            {/* Featured Post */}
            <div className="relative group rounded-xl overflow-hidden shadow hover:shadow-xl transition duration-500 mb-4">
              <div className="overflow-hidden">
                <img
                  src={post.featuredImage}
                  alt={post.name || post.title}
                  className="w-full h-52 object-cover rounded-xl transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div
                className={`absolute top-3 left-3 text-white text-xs px-2 py-1 rounded group-hover:scale-105 transition ${
                  post.section === "Fashion" ? "bg-pink-600" : "bg-purple-600"
                }`}>
                {post.section || "General"}
              </div>
            </div>

            {/* <div className="mt-2 text-sm text-gray-500">
              📅 {post.publishedAt}
            </div> */}
            <h3 className="text-lg font-semibold mt-1 group-hover:text-pink-400">
              <Link to={`/article/${post.slug}`}>
                {post.name || post.title}
              </Link>
            </h3>

            {/* Mini Posts */}
            <div className="mt-4 space-y-3">
              {Object.values(post.miniPosts || []).map((mini) => (
                <Link
                  to={`/article/${mini.slug}`}
                  key={mini._id}
                  className="flex items-center gap-3 group hover:bg-gray-50 p-2 rounded-lg transition">
                  <img
                    src={mini.featuredImage}
                    alt={mini.name || mini.title}
                    className="w-14 h-14 object-cover rounded"
                  />
                  <div>
                    <span className="text-purple-600 text-sm font-medium">
                      {mini.section || "General"}
                    </span>
                    <p className="text-sm">{mini.name || mini.title}</p>
                    {/* <span className="text-xs text-gray-500">
                      📅 {mini.publishedAt}
                    </span> */}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default TopPicks;
