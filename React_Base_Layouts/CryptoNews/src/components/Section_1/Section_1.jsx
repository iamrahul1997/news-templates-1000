import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { getPosts } from "../../api/client";

export default function NewsHomepageSection() {
  const [page, setPage] = useState(1);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["posts-homepage", page],
    queryFn: () => getPosts(page),
    keepPreviousData: true,
  });

  if (isLoading) return <p className="p-6">Loading...</p>;
  if (isError)
    return <p className="p-6 text-red-500">Error: {error.message}</p>;
  console.log(data);

  const posts = data?.articles || [];

  const featuredPost = posts[0]; // Top main feature
  const featuredGridPosts = posts.slice(1, 5); // Grid below featured
  const latestNews = posts.slice(5, 11); // Latest articles
  const topicsFeatured = posts[11]; // Sidebar featured
  const topicsList = posts.slice(12, 17); // Topics sidebar list
  const trendingArticles = posts.slice(18, 23); // Hot this week
  const popularCategories = [
    "Bitcoin",
    "Ethereum",
    "DeFi",
    "Regulation",
    "NFT",
    "Altcoins",
  ]; // Hardcoded for now

  return (
    <section className="news-homepage-section">
      <div className="homepage-content-grid">
        {/* Left Column */}
        <div className="content-column main-content-column">
          {/* Featured Article */}
          {featuredPost && (
            <article className="featured-article">
              <Link
                to={`/article/${featuredPost.slug}`}
                className="featured-article__link">
                <div className="featured-article__image">
                  <img
                    src={featuredPost.featuredImage}
                    alt={featuredPost.title}
                  />
                </div>
                <div className="featured-article__content">
                  <span className="category">{featuredPost.section}</span>
                  <h1 className="featured-article__title">
                    {featuredPost.title}
                  </h1>
                  <div className="article-meta">
                    <span className="date">
                      {featuredPost.createdAt.split("T")[0]}
                    </span>
                  </div>
                </div>
              </Link>
            </article>
          )}

          <div className="section-divider"></div>

          {/* Featured News Grid */}
          <section className="featured-news-grid">
            {featuredGridPosts.map((post) => (
              <article key={post._id} className="featured-news-card">
                <Link
                  to={`/article/${post.slug}`}
                  className="featured-news-card__link">
                  <div className="featured-news-card__text">
                    <span className="category">{post.section}</span>
                    <h2 className="featured-news-card__title">{post.title}</h2>
                  </div>
                  <div className="featured-news-card__image">
                    <img src={post.featuredImage} alt={post.title} />
                  </div>
                </Link>
              </article>
            ))}
          </section>

          <div className="section-divider"></div>

          {/* Latest News */}
          <div className="latest-news-articles">
            {latestNews.map((post) => (
              <article key={post._id} className="latest-news-article">
                <Link
                  to={`/article/${post.slug}`}
                  className="latest-news-article__link">
                  <span className="category">{post.section}</span>
                  <h3 className="latest-news-article__title">{post.title}</h3>
                </Link>
              </article>
            ))}
          </div>
        </div>

        {/* Middle Column - Topics */}
        <div className="content-column topics-sidebar-column">
          <div className="topics-header">
            <h2 className="topics-title">Topics</h2>
            <nav className="topics-nav">
              <a
                href="#bitcoin"
                className="topics-nav__link topics-nav__link--active">
                Bitcoin
              </a>
              <a href="#defi" className="topics-nav__link">
                DeFi
              </a>
              <a href="#altcoins" className="topics-nav__link">
                More
              </a>
            </nav>
          </div>

          {topicsFeatured && (
            <article className="topics-featured">
              <Link
                to={`/article/${topicsFeatured.slug}`}
                className="topics-featured__link">
                <div className="topics-featured__image">
                  <img
                    src={topicsFeatured.featuredImage}
                    alt={topicsFeatured.title}
                  />
                </div>
                <div className="topics-featured__content">
                  <h3 className="topics-featured__title">
                    {topicsFeatured.title}
                  </h3>
                  <div className="article-meta">
                    <span className="date">
                      {topicsFeatured.createdAt.split("T")[0]}
                    </span>
                    <span className="meta-separator">•</span>
                    <span className="category">{topicsFeatured.section}</span>
                  </div>
                </div>
              </Link>
            </article>
          )}

          <div className="topics-list">
            {topicsList.map((post) => (
              <article key={post._id} className="topics-item">
                <Link
                  to={`/article/${post.slug}`}
                  className="topics-item__link">
                  <h4 className="topics-item__title">{post.title}</h4>
                  <div className="article-meta">
                    <span className="date">{post.createdAt.split("T")[0]}</span>
                    <span className="meta-separator">•</span>
                    <span className="category">{post.section}</span>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>

        {/* Right Column - Trending & Categories */}
        <div className="content-column trending-sidebar-column">
          <section className="trending-articles">
            <h2 className="sidebar-title">Hot This Week</h2>
            <div className="trending-articles-list">
              {trendingArticles.map((post, idx) => (
                <article key={post._id} className="trending-article">
                  <Link
                    to={`/article/${post.slug}`}
                    className="trending-article__link">
                    <div className="trending-article__content">
                      <span className="category">{post.section}</span>
                      <h4 className="trending-article__title">{post.title}</h4>
                    </div>
                  </Link>
                  <span className="trending-article__number">{idx + 1}</span>
                </article>
              ))}
            </div>
          </section>

          <section className="popular-categories">
            <h2 className="sidebar-title">Popular Categories</h2>
            <div className="categories-list">
              {popularCategories.map((cat) => (
                <div key={cat} className="category-item">
                  <Link
                    to={`#${cat.toLowerCase()}`}
                    className="category-item__link">
                    <span className="category-item__name">
                      {cat.toUpperCase()}
                    </span>
                    <span className="category-item__count">15</span>
                  </Link>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </section>
  );
}
