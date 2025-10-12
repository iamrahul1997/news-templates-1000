import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../../../api/client";
import { Link } from "react-router-dom";

export default function LatestNewsSection() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["latest-posts"],
    queryFn: () => getPosts(4),
  });

  if (isLoading) return <p className="p-4">Loading latest posts...</p>;
  if (isError)
    return <p className="p-4 text-red-500">Error: {error.message}</p>;

  const posts = data?.articles || [];
  const latestPosts = posts.slice(40, 44);

  return (
    <div className="latest-grid">
      {latestPosts.map((post) => (
        <article key={post._id} className="post-card">
          {post.featuredImage && (
            <img src={post.featuredImage} alt={post.title} />
          )}
          <div className="card-body">
            <span className="badge">{post.category?.toUpperCase()}</span>
            <h4>
              <Link to={`/article/${post.slug}`}>{post.title}</Link>
            </h4>
            <div className="meta">
              <svg viewBox="0 0 24 24" fill="none">
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
    </div>
  );
}
