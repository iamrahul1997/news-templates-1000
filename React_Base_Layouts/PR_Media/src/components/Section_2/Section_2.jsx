import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../../../api/client";
import { Link } from "react-router-dom";

export default function CorporateSection() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["corporate-posts"],
    queryFn: () => getPosts(9),
  });

  if (isLoading) return <p className="p-4">Loading corporate posts...</p>;
  if (isError)
    return <p className="p-4 text-red-500">Error: {error.message}</p>;

  const posts = data?.articles || [];

  const mainPosts = posts.slice(10, 13); // Top 3 large posts
  const smallPosts = posts.slice(14, 18); // Small row posts
  const sidebarPosts = posts.slice(19, 26); // Right column recent items

  return (
    <>
      <div className="section-heading">
        <div className="stripe"></div>
        <h3>Corporate</h3>
      </div>

      <div className="corporate-grid">
        {/* Left column */}
        <div>
          <div className="grid-3">
            {mainPosts.map((post) => (
              <article key={post._id} className="post-card">
                {post.featuredImage && (
                  <img src={post.featuredImage} alt={post.title} />
                )}
                <div className="card-body">
                  <span className="badge">{post.category?.toUpperCase()}</span>
                  <h4>
                    <Link to={`/article/${post.slug}`}>{post.title}</Link>
                  </h4>
                  <div className="meta">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M12 7V12L15 15"
                        stroke="#888"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    {new Date(post.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="small-row">
            {smallPosts.map((post) => (
              <article key={post._id} className="small-card post-card">
                {post.featuredImage && (
                  <img src={post.featuredImage} alt={post.title} />
                )}
                <div className="card-body">
                  <span className="badge">{post.category?.toUpperCase()}</span>
                  <h4>
                    <Link to={`/article/${post.slug}`}>{post.title}</Link>
                  </h4>
                  <div className="meta">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M12 7V12L15 15"
                        stroke="#888"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    {new Date(post.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Right column */}
        <aside className="right-column">
          <div className="featured-vert">
            <div className="small-label">FEATURED</div>
            <h4>Ready For Your Summer Vacation? Join our travel club</h4>
            <button className="join-btn">JOIN US</button>
          </div>

          <div className="card popular-week">
            <h4>Popular This Week</h4>
            {sidebarPosts.map((post) => (
              <div key={post._id} className="recent-item">
                {post.featuredImage && (
                  <img src={post.featuredImage} alt={post.title} />
                )}
                <div>
                  <div className="r-meta">{post.category?.toUpperCase()}</div>
                  <div className="r-title">
                    <Link to={`/article/${post.slug}`}>{post.title}</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </aside>
      </div>

      <div className="spacer"></div>
    </>
  );
}
