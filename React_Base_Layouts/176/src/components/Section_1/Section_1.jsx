import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { getPosts } from "../../../api/client";

export default function Section5() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["posts-section5"],
    queryFn: () => getPosts(5),
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading articles.</p>;

  const articles = data?.articles || [];

  // Ensure enough articles
  if (!articles || articles.length < 42) return null;

  // Slice articles for top and bottom sections
  const sectionArticles = articles.slice(30, 37); // 7 articles for top grid
  const bottomArticles = articles.slice(36, 42); // 6 articles for bottom grid

  return (
    <section className="w-full bg-[#0e0e0e] text-white py-12 px-4 sm:px-6 lg:px-0">
      <div className="max-w-[76.25rem] mx-auto">
        {/* Top Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column: EDUCATION */}
          <div className="py-6">
            <div className="border-b-2 border-gray-700 pb-2 mb-6">
              <h2 className="text-2xl font-bitter font-bold uppercase tracking-wide text-white">
                EDUCATION
              </h2>
            </div>

            <div className="flex flex-col lg:flex-row gap-6 items-stretch">
              {/* Featured Article */}
              {sectionArticles[0] && (
                <Link
                  to={`/article/${sectionArticles[0].slug}`}
                  state={{ article: sectionArticles[0] }}
                  className="w-full lg:w-64 flex-shrink-0 group flex flex-col overflow-hidden">
                  <div className="relative h-64 sm:h-56 overflow-hidden rounded-md">
                    <img
                      src={
                        sectionArticles[0].featuredImage ||
                        "https://placehold.co/400x280"
                      }
                      alt={sectionArticles[0].title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent rounded-md"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="text-white font-bitter text-base font-bold leading-tight mb-2 group-hover:text-red-500 transition">
                        {sectionArticles[0].title}
                      </h3>
                      <div className="flex items-center text-white/80 text-xs">
                        <span className="mr-3">
                          {sectionArticles[0].author?.name || "Unknown"}
                        </span>
                        <span>
                          {sectionArticles[0].createdAt
                            ? new Date(
                                sectionArticles[0].createdAt
                              ).toLocaleDateString()
                            : "Recent"}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              )}

              {/* List Articles */}
              <div className="flex-1 flex flex-col justify-between mt-6 lg:mt-0">
                <div className="space-y-6">
                  {sectionArticles.slice(1, 4).map((article) => (
                    <Link
                      key={article._id}
                      to={`/article/${article.slug}`}
                      state={{ article }}
                      className="group block">
                      <h4 className="font-semibold font-bitter text-base leading-snug text-white group-hover:text-red-500 transition mb-2">
                        {article.title.length > 100
                          ? article.title.slice(0, 100) + "…"
                          : article.title}
                      </h4>
                      <p className="text-gray-400 text-sm">
                        {article.createdAt
                          ? new Date(article.createdAt).toLocaleDateString()
                          : "Recent"}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: SPORT AROUND THE WORLD */}
          <div className="py-6">
            <div className="border-b-2 border-gray-700 pb-2 mb-6">
              <h2 className="text-2xl font-bitter font-bold uppercase tracking-wide text-white">
                SPORT AROUND THE WORLD
              </h2>
            </div>

            <div className="flex flex-col lg:flex-row gap-6 items-stretch">
              {/* List Articles on Left */}
              <div className="flex-1 flex flex-col justify-between">
                <div className="space-y-6">
                  {sectionArticles.slice(4, 7).map((article) => (
                    <Link
                      key={article._id}
                      to={`/article/${article.slug}`}
                      state={{ article }}
                      className="group block">
                      <h4 className="font-semibold font-bitter text-base leading-snug text-white group-hover:text-red-500 transition mb-2">
                        {article.title.length > 100
                          ? article.title.slice(0, 100) + "…"
                          : article.title}
                      </h4>
                      <p className="text-gray-400 text-sm">
                        {article.createdAt
                          ? new Date(article.createdAt).toLocaleDateString()
                          : "Recent"}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Featured Article on Right */}
              {sectionArticles[5] && (
                <Link
                  to={`/article/${sectionArticles[5].slug}`}
                  state={{ article: sectionArticles[5] }}
                  className="w-full lg:w-64 flex-shrink-0 group flex flex-col overflow-hidden mt-6 lg:mt-0">
                  <div className="relative h-64 sm:h-56 overflow-hidden rounded-md">
                    <img
                      src={
                        sectionArticles[5].featuredImage ||
                        "https://placehold.co/400x280"
                      }
                      alt={sectionArticles[5].title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent rounded-md"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="text-white font-bitter text-base font-bold leading-tight mb-2 group-hover:text-red-500 transition">
                        {sectionArticles[5].title}
                      </h3>
                      <div className="flex items-center text-white/80 text-xs">
                        <span className="mr-3">
                          {sectionArticles[5].author?.name || "Unknown"}
                        </span>
                        <span>
                          {sectionArticles[5].createdAt
                            ? new Date(
                                sectionArticles[5].createdAt
                              ).toLocaleDateString()
                            : "Recent"}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 py-8">
          {bottomArticles.map((article) => (
            <Link
              key={article._id}
              to={`/article/${article.slug}`}
              state={{ article }}
              className="group block overflow-hidden">
              <div className="relative mb-4 h-32 sm:h-40 overflow-hidden rounded-md">
                <img
                  src={article.featuredImage || "https://placehold.co/400x280"}
                  alt={article.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <h4 className="font-semibold font-bitter text-sm text-white leading-tight group-hover:text-red-500 transition mb-2">
                {article.title.length > 80
                  ? article.title.slice(0, 80) + "…"
                  : article.title}
              </h4>
              <p className="text-gray-400 text-xs font-roboto">
                {article.createdAt
                  ? new Date(article.createdAt).toLocaleDateString()
                  : "Recent"}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
