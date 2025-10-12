import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { getPosts } from "../../api/client";

export default function ArticleTitlesSection() {
  const [page, setPage] = useState(1);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["article-titles", page],
    queryFn: () => getPosts(page),
    keepPreviousData: true,
  });

  if (isLoading) return <p className="p-6">Loading articles...</p>;
  if (isError)
    return <p className="p-6 text-red-500">Error: {error.message}</p>;

  const posts = (data?.articles || []).slice(70, 82);

  return (
    <section className="article-titles-section">
      <div className="article-titles-grid">
        {posts.map((post) => (
          <article key={post._id} className="article-title-item">
            {/* Use #slug or full article route depending on your routing */}
            <Link to={`/article/${post.slug}`} className="article-title-link">
              {post.title}
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
