import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { getPosts } from "../../api/client";

export default function RecentPostsSection() {
  const [page, setPage] = useState(1);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["recent-posts", page],
    queryFn: () => getPosts(page),
    keepPreviousData: true,
  });

  if (isLoading) return <p className="p-6">Loading posts...</p>;
  if (isError)
    return <p className="p-6 text-red-500">Error: {error.message}</p>;

  const posts = data?.articles || [];

  // Example: first 3 posts for main section
  const mainPosts = posts.slice(80, 86);

  // Example: next 4 posts for sidebar popular posts
  const popularPosts = posts.slice(87, 91);

  // Example: extract unique categories with counts for sidebar
  const categories = posts.reduce((acc, post) => {
    const key = post.section || "General";
    acc[key] = acc[key] ? acc[key] + 1 : 1;
    return acc;
  }, {});

  return (
    <section className="recent-posts-section" id="recent-posts-section">
      <div className="recent-posts-grid">
        {/* Main Recent Posts */}
        <div className="recent-posts-main">
          <div className="headlines-header">
            <h2 className="headlines-title">Recent Posts</h2>
          </div>
          <div className="posts-grid">
            {mainPosts.map((post) => (
              <article key={post._id} className="post-card">
                <Link to={`/article/${post.slug}`} className="post-card__link">
                  <div className="post-card__image-wrapper">
                    <img
                      src={post.featuredImage}
                      alt={post.title}
                      className="post-card__image"
                    />
                  </div>
                  <div className="post-card__content">
                    <h3 className="post-card__title">{post.title}</h3>
                    <div className="post-card__meta">
                      <span className="category">
                        {post.section || "General"}
                      </span>
                      <span className="date">
                        {post.createdAt.split("T")[0]}
                      </span>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <aside className="recent-posts-sidebar">
          {/* Categories */}
          <div className="crypto-categories-widget">
            <h2 className="sidebar-title">Crypto Categories</h2>
            <div className="categories-list">
              {Object.entries(categories).map(([category, count]) => (
                <div key={category} className="category-item">
                  <Link
                    to={`/category/${category.toLowerCase()}`}
                    className="category-item__link">
                    <span className="category-item__name">
                      {category.toUpperCase()}
                    </span>
                    <span className="category-item__count">{count}</span>
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Popular Posts */}
          <div className="popular-posts-widget">
            <h2 className="sidebar-title">Popular</h2>
            <div className="popular-posts-list">
              {popularPosts.map((post, idx) => (
                <article key={post._id} className="popular-post-item">
                  <Link
                    to={`/article/${post.slug}`}
                    className="popular-post-item__link">
                    <div className="popular-post-item__image-wrapper">
                      <img
                        src={post.featuredImage}
                        alt={post.title}
                        className="popular-post-item__image"
                      />
                    </div>
                    <div className="popular-post-item__content">
                      <span className="category">
                        {post.section || "General"}
                      </span>
                      <h4 className="popular-post-item__title">{post.title}</h4>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
