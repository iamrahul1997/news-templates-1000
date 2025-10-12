import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { getPosts } from "../../../api/client";

export default function Section_5() {
  const [page, setPage] = useState(2);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["section5-posts", page],
    queryFn: () => getPosts(page),
    keepPreviousData: true,
  });

  if (isLoading) return <p className="p-6">Loading...</p>;
  if (isError)
    return <p className="p-6 text-red-500">Error: {error.message}</p>;

  const postsArray = Object.values(data?.articles || []);
  const heroPost = postsArray[0]; // Hero card
  const horizontalCards = postsArray.slice(23, 27); // Repeated horizontal cards
  const sidebarStacked = postsArray.slice(28, 30); // Right stacked image cards
  const sidebarSmall = postsArray.slice(31, 36); // Right small horizontal cards

  return (
    <section className="w-full bg-gray-50">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-10 gap-6 px-4 sm:px-6 py-8">
        {/* LEFT (primary) */}
        <section className="md:col-span-2 lg:col-span-7 space-y-6">
          {/* HERO CARD */}
          {heroPost && (
            <Link to={`/article/${heroPost.slug}`}>
              <article className="bg-white rounded-2xl shadow overflow-hidden">
                <div className="w-full h-[260px] sm:h-[320px] md:h-[360px] lg:h-[420px] overflow-hidden">
                  <img
                    src={heroPost.featuredImage}
                    alt={heroPost.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <p className="text-sm text-gray-500 uppercase font-semibold">
                    {heroPost.section || "Politics"}{" "}
                    <span className="text-gray-400">June 7, 2022</span>
                  </p>
                  <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight">
                    {heroPost.title || heroPost.name}
                  </h2>
                  <p className="mt-4 text-gray-600">
                    {heroPost.summary || "No description available."}
                  </p>
                </div>
              </article>
            </Link>
          )}

          {/* HORIZONTAL CARDS */}
          {horizontalCards.map((post) => (
            <Link
              key={post._id}
              to={`/article/${post.slug}`}
              className="flex flex-col md:flex-row bg-white rounded-2xl shadow overflow-hidden md:h-36">
              <div className="md:w-2/5 w-full md:h-full h-56 overflow-hidden">
                <img
                  src={post.featuredImage}
                  alt={post.section}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="md:w-3/5 w-full p-5 flex flex-col justify-center border-t md:border-t-0 md:border-l border-gray-100">
                <p className="text-sm text-gray-500">
                  {post.section}{" "}
                  <span className="text-gray-400">June 7, 2022</span>
                </p>
                <h3 className="mt-1 text-2xl font-extrabold leading-tight">
                  {post.title}
                </h3>
              </div>
            </Link>
          ))}
        </section>

        {/* RIGHT (sidebar) */}
        <aside className="md:col-span-1 lg:col-span-3 space-y-8">
          {/* STACKED IMAGE CARDS */}
          <div className="space-y-6">
            {sidebarStacked.map((post) => (
              <Link
                key={post._id}
                to={`/article/${post.slug}`}
                className="bg-white rounded-2xl shadow overflow-hidden block">
                <div className="w-full h-44 sm:h-40 overflow-hidden">
                  <img
                    src={post.featuredImage}
                    alt={post.section}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <p className="text-sm text-gray-500">
                    {post.section}{" "}
                    <span className="text-gray-400">June 7, 2022</span>
                  </p>
                  <h4 className="mt-2 text-lg font-bold">{post.title}</h4>
                </div>
              </Link>
            ))}
          </div>

          {/* SMALL HORIZONTAL CARDS */}
          <div className="space-y-4">
            {sidebarSmall.map((post) => (
              <Link
                key={post._id}
                to={`/article/${post.slug}`}
                className="flex flex-col sm:flex-row bg-white rounded-2xl shadow overflow-hidden sm:h-28">
                <div className="sm:w-1/3 w-full sm:h-full h-44 overflow-hidden">
                  <img
                    src={post.featuredImage}
                    alt={post.section}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="sm:w-2/3 w-full p-3 flex flex-col justify-center border-t sm:border-t-0 sm:border-l border-gray-100">
                  <p className="text-sm text-gray-500">{post.section}</p>
                  <h5 className="text-lg font-bold">{post.title}</h5>
                </div>
              </Link>
            ))}
          </div>
        </aside>
      </div>
    </section>
  );
}
