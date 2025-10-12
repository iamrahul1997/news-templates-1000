import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../../../api/client";
import { Link } from "react-router-dom";

export default function PressReleases() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["press-posts"],
    queryFn: () => getPosts(1),
  });

  if (isLoading) return <p>Loading press releases...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  // Limit to 6 press releases
  const pressPosts = (data?.articles || []).slice(18, 24);

  return (
    <section className="section">
      <h2 className="section-title">Press Releases</h2>
      <div className="press-grid">
        {pressPosts.map((post) => (
          <Link
            to={`/article/${post.slug}`}
            key={post._id}
            className="press-item">
            <div
              className="press-thumb"
              style={{ backgroundImage: `url(${post.featuredImage})` }}></div>
            <div className="press-content">
              <h3>{post.title || post.excerpt}</h3>
              <p>
                {new Date(post.createdAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
