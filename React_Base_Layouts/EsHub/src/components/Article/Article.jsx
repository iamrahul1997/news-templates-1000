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
    queryFn: () => getPosts(10), // fetch enough posts to cover main, related & latest
  });

  if (isLoading) return <p className="p-6">Loading article...</p>;
  if (isError)
    return <p className="p-6 text-red-500">Error: {error.message}</p>;

  const allPosts = data?.articles || [];
  const article = allPosts.find((p) => p.slug === slug);
  if (!article) return <p className="p-6">Article not found</p>;

  const relatedArticles = allPosts.filter((p) => p.slug !== slug).slice(0, 3);
  const latestArticles = allPosts.filter((p) => p.slug !== slug).slice(0, 4); // show 4 in sidebar

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });

  return (
    <div className="content-box">
      <div className="main-container">
        <div className="flex-wrapper">
          {/* MAIN ARTICLE */}
          <article className="blog-posts-column">
            <header className="article-header">
              <span className="category" aria-label="Article category">
                {article.section || "General"}
              </span>
              <h1>{article.title}</h1>
              <p className="article-meta">
                <time dateTime={article.createdAt}>
                  {formatDate(article.createdAt)}
                </time>
              </p>
            </header>

            {/* <div className="article-featured-image">
              <img src={article.featuredImage} alt={article.title} />
            </div> */}

            <div
              className="article-content"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />

            {/* RELATED ARTICLES */}
            <section
              className="related-articles"
              aria-labelledby="related-articles-heading">
              <div className="related-articles-header">
                <span id="related-articles-heading">RELATED ARTICLES</span>
              </div>
              <div className="articles-container">
                {relatedArticles.map((post) => (
                  <article className="article-card" key={post._id}>
                    <img src={post.featuredImage} alt={post.title} />
                    <div className="article-text">
                      <span className="category">
                        {post.section || "General"}
                      </span>
                      <h3>
                        <Link to={`/article/${post.slug}`}>{post.title}</Link>
                      </h3>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          </article>

          {/* LATEST ARTICLES SIDEBAR */}
          <aside
            className="latest-articles-column"
            aria-label="Latest articles sidebar">
            <div className="sticky-wrapper">
              <div className="sticky-content">
                <h2 className="section-title">LATEST ARTICLES</h2>
                <div className="article-list">
                  {latestArticles.map((post) => (
                    <article className="article-item" key={post._id}>
                      <div className="article-image">
                        <img src={post.featuredImage} alt={post.title} />
                      </div>
                      <div className="article-content">
                        <span className="article-category">
                          {post.section || "General"}
                        </span>
                        <h3 className="article-title">
                          <Link to={`/article/${post.slug}`}>{post.title}</Link>
                        </h3>
                        <time dateTime={post.createdAt}>
                          {formatDate(post.createdAt)}
                        </time>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
