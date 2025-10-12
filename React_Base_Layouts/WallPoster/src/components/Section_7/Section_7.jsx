import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../../api/client";
import { Link } from "react-router-dom";

export default function Section_7() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["innovation-posts"],
    queryFn: () => getPosts(8),
  });

  if (isLoading) return <p className="p-4">Loading innovation posts...</p>;
  if (isError)
    return <p className="p-4 text-red-500">Error: {error.message}</p>;

  const posts = data?.articles || [];

  const displayPosts = posts.slice(85, 93);

  return (
    <section
      className="innovation"
      id="innovation"
      aria-labelledby="innovation-heading">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title" id="innovation-heading">
            Innovation & Technology
          </h2>
          <Link to="#" className="view-all">
            View All
          </Link>
        </div>

        <div className="innovation-grid">
          {displayPosts.map((post) => (
            <div key={post._id} className="innovation-card">
              <div
                className="innovation-image"
                style={{
                  backgroundImage: `url(${post.featuredImage})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}></div>
              <div className="innovation-content">
                <h3 className="innovation-title">
                  <Link to={`/article/${post.slug}`}>{post.title}</Link>
                </h3>
                <p className="innovation-description">
                  {post.excerpt || post.description}
                </p>
                <Link to={`/article/${post.slug}`} className="read-more">
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
