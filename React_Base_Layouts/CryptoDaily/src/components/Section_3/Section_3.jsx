import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../../../api/client";
import { Link } from "react-router-dom";

export default function NewsSection() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["business-news"],
    queryFn: () => getPosts(3), // adjust page/category depending on API
  });

  if (isLoading) return <p className="p-4">Loading news...</p>;
  if (isError)
    return <p className="p-4 text-red-500">Error: {error.message}</p>;

  const newsPosts = (data?.articles || []).slice(11, 15); // show 4 posts

  return (
    <section className="news-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Business News</h2>
          <Link to="/category/business" className="view-all">
            View All →
          </Link>
        </div>

        <div className="news-grid" id="newsGrid">
          {newsPosts.map((post) => (
            <article key={post._id} className="news-card">
              {/* ✅ Featured Image */}
              <div
                className="news-image"
                style={{
                  backgroundImage: `url(${post.featuredImage})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}></div>

              <div className="news-content">
                <span className="news-tag">{post.category?.toUpperCase()}</span>

                <h3 className="news-title">
                  <Link to={`/article/${post.slug}`}>{post.title}</Link>
                </h3>

                <p className="news-excerpt">
                  {post.excerpt || post.description || "Read more..."}
                </p>

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
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
