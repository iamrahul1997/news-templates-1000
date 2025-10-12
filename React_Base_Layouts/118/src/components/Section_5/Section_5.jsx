import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../../../api/client";
import { Link } from "react-router-dom";

export default function Section3() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["posts-section3"],
    queryFn: () => getPosts(3),
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading articles.</p>;

  const articles = data?.articles || [];
  if (!articles || articles.length < 21) return null;

  const sectionData = articles.slice(20, 35);

  return (
    <section className="w-full bg-[#0e0e0e] text-white py-12">
      <div className="max-w-[76.25rem] mx-auto px-4 sm:px-6 lg:px-0 font-roboto">
        {/* Section Headers */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-6">
          <div className="lg:col-span-2">
            <div className="border-b-2 border-gray-700 pb-2">
              <h2 className="text-gray-300 font-semibold text-xl uppercase tracking-wide hover:text-red-500 transition">
                World & Politics
              </h2>
            </div>
          </div>
          <div>
            <div className="border-b-2 border-gray-700 pb-2">
              <h2 className="text-gray-300 font-semibold text-xl uppercase tracking-wide hover:text-red-500 transition">
                Education
              </h2>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT COLUMN */}
          <div className="lg:col-span-2 space-y-8">
            {/* Top Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Main Article */}
              {sectionData[0] && (
                <Link
                  to={`/article/${sectionData[0].slug}`}
                  state={{ article: sectionData[0] }}
                  className="group cursor-pointer overflow-hidden">
                  <div className="overflow-hidden rounded-md">
                    <img
                      src={
                        sectionData[0]?.featuredImage ||
                        "https://placehold.co/600x400"
                      }
                      alt={sectionData[0]?.title}
                      className="w-full h-64 sm:h-72 object-cover transition duration-500 group-hover:scale-105 group-hover:opacity-90"
                    />
                  </div>
                  <div className="mt-4">
                    <h1 className="text-2xl font-bold font-bitter leading-tight mb-2 text-white group-hover:text-red-500 transition">
                      {sectionData[0]?.title}
                    </h1>
                    <p className="text-xs text-gray-400 mb-3">
                      {sectionData[0]?.author?.name || "Unknown"} •{" "}
                      {sectionData[0]?.createdAt
                        ? new Date(
                            sectionData[0]?.createdAt
                          ).toLocaleDateString()
                        : "Recent"}
                    </p>
                    <p className="text-sm text-gray-400">
                      {sectionData[0]?.excerpt?.slice(0, 120) ||
                        "No description available."}
                    </p>
                  </div>
                </Link>
              )}

              {/* 2x2 Grid Articles */}
              <div className="grid grid-cols-2 gap-4">
                {sectionData.slice(1, 5).map((article) => (
                  <Link
                    key={article._id}
                    to={`/article/${article.slug}`}
                    state={{ article }}
                    className="group cursor-pointer overflow-hidden">
                    <div className="overflow-hidden rounded-md">
                      <img
                        src={
                          article?.featuredImage ||
                          "https://placehold.co/400x250"
                        }
                        alt={article?.title}
                        className="w-full h-24 object-cover mb-2 transition duration-500 group-hover:scale-105 group-hover:opacity-90"
                      />
                    </div>
                    <h3 className="text-[0.95rem] font-bitter font-bold leading-snug text-white mb-1 group-hover:text-red-500 transition">
                      {article?.title?.length > 80
                        ? article?.title.slice(0, 80) + "…"
                        : article?.title}
                    </h3>
                    <p className="text-xs text-gray-400">
                      {article?.createdAt
                        ? new Date(article?.createdAt).toLocaleDateString()
                        : "Recent"}
                    </p>
                  </Link>
                ))}
              </div>
            </div>

            {/* Bottom Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8">
              {sectionData.slice(5, 8).map((article) => (
                <Link
                  key={article._id}
                  to={`/article/${article.slug}`}
                  state={{ article }}
                  className="group cursor-pointer overflow-hidden">
                  <div className="overflow-hidden rounded-md">
                    <img
                      src={
                        article?.featuredImage || "https://placehold.co/400x250"
                      }
                      alt={article?.title}
                      className="w-full h-36 object-cover mb-3 transition duration-500 group-hover:scale-105 group-hover:opacity-90"
                    />
                  </div>
                  <h3 className="text-sm font-bitter font-bold text-white mb-2 group-hover:text-red-500 transition">
                    {article?.title?.length > 90
                      ? article?.title.slice(0, 90) + "…"
                      : article?.title}
                  </h3>
                  <p className="text-xs text-gray-400">
                    {article?.createdAt
                      ? new Date(article?.createdAt).toLocaleDateString()
                      : "Recent"}
                  </p>
                </Link>
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <aside className="bg-[#1a1a1a] p-6 space-y-6 rounded-md">
            <div>
              <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 uppercase font-bitter">
                Education
              </span>
            </div>

            {sectionData[8] && (
              <Link
                to={`/article/${sectionData[8].slug}`}
                state={{ article: sectionData[8] }}
                className="group mb-6 cursor-pointer overflow-hidden">
                <h2 className="text-lg font-bitter font-bold leading-tight text-white mb-2 group-hover:text-red-500 transition">
                  {sectionData[8]?.title?.length > 90
                    ? sectionData[8]?.title.slice(0, 90) + "…"
                    : sectionData[8]?.title}
                </h2>
                <p className="text-xs text-gray-400 mb-4">
                  {sectionData[8]?.author?.name || "Unknown"} •{" "}
                  {sectionData[8]?.createdAt
                    ? new Date(sectionData[8]?.createdAt).toLocaleDateString()
                    : "Recent"}
                </p>
                <div className="overflow-hidden rounded-md">
                  <img
                    src={
                      sectionData[8]?.featuredImage ||
                      "https://placehold.co/600x400"
                    }
                    alt={sectionData[8]?.title}
                    className="w-full h-52 object-cover transition duration-500 group-hover:scale-105 group-hover:opacity-90"
                  />
                </div>
              </Link>
            )}

            {/* Education List */}
            <div className="space-y-4">
              {sectionData.slice(9, 13).map((article) => (
                <Link
                  key={article._id}
                  to={`/article/${article.slug}`}
                  state={{ article }}
                  className="group cursor-pointer overflow-hidden">
                  <h3 className="text-sm font-bitter font-semibold text-white mb-1 group-hover:text-red-500 transition">
                    {article?.title?.length > 80
                      ? article?.title.slice(0, 80) + "…"
                      : article?.title}
                  </h3>
                  <p className="text-xs text-gray-400">
                    {article?.createdAt
                      ? new Date(article?.createdAt).toLocaleDateString()
                      : "Recent"}
                  </p>
                </Link>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
