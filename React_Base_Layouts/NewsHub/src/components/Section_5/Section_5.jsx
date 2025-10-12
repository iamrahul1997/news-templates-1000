import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../../../api/client";
import { Link } from "react-router-dom";

export default function MainContent() {
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["latest-news", currentPage],
    queryFn: () => getPosts(currentPage),
    keepPreviousData: true,
  });

  if (isLoading) return <p className="p-4">Loading news...</p>;
  if (isError)
    return <p className="p-4 text-red-500">Error: {error.message}</p>;

  const posts = (data?.articles || []).slice(40, 46); // Show only 6 posts per page

  return (
    <div className="container">
      {/* Latest News Section */}
      <h2 className="section-title" id="latest-news">
        Latest News
      </h2>
      <div className="news-grid">
        {posts.map((post) => (
          <article key={post._id} className="news-card">
            <Link to={`/article/${post.slug}`} className="news-link">
              <div className="news-image">
                <img src={post.featuredImage} alt={post.title} loading="lazy" />
                <span className="category-tag">
                  {post.category?.toUpperCase()}
                </span>
              </div>
              <div className="news-content">
                <h3>{post.title}</h3>
                <p>{post.excerpt || post.description || "Read more..."}</p>
                <div className="news-meta">
                  <span>
                    {new Date(post.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>
              </div>
            </Link>
          </article>
        ))}
      </div>

      {/* Pagination */}
      <div className="pagination">
        <button
          className="pagination-btn"
          id="prevBtn"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}>
          Previous
        </button>
        <div className="pagination-numbers">
          {[1, 2, 3].map((page) => (
            <span
              key={page}
              className={`page-number ${page === currentPage ? "active" : ""}`}
              data-page={page}
              onClick={() => setCurrentPage(page)}>
              {page}
            </span>
          ))}
        </div>
        <button
          className="pagination-btn"
          id="nextBtn"
          onClick={() => setCurrentPage((prev) => prev + 1)}>
          Next
        </button>
      </div>
    </div>
  );
}
