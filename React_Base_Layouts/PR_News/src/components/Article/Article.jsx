import React from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../../../api/client";
import "../../css/article.css";
import "../../css/common.css";

export default function Article() {
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

  const relatedPosts = allPosts.filter((p) => p.slug !== slug).slice(0, 3);
  const sidebarPosts = allPosts.filter((p) => p.slug !== slug).slice(3, 10);

  const formatDate = (dateStr) => new Date(dateStr).toLocaleDateString();

  return (
    <div className="article-container max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="article-wrapper flex flex-col lg:flex-row gap-8">
        {/* Main Article */}
        <main className="article-main flex-1">
          {/* Article Header */}
          <div className="article-header mb-6">
            <span className="article-category text-sm text-gray-500">
              {article.section || "General"}
            </span>
            <h1 className="article-title text-3xl sm:text-5xl font-bold my-2">
              {article.title}
            </h1>
            <div className="article-meta-info flex items-center gap-4 text-sm text-gray-500">
              <span className="article-date">
                {formatDate(article.createdAt)}
              </span>
              <span className="read-time">
                {article.readTime || "5 Mins Read"}
              </span>
            </div>

            {/* Social Share Buttons */}
            <div className="share-buttons flex gap-2 mt-2">
              <span className="share-text">Share:</span>
              <a href="#" className="share-btn facebook">
                f
              </a>
              <a href="#" className="share-btn twitter">
                𝕏
              </a>
              <a href="#" className="share-btn linkedin">
                in
              </a>
              <a href="#" className="share-btn pinterest">
                ⚮
              </a>
              <a href="#" className="share-btn whatsapp">
                ⊞
              </a>
              <a href="#" className="share-btn telegram">
                ✈
              </a>
            </div>
          </div>

          {/* Article Content */}
          <div
            className="article-content prose max-w-none"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          {/* Extra Images */}
          {article.images?.length > 0 && (
            <div className="article-images grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
              {article.images.map((img, idx) => (
                <img
                  key={idx}
                  src={img.url}
                  alt={img.alt || "image"}
                  className="rounded-lg"
                />
              ))}
            </div>
          )}

          {/* Related Posts */}
          <section className="related-posts mt-12">
            <h2 className="related-title text-2xl font-bold mb-6">
              Related <span className="highlight text-teal-500">Posts</span>
            </h2>
            <div className="related-grid grid grid-cols-1 md:grid-cols-3 gap-4">
              {relatedPosts.map((post) => (
                <Link
                  key={post.slug}
                  to={`/article/${post.slug}`}
                  className="related-card block hover:shadow-lg transition rounded-lg overflow-hidden">
                  <img
                    src={post.featuredImage}
                    alt={post.title}
                    className="w-full h-40 object-cover"
                  />
                  <div className="related-content p-2">
                    <h3 className="font-bold text-lg">{post.title}</h3>
                    <span className="related-date text-sm text-gray-500">
                      {formatDate(post.createdAt)}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </main>

        {/* Sidebar */}
        <aside className="article-sidebar w-full lg:w-80 flex-shrink-0">
          <div className="sidebar-section sticky top-0">
            <h3 className="sidebar-title text-xl font-bold mb-4">
              Latest News
            </h3>

            {sidebarPosts.map((post, i) => (
              <Link
                key={post.slug}
                to={`/article/${post.slug}`}
                className={`sidebar-article flex gap-3 mb-4 hover:bg-gray-100 p-2 rounded-lg transition ${
                  i === 0 ? "featured" : ""
                }`}>
                <img
                  src={post.featuredImage}
                  alt={post.title}
                  className={`w-20 h-16 object-cover rounded ${
                    i === 0 ? "w-40 h-28" : ""
                  }`}
                />
                <div>
                  <p className="text-xs text-gray-500">
                    {post.section || "Category"} {formatDate(post.createdAt)}
                  </p>
                  <p className="font-semibold text-sm">{post.title}</p>
                  {i === 0 && post.summary && (
                    <p className="text-xs">{post.summary}</p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}
