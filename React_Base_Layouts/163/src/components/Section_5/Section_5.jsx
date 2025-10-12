import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../../../api/client";

export default function Section6() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["section6-posts"],
    queryFn: () => getPosts(1), // adjust the number for your API
  });

  if (isLoading) return <p className="p-6">Loading...</p>;
  if (isError)
    return (
      <p className="p-6 text-red-500">
        Error loading Section 6 articles: {error.message}
      </p>
    );

  const articles = Object.values(data?.articles || []);
  const sectionArticles = articles.slice(150, 154);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    console.log("Subscribed:", email);
    setSubmitted(true);
    setEmail("");
  };

  return (
    <section className="w-full bg-gradient-to-r from-green-600 to-blue-600 py-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Newsletter CTA */}
        <div className="text-center md:text-left mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Stay Ahead with <span className="text-yellow-300">Safe Chain</span>
          </h2>
          <p className="text-white/90 text-lg md:text-xl mb-6">
            Subscribe to our newsletter to get the latest blockchain and tech
            articles.
          </p>
          {/* Example newsletter form */}
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-2 justify-center md:justify-start">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="px-4 py-2 rounded-md w-full sm:w-auto flex-1"
              required
            />
            <button
              type="submit"
              className="px-4 py-2 bg-yellow-300 rounded-md font-semibold hover:bg-yellow-400 transition">
              {submitted ? "Subscribed!" : "Subscribe"}
            </button>
          </form>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {sectionArticles.map((article) => (
            <Link
              key={article._id}
              to={`/article/${article.slug}`}
              className="group rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 bg-white">
              <div className="relative w-full h-48 overflow-hidden">
                <img
                  src={
                    article.featuredImage ||
                    "https://placehold.co/400x250?text=No+Image"
                  }
                  alt={article.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-4">
                <span className="text-xs bg-green-600 text-white px-2 py-1 rounded-sm font-semibold uppercase">
                  {article.category || "Article"}
                </span>
                <h4 className="text-gray-900 font-bold text-lg mt-2 line-clamp-2 group-hover:text-green-600 transition-colors">
                  {article.title}
                </h4>
                <p className="text-xs text-gray-500 mt-2">
                  👤 {article.author?.name || "Safe Chain"} •{" "}
                  {article.createdAt
                    ? new Date(article.createdAt).toLocaleDateString()
                    : ""}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
