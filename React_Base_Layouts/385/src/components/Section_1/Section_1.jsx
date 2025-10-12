// component  | dark theme

import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../../../api/client";

export default function Section5() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["section5-posts"],
    queryFn: () => getPosts(5), // fetch posts for this section
  });

  if (isLoading) return <p className="p-6">Loading...</p>;
  if (isError)
    return (
      <p className="p-6 text-red-500">Error loading section: {error.message}</p>
    );

  const postsArray = Object.values(data?.articles || []);
  if (postsArray.length < 6) return null; // ensure enough articles

  const featuredVideo = postsArray[0]; // featured
  const videoList = postsArray.slice(1, 6); // remaining videos

  return (
    <section className="bg-black w-full px-4 sm:px-6 py-6 sm:py-8 lg:py-10">
      <div className="max-w-[1220px] mx-auto">
        {/* Section Header */}
        <div className="flex items-center mb-4">
          <span className="w-3 h-3 bg-red-500 rounded-sm mr-2"></span>
          <span className="text-white font-extrabold text-lg flex items-center">
            Personal Finance
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 ml-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </span>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-4 mt-6">
          {/* Featured Video */}
          {featuredVideo && (
            <div className="relative w-full group rounded-md overflow-hidden">
              <Link to={`/article/${featuredVideo.slug}`}>
                <img
                  src={
                    featuredVideo.featuredImage ||
                    "https://placehold.co/600x445"
                  }
                  alt={featuredVideo.title}
                  className="w-full h-auto sm:h-[445px] object-cover rounded-md"
                />
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-md"></div>
                {/* Text Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black via-black/70 to-transparent text-white rounded-b-md">
                  {featuredVideo.category && (
                    <div className="bg-white text-yellow-400 text-xs px-2 py-1 rounded-lg w-fit mb-2">
                      {featuredVideo.category}
                    </div>
                  )}
                  <h2 className="text-2xl sm:text-3xl font-bold mt-1 hover:underline">
                    {featuredVideo.title}
                  </h2>
                  <div className="flex items-center text-xs text-gray-500 pt-4">
                    <span>{featuredVideo.author?.name || "Unknown"}</span>
                    <span className="mx-2">•</span>
                    <span>
                      {featuredVideo.createdAt
                        ? new Date(featuredVideo.createdAt).toLocaleDateString()
                        : "Recent"}
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          )}

          {/* Video List */}
          <div className="flex flex-col justify-start space-y-6">
            {videoList.map((video) => (
              <Link
                key={video._id}
                to={`/article/${video.slug}`}
                className="flex items-start text-white w-full border-b border-gray-100 pb-2 group">
                <div className="relative w-24 sm:w-32 h-20 sm:h-20 flex-shrink-0 rounded-md overflow-hidden">
                  <img
                    src={video.featuredImage || "https://placehold.co/150x120"}
                    alt={video.title}
                    className="w-full h-full object-cover rounded-md"
                  />
                  <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity rounded-md"></div>
                </div>

                <div className="flex-1 ml-3 sm:ml-4 flex flex-col justify-start">
                  <div className="font-semibold uppercase opacity-75 group-hover:opacity-100 transition-opacity text-[12px] sm:text-[12px]">
                    <span>{video.category}</span>
                    <span className="text-[10px] opacity-50">
                      {" "}
                      /{" "}
                      {video.createdAt
                        ? new Date(video.createdAt).toLocaleDateString()
                        : "Recent"}
                    </span>
                  </div>
                  <div className="mt-1 font-semibold text-sm sm:text-[16px] leading-tight group-hover:text-gray-300 transition-colors">
                    {video.title}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
