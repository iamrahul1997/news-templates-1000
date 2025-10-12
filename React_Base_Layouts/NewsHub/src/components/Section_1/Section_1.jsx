import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../../../api/client";
import { Link } from "react-router-dom";

export default function HeroWithSidebar() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["hero-sidebar-posts"],
    queryFn: () => getPosts(1), // adjust page if needed
  });

  if (isLoading) return <p className="p-4">Loading posts...</p>;
  if (isError)
    return <p className="p-4 text-red-500">Error: {error.message}</p>;

  const posts = data?.articles || [];

  const mainPost = posts[0]; // left column main feature
  const sidebarPosts = posts.slice(1, 4); // right column top news (3 posts)

  return (
    <section className="hero">
      <div className="hero-container">
        {/* Left Column - Main Feature */}
        {mainPost && (
          <article className="hero-main">
            <div className="hero-content">
              <h1>
                <Link to={`/article/${mainPost.slug}`} className="hero-link">
                  {mainPost.title}
                </Link>
              </h1>
              <p className="hero-excerpt">
                {mainPost.excerpt || mainPost.description || "Read more..."}
              </p>
            </div>

            <div className="hero-meta">
              <span className="hero-category">
                {mainPost.category?.toUpperCase()}
              </span>
              <span className="hero-date">
                {new Date(mainPost.createdAt).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>

            <div className="hero-bg-image">
              <img
                src={mainPost.featuredImage}
                alt={mainPost.title}
                loading="lazy"
              />
            </div>
          </article>
        )}

        {/* Right Column - Sidebar */}
        <aside className="hero-sidebar">
          <div className="sidebar-header">
            <div className="sidebar-line"></div>
            <h2>Top News</h2>
            <div className="sidebar-line"></div>
          </div>

          <div className="sidebar-articles">
            {sidebarPosts.map((post, index) => (
              <React.Fragment key={post._id}>
                <article
                  className={`sidebar-item ${post.isPremium ? "premium" : ""}`}>
                  <h3>
                    <Link to={`/article/${post.slug}`}>{post.title}</Link>
                  </h3>
                  <div className="sidebar-meta">
                    <span className="sidebar-category">
                      {post.category?.toUpperCase()}
                    </span>
                    <span className="meta-divider">•</span>
                    <span className="sidebar-date">
                      {new Date(post.createdAt).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                </article>
                {index < sidebarPosts.length - 1 && (
                  <div className="sidebar-divider"></div>
                )}
              </React.Fragment>
            ))}
          </div>
        </aside>
      </div>
    </section>
  );
}
