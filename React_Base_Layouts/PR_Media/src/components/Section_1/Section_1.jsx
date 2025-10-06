import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../../../api/client";
import { Link } from "react-router-dom";

export default function TopGridSection() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["top-grid-posts"],
    queryFn: () => getPosts(8), 
  });

  if (isLoading) return <p className="p-4">Loading top grid...</p>;
  if (isError)
    return <p className="p-4 text-red-500">Error: {error.message}</p>;

  const posts = data?.articles || [];

  // Assign posts to positions
  const featurePost = posts.slice(0, 1); // left big feature
  const stackedPosts = posts.slice(2, 4); // center stacked cards
  const sidebarPosts = posts.slice(5, 8); // right sidebar recent items

  return (
    <div className="top-grid">
      {/* Left big feature */}
      {featurePost.map((post) => (
        <article key={post._id} className="feature-large card">
          {post.featuredImage && (
            <img src={post.featuredImage} alt={post.title} />
          )}
          <div className="info">
            <span className="badge">{post.category?.toUpperCase()}</span>
            <h2>
              <Link to={`/article/${post.slug}`}>{post.title}</Link>
            </h2>
            <div className="meta">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M12 7V12L15 15"
                  stroke="#888"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {new Date(post.createdAt).toLocaleDateString()}
            </div>
          </div>
        </article>
      ))}

      {/* Center stacked cards */}
      <div className="stacked">
        {stackedPosts.map((post, index) => (
          <article key={post._id} className="card">
            {index === 0 && post.featuredImage ? (
              <img src={post.featuredImage} alt={post.title} />
            ) : (
              <div className="content">
                <span className="badge">{post.category?.toUpperCase()}</span>
                <h3>
                  <Link to={`/article/${post.slug}`}>{post.title}</Link>
                </h3>
                <div className="meta">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M12 7V12L15 15"
                      stroke="#888"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  {new Date(post.createdAt).toLocaleDateString()}
                </div>
              </div>
            )}
          </article>
        ))}
      </div>

      {/* Right sidebar */}
      <aside className="sidebar">
        <div className="tabs">
          <div className="tab-list">
            <div className="tab active">RECENT</div>
            {/* <div className="tab">FAVORITES</div> */}
          </div>
        </div>

        <div className="recent-list">
          {sidebarPosts.map((post) => (
            <div key={post._id} className="recent-item">
              {post.featuredImage && (
                <img src={post.featuredImage} alt={post.title} />
              )}
              <div>
                <div className="r-meta">{post.category?.toUpperCase()}</div>
                <div className="r-title">
                  <Link to={`/article/${post.slug}`}>{post.title}</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </aside>
    </div>
  );
}
