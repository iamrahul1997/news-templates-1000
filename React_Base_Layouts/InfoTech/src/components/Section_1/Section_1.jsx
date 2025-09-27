import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../../api/client";
import { Link } from "react-router-dom";

export default function ThreeColumnGrid() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["three-column-posts"],
    queryFn: () => getPosts(8),
  });

  if (isLoading) return <p className="p-4">Loading posts...</p>;
  if (isError)
    return <p className="p-4 text-red-500">Error: {error.message}</p>;

  const posts = data?.articles || [];

  // Separate posts for each section
  const politicsPosts = posts.slice(0, 5); // left column
  const leadPost = posts[6]; // center lead
  const leadListPosts = posts.slice(7, 11); // center lead list
  const editorsPicks = posts.slice(12, 18); // right sidebar picks
  const opinions = posts.slice(18, 21); // right sidebar opinions

  const formatDate = (date) =>
    date
      ? new Date(date).toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        })
      : "Unknown Date";

  return (
    <main className="container maingrid">
      {/* Left Column: Politics */}
      <aside className="sidebar-left">
        <h2 className="block-title">Politics</h2>
        {politicsPosts.map((post) => (
          <article key={post._id} className="mini">
            <img
              src={post.featuredImage || "https://placehold.co/96x64"}
              alt={post.title}
            />
            <div className="mini__body">
              <Link className="mini__title" to={`/article/${post.slug}`}>
                {post.title}
              </Link>
              <time className="mini__meta">{formatDate(post.createdAt)}</time>
            </div>
          </article>
        ))}
      </aside>

      {/* Center Column: Lead + Lead List */}
      <section className="center">
        {leadPost && (
          <article className="lead">
            <img
              className="lead__img"
              src={leadPost.featuredImage || "https://placehold.co/860x420"}
              alt={leadPost.title}
            />
            <h1 className="lead__title">
              <Link to={`/article/${leadPost.slug}`}>{leadPost.title}</Link>
            </h1>
            <time className="lead__meta">{formatDate(leadPost.createdAt)}</time>
            <p className="lead__excerpt">
              {leadPost.excerpt || "Read more..."}
            </p>

            <div className="lead__list">
              {leadListPosts.map((post) => (
                <React.Fragment key={post._id}>
                  <Link className="lead__item" to={`/article/${post.slug}`}>
                    {post.title}
                  </Link>
                  <time className="lead__meta">
                    {formatDate(post.createdAt)}
                  </time>
                </React.Fragment>
              ))}
            </div>
          </article>
        )}
      </section>

      {/* Right Column: Editors' Picks + Opinions */}
      <aside className="sidebar-right">
        <h2 className="block-title">Editors’ Picks</h2>
        <ul className="picks">
          {editorsPicks.map((post) => (
            <li key={post._id} className="picks__item">
              <Link to={`/article/${post.slug}`}>{post.title}</Link>
            </li>
          ))}
        </ul>

        <div className="widget opinions">
          <h3 className="widget__title">Opinions</h3>
          <ul className="picks">
            {opinions.map((post) => (
              <li key={post._id} className="picks__item">
                <Link to={`/article/${post.slug}`}>{post.title}</Link>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </main>
  );
}
