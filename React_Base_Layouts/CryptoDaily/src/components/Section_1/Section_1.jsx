import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../../../api/client";
import { Link } from "react-router-dom";

export default function HeroSection() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["hero-posts"],
    queryFn: () => getPosts(1), // adjust the page if needed
  });

  if (isLoading) return <p className="p-4">Loading hero posts...</p>;
  if (isError)
    return <p className="p-4 text-red-500">Error: {error.message}</p>;

  const heroPosts = (data?.articles || []).slice(0, 5); // show 5 posts

  return (
    <section className="hero">
      <div className="container">
        <div className="hero-grid">
          {heroPosts.map((post, index) => (
            <article
              key={post._id}
              className={`hero-card ${index === 0 ? "hero-card-large" : ""}`}>
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
