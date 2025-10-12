import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { getPosts } from "../../../api/client";

export default function ThreeColumnNews() {
  const [page, setPage] = useState(1);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["posts-three-column", page],
    queryFn: () => getPosts(page),
    keepPreviousData: true,
  });

  if (isLoading) return <p className="p-6">Loading...</p>;
  if (isError)
    return <p className="p-6 text-red-500">Error: {error.message}</p>;

  const posts = Object.values(data?.articles || []);

  // Assign posts
  const leftColumn = posts.slice(10, 14);
  const mainFeatured = posts[15];
  const subArticles = posts.slice(16, 18);
  const rightColumn = posts.slice(20, 26);

  const formatDate = (dateStr) => dateStr?.split("T")[0] || "Unknown date";

  return (
    <section className="three-column-news-section">
      <div className="three-column-news-grid">
        {/* Left Column */}
        <div className="news-column">
          <h2 className="column-header">Bitcoin & Altcoins</h2>
          {leftColumn.map((post, idx) => (
            <article
              key={post._id}
              className={
                idx === 0
                  ? "column-article featured-column"
                  : "column-article small"
              }>
              <Link to={`/article/${post.slug}`}>
                <img
                  src={post.featuredImage}
                  alt={post.title}
                  className={idx === 0 ? "" : "small-img"}
                />
                <div className="article-info">
                  <h3>{post.title}</h3>
                  <span className="article-date">
                    {formatDate(post.createdAt)}
                  </span>
                </div>
              </Link>
            </article>
          ))}
        </div>

        {/* Center Column */}
        <div className="news-column center-featured">
          {mainFeatured && (
            <article className="main-featured-article">
              <Link to={`/article/${mainFeatured.slug}`}>
                <img
                  src={mainFeatured.featuredImage}
                  alt={mainFeatured.title}
                />
                <div className="featured-content">
                  <h2>{mainFeatured.title}</h2>
                  <p className="featured-excerpt">
                    {mainFeatured.description || mainFeatured.title}
                  </p>
                  <span className="article-date">
                    {formatDate(mainFeatured.createdAt)}
                  </span>
                </div>
              </Link>
            </article>
          )}

          <div className="sub-articles">
            {subArticles.map((post) => (
              <article key={post._id} className="sub-article">
                <Link to={`/article/${post.slug}`}>
                  <img src={post.featuredImage} alt={post.title} />
                  <div className="sub-content">
                    <h4>{post.title}</h4>
                    <span className="article-date">
                      {formatDate(post.createdAt)}
                    </span>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>

        {/* Right Column */}
        <div className="news-column">
          <h2 className="column-header">Blockchain & DeFi</h2>
          {rightColumn.map((post) => (
            <article key={post._id} className="column-article small">
              <Link to={`/article/${post.slug}`}>
                <img
                  src={post.featuredImage}
                  alt={post.title}
                  className="small-img"
                />
                <div className="article-info">
                  <h4>{post.title}</h4>
                  <span className="article-date">
                    {formatDate(post.createdAt)}
                  </span>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
