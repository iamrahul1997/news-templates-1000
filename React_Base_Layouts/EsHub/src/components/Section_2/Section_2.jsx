import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../../../api/client";
import { Link } from "react-router-dom";

export default function CryptoMarketSection() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["crypto-market"],
    queryFn: () => getPosts(8), // adjust endpoint/page for this section
  });

  if (isLoading) return <p className="p-4">Loading crypto market news...</p>;
  if (isError)
    return <p className="p-4 text-red-500">Error: {error.message}</p>;

  const posts = data?.articles || [];

  const mainPost = posts[6];
  const sidePosts = posts.slice(7, 11); // 4 sidebar articles

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
      <section className="global-section" aria-labelledby="global-news-heading">
        <h2 id="global-news-heading" className="section-title">
          <span>CRYPTO MARKET</span>
        </h2>

        <div className="global-news">
          {/* Main Left Article */}
          {mainPost && (
            <article className="left-artical">
              <img
                src={
                  mainPost.featuredImage ||
                  "https://via.placeholder.com/600x400"
                }
                alt={mainPost.title || "Crypto news"}
              />
              <div>
                <span className="category">
                  {mainPost.category || "Market Analysis"}
                </span>
                <h3>
                  <Link to={`/article/${mainPost.slug}`}>{mainPost.title}</Link>
                </h3>
                <p className="article-meta">
                  <time dateTime={mainPost.createdAt}>
                    {formatDate(mainPost.createdAt)}
                  </time>
                </p>
                <p>
                  {mainPost.excerpt ||
                    mainPost.description ||
                    "Read the full story about the latest crypto market trends."}
                </p>
              </div>
            </article>
          )}

          {/* Sidebar Articles */}
          <aside
            className="sidebar"
            aria-label="Related crypto market articles">
            {sidePosts.map((post) => (
              <article key={post._id} className="side-artical">
                <img
                  src={
                    post.featuredImage || "https://via.placeholder.com/200x150"
                  }
                  alt={post.title || "Crypto news"}
                />
                <div>
                  <h4>
                    <Link to={`/article/${post.slug}`}>{post.title}</Link>
                  </h4>
                  <time dateTime={post.createdAt}>
                    {formatDate(post.createdAt)}
                  </time>
                </div>
              </article>
            ))}
          </aside>
        </div>
      </section>
    </div>
  );
}
