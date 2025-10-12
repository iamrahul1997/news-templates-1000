import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../../../api/client";
import { Link } from "react-router-dom";

export default function FeaturedSection() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["featured-posts"],
    queryFn: () => getPosts(5), // adjust page/endpoint as needed
  });

  if (isLoading) return <p className="p-4">Loading featured posts...</p>;
  if (isError)
    return <p className="p-4 text-red-500">Error: {error.message}</p>;

  const posts = data?.articles || [];

  const mainFeatured = posts[35]; // main featured post
  const sidebarPosts = posts.slice(36, 38); // next 3 posts for sidebar

  return (
    <section className="featured-section">
      <div className="featured-grid">
        {/* Main Featured */}
        {mainFeatured && (
          <div className="main-featured">
            <span className="category-tag">
              {mainFeatured.category?.toUpperCase() || "EXCLUSIVE"}
            </span>
            <h2>
              <Link to={`/article/${mainFeatured.slug}`}>
                {mainFeatured.title || "Untitled Post"}
              </Link>
            </h2>
            <p>
              {mainFeatured.excerpt ||
                mainFeatured.description ||
                "Read more..."}
            </p>
            <div className="news-meta">
              <span>{mainFeatured.author?.name || "Unknown Author"}</span>
              <span>
                {mainFeatured.createdAt
                  ? new Date(mainFeatured.createdAt).toLocaleDateString(
                      "en-US",
                      {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      }
                    )
                  : "Unknown Date"}
              </span>
            </div>
          </div>
        )}

        {/* Sidebar Featured */}
        <div className="sidebar-featured">
          {sidebarPosts.map((post) => (
            <div key={post._id} className="sidebar-item">
              <h4>
                <Link to={`/article/${post.slug}`}>
                  {post.title || "Untitled Post"}
                </Link>
              </h4>
              <p>{post.excerpt || post.description || "Read more..."}</p>
              <div className="news-meta">
                <span>{post.author?.name || "Unknown Author"}</span>
                <span>
                  {post.createdAt
                    ? new Date(post.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })
                    : "Unknown Date"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
