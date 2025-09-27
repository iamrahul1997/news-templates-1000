import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { getPosts } from "../../api/client";

export default function Section_Headlines() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["posts-section7"],
    queryFn: () => getPosts(7),
  });

  if (isLoading) return <p className="p-6">Loading...</p>;
  if (isError)
    return <p className="p-6 text-red-500">Error: {error.message}</p>;

  const articles = (data?.articles || []).map((post) => ({
    ...post,
    slug:
      post.slug ||
      post.title
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^\w-]/g, ""),
  }));

  // Separate columns
  const mainArticles = articles.slice(0, 4); // left grid
  const exclusiveArticles = articles.slice(4, 10); // middle column
  const featuredArticles = articles.slice(0, 2); // right sidebar (example)

  return (
    <>
      {/* Headlines Section */}
      <section className="headlines-section">
        <div className="container">
          <div className="headlines-header">
            <h2 className="headlines-title">Headlines</h2>
            <div className="headlines-divider"></div>
          </div>
        </div>
      </section>

      {/* Latest Crypto News Section */}
      <section
        className="latest-crypto-news-section"
        id="latest-crypto-news-section">
        <div className="homepage-content-grid">
          {/* Left Column (Grid Cards) */}
          <div className="content-column main-content-column">
            <div className="crypto-news-grid">
              {mainArticles.map((post) => (
                <article key={post._id} className="crypto-news-card">
                  <Link
                    to={`/article/${post.slug}`}
                    className="crypto-news-card__link">
                    <div className="crypto-news-card__image">
                      <img src={post.featuredImage} alt={post.title} />
                    </div>
                    <div className="crypto-news-card__content">
                      <h3 className="crypto-news-card__title">{post.title}</h3>
                      <div className="crypto-news-card__meta">
                        <span className="category">{post.section}</span>
                        <span className="date">
                          {post.createdAt.split("T")[0]}
                        </span>
                      </div>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </div>

          {/* Middle Column (Exclusive Articles) */}
          <div className="content-column exclusive-articles-column">
            <div className="exclusive-header">
              <h2 className="exclusive-title">Exclusive Articles</h2>
            </div>
            <div className="exclusive-list">
              {exclusiveArticles.map((post) => (
                <article key={post._id} className="exclusive-article">
                  <Link
                    to={`/article/${post.slug}`}
                    className="exclusive-article__link">
                    <div className="exclusive-article__image">
                      <img src={post.featuredImage} alt={post.title} />
                    </div>
                    <div className="exclusive-article__content">
                      <h3 className="exclusive-article__title">{post.title}</h3>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </div>

          {/* Right Column (Sidebar) */}
          <div className="content-column trending-sidebar-column">
            {featuredArticles.map((post, idx) => (
              <article key={idx} className="featured-article">
                <Link
                  to={`/article/${post.slug}`}
                  className="featured-article__link">
                  <img
                    src={post.featuredImage}
                    alt={post.title}
                    className="featured-article__image"
                  />
                  <div className="featured-article__content">
                    <h2 className="featured-article__title">{post.title}</h2>
                    <div className="featured-article__meta">
                      <span className="category">{post.section}</span>
                      <span className="featured-article__date">
                        {post.createdAt.split("T")[0]}
                      </span>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
