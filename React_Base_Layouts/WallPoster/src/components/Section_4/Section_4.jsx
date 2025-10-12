import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../../api/client";
import { Link } from "react-router-dom";

export default function TradingAnalysisSection() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["trading-analysis"],
    queryFn: () => getPosts(6),
  });

  if (isLoading) return <p className="p-4">Loading trading analysis...</p>;
  if (isError)
    return <p className="p-4 text-red-500">Error: {error.message}</p>;

  const posts = data?.articles || [];

  const largeCard = posts.slice(55, 56);
  const smallCards = posts.slice(57, 59);
  const wideCards = posts.slice(60, 62);
  const remainingCards = posts.slice(63, 65);

  return (
    <section
      className="trading-analysis"
      id="analysis"
      aria-labelledby="analysis-heading">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title" id="analysis-heading">
            Trading Analysis
          </h2>
          <Link to="#" className="view-all">
            View All
          </Link>
        </div>

        <div className="trading-layout">
          {largeCard.map((post) => (
            <div key={post._id} className="analysis-card large">
              {post.featuredImage && (
                <img
                  src={post.featuredImage}
                  alt={post.title}
                  className="analysis-image"
                />
              )}
              <h3 className="analysis-title">
                <Link to={`/article/${post.slug}`}>{post.title}</Link>
              </h3>
              <p className="analysis-excerpt">
                {post.excerpt || post.description}
              </p>
            </div>
          ))}

          {smallCards.map((post) => (
            <div key={post._id} className="analysis-card">
              <h3 className="analysis-title">
                <Link to={`/article/${post.slug}`}>{post.title}</Link>
              </h3>
              <p className="analysis-excerpt">
                {post.excerpt || post.description}
              </p>
            </div>
          ))}

          {wideCards.map((post) => (
            <div key={post._id} className="analysis-card wide">
              <h3 className="analysis-title">
                <Link to={`/article/${post.slug}`}>{post.title}</Link>
              </h3>
              <p className="analysis-excerpt">
                {post.excerpt || post.description}
              </p>
            </div>
          ))}

          {remainingCards.map((post) => (
            <div key={post._id} className="analysis-card">
              <h3 className="analysis-title">
                <Link to={`/article/${post.slug}`}>{post.title}</Link>
              </h3>
              <p className="analysis-excerpt">
                {post.excerpt || post.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
