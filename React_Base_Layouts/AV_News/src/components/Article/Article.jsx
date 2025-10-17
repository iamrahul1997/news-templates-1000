import React from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../../../api/client";
import "../css/common.css";
import "../css/article.css";

export default function ArticlePage() {
  const { slug } = useParams();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["allPosts"],
    queryFn: () => getPosts(5), // you can adjust to fetch by section if needed
  });

  if (isLoading) return <p className="p-6">Loading article...</p>;
  if (isError)
    return <p className="p-6 text-red-500">Error: {error.message}</p>;

  const allPosts = data?.articles || [];
  const article = allPosts.find((p) => p.slug === slug);
  if (!article) return <p className="p-6">Article not found</p>;

  // Related, Trending, Latest
  const relatedArticles = allPosts.filter((p) => p.slug !== slug).slice(0, 3);
  const trending = allPosts.slice(0, 3);
  const latest = allPosts.slice(3, 7);

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

  return (
    <>
      {/* Article Header */}
      <div className="article-header font-inter">
        <div className="article-header-content">
          <div className="article-breadcrumb">
            <Link to="/">Home</Link> &gt;{" "}
            <Link to={`/${article.section?.toLowerCase() || "general"}`}>
              {article.section || "General"}
            </Link>{" "}
            &gt; <span>{article.title}</span>
          </div>
          <div className="article-category">
            {article.section?.toUpperCase() || "GENERAL"}
          </div>
          <h1 className="article-title">{article.title}</h1>
          <div className="article-meta">
            <div className="article-date">{formatDate(article.createdAt)}</div>
            <div className="article-stats">
              <span>
                <i className="fas fa-eye"></i> {article.views || "1.2K"}
              </span>
              <div className="social-share">
                <button className="share-btn facebook">
                  <i className="fab fa-facebook"></i> Share on Facebook
                </button>
                <button className="share-btn twitter">
                  <i className="fab fa-twitter"></i> Tweet
                </button>
                <button className="share-btn">
                  <i className="fas fa-link"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="article-hero-image">
          <img src={article.featuredImage} alt={article.title} />
        </div>
      </div>

      {/* Article Content */}
      <div className="article-container">
        <div className="article-content">
          <div
            className="article-body"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          {/* Article Navigation */}
          <div className="article-navigation">
            <div className="nav-prev">
              <Link
                to={`/article/${relatedArticles[0]?.slug}`}
                className="nav-link">
                <div className="nav-content">
                  <span className="nav-label">Previous Article</span>
                  <h4>{relatedArticles[0]?.title}</h4>
                </div>
              </Link>
            </div>
            <div className="nav-next">
              <Link
                to={`/article/${relatedArticles[1]?.slug}`}
                className="nav-link">
                <div className="nav-content">
                  <span className="nav-label">Next Article</span>
                  <h4>{relatedArticles[1]?.title}</h4>
                </div>
              </Link>
            </div>
          </div>

          {/* Related Articles */}
          <div className="related-articles">
            <h3>Related Posts</h3>
            <div className="related-grid">
              {relatedArticles.map((post) => (
                <div className="related-item" key={post._id}>
                  <div
                    className="related-thumb"
                    style={{
                      backgroundImage: `url('${post.featuredImage}')`,
                    }}></div>
                  <div className="related-content">
                    <span className="related-date">
                      {formatDate(post.createdAt)}
                    </span>
                    <h4>
                      <Link to={`/article/${post.slug}`}>{post.title}</Link>
                    </h4>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="article-sidebar">
          {/* Trending Articles */}
          <div className="sidebar-section">
            <h3>Trending</h3>
            <div className="trending-articles">
              {trending.map((post) => (
                <div className="trending-item" key={post._id}>
                  <div
                    className="trending-thumb"
                    style={{
                      backgroundImage: `url('${post.featuredImage}')`,
                    }}></div>
                  <div className="trending-content">
                    <h4>
                      <Link to={`/article/${post.slug}`}>{post.title}</Link>
                    </h4>
                    <div className="trending-meta">
                      {formatDate(post.createdAt)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Latest News Section */}
          <div className="sidebar-section sticky-news">
            <h3>Latest News</h3>
            <div className="news-list">
              {latest.map((post) => (
                <div className="news-item" key={post._id}>
                  <div
                    className="news-thumb"
                    style={{
                      backgroundImage: `url('${post.featuredImage}')`,
                    }}></div>
                  <div className="news-content">
                    <h4>
                      <Link to={`/article/${post.slug}`}>{post.title}</Link>
                    </h4>
                    <div className="news-meta">
                      <span className="news-time">
                        {formatDate(post.createdAt)}
                      </span>
                      <span className="news-category">
                        {post.section || "General"}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
