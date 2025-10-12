// import React from "react";
// import { useParams, Link } from "react-router-dom";
// import { useQuery } from "@tanstack/react-query";
// import { getPosts } from "../../../api/client";
// import "../css/common.css";
// import "../css/article.css";

// export default function Article() {
//   const { slug } = useParams();

//   // Fetch all posts
//   const { data, isLoading, isError, error } = useQuery({
//     queryKey: ["allPosts"],
//     queryFn: () => getPosts(), // fetch all articles
//   });

//   if (isLoading) return <p className="p-6">Loading article...</p>;
//   if (isError)
//     return <p className="p-6 text-red-500">Error: {error.message}</p>;

//   const allPosts = data?.articles || [];
//   const article = allPosts.find((p) => p.slug === slug);
//   if (!article) return <p className="p-6">Article not found</p>;

//   const relatedArticles = allPosts.filter((p) => p.slug !== slug).slice(0, 5); // adjust number as needed
//   const recentArticles = allPosts.filter((p) => p.slug !== slug).slice(0, 5);
//   const businessNews = allPosts
//     .filter((p) => p.section === "Business")
//     .slice(0, 3);
//   const trendingTopics = allPosts.slice(0, 5); // mock trending from latest 5

//   const formatDate = (dateStr) =>
//     new Date(dateStr).toLocaleDateString("en-US", {
//       month: "short",
//       day: "numeric",
//       year: "numeric",
//     });

//   return (
//     <div className="article-container">
//       {/* Main Article */}
//       <main className="article-main" id="main-content">
//         <header className="article-header">
//           <div className="article-category">
//             <span className="category-label">
//               {article.section || "General"}
//             </span>
//           </div>
//           <h1 className="article-title">{article.title}</h1>

//           <div className="article-meta">
//             <div className="meta-left">
//               <span className="publish-date">
//                 Published: {formatDate(article.createdAt)}
//               </span>
//               <span className="reading-time">
//                 {article.readingTime || "2 min"} read
//               </span>
//             </div>
//             <div className="social-share">
//               {/* Social buttons can be reused or dynamically mapped */}
//               {/* Add your SVG buttons here as in your HTML */}
//             </div>
//           </div>
//         </header>

//         <div className="article-featured-image">
//           <img
//             src={article.featuredImage}
//             alt={article.title}
//             loading="eager"
//           />
//         </div>

//         <article
//           className="article-content"
//           dangerouslySetInnerHTML={{ __html: article.content }}
//         />

//         {/* Tags */}
//         <div className="article-tags">
//           <h3>Tags:</h3>
//           <div className="tags-list">
//             {(article.tags || []).map((tag) => (
//               <span key={tag} className="tag">
//                 {tag}
//               </span>
//             ))}
//           </div>
//         </div>

//         {/* Social Share Bottom */}
//         <div className="social-share-bottom">
//           <h3>Share this article:</h3>
//           <div className="social-buttons">
//             {/* Add your social buttons SVG and spans here */}
//           </div>
//         </div>
//       </main>

//       {/* Sidebar */}
//       <aside className="article-sidebar">
//         {/* Related Articles */}
//         <section className="sidebar-section related-articles">
//           <div className="sidebar-header">
//             <div className="sidebar-line"></div>
//             <h2>Related Articles</h2>
//             <div className="sidebar-line"></div>
//           </div>
//           {relatedArticles.map((post) => (
//             <article key={post._id} className="related-article">
//               <div className="related-category">
//                 {post.section || "General"}
//               </div>
//               <h3>
//                 <Link to={`/article/${post.slug}`}>{post.title}</Link>
//               </h3>
//               <div className="related-date">{formatDate(post.createdAt)}</div>
//               {post.isPremium && <div className="premium-badge">Premium</div>}
//             </article>
//           ))}
//         </section>

//         {/* Recent Articles */}
//         <section className="sidebar-section recent-articles">
//           <div className="sidebar-header">
//             <div className="sidebar-line"></div>
//             <h2>Recent Articles</h2>
//             <div className="sidebar-line"></div>
//           </div>
//           {recentArticles.map((post) => (
//             <article key={post._id} className="recent-article">
//               <div className="recent-category">{post.section || "General"}</div>
//               <h3>
//                 <Link to={`/article/${post.slug}`}>{post.title}</Link>
//               </h3>
//               <div className="recent-date">{formatDate(post.createdAt)}</div>
//             </article>
//           ))}
//         </section>

//         {/* Business News */}
//         <section className="sidebar-section business-news">
//           <div className="sidebar-header">
//             <div className="sidebar-line"></div>
//             <h2>Business News</h2>
//             <div className="sidebar-line"></div>
//           </div>
//           {businessNews.map((post) => (
//             <article key={post._id} className="business-story">
//               <div className="business-image">
//                 <img src={post.featuredImage} alt={post.title} loading="lazy" />
//               </div>
//               <div className="business-content">
//                 <div className="business-category">{post.section}</div>
//                 <h4>
//                   <Link to={`/article/${post.slug}`}>{post.title}</Link>
//                 </h4>
//                 <div className="business-date">
//                   {formatDate(post.createdAt)}
//                 </div>
//               </div>
//             </article>
//           ))}
//         </section>

//         {/* Trending Topics */}
//         <section className="sidebar-section trending-topics">
//           <div className="sidebar-header">
//             <div className="sidebar-line"></div>
//             <h2>Trending</h2>
//             <div className="sidebar-line"></div>
//           </div>
//           <div className="trending-list">
//             {trendingTopics.map((post, idx) => (
//               <div key={post._id} className="trending-item">
//                 <span className="trend-number">{idx + 1}</span>
//                 <div className="trend-content">
//                   <h4>
//                     <Link to={`/article/${post.slug}`}>{post.title}</Link>
//                   </h4>
//                   <span className="trend-category">{post.section}</span>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </section>
//       </aside>
//     </div>
//   );
// }
import React from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../../../api/client";
import "../css/common.css";
import "../css/article.css";

export default function Article() {
  const { slug } = useParams();

  // Fetch all posts
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["allPosts"],
    queryFn: () => getPosts(10), // Adjust the number of posts fetched as needed
  });

  if (isLoading) return <p className="p-6">Loading article...</p>;
  if (isError)
    return <p className="p-6 text-red-500">Error: {error.message}</p>;

  const allPosts = data?.articles || [];
  const article = allPosts.find((p) => p.slug === slug);
  if (!article) return <p className="p-6">Article not found</p>;

  // Helper to format date
  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

  // Sidebar sections
  const relatedArticles = allPosts.filter((p) => p.slug !== slug).slice(0, 5);
  const recentArticles = allPosts
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);
  const businessNews = allPosts.slice(0, 5);

  const trendingTopics = allPosts.slice(0, 5); // Or fetch trending separately if API supports

  return (
    <div className="article-container">
      {/* Main Article Content */}
      <main className="article-main" id="main-content">
        {/* Article Header */}
        <header className="article-header">
          <div className="article-category">
            <span className="category-label">
              {article.section || "General"}
            </span>
          </div>
          <h1 className="article-title">{article.title}</h1>

          {/* Article Meta */}
          <div className="article-meta">
            <div className="meta-left">
              <span className="publish-date">
                Published: {formatDate(article.createdAt)}
              </span>
              <span className="reading-time">
                {article.readingTime || "2 min"}
              </span>
            </div>
            <div className="social-share"></div>
          </div>
        </header>

        {/* Featured Image */}
        {/* <div className="article-featured-image">
          <img
            src={article.featuredImage}
            alt={article.title}
            loading="eager"
          />
        </div> */}

        {/* Article Content */}
        <article
          className="article-content"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        {/* Tags Section */}
        <div className="article-tags">
          <h3>Tags:</h3>
          <div className="tags-list">
            {article.tags?.map((tag, idx) => (
              <span key={idx} className="tag">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Social Share Bottom */}
        <div className="social-share-bottom">
          <h3>Share this article:</h3>
          <div className="social-buttons">
            {/* Social buttons (Facebook, Twitter, WhatsApp, Pinterest, Email) */}
          </div>
        </div>
      </main>

      {/* Sidebar */}
      <aside className="article-sidebar">
        {/* Related Articles */}
        <section className="sidebar-section related-articles">
          <div className="sidebar-header">
            <div className="sidebar-line"></div>
            <h2>Related Articles</h2>
            <div className="sidebar-line"></div>
          </div>
          {relatedArticles.map((post) => (
            <article key={post._id} className="related-article">
              <div className="related-category">{post.section}</div>
              <h3>
                <Link to={`/article/${post.slug}`}>{post.title}</Link>
              </h3>
              <div className="related-date">{formatDate(post.createdAt)}</div>
            </article>
          ))}
        </section>

        {/* Recent Articles */}
        <section className="sidebar-section recent-articles">
          <div className="sidebar-header">
            <div className="sidebar-line"></div>
            <h2>Recent Articles</h2>
            <div className="sidebar-line"></div>
          </div>
          {recentArticles.map((post) => (
            <article key={post._id} className="recent-article">
              <div className="recent-category">{post.section}</div>
              <h3>
                <Link to={`/article/${post.slug}`}>{post.title}</Link>
              </h3>
              <div className="recent-date">{formatDate(post.createdAt)}</div>
            </article>
          ))}
        </section>

        {/* Business News */}
        {/* Business News */}
        <section className="sidebar-section business-news">
          <div className="sidebar-header">
            <div className="sidebar-line"></div>
            <h2>Business News</h2>
            <div className="sidebar-line"></div>
          </div>

          {businessNews.map((post) => (
            <article key={post._id} className="business-story">
              {/* Show placeholder if no image */}
              <div className="business-image">
                <img
                  src={post.featuredImage || "/images/placeholder.png"}
                  alt={post.title}
                  loading="lazy"
                />
              </div>

              <div className="business-content">
                <div className="business-category">
                  {post.section || "Business"}
                </div>
                <h4>
                  <Link to={`/article/${post.slug}`}>{post.title}</Link>
                </h4>
                <div className="business-date">
                  {post.createdAt ? formatDate(post.createdAt) : "Unknown date"}
                </div>
              </div>
            </article>
          ))}
        </section>

        {/* Trending Topics */}
        <section className="sidebar-section trending-topics">
          <div className="sidebar-header">
            <div className="sidebar-line"></div>
            <h2>Trending</h2>
            <div className="sidebar-line"></div>
          </div>
          <div className="trending-list">
            {trendingTopics.map((post, idx) => (
              <div key={post._id} className="trending-item">
                <span className="trend-number">{idx + 1}</span>
                <div className="trend-content">
                  <h4>
                    <Link to={`/article/${post.slug}`}>{post.title}</Link>
                  </h4>
                  <span className="trend-category">{post.section}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </aside>
    </div>
  );
}
