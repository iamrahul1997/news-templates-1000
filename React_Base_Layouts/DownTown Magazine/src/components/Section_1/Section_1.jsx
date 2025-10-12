import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../../api/client";
import { Link } from "react-router-dom";

export default function HeroSectionWithSidebars() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["hero-sidebars"],
    queryFn: () => getPosts(7),
  });

  if (isLoading) return <p className="p-4">Loading posts...</p>;
  if (isError)
    return <p className="p-4 text-red-500">Error: {error.message}</p>;

  const posts = data?.articles || [];

  const breakingNews = posts.slice(0, 4);
  const featuredPost = posts[5];
  const popularPosts = posts.slice(6, 10);

  return (
    <section className="hero">
      <div className="hero__container">
        {/* Breaking News Sidebar */}
        <aside
          className="hero__sidebar"
          role="complementary"
          aria-label="Breaking news sidebar">
          <div className="breaking-news" aria-labelledby="breaking-news-title">
            <div className="breaking-news__header">
              <h2 className="breaking-news__title" id="breaking-news-title">
                Breaking news:
              </h2>
              <Link to="#" className="breaking-news__more">
                READ MORE
              </Link>
            </div>

            {breakingNews.map((post) => (
              <article
                key={post._id}
                className={`news-item ${
                  post.isTagged ? "news-item--tagged" : ""
                }`}
                role="article">
                {post.category && (
                  <span className="news-item__category">
                    {post.category.toUpperCase()}
                  </span>
                )}
                <h3 className="news-item__title">
                  <Link to={`/article/${post.slug}`}>{post.title}</Link>
                </h3>
                {post.excerpt && (
                  <p className="news-item__excerpt">{post.excerpt}</p>
                )}
                <time className="news-item__date" dateTime={post.createdAt}>
                  {new Date(post.createdAt).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </time>
              </article>
            ))}
          </div>
        </aside>

        {/* Featured Article */}
        {featuredPost && (
          <div className="hero__featured">
            <article className="featured-article" role="article">
              {featuredPost.featuredImage && (
                <div className="featured-article__image">
                  <img
                    src={featuredPost.featuredImage}
                    alt={featuredPost.title}
                    loading="lazy"
                  />
                </div>
              )}
              <div className="featured-article__content">
                {featuredPost.category && (
                  <span className="featured-article__category">
                    {featuredPost.category.toUpperCase()}
                  </span>
                )}
                <h1 className="featured-article__title">
                  <Link to={`/article/${featuredPost.slug}`}>
                    {featuredPost.title}
                  </Link>
                </h1>
              </div>
            </article>
          </div>
        )}

        {/* Popular Articles Sidebar */}
        <aside
          className="hero__popular"
          role="complementary"
          aria-label="Popular articles sidebar">
          <h2 className="popular__title" id="popular-title">
            Popular:
          </h2>

          {popularPosts.map((post) => (
            <article key={post._id} className="popular-item" role="article">
              {post.featuredImage && (
                <div className="popular-item__image">
                  <img
                    src={post.featuredImage}
                    alt={post.title}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              )}
              {post.tag && (
                <span className="popular-item__tag">
                  {post.tag.toUpperCase()}
                </span>
              )}
              <h3 className="popular-item__title">
                <Link to={`/article/${post.slug}`}>{post.title}</Link>
              </h3>
            </article>
          ))}
        </aside>
      </div>
    </section>
  );
}
