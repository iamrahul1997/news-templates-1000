import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../../../api/client";
import { Link } from "react-router-dom";

export default function TwoColumnLayout() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["posts-twocolumn"],
    queryFn: () => getPosts(2), // adjust page/endpoint as needed
  });

  if (isLoading) return <p className="p-4">Loading articles...</p>;
  if (isError)
    return <p className="p-4 text-red-500">Error: {error.message}</p>;

  const articles = data?.articles || [];
  const featuredPost = articles[0]; // first article as featured
  const otherArticles = articles.slice(1, 4); // next 3 articles
  const bitcoinArticles = articles.slice(4, 11); // next 7 for sidebar Bitcoin news

  return (
    <div className="two-column">
      {/* Left Column */}
      <div>
        <h2 className="section-title">Editor's Choice</h2>
        {featuredPost && (
          <div className="featured-article">
            <img src={featuredPost.imageUrl} alt={featuredPost.title} />
            <div className="featured-content">
              <span className="featured-tag">FEATURED</span>
              <h2>{featuredPost.title}</h2>
              <div className="featured-meta">
                By {featuredPost.author?.name} -{" "}
                {new Date(featuredPost.createdAt).toLocaleDateString()}
              </div>
              <p>{featuredPost.excerpt}</p>
            </div>
          </div>
        )}

        {/* Articles List */}
        <div className="article-list article-list-spacing">
          {otherArticles.map((post) => (
            <div key={post._id} className="article-item">
              <div
                className="article-thumb"
                style={{
                  backgroundImage: `url(${post.imageUrl})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}></div>
              <div className="article-content">
                <h3>
                  <Link
                    to={`/article/${post.slug}`}
                    className="hover:underline">
                    {post.title}
                  </Link>
                </h3>
                <div className="article-meta">
                  {post.author?.name} -{" "}
                  {new Date(post.createdAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Column / Sidebar */}
      <div>
        {/* Sidebar Banner Ad */}
        <div className="sidebar-banner-ad">
          <div className="sidebar-ad-overlay"></div>
          <div className="sidebar-ad-content">
            <span className="sidebar-ad-tag">SPONSORED</span>
            <h3>Start Your Crypto Journey Today</h3>
            <p>Join over 100M+ users trading Bitcoin & Ethereum</p>
            <button className="sidebar-ad-btn">GET STARTED</button>
          </div>
          <div
            className="sidebar-ad-bg"
            style={{
              backgroundImage: `url(${featuredPost?.imageUrl})`,
            }}></div>
        </div>

        {/* Bitcoin News */}
        <div className="bitcoin-news">
          <h2 className="section-title">Bitcoin News</h2>
          <div className="bitcoin-articles">
            {bitcoinArticles.map((post) => (
              <div key={post._id} className="bitcoin-article">
                <h4>
                  <Link
                    to={`/article/${post.slug}`}
                    className="hover:underline">
                    {post.title}
                  </Link>
                </h4>
                <p>
                  {post.author?.name} -{" "}
                  {new Date(post.createdAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
