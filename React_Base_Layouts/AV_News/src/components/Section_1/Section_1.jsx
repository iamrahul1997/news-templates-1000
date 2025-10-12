import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../../../api/client";
import { Link } from "react-router-dom";

export default function NewsTicker() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["trending-posts"],
    queryFn: () => getPosts(1), // adjust page/endpoint as needed
  });

  if (isLoading) return <p className="p-4">Loading trending news...</p>;
  if (isError)
    return <p className="p-4 text-red-500">Error: {error.message}</p>;

  const trendingPosts = (data?.articles || []).slice(0, 5);

  return (
    <div className="news-ticker">
      {/* Label */}
      <div className="ticker-label">
        <i className="fas fa-fire"></i> TRENDING
      </div>

      {/* Ticker Content */}
      <div className="ticker-content">
        <div className="ticker-text">
          {trendingPosts.map((post, index) => (
            <React.Fragment key={post._id}>
              <Link to={`/article/${post.slug}`}>{post.title}</Link>
              <span className="ticker-date">
                {new Date(post.createdAt).toLocaleDateString()}
              </span>
              {index < trendingPosts.length - 1 && (
                <span className="ticker-separator">|</span>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="ticker-nav">
        <span className="ticker-arrow ticker-prev">
          <i className="fas fa-chevron-left"></i>
        </span>
        <span className="ticker-arrow ticker-next">
          <i className="fas fa-chevron-right"></i>
        </span>
      </div>
    </div>
  );
}
