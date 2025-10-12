import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../../../api/client";

export default function Section5() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["section5-tech-posts"],
    queryFn: () => getPosts(5), // fetch posts for this section
  });

  if (isLoading) return <p className="p-6">Loading...</p>;
  if (isError)
    return (
      <p className="p-6 text-red-500">Error loading section: {error.message}</p>
    );

  const postsArray = Object.values(data?.articles || []);
  if (postsArray.length < 8) return null; // ensure enough articles

  const leftHero = postsArray[0];
  const leftSmall = postsArray.slice(1, 3);
  const rightHero = postsArray[3];
  const rightSmall = postsArray.slice(4, 6);

  return (
    <section className="w-full py-6 lg:py-10 bg-white px-2 sm:px-4 lg:px-0 xl:px-0">
      {/* Section Title */}
      <div className="max-w-[76.25rem] mx-auto flex items-center mb-6">
        <div className="flex-1 border-t border-gray-400"></div>
        <div className="text-[18px] bg-pink-600 text-white font-bold text-center px-4 py-1 tracking-wider mx-4">
          TECH
        </div>
        <div className="flex-1 border-t border-gray-400"></div>
      </div>

      {/* Grid Layout */}
      <div className="max-w-[76.25rem] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* LEFT COLUMN */}
        <div className="flex flex-col space-y-6">
          {/* Hero Article */}
          {leftHero && (
            <Link
              to={`/article/${leftHero.slug}`}
              className="relative group overflow-hidden rounded-md h-[26rem]">
              <img
                src={leftHero.featuredImage || "https://placehold.co/600x400"}
                alt={leftHero.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white bg-gradient-to-t from-black/80 via-black/40 to-transparent rounded-b-md">
                <div className="text-sm font-semibold uppercase mb-1">
                  <span className="text-green-400">
                    {leftHero.category || "TECH"}
                  </span>
                  <span className="text-white opacity-50">
                    {" "}
                    /{" "}
                    {leftHero.createdAt
                      ? new Date(leftHero.createdAt).toLocaleDateString()
                      : "Recent"}
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold leading-tight mt-1 group-hover:text-pink-600 transition-colors">
                  {leftHero.title}
                </h2>
              </div>
            </Link>
          )}

          {/* Two Smaller Articles */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {leftSmall.map((article) => (
              <Link
                key={article._id}
                to={`/article/${article.slug}`}
                className="group">
                <div className="relative overflow-hidden rounded-md h-[12rem]">
                  <img
                    src={
                      article.featuredImage || "https://placehold.co/300x200"
                    }
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                </div>
                <div className="mt-2">
                  <div className="text-xs text-gray-500 uppercase font-semibold">
                    {article.category || "TECH"} /{" "}
                    {article.createdAt
                      ? new Date(article.createdAt).toLocaleDateString()
                      : "Recent"}
                  </div>
                  <h3 className="text-base font-bold mt-1 group-hover:text-pink-600 transition-colors">
                    {article.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="flex flex-col space-y-6">
          {/* Hero Article */}
          {rightHero && (
            <Link
              to={`/article/${rightHero.slug}`}
              className="relative group overflow-hidden rounded-md h-[26rem]">
              <img
                src={rightHero.featuredImage || "https://placehold.co/600x400"}
                alt={rightHero.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white bg-gradient-to-t from-black/80 via-black/40 to-transparent rounded-b-md">
                <div className="text-sm font-semibold uppercase mb-1">
                  <span className="text-green-400">
                    {rightHero.category || "TECH"}
                  </span>
                  <span className="text-white opacity-50">
                    {" "}
                    /{" "}
                    {rightHero.createdAt
                      ? new Date(rightHero.createdAt).toLocaleDateString()
                      : "Recent"}
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold leading-tight mt-1 group-hover:text-pink-600 transition-colors">
                  {rightHero.title}
                </h2>
              </div>
            </Link>
          )}

          {/* Two Smaller Articles */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {rightSmall.map((article) => (
              <Link
                key={article._id}
                to={`/article/${article.slug}`}
                className="group">
                <div className="relative overflow-hidden rounded-md h-[12rem]">
                  <img
                    src={
                      article.featuredImage || "https://placehold.co/300x200"
                    }
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                </div>
                <div className="mt-2">
                  <div className="text-xs text-gray-500 uppercase font-semibold">
                    {article.category || "TECH"} /{" "}
                    {article.createdAt
                      ? new Date(article.createdAt).toLocaleDateString()
                      : "Recent"}
                  </div>
                  <h3 className="text-base font-bold mt-1 group-hover:text-pink-600 transition-colors">
                    {article.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
