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
    queryFn: () => getPosts(5),
  });

  if (isLoading) return <p className="p-6">Loading article...</p>;
  if (isError)
    return <p className="p-6 text-red-500">Error: {error.message}</p>;

  const allPosts = data?.articles || [];
  const article = allPosts.find((p) => p.slug === slug);
  if (!article) return <p className="p-6">Article not found</p>;

  const relatedArticles = allPosts.filter((p) => p.slug !== slug).slice(0, 3);

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

  return (
    <main className="article-container font-lora">
      <article className="article-content">
        <header className="article-header">
          <h1 className="article-title">{article.title}</h1>
          <div className="article-meta">
            <span className="article-tag">{article.section || "General"}</span>
            <span className="article-author">
              By {article.author?.name || "Unknown"}
            </span>
            <span className="article-date">
              {formatDate(article.createdAt)}
            </span>
          </div>
        </header>

        {/* <figure className="article-image-container">
          <img src={article.featuredImage} alt={article.title} />
        </figure> */}

        <div
          className="article-body"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
      </article>

      <aside className="related-articles">
        <h2 className="related-title">Related Articles</h2>
        <div className="related-grid">
          {relatedArticles.map((post) => (
            <article className="news-card" key={post._id}>
              <div
                className="news-image"
                style={{
                  background: `url('${post.featuredImage}') center/cover`,
                }}></div>
              <div className="news-content">
                <span className="news-tag">{post.section || "General"}</span>
                <h3 className="news-title">
                  <Link to={`/article/${post.slug}`}>{post.title}</Link>
                </h3>
                <div className="news-meta">
                  <span>{formatDate(post.createdAt)}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </aside>
    </main>
  );
}
