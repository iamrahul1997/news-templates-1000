import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../../api/client";
import { Link } from "react-router-dom";

export default function NewsGridSection() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["news-grid-section"],
    queryFn: () => getPosts(7), // adjust page/endpoint as needed
  });

  if (isLoading) return <p className="p-4">Loading news...</p>;
  if (isError)
    return <p className="p-4 text-red-500">Error: {error.message}</p>;

  const posts = data?.articles || [];

  // Example slicing logic for each column
  const ukrainePosts = posts.slice(11, 16);
  const financePosts = posts.slice(17, 21);
  const marketingPosts = posts.slice(22, 26);

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });

  return (
    <section className="news-grid-section" aria-label="Latest news by category">
      <div className="news-grid-section__container">
        <div className="news-grid">
          {/* Left Column: War in Ukraine */}
          <div className="news-section">
            <div className="news-section__header">
              <h2 className="news-section__title">War in Ukraine</h2>
              <Link to="#" className="news-section__view-all">
                View All
              </Link>
            </div>

            <div className="featured-grid">
              {ukrainePosts.slice(0, 2).map((post) => (
                <article
                  key={post._id}
                  className="featured-item"
                  role="article">
                  {post.featuredImage && (
                    <div className="featured-item__image">
                      <img
                        src={post.featuredImage}
                        alt={post.title}
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                  )}
                  <h3 className="featured-item__title">
                    <Link to={`/article/${post.slug}`}>{post.title}</Link>
                  </h3>
                  <div className="featured-item__meta">
                    {post.author?.name || "Reporter"} -{" "}
                    <time dateTime={post.createdAt}>
                      {formatDate(post.createdAt)}
                    </time>
                  </div>
                  {post.excerpt && (
                    <p className="featured-item__excerpt">{post.excerpt}</p>
                  )}

                  <div className="featured-item__articles">
                    {ukrainePosts.slice(1, 4).map((post) => (
                      <article
                        key={post._id}
                        className="article-item"
                        role="article">
                        <h4 className="article-item__title">
                          <Link to={`/article/${post.slug}`}>{post.title}</Link>
                        </h4>
                        <time className="article-item__date">
                          {formatDate(post.createdAt)}
                        </time>
                      </article>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Middle Column: Finance */}
          <div className="news-section">
            <div className="news-section__header">
              <h2 className="news-section__title">Finance</h2>
            </div>

            {financePosts.slice(0, 1).map((post) => (
              <article key={post._id} className="featured-item">
                {post.featuredImage && (
                  <div className="featured-item__image">
                    <img
                      src={post.featuredImage}
                      alt={post.title}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                )}
                <h3 className="featured-item__title">
                  <Link to={`/article/${post.slug}`}>{post.title}</Link>
                </h3>
                <div className="featured-item__meta">
                  {post.author?.name || "Financial Editor"} -{" "}
                  <time dateTime={post.createdAt}>
                    {formatDate(post.createdAt)}
                  </time>
                </div>
                {post.excerpt && (
                  <p className="featured-item__excerpt">{post.excerpt}</p>
                )}
              </article>
            ))}

            <div className="article-list">
              {financePosts.slice(1, 5).map((post) => (
                <article key={post._id} className="article-item" role="article">
                  <h4 className="article-item__title">
                    <Link to={`/article/${post.slug}`}>{post.title}</Link>
                  </h4>
                  <time className="article-item__date">
                    {formatDate(post.createdAt)}
                  </time>
                </article>
              ))}
            </div>
          </div>

          {/* Right Column: Marketing */}
          <div className="news-section">
            <div className="news-section__header">
              <h2 className="news-section__title">Marketing</h2>
            </div>

            {marketingPosts.slice(0, 1).map((post) => (
              <article key={post._id} className="featured-item">
                {post.featuredImage && (
                  <div className="featured-item__image">
                    <img
                      src={post.featuredImage}
                      alt={post.title}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                )}
                <h3 className="featured-item__title">
                  <Link to={`/article/${post.slug}`}>{post.title}</Link>
                </h3>
                <div className="featured-item__meta">
                  {post.author?.name || "Marketing Analyst"} -{" "}
                  <time dateTime={post.createdAt}>
                    {formatDate(post.createdAt)}
                  </time>
                </div>
                {post.excerpt && (
                  <p className="featured-item__excerpt">{post.excerpt}</p>
                )}
              </article>
            ))}

            <div className="article-list">
              {marketingPosts.slice(1, 4).map((post) => (
                <article key={post._id} className="article-item" role="article">
                  <h4 className="article-item__title">
                    <Link to={`/article/${post.slug}`}>{post.title}</Link>
                  </h4>
                  <time className="article-item__date">
                    {formatDate(post.createdAt)}
                  </time>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
