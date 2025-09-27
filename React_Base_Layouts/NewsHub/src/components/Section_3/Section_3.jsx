import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../../../api/client";
import { Link } from "react-router-dom";

export default function RegionalAndBusinessNews() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["regional-business-news"],
    queryFn: () => getPosts(6), // adjust page/endpoint as needed
  });

  if (isLoading) return <p className="p-4">Loading news...</p>;
  if (isError)
    return <p className="p-4 text-red-500">Error: {error.message}</p>;

  const posts = data?.articles || [];

  // Example splitting posts for regions and business sections
  const africaPosts = posts.slice(11, 17);
  const europePosts = posts.slice(18, 21);
  const asiaPosts = posts.slice(22, 26);
  const businessPosts = posts.slice(27, 33);

  const formatDate = (date) =>
    date
      ? new Date(date).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })
      : "Unknown Date";

  return (
    <>
      {/* Regional News Section */}
      <section className="regional-news" aria-label="Regional news coverage">
        <div className="regional-container">
          {/* Africa */}
          <div className="regional-column">
            <div className="regional-header">
              <div className="regional-line"></div>
              <h2>Africa</h2>
              <div className="regional-line"></div>
            </div>
            <div className="regional-articles">
              {africaPosts.map((post) => (
                <article key={post._id} className="regional-article">
                  <h3>
                    <Link to={`/article/${post.slug}`}>
                      {post.title || "Untitled Post"}
                    </Link>
                  </h3>
                  <div className="regional-meta">
                    <span className="regional-category">
                      {post.category || "Africa"}
                    </span>
                    <span className="regional-date">
                      {formatDate(post.createdAt)}
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Europe */}
          <div className="regional-column">
            <div className="regional-header">
              <div className="regional-line"></div>
              <h2>Europe</h2>
              <div className="regional-line"></div>
            </div>
            <div className="regional-articles">
              {europePosts.map((post, index) => (
                <article
                  key={post._id}
                  className={
                    index === 0 ? "regional-featured" : "regional-article"
                  }>
                  <h3>
                    <Link to={`/article/${post.slug}`}>
                      {post.title || "Untitled Post"}
                    </Link>
                  </h3>
                  <div className="regional-meta">
                    <span className="regional-category">
                      {post.category || "Europe"}
                    </span>
                    <span className="regional-date">
                      {formatDate(post.createdAt)}
                    </span>
                  </div>
                  {index === 0 && post.featuredImage && (
                    <div className="regional-image">
                      <img
                        src={post.featuredImage}
                        alt={post.title || "Featured Image"}
                        loading="lazy"
                      />
                    </div>
                  )}
                  {post.excerpt && (
                    <p className="regional-excerpt">{post.excerpt}</p>
                  )}
                </article>
              ))}
            </div>
          </div>

          {/* Asia */}
          <div className="regional-column">
            <div className="regional-header">
              <div className="regional-line"></div>
              <h2>Asia</h2>
              <div className="regional-line"></div>
            </div>
            <div className="regional-articles">
              {asiaPosts.map((post) => (
                <article key={post._id} className="regional-article">
                  {post.premium && <span className="premium-tag">Premium</span>}
                  <h3>
                    <Link to={`/article/${post.slug}`}>
                      {post.title || "Untitled Post"}
                    </Link>
                  </h3>
                  <div className="regional-meta">
                    <span className="regional-category">
                      {post.category || "Asia"}
                    </span>
                    <span className="regional-date">
                      {formatDate(post.createdAt)}
                    </span>
                  </div>
                  {post.excerpt && (
                    <p className="regional-excerpt">{post.excerpt}</p>
                  )}
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Business News Section */}
      <section className="business-news">
        <div className="business-container">
          <div className="business-header">
            <div className="business-line"></div>
            <h2>Business</h2>
            <div className="business-line"></div>
          </div>
          <div className="business-grid">
            {businessPosts.map((post) => (
              <article key={post._id} className="business-article">
                {post.featuredImage && (
                  <div className="business-image">
                    <img
                      src={post.featuredImage}
                      alt={post.title || "Business Image"}
                    />
                  </div>
                )}
                <div className="business-content">
                  <h3>
                    <Link to={`/article/${post.slug}`}>
                      {post.title || "Untitled Post"}
                    </Link>
                  </h3>
                  <div className="business-meta">
                    <span className="business-category">
                      {post.category || "Business"}
                    </span>
                    <span className="business-date">
                      {formatDate(post.createdAt)}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
