// import React from "react";
// import { useQuery } from "@tanstack/react-query";
// import { getPosts } from "../../api/client";
// import { Link } from "react-router-dom";

// export default function TrendingTopics() {
//   const { data, isLoading, isError, error } = useQuery({
//     queryKey: ["trending-topics"],
//     queryFn: () => getPosts(7),
//   });

//   if (isLoading) return <p className="p-4">Loading trending topics...</p>;
//   if (isError)
//     return <p className="p-4 text-red-500">Error: {error.message}</p>;

//   const posts = data?.articles || [];

//   const trendingCards = posts.slice(50, 53);

//   const trendingTags = posts
//     .slice(0, 8)
//     .map((post) => post.category?.toUpperCase() || "NEWS");

//   const tagClasses = [
//     "tag-orange",
//     "tag-blue",
//     "tag-red",
//     "tag-green",
//     "tag-purple",
//     "tag-gray",
//     "tag-orange-alt",
//     "tag-dark",
//   ];

//   return (
//     <section className="trending" aria-labelledby="trending-heading">
//       <div className="container">
//         <div className="section-header">
//           <h2 className="section-title" id="trending-heading">
//             Trending Now
//           </h2>
//           <Link to="#" className="view-all">
//             View All
//           </Link>
//         </div>

//         <div className="trending-tags">
//           {trendingTags.map((tag, index) => (
//             <Link
//               key={index}
//               to={`/category/${tag.toLowerCase()}`}
//               className={`trending-tag ${tagClasses[index] || "tag-gray"}`}>
//               #{tag}
//             </Link>
//           ))}
//         </div>

//         <div className="trending-grid">
//           {trendingCards.map((post, index) => (
//             <div key={post._id} className="trending-card">
//               <h4
//                 className={`trending-card__title ${
//                   index === 0
//                     ? "trending-card__title--most-read"
//                     : index === 1
//                     ? "trending-card__title--breaking"
//                     : "trending-card__title--price-alert"
//                 }`}>
//                 #{post.category?.toUpperCase() || "TRENDING"}
//               </h4>
//               <p className="trending-card__description">{post.title}</p>
//               <small className="trending-card__meta">
//                 {post.readersCount
//                   ? `${post.readersCount} readers • ${
//                       post.readingTime || "5 min read"
//                     }`
//                   : "Just now • Breaking News"}
//               </small>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../../api/client";
import { Link } from "react-router-dom";

export default function TrendingTopicsSection() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["trending-topics"],
    queryFn: () => getPosts(7),
  });

  if (isLoading) return <p className="p-4">Loading trending topics...</p>;
  if (isError)
    return <p className="p-4 text-red-500">Error: {error.message}</p>;

  const posts = data?.articles || [];

  const trendingTags = posts.slice(0, 8);
  const trendingCards = posts.slice(8, 11);
  const tagColors = [
    "tag-orange",
    "tag-blue",
    "tag-red",
    "tag-green",
    "tag-purple",
    "tag-gray",
    "tag-orange-alt",
    "tag-dark",
  ];

  return (
    <section className="trending" aria-labelledby="trending-heading">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title" id="trending-heading">
            Trending Now
          </h2>
          <Link to="#" className="view-all">
            View All
          </Link>
        </div>

        <div class="trending-tags">
          <Link href="#" class="trending-tag tag-orange">
            #BitcoinETF
          </Link>
          <Link href="#" className="trending-tag tag-blue">
            #DeFiYield
          </Link>
          <Link href="#" className="trending-tag tag-red">
            #NFTRevival
          </Link>
          <Link href="#" className="trending-tag tag-green">
            #Layer2Scaling
          </Link>
          <Link href="#" className="trending-tag tag-purple">
            #GameFi
          </Link>
          <Link href="#" className="trending-tag tag-gray">
            #CrossChain
          </Link>
          <Link href="#" className="trending-tag tag-orange-alt">
            #StakingRewards
          </Link>
          <Link href="#" className="trending-tag tag-dark">
            #CBDCNews
          </Link>
        </div>

        <div className="trending-grid">
          {trendingCards.map((post, index) => {
            let cardClass = "trending-card__title--most-read";
            if (index === 1) cardClass = "trending-card__title--breaking";
            else if (index === 2)
              cardClass = "trending-card__title--price-alert";

            return (
              <div key={post._id} className="trending-card">
                <h4 className={`trending-card__title ${cardClass}`}>
                  <Link to={`/article/${post.slug}`}>#{post.title}</Link>
                </h4>
                <p className="trending-card__description">
                  {post.excerpt || post.description || "Read more..."}
                </p>
                <small className="trending-card__meta">
                  {post.readers
                    ? `${post.readers.toLocaleString()} readers • ${
                        post.readTime || "5 min read"
                      }`
                    : "Just now • Breaking News"}
                </small>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
