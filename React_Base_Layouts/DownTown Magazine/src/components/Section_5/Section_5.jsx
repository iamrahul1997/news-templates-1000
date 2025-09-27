import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../../api/client";
import { Link } from "react-router-dom";

export default function NewspaperSection() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["newspaper-posts"],
    queryFn: () => getPosts(9), // adjust API call as needed
  });

  if (isLoading) return <p className="p-4">Loading news...</p>;
  if (isError)
    return <p className="p-4 text-red-500">Error: {error.message}</p>;

  const posts = data?.articles || [];

  const leftColumnPosts = posts.slice(80, 86); // Altcoins sidebar
  const mainContentPosts = posts.slice(90, 95); // Main crypto news
  const rightColumnPosts = posts.slice(96, 99); // Trading insights

  return (
    <section
      className="newspaper-section"
      aria-label="Latest crypto news and trading insights">
      <div className="container">
        <div className="main-grid">
          {/* LEFT COLUMN - Altcoins */}
          <aside
            className="left-column"
            role="complementary"
            aria-label="Altcoins news sidebar">
            <div className="widget">
              <div className="news-section__header">
                <h2 className="news-section__title">Altcoins</h2>
              </div>
              {leftColumnPosts.map((post) => (
                <article key={post._id} className="celebrity-article">
                  <div className="content">
                    <span className="news-item__category">{post.category}</span>
                    <h3>
                      <Link to={`/article/${post.slug}`}>{post.title}</Link>
                    </h3>
                  </div>
                  {post.featuredImage && (
                    <Link to={`/article/${post.slug}`}>
                      <img src={post.featuredImage} alt={post.title} />
                    </Link>
                  )}
                </article>
              ))}
            </div>
          </aside>

          {/* MIDDLE COLUMN - Main Crypto News */}
          <div
            className="main-content"
            role="region"
            aria-label="Main crypto news content">
            <div className="news-section__header">
              <h2 className="news-section__title">Crypto News</h2>
            </div>
            <div className="latest-articles-list">
              {mainContentPosts.map((post) => (
                <article key={post._id} className="article-item" role="article">
                  <span className="news-item__category">{post.category}</span>
                  <h2>
                    <Link to={`/article/${post.slug}`}>{post.title}</Link>
                  </h2>
                  <p>{post.excerpt}</p>
                </article>
              ))}
            </div>

            {/* Pagination */}
            <div className="pagination">
              <button
                className="pagination__btn pagination__btn--prev"
                disabled>
                Previous
              </button>
              <div className="pagination__pages">
                <button className="pagination__page pagination__page--active">
                  1
                </button>
                <button className="pagination__page">2</button>
                <button className="pagination__page">3</button>
                <span className="pagination__dots">...</span>
                <button className="pagination__page">10</button>
              </div>
              <button className="pagination__btn pagination__btn--next">
                Next
              </button>
            </div>
          </div>

          {/* RIGHT COLUMN - Trading Insights */}
          <aside
            className="right-column"
            role="complementary"
            aria-label="Trading insights sidebar">
            <div className="widget food-widget">
              <div className="news-section__header">
                <h2 className="news-section__title">Trading</h2>
              </div>
              {rightColumnPosts.map((post) => (
                <article key={post._id} className="food-article">
                  {post.featuredImage && (
                    <Link to={`/article/${post.slug}`}>
                      <img src={post.featuredImage} alt={post.title} />
                    </Link>
                  )}
                  <span className="news-item__category">{post.category}</span>
                  <h3>
                    <Link to={`/article/${post.slug}`}>{post.title}</Link>
                  </h3>
                </article>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
