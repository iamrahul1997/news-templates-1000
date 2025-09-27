import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../../../api/client";
import { Link } from "react-router-dom";

export default function HeroGrid() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["hero-posts"],
    queryFn: () => getPosts(1),
  });

  if (isLoading) return <p>Loading hero posts...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  // Limit to 7 posts
  const heroPosts = (data?.articles || []).slice(10, 17);

  return (
    <div className="hero-grid">
      {heroPosts.map((post, index) => (
        <Link
          to={`/article/${post.slug}`}
          key={post._id}
          className={`hero-item ${
            index === 0 ? "hero-main" : "hero-secondary"
          }`}>
          <div className="hero-overlay"></div>

          <div className="hero-content">
            <span className="hero-tag">{post.category || "General"}</span>
            {index === 0 ? (
              <h2>{post.title || post.excerpt}</h2>
            ) : (
              <h3>{post.title || post.excerpt}</h3>
            )}
            <div className="hero-date">
              {new Date(post.createdAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </div>
          </div>

          <div
            className="hero-bg"
            style={{ backgroundImage: `url(${post.featuredImage})` }}></div>
        </Link>
      ))}
    </div>
  );
}
