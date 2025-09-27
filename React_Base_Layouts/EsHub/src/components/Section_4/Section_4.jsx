import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../../../api/client";
import { Link } from "react-router-dom";

export default function MarketInfoSection() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["market-info"],
    queryFn: () => getPosts(9), // adjust endpoint/page for this section
  });

  if (isLoading) return <p className="p-4">Loading market information...</p>;
  if (isError)
    return <p className="p-4 text-red-500">Error: {error.message}</p>;

  const posts = data?.articles || [];

  // Split into groups
  const tradingTools = posts.slice(20, 23); // 1 featured + 2 sub
  const defiProtocols = posts.slice(24, 27); // 1 featured + 2 sub
  const popular = posts.slice(28, 33); // 6 popular items

  const formatDate = (date) =>
    date
      ? new Date(date).toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        })
      : "Unknown Date";

  return (
    <div className="content-box">
      <section
        className="market-info-section"
        aria-labelledby="market-info-heading">
        <h2 id="market-info-heading" className="sr-only">
          Market Information and Trading Tools
        </h2>

        <div className="market-info-grid">
          {/* Trading Tools */}
          <section
            className="trading-tools"
            aria-labelledby="trading-tools-heading">
            <h3 id="trading-tools-heading">Trading Tools</h3>
            {tradingTools[0] && (
              <div className="featured-card">
                <img
                  src={
                    tradingTools[0].featuredImage ||
                    "https://via.placeholder.com/400x250"
                  }
                  alt={tradingTools[0].title}
                />
                <h3>
                  <Link to={`/article/${tradingTools[0].slug}`}>
                    {tradingTools[0].title}
                  </Link>
                </h3>
                <div className="date">
                  {formatDate(tradingTools[0].createdAt)}
                </div>
              </div>
            )}
            {tradingTools.slice(1).map((post) => (
              <div key={post._id} className="sub-article">
                <img
                  src={
                    post.featuredImage || "https://via.placeholder.com/150x100"
                  }
                  alt={post.title}
                />
                <div>
                  <h4>
                    <Link to={`/article/${post.slug}`}>{post.title}</Link>
                  </h4>
                  <p>{formatDate(post.createdAt)}</p>
                </div>
              </div>
            ))}
          </section>

          {/* DeFi Protocols */}
          <section
            className="defi-protocols"
            aria-labelledby="defi-protocols-heading">
            <h3 id="defi-protocols-heading">DeFi Protocols</h3>
            {defiProtocols[0] && (
              <div className="featured-card">
                <img
                  src={
                    defiProtocols[0].featuredImage ||
                    "https://via.placeholder.com/400x250"
                  }
                  alt={defiProtocols[0].title}
                />
                <h3>
                  <Link to={`/article/${defiProtocols[0].slug}`}>
                    {defiProtocols[0].title}
                  </Link>
                </h3>
                <div className="date">
                  {formatDate(defiProtocols[0].createdAt)}
                </div>
              </div>
            )}
            {defiProtocols.slice(1).map((post) => (
              <div key={post._id} className="sub-article">
                <img
                  src={
                    post.featuredImage || "https://via.placeholder.com/150x100"
                  }
                  alt={post.title}
                />
                <div>
                  <h4>
                    <Link to={`/article/${post.slug}`}>{post.title}</Link>
                  </h4>
                  <p>{formatDate(post.createdAt)}</p>
                </div>
              </div>
            ))}
          </section>

          {/* Most Popular */}
          <section
            className="popular-articles"
            aria-labelledby="popular-articles-heading">
            <h3 id="popular-articles-heading">Most Popular</h3>
            {popular.map((post) => (
              <div key={post._id} className="popular-item">
                <img
                  src={
                    post.featuredImage || "https://via.placeholder.com/120x80"
                  }
                  alt={post.title}
                />
                <div>
                  <span>{post.category || "General"}</span>
                  <h4>
                    <Link to={`/article/${post.slug}`}>{post.title}</Link>
                  </h4>
                </div>
              </div>
            ))}
          </section>
        </div>
      </section>
    </div>
  );
}
