import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../../api/client";
import { Link } from "react-router-dom";

export default function MarketNewsSection() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["posts-market"],
    queryFn: () => getPosts(3),
  });

  if (isLoading) return <p className="p-4">Loading market news...</p>;
  if (isError)
    return <p className="p-4 text-red-500">Error: {error.message}</p>;

  const articles = data?.articles || [];

  const featuredArticle = articles[26];
  const mediumArticle = articles[27];
  const listArticles = articles;

  const leftColumn = listArticles.slice(43, 47);
  const rightColumn = listArticles.slice(50, 54);

  return (
    <section
      className="market-news"
      id="market"
      aria-labelledby="market-heading">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <h2 className="section-title" id="market-heading">
            Market News
          </h2>
          <Link to="#" className="view-all">
            View All
          </Link>
        </div>

        <div className="three-column-layout">
          {/* Column 1 - Large Featured Article */}
          <div className="column-1">
            {featuredArticle && (
              <article className="featured-article">
                <Link
                  to={`/article/${featuredArticle.slug}`}
                  className="article-link">
                  <div className="image-container">
                    {featuredArticle.featuredImage && (
                      <img
                        src={featuredArticle.featuredImage}
                        alt={featuredArticle.title}
                        className="full-image"
                        loading="lazy"
                      />
                    )}
                    {featuredArticle.category && (
                      <div
                        className={`category-tag ${featuredArticle.category.toLowerCase()}`}>
                        {featuredArticle.category}
                      </div>
                    )}
                  </div>
                  <div className="article-content">
                    <h3 className="article-title">{featuredArticle.title}</h3>
                    <p className="article-description">
                      {featuredArticle.excerpt}
                    </p>
                  </div>
                </Link>
              </article>
            )}
          </div>

          {/* Column 2 - Medium Article */}
          <div className="column-2">
            {mediumArticle && (
              <article className="medium-article">
                <Link
                  to={`/article/${mediumArticle.slug}`}
                  className="article-link">
                  <div className="image-container">
                    {mediumArticle.featuredImage && (
                      <img
                        src={mediumArticle.featuredImage}
                        alt={mediumArticle.title}
                        className="medium-image"
                        loading="lazy"
                      />
                    )}
                    {mediumArticle.category && (
                      <div
                        className={`category-tag ${mediumArticle.category.toLowerCase()}`}>
                        {mediumArticle.category}
                      </div>
                    )}
                  </div>
                  <div className="article-content">
                    <h3 className="article-title">{mediumArticle.title}</h3>
                    <p className="article-description">
                      {mediumArticle.excerpt}
                    </p>
                  </div>
                </Link>
              </article>
            )}
          </div>

          {/* Column 3 - Two Sub-Columns (Text List) */}
          <div className="column-3">
            {/* Left Sub Column */}
            <div className="sub-column-left">
              <div className="article-list">
                {leftColumn.map((post) => (
                  <article key={post._id} className="list-item">
                    <Link to={`/article/${post.slug}`} className="list-link">
                      {post.category && (
                        <div
                          className={`category-tag ${post.category.toLowerCase()}`}>
                          {post.category}
                        </div>
                      )}
                      <h4 className="list-title">{post.title}</h4>
                      <p className="list-subtitle">{post.excerpt}</p>
                    </Link>
                  </article>
                ))}
              </div>
            </div>

            {/* Right Sub Column */}
            <div className="sub-column-right">
              <div className="article-list">
                {rightColumn.map((post) => (
                  <article key={post._id} className="list-item">
                    <Link to={`/article/${post.slug}`} className="list-link">
                      {post.category && (
                        <div
                          className={`category-tag ${post.category.toLowerCase()}`}>
                          {post.category}
                        </div>
                      )}
                      <h4 className="list-title">{post.title}</h4>
                      <p className="list-subtitle">{post.excerpt}</p>
                    </Link>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
