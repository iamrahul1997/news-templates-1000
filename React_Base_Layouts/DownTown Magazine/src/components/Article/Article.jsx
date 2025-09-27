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
    queryFn: () => getPosts(5), // adjust number or endpoint as needed
  });

  if (isLoading) return <p className="p-6">Loading article...</p>;
  if (isError)
    return <p className="p-6 text-red-500">Error: {error.message}</p>;

  const allPosts = data?.articles || [];
  const article = allPosts.find((p) => p.slug === slug);
  if (!article) return <p className="p-6">Article not found</p>;

  const relatedArticles = allPosts.filter((p) => p.slug !== slug).slice(0, 5);
  const trendingPosts = allPosts.slice(0, 4); // mock trending
  const latestStories = allPosts.slice(0, 3); // mock latest

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });

  return (
    <main className="main" id="main-content" role="main">
      <div className="container">
        <header className="article-header">
          <span className="article-category">
            {article.section || "General"}
          </span>
          <h1 className="article-title" id="article-main-title">
            {article.title}
          </h1>
          <div className="article-meta">
            <span className="article-author">
              By {article.author?.name || "Unknown"}
            </span>
            <time className="article-date" dateTime={article.createdAt}>
              {formatDate(article.createdAt)}
            </time>
          </div>
          <div
            className="social-share"
            role="group"
            aria-label="Share this article on social media">
            <a
              href="#"
              className="social-link"
              aria-label="Share on Facebook"
              role="button">
              f
            </a>
            <a
              href="#"
              className="social-link"
              aria-label="Share on Twitter"
              role="button">
              t
            </a>
            <a
              href="#"
              className="social-link"
              aria-label="Share on LinkedIn"
              role="button">
              in
            </a>
          </div>
        </header>

        <img
          src={article.featuredImage}
          alt={article.title}
          className="featured-image"
          loading="eager"
        />

        <div className="article-layout-three-col">
          {/* Left Column: Related Articles */}
          <aside
            className="left-related-posts"
            role="complementary"
            aria-label="Related articles sidebar">
            <h3 className="section-title">Related Articles</h3>
            <div className="vertical-posts-list">
              {relatedArticles.map((post) => (
                <article
                  className="vertical-post-item"
                  role="article"
                  key={post._id}>
                  <Link
                    to={`/article/${post.slug}`}
                    className="vertical-post-link">
                    <img
                      src={post.featuredImage}
                      alt={post.title}
                      className="vertical-post-image"
                    />
                    <div className="vertical-post-content">
                      <span className="vertical-post-category">
                        {post.section || "General"}
                      </span>
                      <h4 className="vertical-post-title">{post.title}</h4>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </aside>

          {/* Middle Column: Main Article */}
          <div
            className="article-content-main"
            role="region"
            aria-label="Main article content">
            <article
              className="article-body"
              role="article"
              aria-labelledby="article-main-title">
              <div dangerouslySetInnerHTML={{ __html: article.content }} />
            </article>
          </div>

          {/* Right Column: Trending & Latest */}
          <aside
            className="right-related-posts"
            role="complementary"
            aria-label="Trending news and latest stories sidebar">
            <div className="widget">
              <h3 className="widget-title">Trending Now</h3>
              <div className="trending-posts">
                {trendingPosts.map((post, index) => (
                  <article
                    className="trending-post-item"
                    role="article"
                    key={post._id}>
                    <div className="trending-post-number">{index + 1}</div>
                    <div className="trending-post-content">
                      <span className="trending-post-category">
                        {post.section || "General"}
                      </span>
                      <h4 className="trending-post-title">{post.title}</h4>
                      <div className="trending-post-meta">
                        {post.views || "0"} views
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <div className="widget">
              <h3 className="widget-title">Latest Stories</h3>
              <ul className="compact-stories-list">
                {latestStories.map((post) => (
                  <li className="compact-story" key={post._id}>
                    <img
                      src={post.featuredImage}
                      alt={post.title}
                      className="compact-story-thumbnail"
                    />
                    <div className="compact-story-content">
                      <h4 className="compact-story-headline">{post.title}</h4>
                      <time className="compact-story-time">
                        {formatDate(post.createdAt)}
                      </time>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
