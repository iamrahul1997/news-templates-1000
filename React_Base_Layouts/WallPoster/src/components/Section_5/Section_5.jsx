import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../../api/client";
import { Link } from "react-router-dom";

export default function DeFiNFTSection() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["defi-nft-posts"],
    queryFn: () => getPosts(7), // adjust page/endpoint as needed
  });

  if (isLoading) return <p className="p-4">Loading DeFi & NFT posts...</p>;
  if (isError)
    return <p className="p-4 text-red-500">Error: {error.message}</p>;

  const posts = data?.articles || [];

  // Limit to first 8 posts to match original HTML
  const displayPosts = posts.slice(66, 74);

  return (
    <section className="defi-nft" id="defi" aria-labelledby="defi-heading">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title" id="defi-heading">
            DeFi & NFTs
          </h2>
          <Link to="#" className="view-all">
            View All
          </Link>
        </div>

        <div className="masonry-grid">
          {displayPosts.map((post) => (
            <div key={post._id} className="masonry-item">
              <div
                className="masonry-image"
                style={{
                  backgroundImage: `url(${post.featuredImage})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}></div>

              <div className="masonry-content">
                <h3 className="masonry-title">
                  <Link to={`/article/${post.slug}`}>{post.title}</Link>
                </h3>
                <p className="masonry-text">
                  {post.excerpt || post.description}
                </p>
                {post.categories?.map((cat, idx) => (
                  <span key={idx} className="tag">
                    {cat.toUpperCase()}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
