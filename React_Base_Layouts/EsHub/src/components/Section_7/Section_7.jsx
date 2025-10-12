import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../../../api/client";
import { Link } from "react-router-dom";

export default function LatestArticlesSection() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["latest-articles"],
    queryFn: () => getPosts(12), // adjust number of articles
  });

  if (isLoading) return <p className="p-4">Loading latest articles...</p>;
  if (isError)
    return <p className="p-4 text-red-500">Error: {error.message}</p>;

  const posts = data?.articles || [];

  const latestArticles = posts.slice(60, 66); // left grid
  const mustReadArticles = posts.slice(67, 72); // right sidebar

  const formatDate = (date) =>
    date
      ? new Date(date).toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        })
      : "Unknown Date";

  return (
    <div className="content-box-alt">
      <div className="news-container">
        {/* Latest Articles Grid */}
        <section className="latest-articles-section">
          <h3 className="section-title">
            <span>LATEST ARTICLES</span>
          </h3>
          <div className="articles-grid">
            {latestArticles.map((post) => (
              <div key={post._id} className="article-card">
                <img
                  src={
                    post.featuredImage || "https://via.placeholder.com/400x250"
                  }
                  alt={post.title}
                />
                <div className="card-content">
                  <p className="category">{post.category || "GENERAL"}</p>
                  <h4>
                    <Link to={`/article/${post.slug}`}>{post.title}</Link>
                  </h4>
                  <p className="meta">{formatDate(post.createdAt)}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Must Read Sidebar */}
        <aside className="must-read-sidebar">
          <div>
            <div className="must-read-list">
              <h3 className="section-title">
                <span>MUST READ</span>
              </h3>
              {mustReadArticles.map((post) => (
                <div key={post._id} className="must-read-item">
                  <p className="category">{post.category || "GENERAL"}</p>
                  <h4>
                    <Link to={`/article/${post.slug}`}>{post.title}</Link>
                  </h4>
                  <p className="meta">{formatDate(post.createdAt)}</p>
                </div>
              ))}
            </div>
            <div className="pagination">
              <i className="fas fa-chevron-left"></i>
              <i className="fas fa-chevron-right"></i>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
