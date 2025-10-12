import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../../../api/client";
import { Link } from "react-router-dom";

export default function PopularSection() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["popular-posts"],
    queryFn: () => getPosts(4), // adjust page if needed
  });

  if (isLoading) return <p className="p-4">Loading popular posts...</p>;
  if (isError)
    return <p className="p-4 text-red-500">Error: {error.message}</p>;

  const posts = data?.articles || [];

  // Split posts into columns
  const bitcoinPosts = posts.slice(24, 30);
  const centerPosts = posts.slice(31, 39);
  const altcoinPosts = posts.slice(41, 47);

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

  return (
    <section className="popular-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Popular Posts</h2>
        </div>
        <div className="popular-grid">
          {/* Bitcoin News Column */}
          <div className="popular-column">
            <div className="column-header">
              <h3>Bitcoin News</h3>
            </div>

            {bitcoinPosts[0] && (
              <article className="popular-card main-post">
                <div
                  className="popular-image"
                  style={{
                    backgroundImage: `url(${bitcoinPosts[0].featuredImage})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}></div>
                <div className="popular-content">
                  <span
                    className={`popular-tag ${bitcoinPosts[0].category?.toLowerCase()}`}>
                    {bitcoinPosts[0].category?.toUpperCase()}
                  </span>
                  <h3 className="popular-title">
                    <Link to={`/article/${bitcoinPosts[0].slug}`}>
                      {bitcoinPosts[0].title}
                    </Link>
                  </h3>
                  <div className="popular-meta">
                    {formatDate(bitcoinPosts[0].createdAt)}
                  </div>
                </div>
              </article>
            )}

            <div className="popular-list">
              {bitcoinPosts.slice(1).map((post) => (
                <article key={post._id} className="popular-item">
                  <div
                    className="popular-item-image"
                    style={{
                      backgroundImage: `url(${post.featuredImage})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}></div>
                  <div className="popular-item-content">
                    <span
                      className={`popular-tag ${post.category?.toLowerCase()}`}>
                      {post.category?.toUpperCase()}
                    </span>
                    <h4>
                      <Link to={`/article/${post.slug}`}>{post.title}</Link>
                    </h4>
                    <div className="item-meta">
                      {formatDate(post.createdAt)}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Center Popular Posts Column */}
          <div className="popular-column center-column">
            <div className="column-header">
              <h3>Popular Post</h3>
            </div>
            <div className="popular-list center-list">
              {centerPosts.map((post) => (
                <article key={post._id} className="popular-item">
                  <div
                    className="popular-item-image round"
                    style={{
                      backgroundImage: `url(${post.featuredImage})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}></div>
                  <div className="popular-item-content">
                    <span
                      className={`popular-tag ${post.category?.toLowerCase()}`}>
                      {post.category?.toUpperCase()}
                    </span>
                    <h4>
                      <Link to={`/article/${post.slug}`}>{post.title}</Link>
                    </h4>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Altcoin News Column */}
          <div className="popular-column">
            <div className="column-header">
              <h3>Altcoin News</h3>
            </div>

            {altcoinPosts[0] && (
              <article className="popular-card main-post">
                <div
                  className="popular-image"
                  style={{
                    backgroundImage: `url(${altcoinPosts[0].featuredImage})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}></div>
                <div className="popular-content">
                  <span
                    className={`popular-tag ${altcoinPosts[0].category?.toLowerCase()}`}>
                    {altcoinPosts[0].category?.toUpperCase()}
                  </span>
                  <h3 className="popular-title">
                    <Link to={`/article/${altcoinPosts[0].slug}`}>
                      {altcoinPosts[0].title}
                    </Link>
                  </h3>
                  <div className="popular-meta">
                    {formatDate(altcoinPosts[0].createdAt)}
                  </div>
                </div>
              </article>
            )}

            <div className="popular-list">
              {altcoinPosts.slice(1).map((post) => (
                <article key={post._id} className="popular-item">
                  <div
                    className="popular-item-image"
                    style={{
                      backgroundImage: `url(${post.featuredImage})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}></div>
                  <div className="popular-item-content">
                    <span
                      className={`popular-tag ${post.category?.toLowerCase()}`}>
                      {post.category?.toUpperCase()}
                    </span>
                    <h4>
                      <Link to={`/article/${post.slug}`}>{post.title}</Link>
                    </h4>
                    <div className="item-meta">
                      {formatDate(post.createdAt)}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
