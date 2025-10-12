// component 11

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../../../api/client";
import { extractAllLinkText } from "../../utils/extractLinks";
import { Link } from "react-router-dom";

export default function Section_6() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["posts-section6"],
    queryFn: () => getPosts(6),
  });

  if (isLoading) return <p className="p-6">Loading...</p>;
  if (error) return <p className="p-6 text-red-500">Error loading posts</p>;

  const articles = data?.articles || [];
  const mainArticle = articles[41];
  const sideArticles = articles.slice(42, 46); // 3 smaller blocks

  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      <div className="grid md:grid-cols-2 gap-10 items-center">
        {/* Left Big Image */}
        {mainArticle && (
          <Link to={`/article/${mainArticle.slug}`} className="block">
            <img
              src={
                mainArticle.featuredImage ||
                "https://picsum.photos/600/700?random=31"
              }
              className="w-full h-full object-cover rounded-2xl"
              alt={mainArticle.title}
            />
          </Link>
        )}

        {/* Right Content */}
        <div className="space-y-8">
          <h2 className="text-3xl font-bold text-gray-800">
            Inside the Spotlight
          </h2>
          {mainArticle && (
            <Link
              to={`/article/${mainArticle.slug}`}
              className="text-gray-600 leading-relaxed block hover:underline">
              {mainArticle.title ||
                "Dive into our latest featured stories that explore today's biggest headlines."}
            </Link>
          )}

          <div className="space-y-6">
            {sideArticles.map((post, index) => (
              <Link
                key={post._id || index}
                to={`/article/${post.slug}`}
                className="flex gap-4 hover:bg-gray-50 p-2 rounded transition">
                <img
                  src={
                    post.featuredImage ||
                    `https://picsum.photos/100/100?random=${32 + index}`
                  }
                  className="w-24 h-24 object-cover rounded-lg"
                  alt={post.title}
                />
                <div>
                  <h3 className="font-semibold text-lg">{post.title}</h3>
                  <p className="text-gray-500 text-sm">
                    {post.excerpt || "Quick summary about this news."}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
