import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../../api/client";
import { Link } from "react-router-dom";

export default function HeroSection() {
  const [activeTab, setActiveTab] = useState("latest");

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["hero-section"],
    queryFn: () => getPosts(1), // Adjust API call if needed
  });

  if (isLoading) return <p className="p-4">Loading hero section...</p>;
  if (isError)
    return <p className="p-4 text-red-500">Error: {error.message}</p>;

  const articles = data?.articles || [];
  const mainArticle = articles[7];
  const latestArticles = articles.slice(8, 16); // limit latest posts
  const recommendedArticles = articles.slice(17, 25); // limit recommended posts

  return (
    <section className="hero" aria-labelledby="hero-heading">
      <div className="container">
        <div className="hero-layout">
          {/* Left Section - Main Featured Article */}
          {mainArticle && (
            <article className="hero-main">
              <div className="hero-image-container">
                {mainArticle.featuredImage && (
                  <img
                    src={mainArticle.featuredImage}
                    alt={mainArticle.title}
                    className="hero-image"
                    loading="lazy"
                  />
                )}
              </div>
              <div className="hero-content">
                <span
                  className={`category-tag category-tag--${mainArticle.category?.toLowerCase()}`}>
                  {mainArticle.category}
                </span>
                <h1 id="hero-heading">{mainArticle.title}</h1>
                <p className="hero-excerpt">{mainArticle.excerpt}</p>
                <Link
                  to={`/article/${mainArticle.slug}`}
                  className="hero-cta"
                  aria-label={`Read full article about ${mainArticle.title}`}>
                  Read Full Story
                </Link>
              </div>
            </article>
          )}

          {/* Right Section - Article Sidebar */}
          <aside className="hero-sidebar" aria-labelledby="sidebar-heading">
            <h2 id="sidebar-heading" className="visually-hidden">
              Recent and Recommended Articles
            </h2>

            {/* Tabs */}
            <div
              className="sidebar-tabs"
              role="tablist"
              aria-label="Article categories">
              <button
                className={`tab-button ${
                  activeTab === "latest" ? "tab-button--active" : ""
                }`}
                onClick={() => setActiveTab("latest")}
                role="tab"
                aria-selected={activeTab === "latest"}
                aria-controls="latest"
                id="tab-latest">
                LATEST
              </button>
              <button
                className={`tab-button ${
                  activeTab === "recommended" ? "tab-button--active" : ""
                }`}
                onClick={() => setActiveTab("recommended")}
                role="tab"
                aria-selected={activeTab === "recommended"}
                aria-controls="recommended"
                id="tab-recommended">
                RECOMMENDED
              </button>
            </div>

            {/* Tab Content */}
            <div className="sidebar-content">
              {/* Latest Articles */}
              {activeTab === "latest" && (
                <div
                  className="tab-content tab-content--active"
                  id="latest"
                  role="tabpanel"
                  aria-labelledby="tab-latest">
                  {latestArticles.map((post) => (
                    <article key={post._id} className="article-item">
                      <Link
                        to={`/article/${post.slug}`}
                        className="article-item__link"
                        aria-label={`Read article about ${post.title}`}>
                        {post.featuredImage && (
                          <img
                            src={post.featuredImage}
                            alt={post.title}
                            className="article-item__thumb"
                            loading="lazy"
                          />
                        )}
                        <div className="article-item__info">
                          <span
                            className={`article-item__category category-tag--${post.category?.toLowerCase()}`}>
                            {post.category}
                          </span>
                          <h3 className="article-item__title">{post.title}</h3>
                        </div>
                      </Link>
                    </article>
                  ))}
                </div>
              )}

              {/* Recommended Articles */}
              {activeTab === "recommended" && (
                <div
                  className="tab-content tab-content--active"
                  id="recommended"
                  role="tabpanel"
                  aria-labelledby="tab-recommended">
                  {recommendedArticles.map((post) => (
                    <article key={post._id} className="article-item">
                      <Link
                        to={`/article/${post.slug}`}
                        className="article-item__link"
                        aria-label={`Read article about ${post.title}`}>
                        {post.featuredImage && (
                          <img
                            src={post.featuredImage}
                            alt={post.title}
                            className="article-item__thumb"
                            loading="lazy"
                          />
                        )}
                        <div className="article-item__info">
                          <span
                            className={`article-item__category category-tag--${post.category?.toLowerCase()}`}>
                            {post.category}
                          </span>
                          <h3 className="article-item__title">{post.title}</h3>
                        </div>
                      </Link>
                    </article>
                  ))}
                </div>
              )}
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
