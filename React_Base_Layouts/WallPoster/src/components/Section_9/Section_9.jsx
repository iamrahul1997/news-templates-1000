import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../../api/client";
import { Link } from "react-router-dom";

export default function LatestArticlesSection() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["latest-articles"],
    queryFn: () => getPosts(8),
  });

  if (isLoading) return <p className="p-4">Loading latest articles...</p>;
  if (isError)
    return <p className="p-4 text-red-500">Error: {error.message}</p>;

  const posts = data?.articles || [];
  const displayPosts = posts.slice(10, 14);

  return (
    <section className="articles" aria-labelledby="articles-heading">
      <div className="container">
        <div className="section-header section-header--articles">
          <h2
            className="section-title section-title--articles"
            id="articles-heading">
            Latest Articles
          </h2>
          <Link
            to="#"
            className="view-all"
            aria-label="View all latest articles">
            View All
          </Link>
        </div>

        <div className="articles__grid">
          {displayPosts.map((post) => {
            // safely extract values
            const authorName =
              post.author && typeof post.author === "object"
                ? post.author.name || "Author"
                : post.author || "Author";
            const categoryName =
              post.category && typeof post.category === "object"
                ? post.category.name?.toUpperCase() || "CATEGORY"
                : post.category?.toUpperCase() || "CATEGORY";
            const readTime = post.readTime || "5 min read";
            const title = post.title || "No Title";
            const excerpt = post.excerpt || post.description || "";

            return (
              <article key={post._id} className="article-card">
                <Link to={`/article/${post.slug}`}>
                  <div
                    className="article-thumbnail"
                    style={{
                      backgroundImage: post.featuredImage
                        ? `url(${post.featuredImage})`
                        : "none",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}>
                    <div className="article-category">{categoryName}</div>
                  </div>
                  <div className="article-content">
                    <h4 className="article-title">{title}</h4>
                    <small className="article-meta">
                      {authorName} • {readTime}
                    </small>
                    {excerpt && <p>{excerpt}</p>}
                  </div>
                </Link>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
