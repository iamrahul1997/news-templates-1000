import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../../api/client";
import { Link } from "react-router-dom";

export default function BusinessSection() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["business-posts"],
    queryFn: () => getPosts(6), // adjust endpoint/page as needed
  });

  if (isLoading) return <p className="p-4">Loading business posts...</p>;
  if (isError)
    return <p className="p-4 text-red-500">Error: {error.message}</p>;

  const posts = data?.articles || [];

  const mainArticle = posts[22]; // first post as main
  const sideArticles = posts.slice(23, 28); // next 5 posts as side

  const formatDate = (date) =>
    date
      ? new Date(date).toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        })
      : "Unknown Date";

  return (
    <section className="news-section">
      <div className="section-header">
        <h2>Business</h2>
        <Link to="/category/business">View All ➝</Link>
      </div>

      <div className="news-grid">
        {/* Main Article */}
        {mainArticle && (
          <div className="main-article">
            <img
              src={mainArticle.featuredImage || "https://placehold.co/800x400"}
              alt={mainArticle.title}
            />
            <div className="overlay">
              <h3>
                <Link to={`/article/${mainArticle.slug}`}>
                  {mainArticle.title}
                </Link>
              </h3>
              <p>
                by {mainArticle.author?.name || "Unknown"} •{" "}
                {formatDate(mainArticle.createdAt)}
              </p>
            </div>
          </div>
        )}

        {/* Side Articles */}
        <div className="side-articles">
          {sideArticles.map((post) => (
            <Link key={post._id} to={`/article/${post.slug}`}>
              <h4>{post.title}</h4>
              <p>
                by {post.author?.name || "Unknown"} •{" "}
                {formatDate(post.createdAt)}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
