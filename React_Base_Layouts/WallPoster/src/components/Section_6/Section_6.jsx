import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../../api/client";
import { Link } from "react-router-dom";

export default function RegulatoryNewsSection() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["regulatory-news"],
    queryFn: () => getPosts(8),
  });

  if (isLoading) return <p className="p-4">Loading regulatory news...</p>;
  if (isError)
    return <p className="p-4 text-red-500">Error: {error.message}</p>;

  const posts = data?.articles || [];
  const displayPosts = posts.slice(75, 84);
  const regionMap = {
    Europe: "europe",
    Americas: "americas",
    Asia: "asia",
    Oceania: "oceania",
  };

  return (
    <section
      className="regulatory"
      id="regulatory"
      aria-labelledby="regulatory-heading">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title" id="regulatory-heading">
            Regulatory Updates
          </h2>
          <Link to="#" className="view-all">
            View All
          </Link>
        </div>

        <div className="regulatory-grid">
          {displayPosts.map((post) => (
            <div
              key={post._id}
              className={`regulatory-card ${post.featured ? "featured" : ""}`}>
              <div className="regulatory-header">
                <span
                  className={`region-tag ${
                    regionMap[post.region] || "global"
                  }`}>
                  {post.region || "Global"}
                </span>
              </div>

              <h3 className="regulatory-title">
                <Link to={`/article/${post.slug}`}>{post.title}</Link>
              </h3>

              <p className="regulatory-description">
                {post.excerpt || post.description}
              </p>

              <div className="regulatory-meta">
                <span className="date">
                  {post.createdAt
                    ? new Date(post.createdAt).toLocaleDateString()
                    : "TBD"}
                </span>
                <Link to={`/article/${post.slug}`} className="read-more-link">
                  Read More →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
