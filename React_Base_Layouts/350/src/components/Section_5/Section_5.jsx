import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../../../api/client";

export default function EntertainmentSlider() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["entertainment-posts"],
    queryFn: () => getPosts(6), // fetch posts for this section
  });

  if (isLoading) return <p className="p-6">Loading...</p>;
  if (isError)
    return (
      <p className="p-6 text-red-500">Error loading section: {error.message}</p>
    );

  const postsArray = Object.values(data?.articles || []);
  if (postsArray.length < 7) return null;

  const entertainment = postsArray.slice(0, 4); // first 4 for Entertainment
  const sliderPosts = postsArray.slice(4, 11); // next 7 for Slider Post

  return (
    <div className="w-full">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1400px] mx-auto mt-8 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-6">
            {/* Left Column - Entertainment */}
            <div>
              <h2 className="text-2xl font-medium mb-4">Entertainment</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {entertainment.map((article) => (
                  <Link
                    key={article._id}
                    to={`/article/${article.slug}`}
                    className="group">
                    <div className="overflow-hidden relative">
                      <img
                        src={
                          article.featuredImage ||
                          "https://placehold.co/300x235"
                        }
                        alt={article.title}
                        className="w-full h-[235px] object-cover transition-transform duration-500 group-hover:scale-110 origin-center"
                      />
                    </div>
                    <div className="mt-3">
                      <p className="text-xs text-gray-500">
                        <span className="text-blue-600">
                          {article.category || "TRAVEL"}
                        </span>{" "}
                        •{" "}
                        <span className="text-black">
                          {article.createdAt
                            ? new Date(article.createdAt).toLocaleDateString()
                            : "Unknown Date"}
                        </span>
                      </p>
                      <h3 className="text-lg font-semibold mt-1 transition-colors duration-300 group-hover:text-blue-600">
                        {article.title || "Untitled Article"}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {article.excerpt || ""}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Right Column - Slider Post */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-medium">Slider Post</h2>
                <div className="flex gap-2">
                  <button className="border px-2 py-1">&lt;</button>
                  <button className="border px-2 py-1">&gt;</button>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                {sliderPosts.map((article, idx) => (
                  <Link
                    key={article._id}
                    to={`/article/${article.slug}`}
                    className="flex gap-8 items-center border-b border-gray-200 pb-4 group">
                    <div className="w-14 h-14 flex-none flex items-center justify-center border-4 border-gray-300 rounded-full text-gray-600 font-extrabold text-[25px]">
                      {idx + 1}
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 pb-2">
                        <span className="text-blue-600">
                          {article.category || "SPORTS"}
                        </span>{" "}
                        •{" "}
                        <span className="text-black">
                          {article.createdAt
                            ? new Date(article.createdAt).toLocaleDateString()
                            : "Unknown Date"}
                        </span>
                      </p>
                      <h4 className="text-[15px] leading-[22px] font-normal transition-colors duration-300 group-hover:text-blue-600">
                        {article.title || "Untitled Article"}
                      </h4>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
