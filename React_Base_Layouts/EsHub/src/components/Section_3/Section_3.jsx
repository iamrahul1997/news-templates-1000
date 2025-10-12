import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../../../api/client";
import { Link } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function InvestmentGuidesSection() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["investment-guides"],
    queryFn: () => getPosts(9),
  });

  if (isLoading) return <p className="p-4">Loading investment guides...</p>;
  if (isError)
    return <p className="p-4 text-red-500">Error: {error.message}</p>;

  const posts = data?.articles || [];

  return (
    <div className="content-box-alt">
      <section
        className="investment-guides"
        aria-labelledby="investment-guides-heading">
        <h2 id="investment-guides-heading" className="section-title">
          <span>INVESTMENT GUIDES</span>
        </h2>

        <div className="travel-cards-grid">
          {posts.slice(13, 16).map((post) => (
            <div key={post._id} className="travel-card">
              <img
                src={
                  post.featuredImage || "https://via.placeholder.com/400x250"
                }
                alt={post.title || "Investment guide"}
              />
              <div className="overlay-content">
                <p className="category">{post.category || "GUIDE"}</p>
                <h3>
                  {post.subtitle || post.category || "Investment Strategy"}
                </h3>
                <h4>
                  <Link to={`/article/${post.slug}`}>
                    {post.title || "Read the full guide"}
                  </Link>
                </h4>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="pagination">
          <FaChevronLeft />
          <FaChevronRight />
        </div>
      </section>
    </div>
  );
}
