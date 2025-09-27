import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../../api/client";
import { Link } from "react-router-dom";

export default function CryptoWorldSection() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["crypto-world-posts"],
    queryFn: () => getPosts(7), // adjust API endpoint as needed
  });

  if (isLoading) return <p className="p-4">Loading articles...</p>;
  if (isError)
    return <p className="p-4 text-red-500">Error: {error.message}</p>;

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });

  const posts = data?.articles || [];

  // Slicing for top and bottom articles
  const topArticles = posts.slice(70, 72);
  const bottomArticles = posts.slice(52, 57);

  return (
    <section
      className="world-of-women"
      aria-label="Crypto world featured articles">
      <div className="container">
        <header className="site-header">
          <h1 className="site-title">Crypto World</h1>
        </header>
        <div className="article-grid">
          {/* Top Articles */}
          <section className="top-articles">
            {topArticles.map((post) => (
              <article
                key={post._id}
                className="article-card-large"
                role="article">
                <div className="article-content">
                  <p className="article-card-category">
                    {post.category?.name || post.category}{" "}
                    {post.locked && (
                      <span className="locked-badge">LOCKED</span>
                    )}
                  </p>
                  <h2 className="article-title">
                    <Link to={`/article/${post.slug}`}>{post.title}</Link>
                  </h2>
                  <p className="article-meta">
                    {post.author?.name || post.author} -
                    {formatDate(post.createdAt)}
                  </p>
                </div>
                {post.featuredImage && (
                  <div className="article-image">
                    <Link to={`/article/${post.slug}`}>
                      <img src={post.featuredImage} alt={post.title} />
                    </Link>
                  </div>
                )}
              </article>
            ))}
          </section>

          {/* Bottom Articles */}
          <section className="bottom-articles">
            {bottomArticles.map((post) => (
              <article key={post._id} className="article-card-small">
                <Link to={`/article/${post.slug}`}>
                  {post.featuredImage && (
                    <div className="article-image">
                      <img src={post.featuredImage} alt={post.title} />
                    </div>
                  )}
                  <div className="article-content">
                    <p className="article-card-category">
                      {post.category?.name || post.category}{" "}
                      {post.locked && (
                        <span className="locked-badge">LOCKED</span>
                      )}
                    </p>
                    <h3 className="article-title">{post.title}</h3>
                  </div>
                </Link>
              </article>
            ))}
          </section>
        </div>
      </div>
    </section>
  );
}
