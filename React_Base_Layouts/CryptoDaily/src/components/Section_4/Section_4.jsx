import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../../../api/client";
import { Link } from "react-router-dom";

export default function FeaturedStories() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["featured-stories"],
    queryFn: () => getPosts(4), // adjust page/category for featured stories
  });

  if (isLoading) return <p className="p-4">Loading featured stories...</p>;
  if (isError)
    return <p className="p-4 text-red-500">Error: {error.message}</p>;

  const featuredPosts = (data?.articles || []).slice(16, 21);

  return (
    <section className="featured-stories">
      <div className="container">
        <div className="hero-grid">
          {featuredPosts.map((post, index) => (
            <article
              key={post._id}
              className={`hero-card ${index === 0 ? "hero-card-large" : ""}`}>
              {/* ✅ Featured Image */}
              <div
                className="hero-image"
                style={{
                  backgroundImage: `url(${post.featuredImage})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}></div>

              <div className="hero-content">
                <span className="hero-tag">{post.category?.toUpperCase()}</span>

                {index === 0 ? (
                  <h2 className="hero-title">
                    <Link to={`/article/${post.slug}`}>{post.title}</Link>
                  </h2>
                ) : (
                  <h3 className="hero-title">
                    <Link to={`/article/${post.slug}`}>{post.title}</Link>
                  </h3>
                )}

                <div className="hero-meta">
                  <span>
                    {new Date(post.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
