import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../../api/client";
import { Link } from "react-router-dom";

export default function LifestyleSportsSection() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["lifestyle-sports-posts"],
    queryFn: () => getPosts(8), // adjust endpoint/page as needed
  });

  if (isLoading) return <p className="p-4">Loading posts...</p>;
  if (isError)
    return <p className="p-4 text-red-500">Error: {error.message}</p>;

  const posts = data?.articles || [];

  // Split posts for sections
  const lifestyleMain = posts.slice(30, 32); // two main horizontal cards
  const lifestyleMini = posts.slice(33, 37); // four mini-grid items
  const sportsMain = posts.slice(38, 40); // two main horizontal cards
  const sportsMini = posts.slice(42, 46); // four mini-grid items

  const formatDate = (date) =>
    date
      ? new Date(date).toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        })
      : "Unknown Date";

  const renderSection = (title, mainPosts, miniPosts) => (
    <section className="news-section half">
      <div className="section-header">
        <h2>{title}</h2>
        <Link to="#">{`View All ➝`}</Link>
      </div>

      {/* Main horizontal cards */}
      <div className="half-grid">
        {mainPosts.map((post) => (
          <div key={post._id} className="main-article small horizontal-card">
            <img
              src={post.featuredImage || "https://placehold.co/160x120"}
              alt={post.title}
            />
            <div className="card-content">
              <h3>
                <Link to={`/article/${post.slug}`}>{post.title}</Link>
              </h3>
              <p>{formatDate(post.createdAt)}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Mini-grid items */}
      <div className="mini-grid">
        {miniPosts.map((post) => (
          <Link key={post._id} to={`/article/${post.slug}`}>
            <img
              src={post.featuredImage || "https://placehold.co/80x60"}
              alt={post.title}
            />
            <span>{post.title}</span>
          </Link>
        ))}
      </div>
    </section>
  );

  return (
    <div className="dual-section">
      {renderSection("Lifestyle", lifestyleMain, lifestyleMini)}
      {renderSection("Sports", sportsMain, sportsMini)}
    </div>
  );
}
