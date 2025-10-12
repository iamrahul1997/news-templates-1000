// component  | left scrollable bar and right sticky sidebar

import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../../../api/client";

export default function Section4() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["section4-posts"],
    queryFn: () => getPosts(4),
  });

  if (isLoading) return <p className="p-6">Loading...</p>;
  if (isError)
    return (
      <p className="p-6 text-red-500">Error loading section: {error.message}</p>
    );

  const postsArray = Object.values(data?.articles || []);
  if (postsArray.length <= 15) {
    return (
      <div className="w-full px-4 sm:px-6 lg:px-8 text-center py-10 text-gray-500">
        No articles available
      </div>
    );
  }

  const slicedArticles = postsArray.slice(15);
  const popular = slicedArticles.slice(16, 19);
  const popular2 = slicedArticles.slice(19, 20);
  const recent = slicedArticles.slice(19, 22);
  const recent2 = slicedArticles.slice(22, 24);
  const upcoming = slicedArticles.slice(24, 28);

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 lg:py-4 bg-blue-200">
      <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row gap-6 mt-6 ">
        {/* Column 1: Popular Posts */}
        <div className="w-full lg:w-[300px] flex flex-col gap-6 border-b lg:border-b-0 lg:border-r border-gray-300 p-2 sm:p-4">
          <h3 className="text-sm font-bold uppercase tracking-wide hover:text-blue-600 transition cursor-pointer">
            Popular Posts
          </h3>

          {popular.map((post, idx) => (
            <Link
              to={`/article/${post.slug}`}
              key={post._id || idx}
              className="group flex flex-col gap-2 p-2 sm:p-3 rounded transition hover:scale-105">
              <span className="w-fit bg-[#40798C] text-white text-xs font-normal px-2 py-1 rounded">
                {post.category || "MARKET"}
              </span>
              <h2 className="text-[15px] sm:text-[16px] font-semibold leading-snug group-hover:text-blue-600 transition">
                {post.title}
              </h2>
              <div className="flex items-center space-x-4 text-gray-500 text-xs">
                <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                <span>{post.author?.name ? `By ${post.author.name}` : ""}</span>
              </div>
              {post.featuredImage && (
                <div className="w-full h-36 sm:h-40 md:h-44 overflow-hidden rounded">
                  <img
                    src={post.featuredImage}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-300 transform group-hover:scale-105"
                  />
                </div>
              )}
            </Link>
          ))}

          {popular2.map((post, idx) => (
            <Link
              to={`/article/${post.slug}`}
              key={post._id || idx}
              className="group flex flex-col gap-2 p-4 sm:p-6 rounded bg-blue-100 transition hover:scale-105">
              <span className="w-fit bg-[#40798C] text-white text-xs font-normal px-2 py-1 rounded">
                {post.category || "MARKET"}
              </span>
              <h2 className="text-[15px] sm:text-[16px] font-semibold leading-snug group-hover:text-blue-600 transition">
                {post.title}
              </h2>
              <div className="flex items-center space-x-4 text-gray-500 text-xs">
                <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                <span>{post.author?.name ? `By ${post.author.name}` : ""}</span>
              </div>
              {post.featuredImage && (
                <div className="w-full h-44 sm:h-48 md:h-52 overflow-hidden rounded">
                  <img
                    src={post.featuredImage}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-300 transform group-hover:scale-105"
                  />
                </div>
              )}
            </Link>
          ))}
        </div>

        {/* Column 2: Recent Posts */}
        <div className="w-full lg:flex-1 flex flex-col gap-6 border-b lg:border-b-0 lg:border-r border-gray-300 p-2 sm:p-4">
          <h3 className="text-sm font-bold uppercase tracking-wide hover:text-blue-600 transition cursor-pointer">
            Recent Posts
          </h3>

          {[...recent, ...recent2].map((post, idx) => (
            <Link
              to={`/article/${post.slug}`}
              key={post._id || idx}
              className="group flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 p-2 sm:p-3 rounded transition hover:scale-105">
              <div className="flex-1 mt-2">
                <span className="w-fit bg-[#40798C] text-white text-xs font-normal px-2 py-1 rounded">
                  {post.category || "MARKET"}
                </span>
                <h2 className="text-[18px] sm:text-[20px] leading-[24px] sm:leading-[28px] font-semibold mt-2 group-hover:text-blue-600 transition">
                  {post.title}
                </h2>
                <div className="flex items-center text-gray-500 text-sm mt-2 gap-4">
                  <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
              {post.featuredImage && (
                <div className="flex-shrink-0 w-full sm:w-[210px] h-[140px] sm:h-[140px] overflow-hidden rounded">
                  <img
                    src={post.featuredImage}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-300 transform group-hover:scale-105"
                  />
                </div>
              )}
            </Link>
          ))}

          {/* Featured Big Post */}
          {recent[0] && (
            <Link
              to={`/article/${recent[0].slug}`}
              className="relative w-full h-[300px] sm:h-[350px] rounded overflow-hidden group hover:scale-105 transition-transform mt-4">
              <img
                src={recent[0].featuredImage}
                alt={recent[0].title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent p-4 flex flex-col justify-end">
                <span className="w-fit bg-[#40798C] text-white text-xs font-normal px-2 py-1 rounded">
                  {recent[0].category || "MARKET"}
                </span>
                <h2 className="text-2xl font-bold leading-snug text-white group-hover:text-blue-400 transition truncate">
                  {recent[0].title}
                </h2>
              </div>
            </Link>
          )}
        </div>

        {/* Column 3: Upcoming Blogs */}
        <div className="w-full lg:flex-1 flex flex-col gap-6 lg:pl-6 lg:border-l lg:border-gray-200 lg:sticky lg:top-20 self-start h-fit">
          <h3 className="text-lg font-bold border-b pb-2 mb-4 hover:text-blue-600 transition cursor-pointer">
            Upcoming Blogs
          </h3>

          {upcoming.map((post, idx) => (
            <Link
              to={`/article/${post.slug}`}
              key={post._id || idx}
              className="group relative w-full h-[120px] sm:h-[140px] md:h-[150px] rounded overflow-hidden transition hover:scale-105">
              {post.featuredImage && (
                <img
                  src={post.featuredImage}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent p-2 flex flex-col justify-end">
                <span className="w-fit bg-[#40798C] text-white text-xs font-normal px-2 py-1 rounded">
                  {post.category || "News"}
                </span>
                <h4 className="font-semibold mt-1 text-white group-hover:text-blue-400 transition text-sm md:text-base truncate">
                  {post.title}
                </h4>
              </div>
            </Link>
          ))}

          <a
            href="#"
            className="block text-xs font-medium text-blue-600 hover:underline mt-4 mb-4">
            See All Posts →
          </a>
        </div>
      </div>
    </div>
  );
}
