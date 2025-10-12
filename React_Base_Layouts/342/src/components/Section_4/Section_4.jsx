import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../../../api/client";

export default function HeroSection() {
  const [activeTab, setActiveTab] = useState("latest");

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
  if (postsArray.length < 12) return null; // ensure enough posts

  const featured = postsArray[9]; // featured article
  const sideArticles = postsArray.slice(7, 12); // side articles

  return (
    <div className="w-full bg-white">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1400px] mx-auto mt-8 mb-8">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* LEFT COLUMN (Featured) */}
            <div className="relative w-full lg:flex-1 h-[400px] sm:h-[450px] lg:h-[470px] overflow-hidden rounded-md group">
              <Link to={`/article/${featured.slug}`}>
                <img
                  src={
                    featured.featuredImage ||
                    featured.image ||
                    "https://placehold.co/800x470"
                  }
                  alt={featured.title}
                  className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 sm:p-6 lg:p-10">
                  <p className="text-white text-[12px] sm:text-[14px] font-semibold uppercase tracking-wide mb-2">
                    {featured.category || "General"} /{" "}
                    <span className="text-black">
                      {featured.createdAt
                        ? new Date(featured.createdAt).toLocaleDateString()
                        : "Unknown Date"}
                    </span>
                  </p>
                  <h2 className="text-white text-[22px] sm:text-[28px] lg:text-[36px] leading-tight font-bold mb-2 hover:text-blue-400 transition-colors duration-300">
                    {featured.title}
                  </h2>
                  <p className="text-gray-200 text-sm sm:text-base line-clamp-3">
                    {featured.excerpt || "No description available."}
                  </p>
                </div>
              </Link>
            </div>

            {/* RIGHT COLUMN (Tabs + Side List) */}
            <div className="flex flex-col gap-4 w-full lg:w-[360px] mt-6 lg:mt-0">
              {/* Tabs */}
              <div className="flex gap-3">
                {["latest", "popular", "trending"].map((tab) => (
                  <button
                    key={tab}
                    className={`px-4 py-2 font-medium rounded ${
                      activeTab === tab
                        ? "bg-blue-500 text-white"
                        : "border bg-gray-200 text-black"
                    }`}
                    onClick={() => setActiveTab(tab)}>
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>

              {/* Side Articles */}
              {sideArticles.map((article, idx) => (
                <Link
                  key={idx}
                  to={`/article/${article.slug}`}
                  className="flex gap-3 items-start overflow-hidden group">
                  <div className="w-[100px] h-[70px] overflow-hidden rounded-md flex-shrink-0">
                    <img
                      src={
                        article.featuredImage ||
                        article.image ||
                        "https://placehold.co/100x70"
                      }
                      alt={article.title}
                      className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                  <div>
                    <p className="text-blue-500 text-[12px] sm:text-[13px] font-semibold uppercase tracking-wide pb-1">
                      {article.category || "General"} /{" "}
                      <span className="text-black">
                        {article.createdAt
                          ? new Date(article.createdAt).toLocaleDateString()
                          : "Unknown Date"}
                      </span>
                    </p>
                    <h3 className="text-gray-800 text-[14px] sm:text-[16px] leading-[21px] font-medium hover:text-blue-500 transition-colors duration-300">
                      {article.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
