import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../../../api/client";
import { Link } from "react-router-dom";

export default function ArticlesGrid() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["articles-grid"],
    queryFn: () => getPosts(1),
  });

  if (isLoading) return <p>Loading articles...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  const posts = data?.articles || [];
  const additionalArticles = posts.slice(50, 56);
  console.log(additionalArticles);

  return (
    <div className="articles-grid">
      {additionalArticles.map((post) => (
        <Link
          key={post._id}
          to={`/article/${post.slug}`}
          className="grid-article">
          <div
            className="grid-article-image"
            style={{
              backgroundImage: `url(${post.featuredImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}></div>
          <div className="grid-article-content">
            <span className="article-tag">{post.category}</span>
            <h3>{post.title}</h3>
            <p>{post.excerpt}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
