import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../../api/client";
import { Link } from "react-router-dom";

export default function NewsGrid2Section() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["news-grid-2"],
    queryFn: () => getPosts(7), // adjust page or endpoint if needed
  });

  if (isLoading) return <p className="p-4">Loading news...</p>;
  if (isError)
    return <p className="p-4 text-red-500">Error: {error.message}</p>;

  const posts = data?.articles || [];

  const techTop2 = posts.slice(50, 52);
  const techBottom3 = posts.slice(53, 56);
  const travelPosts = posts.slice(57, 65);

  return (
    <section
      className="news-grid-2"
      aria-label="Technology and destinations news">
      {/* Left Column: Technology */}
      <div>
        <div className="section-header">
          <h2>Technology</h2>
          <div className="view-all">
            <Link to="/category/technology">View All</Link>
          </div>
        </div>

        {/* Top 2 Featured */}
        <div className="featured-top">
          {techTop2.map((post) => (
            <div key={post._id} className="card">
              {post.featuredImage && (
                <img src={post.featuredImage} alt={post.title} />
              )}
              <span className="tag">
                {post.category?.toUpperCase() || "TECHNOLOGY"}
              </span>
              <h3>
                <Link to={`/article/${post.slug}`}>{post.title}</Link>
              </h3>
            </div>
          ))}
        </div>

        {/* Bottom 3 Featured */}
        <div className="featured-bottom">
          {techBottom3.map((post) => (
            <div key={post._id} className="card">
              {post.featuredImage && (
                <img src={post.featuredImage} alt={post.title} />
              )}
              <span className={`tag ${post.exclusive ? "exclusive" : ""}`}>
                {post.category?.toUpperCase() || "TECHNOLOGY"}
              </span>
              <h3>
                <Link to={`/article/${post.slug}`}>{post.title}</Link>
              </h3>
            </div>
          ))}
        </div>
      </div>

      {/* Right Column: Destinations */}
      <div className="side-section">
        <div>
          <div className="section-header">
            <h2>Destinations</h2>
          </div>
          <div className="article-list">
            {travelPosts.map((post) => (
              <div key={post._id} className="article">
                <div className="article-text">
                  <span className="tag">
                    {post.category?.toUpperCase() || "TRAVEL"}
                  </span>
                  <h4>
                    <Link to={`/article/${post.slug}`}>{post.title}</Link>
                  </h4>
                </div>
                {post.featuredImage && (
                  <img src={post.featuredImage} alt={post.title} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
