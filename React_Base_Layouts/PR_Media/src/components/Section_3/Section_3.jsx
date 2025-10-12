import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../../../api/client";
import { Link } from "react-router-dom";

export default function WatchNowSection() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["watch-posts"],
    queryFn: () => getPosts(3), 
  });

  if (isLoading) return <p className="p-4">Loading videos...</p>;
  if (isError)
    return <p className="p-4 text-red-500">Error: {error.message}</p>;

  const posts = data?.articles || [];
  const watchPosts = posts.slice(30, 33);
  return (
    <>
      <div className="section-heading">
        <div className="stripe"></div>
        <h3>Watch Now</h3>
      </div>

      <div className="watch-grid">
        {watchPosts.map((post) => (
          <article key={post._id} className="watch-card large">
            {post.featuredImage && (
              <img src={post.featuredImage} alt={post.title} />
            )}
            <div className="overlay">
              <span className="badge">{post.category?.toUpperCase()}</span>
              <h4>
                <Link to={`/article/${post.slug}`}>{post.title}</Link>
              </h4>
              <div className="meta">
                <svg viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 7V12L15 15"
                    stroke="#fff"
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
    </>
  );
}
