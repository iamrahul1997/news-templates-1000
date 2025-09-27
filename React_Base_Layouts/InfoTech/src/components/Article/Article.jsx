import React from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../../api/client";
import "../css/common.css";
import "../css/article.css";

export default function Article() {
  const { slug } = useParams();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["allPosts"],
    queryFn: () => getPosts(5), // or adjust section/limit as needed
  });

  if (isLoading) return <p className="p-6">Loading article...</p>;
  if (isError)
    return <p className="p-6 text-red-500">Error: {error.message}</p>;

  const allPosts = data?.articles || [];
  const article = allPosts.find((p) => p.slug === slug);
  if (!article) return <p className="p-6">Article not found</p>;

  const relatedArticles = allPosts.filter((p) => p.slug !== slug).slice(60, 66);

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });

  return (
    <main className="container article-main">
      {/* Article Header */}
      <article className="article">
        <header className="article-header">
          <a className="badge" href="#">
            {article.section || "General"}
          </a>
          <h1 className="article-title">{article.title}</h1>
          <div className="article-meta">
            <time className="article-date">
              {formatDate(article.createdAt)}
            </time>
            <span className="article-author">
              By {article.author?.name || "Unknown"}
            </span>
          </div>
        </header>

        {/* Hero Image */}
        {/* <div className="article-hero">
          <img src={article.featuredImage} alt={article.title} />
        </div> */}

        {/* Article Body */}
        <div
          className="article-body"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
      </article>

      {/* Related Articles */}
      <section className="related-articles">
        <h2 className="block-title">You May Also Like</h2>
        <div className="related-grid">
          {relatedArticles.map((post) => (
            <article className="related-card" key={post._id}>
              <img src={post.featuredImage} alt={post.title} />
              <div className="related-content">
                <a className="badge" href="#">
                  {post.section || "General"}
                </a>
                <h3>
                  <Link to={`/article/${post.slug}`}>{post.title}</Link>
                </h3>
                <time>{formatDate(post.createdAt)}</time>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
