import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../../../api/client";
import { Link } from "react-router-dom";

export default function AdditionalArticles() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["additional-articles"],
    queryFn: () => getPosts(3),
  });

  if (isLoading) return <p className="p-4">Loading articles...</p>;
  if (isError)
    return <p className="p-4 text-red-500">Error: {error.message}</p>;

  const posts = data?.articles || [];

  // Assign posts to different sections
  const featuredPost = posts[60]; // first post
  const singlePost = posts[61]; // second post
  const sidebarPosts = posts.slice(62, 66); // next 4 posts for sidebar

  return (
    <section className="additional-articles">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Ethereum & NFTs</h2>
        </div>

        <div className="modern-articles-container">
          {/* Left Column */}
          <div className="modern-main-posts">
            {featuredPost && (
              <article className="modern-featured-post">
                <div className="modern-image-container">
                  <img
                    src={featuredPost.featuredImage}
                    alt={featuredPost.title}
                  />
                </div>
                <div className="modern-featured-content">
                  <span
                    className={`modern-tag ${featuredPost.category?.toLowerCase()}`}>
                    {featuredPost.category?.toUpperCase()}
                  </span>
                  <h2>
                    <Link to={`/article/${featuredPost.slug}`}>
                      {featuredPost.title}
                    </Link>
                  </h2>
                  <div className="modern-meta">
                    <span>
                      {new Date(featuredPost.createdAt).toLocaleDateString(
                        "en-US",
                        {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        }
                      )}
                    </span>{" "}
                    - <span>{featuredPost.commentsCount || 0} COMMENTS</span>
                  </div>
                </div>
              </article>
            )}

            {singlePost && (
              <article className="modern-single-post">
                <img src={singlePost.featuredImage} alt={singlePost.title} />
                <div className="modern-single-post-content">
                  <span
                    className={`modern-tag ${singlePost.category?.toLowerCase()}`}>
                    {singlePost.category?.toUpperCase()}
                  </span>
                  <h3>
                    <Link to={`/article/${singlePost.slug}`}>
                      {singlePost.title}
                    </Link>
                  </h3>
                  <p>
                    {singlePost.excerpt ||
                      singlePost.description ||
                      "Read more..."}
                  </p>
                </div>
              </article>
            )}
          </div>

          {/* Right Column - Sidebar */}
          <div className="modern-sidebar-posts">
            {sidebarPosts.map((post) => (
              <article key={post._id} className="modern-sidebar-post">
                <img src={post.featuredImage} alt={post.title} />
                <div className="modern-sidebar-post-content">
                  <span
                    className={`modern-tag ${post.category?.toLowerCase()}`}>
                    {post.category?.toUpperCase()}
                  </span>
                  <h3>
                    <Link to={`/article/${post.slug}`}>{post.title}</Link>
                  </h3>
                  <p>{post.excerpt || post.description || "Read more..."}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
