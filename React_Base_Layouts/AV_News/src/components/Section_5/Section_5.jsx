import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../../../api/client";
import { Link } from "react-router-dom";

export default function FeaturedArticlesSection() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["posts-featured"],
    queryFn: () => getPosts(2), // adjust page/endpoint as needed
  });

  if (isLoading) return <p className="p-4">Loading featured articles...</p>;
  if (isError)
    return <p className="p-4 text-red-500">Error: {error.message}</p>;

  const featuredArticles = data?.articles?.slice(0, 2) || [];

  return (
    <div className="featured-articles-section">
      <div className="featured-articles-grid">
        {featuredArticles.map((post) => (
          <div
            key={post._id}
            className="featured-article-item featured-article-large">
            <div className="featured-article-overlay"></div>
            <div className="featured-article-content">
              <span className="featured-article-tag">
                {post.category || "NEWS"}
              </span>
              <h2>
                <Link to={`/article/${post.slug}`} className="hover:underline">
                  {post.title}
                </Link>
              </h2>
            </div>
            <div
              className="featured-article-bg"
              style={{ backgroundImage: `url(${post.imageUrl})` }}></div>
          </div>
        ))}
      </div>
    </div>
  );
}
