import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { getPosts } from "../../../api/client";

export default function HeroSection() {
  const [page, setPage] = useState(1);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["posts-hero", page],
    queryFn: () => getPosts(page),
    keepPreviousData: true,
  });

  if (isLoading) return <p className="p-6">Loading...</p>;
  if (isError)
    return <p className="p-6 text-red-500">Error: {error.message}</p>;

  const posts = Object.values(data?.articles || []);
  const featuredPost = posts.length > 0 ? posts[0] : null;
  const otherHeroPosts = posts.length > 1 ? posts.slice(1, 6) : [];

  const formatDate = (dateStr) => dateStr?.split("T")[0] || "Unknown date";

  return (
    <div className="hero">
      <div className="hero-grid">
        {/* Featured Hero */}
        {featuredPost && (
          <article className="hero-card featured">
            <Link to={`/article/${featuredPost.slug || "#"}`}>
              <img
                src={
                  featuredPost.featuredImage ||
                  "https://via.placeholder.com/600x400"
                }
                alt={featuredPost.title || "Featured Article"}
              />
              <div className="hero-content">
                <span className="category-tag">
                  {featuredPost.section || "General"}
                </span>
                <h2>{featuredPost.title || "No Title"}</h2>
                <p>
                  {featuredPost.description ||
                    featuredPost.title ||
                    "No description available."}
                </p>
                <div className="article-meta">
                  <span>{formatDate(featuredPost.createdAt)}</span>
                </div>
              </div>
            </Link>
          </article>
        )}

        {/* Other Hero Posts */}
        {otherHeroPosts.map((post) => (
          <article key={post._id || Math.random()} className="hero-card">
            <Link to={`/article/${post.slug || "#"}`}>
              <img
                src={
                  post.featuredImage || "https://via.placeholder.com/400x300"
                }
                alt={post.title || "Article"}
              />
              <div className="hero-content">
                <span className="category-tag">
                  {post.section || "General"}
                </span>
                <h3>{post.title || "No Title"}</h3>
                <p>
                  {post.description ||
                    post.title ||
                    "No description available."}
                </p>
                <div className="article-meta">
                  <span>{formatDate(post.createdAt)}</span>
                </div>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
