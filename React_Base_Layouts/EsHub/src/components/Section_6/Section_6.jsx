import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../../../api/client";
import { Link } from "react-router-dom";

export default function BlockchainWeb3Section() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["blockchain-web3"],
    queryFn: () => getPosts(10), // Adjust endpoint/page for this section
  });

  if (isLoading) return <p className="p-4">Loading articles...</p>;
  if (isError)
    return <p className="p-4 text-red-500">Error: {error.message}</p>;

  const posts = data?.articles || [];

  const blockchainArticles = posts.slice(40, 45); // Left column
  const web3Articles = posts.slice(46, 48); // Right column

  const formatDate = (date) =>
    date
      ? new Date(date).toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        })
      : "Unknown Date";

  return (
    <div className="content-box">
      <div className="news-grid-container">
        {/* Left Column: Blockchain */}
        <div className="left-column">
          <div className="column-header">
            <h3 className="category-title">BLOCKCHAIN</h3>
            <div className="dropdown">
              <span>All</span>
              <i className="fas fa-chevron-down"></i>
            </div>
          </div>

          {blockchainArticles.map((post, idx) => (
            <div
              key={post._id}
              className={`article-item ${idx === 0 ? "large-image" : ""}`}>
              <img
                src={
                  post.featuredImage || "https://via.placeholder.com/400x250"
                }
                alt={post.title}
              />
              <div className="article-content">
                <h2>
                  <Link to={`/article/${post.slug}`}>{post.title}</Link>
                </h2>
                <p className="meta">
                  BLOCKCHAIN <span>{formatDate(post.createdAt)}</span>
                </p>
                <p className="excerpt">{post.excerpt || post.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Right Column: Web3 */}
        <div className="right-column">
          <div className="column-header">
            <h3 className="category-title">WEB3</h3>
            <div className="dropdown">
              <span>All</span>
              <i className="fas fa-chevron-down"></i>
            </div>
          </div>

          {web3Articles.map((post) => (
            <div key={post._id} className="article-item main-gaming-article">
              <img
                src={
                  post.featuredImage || "https://via.placeholder.com/400x250"
                }
                alt={post.title}
              />
              <div className="article-content">
                <h2>
                  <Link to={`/article/${post.slug}`}>{post.title}</Link>
                </h2>
                <p className="meta">
                  WEB3 <span>{formatDate(post.createdAt)}</span>
                </p>
                <p className="excerpt">{post.excerpt || post.description}</p>
              </div>
            </div>
          ))}

          <div className="pagination">
            <a href="#" className="page-arrow">
              <i className="fas fa-chevron-left"></i>
            </a>
            <a href="#" className="page-arrow">
              <i className="fas fa-chevron-right"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
