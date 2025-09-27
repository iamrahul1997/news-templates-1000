import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../../api/client";
import { Link } from "react-router-dom";

export default function CryptoEducationSection() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["crypto-education-posts"],
    queryFn: () => getPosts(8),
  });

  if (isLoading) return <p className="p-4">Loading education posts...</p>;
  if (isError)
    return <p className="p-4 text-red-500">Error: {error.message}</p>;

  const posts = data?.articles || [];

  const mainPosts = posts.slice(0, 3);

  const trendingTopics = posts.slice(3, 7); // example

  return (
    <section
      className="education"
      id="education"
      aria-labelledby="education-heading">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title" id="education-heading">
            Crypto Education
          </h2>
          <Link to="#" className="view-all">
            View All
          </Link>
        </div>

        <div className="education-layout">
          {/* Main Education Posts */}
          <div className="education-main">
            {mainPosts.map((post, idx) => (
              <div
                key={post._id}
                className={`education-card ${idx === 0 ? "featured" : ""}`}>
                <h3>
                  <Link to={`/article/${post.slug}`}>{post.title}</Link>
                </h3>
                <p>{post.excerpt || post.description}</p>
                <small>
                  {post.readTime || "10"} min read • {post.level || "Beginner"}
                </small>
              </div>
            ))}
          </div>

          {/* Sidebar */}
          <div className="education-sidebar">
            {/* Quick Tips */}
            <div className="education-card">
              <h4>Quick Tips</h4>
              <ul className="education-card__tips-list">
                <li>Always DYOR before investing</li>
                <li>Never invest more than you can afford to lose</li>
                <li>Use hardware wallets for large amounts</li>
                <li>Diversify across different protocols</li>
              </ul>
            </div>

            {/* Trending Topics */}
            <div className="education-card">
              <h4>Trending Topics</h4>
              {trendingTopics.map((post) => (
                <p key={post._id} className="trending-topic">
                  🔥 <Link to={`/article/${post.slug}`}>{post.title}</Link>
                </p>
              ))}
            </div>

            {/* Market Sentiment */}
            <div className="education-card">
              <h4>Market Sentiment</h4>
              <div className="sentiment-bar"></div>
              <p className="sentiment-indicator sentiment-indicator--extreme-greed">
                Extreme Greed (82/100)
              </p>
              <small>Fear & Greed Index</small>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
