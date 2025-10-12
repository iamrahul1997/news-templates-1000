import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { getPosts } from "../../../api/client";

export default function LatestArticles() {
  const [page, setPage] = useState(1);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["latest-articles", page],
    queryFn: () => getPosts(page),
    keepPreviousData: true,
  });

  if (isLoading) return <p className="p-6">Loading...</p>;
  if (isError)
    return <p className="p-6 text-red-500">Error: {error.message}</p>;

  const posts = Object.values(data?.articles || []).slice(40, 46);

  const formatDate = (dateStr) => dateStr?.split("T")[0] || "Unknown date";

  return (
    <section className="articles-section">
      <h2 className="section-title">Latest News</h2>
      <div className="articles-grid">
        {posts.map((post) => (
          <article key={post._id} className="article-card">
            <Link to={`/article/${post.slug}`}>
              <img src={post.featuredImage} alt={post.title} />
              <div className="article-content">
                <h3>{post.title}</h3>
                <p>{post.description || post.title}</p>
                <div className="article-meta">
                  <span className="article-date">
                    {formatDate(post.createdAt)}
                  </span>
                </div>
                <span className="read-more">Read more →</span>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
