import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../../../api/client";
import { Link } from "react-router-dom";

export default function BreakingNewsTicker() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["breaking-news"],
    queryFn: () => getPosts(4), // adjust page/endpoint if needed
  });

  if (isLoading) return <p className="p-4">Loading breaking news...</p>;
  if (isError)
    return <p className="p-4 text-red-500">Error: {error.message}</p>;

  const breakingPosts = (data?.articles || []).slice(5, 10); // show top 5 breaking news

  return (
    <div className="ticker-wrapper">
      <div className="news-ticker">
        <div className="ticker-container">
          <div className="ticker-title" aria-label="Breaking news ticker">
            Breaking News
          </div>

          <div className="ticker-content">
            <div className="ticker-text">
              {breakingPosts.map((post, index) => (
                <span key={post._id} className="ticker-item">
                  <Link to={`/article/${post.slug}`}>{post.title}</Link>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
