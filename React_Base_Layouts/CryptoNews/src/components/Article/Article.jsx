import React from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../../api/client";
import "../css/article.css";
import "../css/common.css";

export default function Article() {
  const { slug } = useParams();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["allPosts"],
    queryFn: () => getPosts(5), // Adjust the number to fetch enough posts
  });

  if (isLoading) return <p className="p-6">Loading article...</p>;
  if (isError)
    return <p className="p-6 text-red-500">Error: {error.message}</p>;

  const allPosts = data?.articles || [];
  const article = allPosts.find((post) => post.slug === slug);
  if (!article) return <p className="p-6">Article not found</p>;

  const relatedPosts = allPosts.filter((p) => p.slug !== slug).slice(0, 3); // example
  const sidebarData = {
    hotArticles: allPosts.slice(0, 4),
    topics: [
      { name: "Tech", active: true },
      { name: "Business", active: false },
      { name: "DeFi", active: false },
      { name: "NFT", active: false },
    ],
  };

  return (
    <main className="main-content">
      <div className="container">
        <section className="article-page-section">
          <div className="article-page-grid">
            {/* Left Column */}
            <div className="content-column article-content-column">
              {/* Breadcrumb */}
              <nav className="breadcrumb">
                <Link to="/">Home</Link>
                <span className="breadcrumb-separator">/</span>
                <Link to="/news">News</Link>
                <span className="breadcrumb-separator">/</span>
                <span className="breadcrumb-current">{article.title}</span>
              </nav>

              {/* Article Header */}
              <article className="single-article">
                <header className="article-header">
                  <div className="article-category">
                    <span className="category">
                      {article.section || "General"}
                    </span>
                  </div>
                  <h1 className="article-title">{article.title}</h1>
                  <div className="article-meta">
                    <div className="article-meta-left">
                      <span className="publish-date">
                        {article.publishedAt}
                      </span>
                      <span className="meta-separator">•</span>
                      <span className="read-time">
                        {article.readTime || "5 min read"}
                      </span>
                    </div>
                  </div>
                </header>

                {/* Featured Image */}
                {article.featuredImage && (
                  <div className="article-featured-image">
                    <img src={article.featuredImage} alt={article.title} />
                    {article.imageCaption && (
                      <div className="image-caption">
                        {article.imageCaption}
                      </div>
                    )}
                  </div>
                )}

                {/* Share Buttons */}
                {article.showShare && (
                  <div className="article-share-buttons">
                    <span className="share-label">Share this article:</span>
                    <div className="share-buttons">
                      <a
                        href="#"
                        className="share-btn share-facebook"
                        aria-label="Share on Facebook">
                        <i className="fab fa-facebook-f"></i>
                      </a>
                      <a
                        href="#"
                        className="share-btn share-twitter"
                        aria-label="Share on Twitter">
                        <i className="fab fa-twitter"></i>
                      </a>
                      <a
                        href="#"
                        className="share-btn share-linkedin"
                        aria-label="Share on LinkedIn">
                        <i className="fab fa-linkedin-in"></i>
                      </a>
                      <a
                        href="#"
                        className="share-btn share-reddit"
                        aria-label="Share on Reddit">
                        <i className="fab fa-reddit-alien"></i>
                      </a>
                      <a
                        href="#"
                        className="share-btn share-telegram"
                        aria-label="Share on Telegram">
                        <i className="fab fa-telegram-plane"></i>
                      </a>
                      <a
                        href="#"
                        className="share-btn share-copy"
                        aria-label="Copy link">
                        <i className="fas fa-link"></i>
                      </a>
                    </div>
                  </div>
                )}

                {/* Article Content */}
                <div
                  className="article-content"
                  dangerouslySetInnerHTML={{ __html: article.content }}
                />

                {/* Article Tags */}
                {article.tags?.length > 0 && (
                  <div className="article-tags">
                    <span className="tags-label">Tags:</span>
                    <div className="tags-list">
                      {article.tags.map((tag, idx) => (
                        <Link key={idx} to={`/tag/${tag}`} className="tag">
                          {tag}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </article>

              {/* Related Posts */}
              {relatedPosts.length > 0 && (
                <section
                  className="related-posts"
                  aria-labelledby="related-posts-title">
                  <h2 className="related-posts-title" id="related-posts-title">
                    Related Articles
                  </h2>
                  <div className="related-posts-grid">
                    {relatedPosts.map((post) => (
                      <article key={post.slug} className="related-post-card">
                        <Link
                          to={`/article/${post.slug}`}
                          className="related-post-card__link">
                          <div className="related-post-card__image">
                            <img src={post.featuredImage} alt={post.title} />
                          </div>
                          <div className="related-post-card__content">
                            <h3 className="related-post-card__title">
                              {post.title}
                            </h3>
                          </div>
                        </Link>
                      </article>
                    ))}
                  </div>
                </section>
              )}
            </div>

            {/* Right Column */}
            <aside className="content-column article-sidebar-column">
              <div className="sidebar-sticky">
                {/* Hot Articles */}
                <section className="sidebar-widget">
                  <h3 className="sidebar-title-alt">Hot this week</h3>
                  <div className="hot-articles-list">
                    {sidebarData.hotArticles.map((post, idx) => (
                      <article key={idx} className="hot-article-item">
                        <div className="hot-article-content">
                          <Link
                            to={`/category/${post.section}`}
                            className="hot-article-category">
                            {post.section}
                          </Link>
                          <h4 className="hot-article-title">
                            <Link to={`/article/${post.slug}`}>
                              {post.title}
                            </Link>
                          </h4>
                        </div>
                        <div className="hot-article-number">{idx + 1}</div>
                      </article>
                    ))}
                  </div>
                </section>

                {/* Topics */}
                <section className="sidebar-widget">
                  <div className="topics-header">
                    <h3 className="sidebar-title-alt">Topics</h3>
                    <div className="topics-filter">
                      {sidebarData.topics.map((topic, idx) => (
                        <Link
                          key={idx}
                          to={`/topic/${topic.name}`}
                          className={topic.active ? "active" : ""}>
                          {topic.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </section>
              </div>
            </aside>
          </div>
        </section>
      </div>
    </main>
  );
}
