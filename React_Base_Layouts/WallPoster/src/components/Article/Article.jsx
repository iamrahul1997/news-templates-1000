import React from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../../api/client";
import "../css/common.css";
import "../css/article.css";

export default function ArticlePage() {
  const { slug } = useParams();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["allPosts"],
    queryFn: () => getPosts(5), // fetch all posts
  });

  if (isLoading) return <p className="p-6">Loading article...</p>;
  if (isError)
    return <p className="p-6 text-red-500">Error: {error.message}</p>;

  const allPosts = data?.articles || [];
  const article = allPosts.find((p) => p.slug === slug);

  if (!article) return <p className="p-6">Article not found</p>;

  const relatedArticles = allPosts.filter((p) => p.slug !== slug).slice(0, 5);
  const relatedPosts = allPosts.filter((p) => p.slug !== slug).slice(0, 4);

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });

  return (
    <>
      {/* Article Hero Section */}
      <section className="article-hero" aria-labelledby="article-title">
        <div className="container">
          <div className="article-hero-layout">
            <div className="article-hero-content">
              <div
                className={`category-tag category-tag--${article.section?.toLowerCase()}`}
                role="img"
                aria-label={`${article.section} category`}>
                {article.section || "General"}
              </div>
              <h1 id="article-title" className="article-hero-title">
                {article.title}
              </h1>
              <div className="article-meta-hero">
                <time dateTime={article.createdAt} className="article-date">
                  <span
                    className="date-icon"
                    role="img"
                    aria-label="Published date">
                    📅
                  </span>
                  {formatDate(article.createdAt)}
                </time>
              </div>
            </div>
            <div className="article-hero-image">
              <img
                src={article.featuredImage}
                alt={article.title}
                className="featured-image"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main id="main-content" className="article-main">
        <div className="container">
          <div className="article-layout">
            {/* Social Share Column */}
            <aside
              className="social-share-column"
              aria-label="Social sharing options">
              <div className="social-share-sticky">
                <h2 className="visually-hidden">Share this article</h2>
                <div className="share-buttons" role="group">
                  {/* Buttons unchanged */}
                  <button
                    className="share-btn share-btn--facebook"
                    aria-label="Share on Facebook">
                    F
                  </button>
                  <button
                    className="share-btn share-btn--twitter"
                    aria-label="Share on Twitter">
                    T
                  </button>
                  <button
                    className="share-btn share-btn--linkedin"
                    aria-label="Share on LinkedIn">
                    In
                  </button>
                  <button
                    className="share-btn share-btn--reddit"
                    aria-label="Share on Reddit">
                    R
                  </button>
                  <button
                    className="share-btn share-btn--copy-link"
                    aria-label="Copy link">
                    🔗
                  </button>
                </div>
              </div>
            </aside>

            {/* Article Content Column */}
            <article className="article-content-column">
              <div className="article-content">
                <div
                  className="article-body"
                  dangerouslySetInnerHTML={{ __html: article.content }}
                />
                {/* Tags */}
                {article.tags?.length > 0 && (
                  <div className="article-tags">
                    <h3>Tags:</h3>
                    <div className="tag-list">
                      {article.tags.map((tag, idx) => (
                        <Link to={`/tag/${tag}`} key={idx} className="tag">
                          {tag}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </article>

            {/* Sidebar Column */}
            <aside className="article-sidebar" aria-label="Related articles">
              <div className="sidebar-sticky">
                <div className="related-articles">
                  <h2>Related Articles</h2>
                  <div className="related-article-list">
                    {relatedArticles.map((post) => (
                      <article className="related-item" key={post._id}>
                        <div
                          className={`related-category ${post.section?.toLowerCase()}`}>
                          {post.section || "General"}
                        </div>
                        <h3>
                          <Link to={`/article/${post.slug}`}>{post.title}</Link>
                        </h3>
                      </article>
                    ))}
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>

      {/* Related Posts Section */}
      <section className="related-posts container">
        <h2 className="section-title">Related Posts</h2>
        <div className="related-posts-grid">
          {relatedPosts.map((post) => (
            <div className="article-card" key={post._id}>
              <Link to={`/article/${post.slug}`}>
                <div
                  className="article-thumbnail"
                  style={{
                    background: `url('${post.featuredImage}') center/cover`,
                  }}></div>
                <div className="article-content">
                  <h3 className="article-title">{post.title}</h3>
                  <p className="article-meta">
                    {post.readTime || "5 min"} read
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
