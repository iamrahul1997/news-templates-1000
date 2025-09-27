import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../../../api/client";
import { Link } from "react-router-dom";

export default function CardSection() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["card-posts"],
    queryFn: () => getPosts(10), // adjust endpoint/page for this section
  });

  if (isLoading) return <p className="p-4">Loading cards...</p>;
  if (isError)
    return <p className="p-4 text-red-500">Error: {error.message}</p>;

  const posts = data?.articles || [];
  const displayPosts = posts.slice(35, 39); // show 4 cards

  const formatDate = (date) =>
    date
      ? new Date(date).toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        })
      : "Unknown Date";

  return (
    <div className="content-box-alt">
      <div className="card-wrapper">
        <div className="card-container">
          {displayPosts.map((post) => (
            <div
              key={post._id}
              className="card"
              style={{
                backgroundImage: `url(${
                  post.featuredImage || "https://via.placeholder.com/600x400"
                })`,
              }}>
              <div className="content">
                <p className="category">
                  {post.category?.toUpperCase() || "GENERAL"}
                </p>
                <h2>
                  <Link to={`/article/${post.slug}`}>{post.title}</Link>
                </h2>
                <p className="meta">{formatDate(post.createdAt)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
