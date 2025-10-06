import React from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../../../api/client";
import "../css/article.css";

export default function ArticlePage() {
  const { slug } = useParams();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["allPosts"],
    queryFn: () => getPosts(5),
  });

  if (isLoading) return <p className="p-6">Loading article...</p>;
  if (isError)
    return <p className="p-6 text-red-500">Error: {error.message}</p>;

  const allPosts = data?.articles || [];
  const article = allPosts.find((p) => p.slug === slug);
  if (!article) return <p className="p-6">Article not found</p>;

  const relatedArticles = allPosts.filter((p) => p.slug !== slug).slice(0, 6);

  return (
    <main className="article-page">
      <div className="container">
        {/* HERO SECTION */}
        {/* <section className="hero-section">
          <img src={article.featuredImage} alt={article.title} />
        </section> */}

        {/* ARTICLE CONTENT */}
        <article className="article-body">
          <div dangerouslySetInnerHTML={{ __html: article.content }} />
        </article>

        {/* YOU MAY ALSO LIKE */}
        <section className="you-may-like">
          <h2>You May Also Like</h2>
          <div className="cards-grid">
            {relatedArticles.map((post) => (
              <div className="card" key={post._id}>
                <img src={post.featuredImage} alt={post.title} />
                <div className="card-content">
                  <p className="card-category">{post.section || "General"}</p>
                  <h3>
                    <Link to={`/article/${post.slug}`}>{post.title}</Link>
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
