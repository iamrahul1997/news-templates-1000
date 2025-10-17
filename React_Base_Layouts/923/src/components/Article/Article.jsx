import React from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../../../api/client";

export default function Article() {
  const { slug } = useParams();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Fetch all posts (or you can paginate)
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["allPosts"],
    queryFn: () => getPosts(5),
  });

  if (isLoading) return <p className="p-6">Loading article...</p>;
  if (isError)
    return <p className="p-6 text-red-500">Error: {error.message}</p>;

  const allPosts = data?.articles || [];
  const article = allPosts.find((post) => post.slug === slug);
  if (!article) return <p className="p-6">Article not found</p>;

  const moreArticles = allPosts.filter((p) => p.slug !== slug).slice(40, 44);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 lg: gap-8 items-stretch font-poppins">
      <section className="bg-white">
        <div className="flex flex-col lg:flex-row w-full min-h-screen">
          {/* Left Scrollable Column */}
          <div className="flex-1 h-screen overflow-y-scroll no-scrollbar px-6 sm:px-10 py-6">
            <div className="max-w-3xl mx-auto">
              {/* Hero Image */}
              <div className="mb-6">
                <img
                  src={
                    article.featuredImage ||
                    "https://via.placeholder.com/1200x600"
                  }
                  alt={article.title}
                  className="w-full rounded-lg"
                />
              </div>

              <p className="text-gray-500 font-semibold">
                {article.section || "Lifestyle"}
              </p>
              <h1 className="text-3xl sm:text-5xl font-extrabold leading-snug mb-3">
                {article.title}
              </h1>
              <p className="text-gray-600 mb-6 text-base sm:text-lg">
                {article.summary}
              </p>

              {/* Content */}
              <div dangerouslySetInnerHTML={{ __html: article.content }} />

              {/* Extra Images if any */}
              {article.images?.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-8">
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

              {/* More Articles */}
              <div className="mt-12">
                <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {moreArticles.map((post) => (
                    <Link
                      key={post.slug}
                      to={`/article/${post.slug}`}
                      className="flex gap-4 hover:shadow-lg transition p-3 rounded-lg">
                      <img
                        src={post.featuredImage}
                        alt={post.title}
                        className="w-40 h-28 object-cover rounded-md"
                      />
                      <div>
                        <h3 className="font-bold text-lg mb-2">{post.title}</h3>
                        <span className="text-sm bg-purple-500 text-white px-2 py-1 rounded">
                          {post.section || "Category"}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Sticky Sidebar */}
          <div className="w-full lg:w-80 h-auto lg:h-screen border-t lg:border-t-0 lg:border-l border-gray-200 px-6 py-8 sticky top-0">
            <h2 className="text-xl font-bold mb-6">POPULAR POSTS</h2>
            {allPosts.slice(45, 50).map((post, i) => (
              <Link
                key={post.slug}
                to={`/article/${post.slug}`}
                className="flex gap-3 mb-4 hover:bg-gray-100 p-2 rounded-lg transition">
                <img
                  src={post.featuredImage}
                  alt={post.title}
                  className="w-20 h-16 object-cover rounded"
                />
                <div>
                  <p className="text-xs text-gray-500">
                    {post.section} June 7, 2022
                  </p>
                  <p className="font-semibold text-sm">{post.title}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Scroll to Top Button */}
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 w-12 h-12 rounded-full bg-teal-400 flex items-center justify-center text-white shadow-lg">
          ↑
        </button>
      </section>
    </div>
  );
}
