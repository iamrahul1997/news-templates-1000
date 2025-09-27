import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../../../api/client";
import { Link } from "react-router-dom";

export default function HeroSection() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["hero-section"],
    queryFn: () => getPosts(7), // adjust page/endpoint as needed
  });

  if (isLoading) return <p className="p-4">Loading hero section...</p>;
  if (isError)
    return <p className="p-4 text-red-500">Error: {error.message}</p>;

  const posts = data?.articles || [];

  const mainPost = posts[0];
  const sidePosts = posts.slice(1, 5); // 4 side articles

  const formatDate = (date) =>
    date
      ? new Date(date).toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        })
      : "Unknown Date";

  return (
    <section
      className="hero-section container"
      aria-labelledby="main-hero-heading">
      {/* Main Article */}
      {mainPost && (
        <article
          className="main-article"
          style={{
            backgroundImage: `url(${
              mainPost.featuredImage || "https://via.placeholder.com/800x400"
            })`,
          }}>
          <div className="overlay">
            <span className="category" aria-label="Article category">
              {mainPost.category?.toUpperCase() || "GENERAL"}
            </span>
            <h1 id="main-hero-heading">
              <Link to={`/article/${mainPost.slug}`}>{mainPost.title}</Link>
            </h1>
            <p className="article-meta">
              <time dateTime={mainPost.createdAt}>
                {formatDate(mainPost.createdAt)}
              </time>
            </p>
          </div>
        </article>
      )}

      {/* Side Articles */}
      <aside className="side-articles" aria-label="Featured articles">
        {sidePosts.map((post) => (
          <article
            key={post._id}
            className="article"
            style={{
              backgroundImage: `url(${
                post.featuredImage || "https://via.placeholder.com/400x250"
              })`,
            }}>
            <div className="overlay">
              <span className="category" aria-label="Article category">
                {post.category?.toUpperCase() || "NEWS"}
              </span>
              <h2>
                <Link to={`/article/${post.slug}`}>{post.title}</Link>
              </h2>
            </div>
          </article>
        ))}
      </aside>
    </section>
  );
}
