// component  | dark

import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../../../api/client";

export default function Section3() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["section3-posts"],
    queryFn: () => getPosts(3),
  });

  if (isLoading) return <p className="p-6">Loading...</p>;
  if (isError)
    return (
      <p className="p-6 text-red-500">Error loading section: {error.message}</p>
    );

  const postsArray = Object.values(data?.articles || []);
  if (postsArray.length < 6) return null; // ensure enough articles

  const featuredVideo = postsArray[0]; // featured
  const otherVideos = postsArray.slice(1, 6); // video list

  return (
    <section className="w-full bg-black py-6 lg:py-10 px-2 sm:px-4 md:px-6 xl:px-0">
      {/* Section Title */}
      <div className="max-w-[76.25rem] mx-auto flex items-center mb-6">
        <div className="flex-1 border-t border-gray-400"></div>
        <div className="text-[1.125rem] bg-pink-600 text-white font-bold text-center px-4 py-1 tracking-wider mx-4">
          VIDEOS
        </div>
        <div className="flex-1 border-t border-gray-400"></div>
      </div>

      {/* Content Grid */}
      <div className="max-w-[76.25rem] mx-auto grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6">
        {/* Left Column - Featured Video */}
        {featuredVideo && (
          <Link
            to={`/article/${featuredVideo.slug}`}
            className="relative w-full group overflow-hidden rounded-lg">
            <div className="relative h-[20rem] sm:h-[24rem] md:h-[28rem] lg:h-[32rem] overflow-hidden">
              <img
                src={
                  featuredVideo.featuredImage || "https://placehold.co/800x600"
                }
                alt={featuredVideo.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 bg-gradient-to-t from-black via-black/70 to-transparent text-white rounded-b-lg">
              <div className="text-xs sm:text-sm font-semibold uppercase mb-1">
                <span className="opacity-75">{featuredVideo.category}</span>
                <span className="opacity-50">
                  {" "}
                  /{" "}
                  {featuredVideo.createdAt
                    ? new Date(featuredVideo.createdAt).toLocaleDateString()
                    : "Recent"}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold leading-snug mt-1 transition-colors duration-300 group-hover:text-pink-600">
                {featuredVideo.title}
              </h2>
              {featuredVideo.excerpt && (
                <p className="text-xs sm:text-sm opacity-90 mt-2 line-clamp-3">
                  {featuredVideo.excerpt}
                </p>
              )}
            </div>
          </Link>
        )}

        {/* Right Column - Video List */}
        <div className="space-y-6">
          {otherVideos.map((video, index) => (
            <Link
              key={video._id || index}
              to={`/article/${video.slug}`}
              className="flex items-start group overflow-hidden rounded-lg transition-all duration-300 hover:translate-x-1">
              <div className="relative w-24 h-16 sm:w-28 sm:h-20 flex-shrink-0 overflow-hidden rounded-md">
                <img
                  src={video.featuredImage || "https://placehold.co/100x100"}
                  alt={video.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity rounded-md" />
              </div>
              <div className="flex-1 ml-3 sm:ml-4">
                <div className="text-xs font-semibold uppercase text-gray-400">
                  {video.category} /{" "}
                  {video.createdAt
                    ? new Date(video.createdAt).toLocaleDateString()
                    : "Recent"}
                </div>
                <h3 className="text-sm sm:text-base font-bold mt-1 leading-snug transition-colors duration-300 text-white group-hover:text-pink-600">
                  {video.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
