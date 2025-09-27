import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../../api/client";
import { Link } from "react-router-dom";

export default function BreakingNewsSection() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["breaking-news-ticker"],
    queryFn: () => getPosts(5),
  });

  if (isLoading) return <p className="p-4">Loading breaking news...</p>;
  if (isError)
    return <p className="p-4 text-red-500">Error: {error.message}</p>;

  const breakingPosts = (data?.articles || []).slice(0, 6);

  return (
    <section
      className="breaking-news"
      role="complementary"
      aria-labelledby="breaking-news-heading">
      <div className="container">
        <h2
          id="breaking-news-heading"
          className="breaking-news__title visually-hidden">
          Breaking News Ticker
        </h2>

        <div
          className="breaking-news__ticker"
          aria-live="polite"
          aria-label="Breaking cryptocurrency news">
          <div className="breaking-news__content">
            {breakingPosts.map((post) => (
              <article key={post._id} className="breaking-news__item">
                <Link to={`/article/${post.slug}`}>{post.title}</Link>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
