import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../../../api/client";
import { Link } from "react-router-dom";

export default function TrendingSection() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["trending-posts"],
    queryFn: () => getPosts(2), // adjust page/endpoint if trending posts are different
  });

  if (isLoading) return <p className="p-4">Loading trending posts...</p>;
  if (isError)
    return <p className="p-4 text-red-500">Error: {error.message}</p>;

  const trendingPosts = (data?.articles || []).slice(6, 10); // show top 4

  return (
    <section className="trending-section">
      <div className="container">
        <h2 className="section-title">Trending Now</h2>

        <div className="trending-grid">
          {trendingPosts.map((post, index) => (
            <div key={post._id} className="trending-card">
              {/* Number with leading zero */}
              <span className="trending-number">
                {String(index + 1).padStart(2, "0")}
              </span>

              <div className="trending-content">
                <h3>
                  <Link to={`/article/${post.slug}`}>{post.title}</Link>
                </h3>
                {/* Use description/excerpt if available */}
                <p>{post.excerpt || post.description || "Read more..."}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
