// import React from "react";
// import { Link } from "react-router-dom";
// import { useQuery } from "@tanstack/react-query";
// import { getPosts } from "../../../api/client";

// export default function Header() {
//   // Fetch posts for mega menu (Bitcoin)
//   const { data, isLoading, isError, error } = useQuery({
//     queryKey: ["posts-megamenu", 1],
//     queryFn: () => getPosts(1),
//     keepPreviousData: true,
//   });

//   const bitcoinPosts = data?.articles?.slice(0, 4) || [];
//   const formatDate = (dateStr) => dateStr?.split("T")[0] || "Unknown date";

//   return (
//     <header>
//       <style>{`
//         .main-nav .has-megamenu { position: relative; }
//         .main-nav .megamenu {
//           position: absolute;
//           top: 100%;
//           left: 0;
//           right: 0; /* full width */
//           background: #fff;
//           border-radius: 8px;
//           box-shadow: 0 10px 40px rgba(0,0,0,0.15);
//           opacity: 0;
//           visibility: hidden;
//           transition: all 0.3s ease;
//           z-index: 1000;
//           margin-top: 10px;
//         }
//         .main-nav .has-megamenu:hover .megamenu {
//           opacity: 1;
//           visibility: visible;
//           transform: translateY(0);
//         }
//         .main-nav .megamenu-content { max-width: 1200px; margin: 0 auto; padding: 1.5rem; }
//         .main-nav .megamenu-section h3 {
//           font-size:1.1rem; font-weight:600; color:#1e293b;
//           margin-bottom:1rem; padding-bottom:0.5rem; border-bottom:2px solid #2563eb;
//         }
//         .main-nav .megamenu-articles {
//           list-style:none; padding:0; margin:0;
//           display:grid; grid-template-columns:repeat(4,1fr); gap:1rem;
//         }
//         .main-nav .megamenu-article {
//           display:flex; flex-direction:column; gap:0.5rem;
//           padding:0.75rem; border:1px solid #f1f5f9; border-radius:6px;
//           transition:all 0.2s ease; background:#f8fafc; text-decoration:none;
//         }
//         .main-nav .megamenu-article:hover {
//           transform: translateY(-2px);
//           box-shadow:0 4px 12px rgba(37,99,235,0.1);
//           border-color:#2563eb;
//         }
//         .main-nav .megamenu-article img { width:100%; height:120px; object-fit:cover; border-radius:4px; }
//         .main-nav .megamenu-article h4 {
//           font-size:0.8rem; font-weight:600; color:#1e293b; line-height:1.3;
//           margin-bottom:0.1rem; display:-webkit-box; -webkit-line-clamp:3;
//           -webkit-box-orient:vertical; overflow:hidden; min-height:3.6rem;
//         }
//         .main-nav .megamenu-article .article-date {
//           font-size:0.75rem; color:#64748b; font-weight:500;
//         }
//       `}</style>

//       {/* Top Bar */}
//       <div className="top-bar">
//         <div className="date-info">Wednesday, August 13</div>
//         <div className="logo">
//           <span className="logo-icon">₿</span>
//           <span className="logo-text">Crypto News</span>
//         </div>
//         <div className="header-links">
//           <Link to="/">Home</Link>
//           <Link to="/contact">Contact Us</Link>
//         </div>
//       </div>

//       {/* Main Navigation */}
//       <nav className="main-nav">
//         <ul className="nav-menu">
//           <li>
//             <Link to="/ai">AI ▼</Link>
//           </li>

//           {/* Bitcoin Mega Menu */}
//           <li className="has-megamenu">
//             <Link to="/bitcoin">Bitcoin & Altcoins ▼</Link>
//             <div className="megamenu">
//               <div className="megamenu-content">
//                 <div className="megamenu-section">
//                   <h3>Latest Bitcoin News</h3>
//                   <ul className="megamenu-articles">
//                     {isLoading && <li>Loading...</li>}
//                     {isError && <li>Error: {error.message}</li>}
//                     {bitcoinPosts.map((post) => (
//                       <li key={post._id}>
//                         <Link
//                           to={`/article/${post.slug}`}
//                           className="megamenu-article">
//                           <img
//                             src={
//                               post.featuredImage ||
//                               "https://via.placeholder.com/300x200"
//                             }
//                             alt={post.title || "Bitcoin article"}
//                           />
//                           <div className="article-info">
//                             <h4>{post.title}</h4>
//                             <span className="article-date">
//                               {formatDate(post.createdAt)}
//                             </span>
//                           </div>
//                         </Link>
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               </div>
//             </div>
//           </li>

//           {/* Other nav items without mega menu (you can add later if posts exist) */}
//           <li>
//             <Link to="/blockchain">Blockchain & DeFi ▼</Link>
//           </li>
//           <li>
//             <Link to="/business">Business ▼</Link>
//           </li>
//           <li>
//             <Link to="/ethereum">Ethereum & NFTs ▼</Link>
//           </li>
//           <li>
//             <Link to="/fintech">FinTech ▼</Link>
//           </li>
//           <li>
//             <Link to="/gaming">Gaming ▼</Link>
//           </li>
//           <li>
//             <Link to="/partner">Partner Content ▼</Link>
//           </li>
//           <li>
//             <Link to="/policy">Policy ▼</Link>
//           </li>
//         </ul>
//         <button className="mobile-menu-btn">☰</button>
//       </nav>
//     </header>
//   );
// }

// import React from "react";
// import { Link } from "react-router-dom";
// import { useQuery } from "@tanstack/react-query";
// import { getPosts } from "../../../api/client";

// export default function Header() {
//   // Fetch posts for mega menu (Bitcoin)
//   const { data, isLoading, isError, error } = useQuery({
//     queryKey: ["posts-megamenu", 1],
//     queryFn: () => getPosts(1),
//     keepPreviousData: true,
//   });

//   const posts = data?.articles?.slice(0, 4) || [];
//   const formatDate = (dateStr) => dateStr?.split("T")[0] || "Unknown date";

//   return (
//     <header>
//       <style>{`
//         .main-nav .has-megamenu { position: relative; }
//         .main-nav .megamenu {
//           position: absolute;
//           top: 100%;
//           left: 0;
//           right: 0;
//           background: #fff;
//           border-radius: 8px;
//           box-shadow: 0 10px 40px rgba(0,0,0,0.15);
//           opacity: 0;
//           visibility: hidden;
//           transition: all 0.3s ease;
//           z-index: 1000;
//           margin-top: 10px;
//         }
//         .main-nav .has-megamenu:hover .megamenu {
//           opacity: 1;
//           visibility: visible;
//           transform: translateY(0);
//         }
//         .main-nav .megamenu-content { max-width: 1200px; margin: 0 auto; padding: 1.5rem; }
//         .main-nav .megamenu-section h3 {
//           font-size:1.1rem; font-weight:600; color:#1e293b;
//           margin-bottom:1rem; padding-bottom:0.5rem; border-bottom:2px solid #2563eb;
//         }
//         .main-nav .megamenu-articles {
//           list-style:none; padding:0; margin:0;
//           display:grid; grid-template-columns:repeat(4,1fr); gap:1rem;
//         }
//         .main-nav .megamenu-article {
//           display:flex; flex-direction:column; gap:0.5rem;
//           padding:0.75rem; border:1px solid #f1f5f9; border-radius:6px;
//           transition:all 0.2s ease; background:#f8fafc; text-decoration:none;
//         }
//         .main-nav .megamenu-article:hover {
//           transform: translateY(-2px);
//           box-shadow:0 4px 12px rgba(37,99,235,0.1);
//           border-color:#2563eb;
//         }
//         .main-nav .megamenu-article img { width:100%; height:120px; object-fit:cover; border-radius:4px; }
//         .main-nav .megamenu-article h4 {
//           font-size:0.8rem; font-weight:600; color:#1e293b; line-height:1.3;
//           margin-bottom:0.1rem; display:-webkit-box; -webkit-line-clamp:3;
//           -webkit-box-orient:vertical; overflow:hidden; min-height:3.6rem;
//         }
//         .main-nav .megamenu-article .article-date {
//           font-size:0.75rem; color:#64748b; font-weight:500;
//         }
//       `}</style>

//       {/* Top Bar */}
//       <div className="top-bar">
//         <div className="date-info">Wednesday, August 13</div>
//         <div className="logo">
//           <span className="logo-icon">₿</span>
//           <span className="logo-text">Crypto News</span>
//         </div>
//         <div className="header-links">
//           <Link to="/">Home</Link>
//           <Link to="/contact">Contact Us</Link>
//         </div>
//       </div>

//       {/* Main Navigation */}
//       <nav className="main-nav">
//         <ul className="nav-menu">
//           {[
//             { path: "/ai", label: "AI" },
//             { path: "/bitcoin", label: "Bitcoin & Altcoins" },
//             { path: "/blockchain", label: "Blockchain & DeFi" },
//             { path: "/business", label: "Business" },
//             { path: "/ethereum", label: "Ethereum & NFTs" },
//             { path: "/fintech", label: "FinTech" },
//             { path: "/gaming", label: "Gaming" },
//             { path: "/partner", label: "Partner Content" },
//             { path: "/policy", label: "Policy" },
//           ].map((item) => (
//             <li key={item.path} className="has-megamenu">
//               <Link to={item.path}>{item.label} ▼</Link>
//               <div className="megamenu">
//                 <div className="megamenu-content">
//                   <div className="megamenu-section">
//                     <h3>Latest {item.label} News</h3>
//                     <ul className="megamenu-articles">
//                       {isLoading && <li>Loading...</li>}
//                       {isError && <li>Error: {error.message}</li>}
//                       {posts.map((post) => (
//                         <li key={post._id}>
//                           <Link
//                             to={`/article/${post.slug}`}
//                             className="megamenu-article">
//                             <img
//                               src={
//                                 post.featuredImage ||
//                                 "https://via.placeholder.com/300x200"
//                               }
//                               alt={post.title || item.label}
//                             />
//                             <div className="article-info">
//                               <h4>{post.title}</h4>
//                               <span className="article-date">
//                                 {formatDate(post.createdAt)}
//                               </span>
//                             </div>
//                           </Link>
//                         </li>
//                       ))}
//                     </ul>
//                   </div>
//                 </div>
//               </div>
//             </li>
//           ))}
//         </ul>
//         <button className="mobile-menu-btn">☰</button>
//       </nav>
//     </header>
//   );
// }

import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../../../api/client";

export default function Header() {
  // Fetch posts for mega menu (Bitcoin as example)
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["posts-megamenu", 1],
    queryFn: () => getPosts(1),
    keepPreviousData: true,
  });

  const posts = data?.articles?.slice(0, 4) || [];
  const formatDate = (dateStr) => dateStr?.split("T")[0] || "Unknown date";

  return (
    <header>
      <style>{`
        .main-nav { position: relative; }

        .main-nav .has-megamenu {
          position: relative;
        }

      .main-nav .megamenu {
          position: absolute;
          top: 100%;
           left: 0;
         right: 0;
          background: #fff;
           border-radius: 8px;
          box-shadow: 0 10px 40px rgba(0,0,0,0.15);
         opacity: 0;
         visibility: hidden;
          transition: all 0.3s ease;
           z-index: 1000;
           margin-top: 10px;
         }


        .main-nav .has-megamenu:hover .megamenu {
          opacity: 1;
          visibility: visible;
          transform: translateY(0);
        }

        .main-nav .megamenu-content {
          max-width: 1200px;
          margin: 0 auto;
          padding: 1.5rem;
        }

        .main-nav .megamenu-section h3 {
          font-size:1.1rem; font-weight:600; color:#1e293b;
          margin-bottom:1rem; padding-bottom:0.5rem; border-bottom:2px solid #2563eb;
        }

        .main-nav .megamenu-articles {
          list-style:none; padding:0; margin:0;
          display:grid; grid-template-columns:repeat(4,1fr); gap:1rem;
        }

        .main-nav .megamenu-article {
          display:flex; flex-direction:column; gap:0.5rem;
          padding:0.75rem; border:1px solid #f1f5f9; border-radius:6px;
          transition:all 0.2s ease; background:#f8fafc; text-decoration:none;
        }

        .main-nav .megamenu-article:hover {
          transform: translateY(-2px);
          box-shadow:0 4px 12px rgba(37,99,235,0.1);
          border-color:#2563eb;
        }

        .main-nav .megamenu-article img {
          width:100%; height:120px; object-fit:cover; border-radius:4px;
        }

        .main-nav .megamenu-article h4 {
          font-size:0.8rem; font-weight:600; color:#1e293b; line-height:1.3;
          margin-bottom:0.1rem; display:-webkit-box; -webkit-line-clamp:3;
          -webkit-box-orient:vertical; overflow:hidden; min-height:3.6rem;
        }

        .main-nav .megamenu-article .article-date {
          font-size:0.75rem; color:#64748b; font-weight:500;
        }
      `}</style>

      {/* Top Bar */}
      <div className="top-bar">
        <div className="date-info">Wednesday, August 13</div>
        <div className="logo">
          <span className="logo-icon">₿</span>
          <span className="logo-text">PR News</span>
        </div>
        <div className="header-links">
          <Link to="/">Home</Link>
          <Link to="/contact">Contact Us</Link>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="main-nav">
        <ul className="nav-menu">
          {/* Example: AI Mega Menu */}
          <li className="has-megamenu">
            <Link to="/ai">AI ▼</Link>
            <div className="megamenu">
              <div className="megamenu-content">
                <div className="megamenu-section">
                  <h3>Latest AI News</h3>
                  <ul className="megamenu-articles">
                    {isLoading && <li>Loading...</li>}
                    {isError && <li>Error: {error.message}</li>}
                    {posts.map((post) => (
                      <li key={post._id}>
                        <Link
                          to={`/article/${post.slug}`}
                          className="megamenu-article">
                          <img
                            src={
                              post.featuredImage ||
                              "https://via.placeholder.com/300x200"
                            }
                            alt={post.title || "AI article"}
                          />
                          <div className="article-info">
                            <h4>{post.title}</h4>
                            <span className="article-date">
                              {formatDate(post.createdAt)}
                            </span>
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </li>

          {/* Bitcoin Mega Menu */}
          <li className="has-megamenu">
            <Link to="/bitcoin">Bitcoin & Altcoins ▼</Link>
            <div className="megamenu">
              <div className="megamenu-content">
                <div className="megamenu-section">
                  <h3>Latest Bitcoin News</h3>
                  <ul className="megamenu-articles">
                    {isLoading && <li>Loading...</li>}
                    {isError && <li>Error: {error.message}</li>}
                    {posts.map((post) => (
                      <li key={post._id}>
                        <Link
                          to={`/article/${post.slug}`}
                          className="megamenu-article">
                          <img
                            src={
                              post.featuredImage ||
                              "https://via.placeholder.com/300x200"
                            }
                            alt={post.title || "Bitcoin article"}
                          />
                          <div className="article-info">
                            <h4>{post.title}</h4>
                            <span className="article-date">
                              {formatDate(post.createdAt)}
                            </span>
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </li>

          {/* Repeat for other nav items */}
          <li className="has-megamenu">
            <Link to="/blockchain">Blockchain & DeFi ▼</Link>
            <div className="megamenu">
              <div className="megamenu-content">
                <div className="megamenu-section">
                  <h3>Latest Blockchain News</h3>
                  <ul className="megamenu-articles">
                    {isLoading && <li>Loading...</li>}
                    {isError && <li>Error: {error.message}</li>}
                    {posts.map((post) => (
                      <li key={post._id}>
                        <Link
                          to={`/article/${post.slug}`}
                          className="megamenu-article">
                          <img
                            src={
                              post.featuredImage ||
                              "https://via.placeholder.com/300x200"
                            }
                            alt={post.title || "Blockchain article"}
                          />
                          <div className="article-info">
                            <h4>{post.title}</h4>
                            <span className="article-date">
                              {formatDate(post.createdAt)}
                            </span>
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </li>

          {/* You can repeat the same "has-megamenu" structure for all other nav items */}
          <li className="has-megamenu">
            <Link to="/business">Business ▼</Link>
            <div className="megamenu">
              <div className="megamenu-content">
                <div className="megamenu-section">
                  <h3>Latest Business News</h3>
                  <ul className="megamenu-articles">
                    {isLoading && <li>Loading...</li>}
                    {isError && <li>Error: {error.message}</li>}
                    {posts.map((post) => (
                      <li key={post._id}>
                        <Link
                          to={`/article/${post.slug}`}
                          className="megamenu-article">
                          <img
                            src={
                              post.featuredImage ||
                              "https://via.placeholder.com/300x200"
                            }
                            alt={post.title || "Business article"}
                          />
                          <div className="article-info">
                            <h4>{post.title}</h4>
                            <span className="article-date">
                              {formatDate(post.createdAt)}
                            </span>
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </li>

          {/* Remaining nav items */}
          <li className="has-megamenu">
            <Link to="/ethereum">Ethereum & NFTs ▼</Link>
            <div className="megamenu">
              <div className="megamenu-content">
                <div className="megamenu-section">
                  <h3>Latest Ethereum News</h3>
                  <ul className="megamenu-articles">
                    {isLoading && <li>Loading...</li>}
                    {isError && <li>Error: {error.message}</li>}
                    {posts.map((post) => (
                      <li key={post._id}>
                        <Link
                          to={`/article/${post.slug}`}
                          className="megamenu-article">
                          <img
                            src={
                              post.featuredImage ||
                              "https://via.placeholder.com/300x200"
                            }
                            alt={post.title || "Ethereum article"}
                          />
                          <div className="article-info">
                            <h4>{post.title}</h4>
                            <span className="article-date">
                              {formatDate(post.createdAt)}
                            </span>
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </li>

          <li className="has-megamenu">
            <Link to="/fintech">FinTech ▼</Link>
            <div className="megamenu">
              <div className="megamenu-content">
                <div className="megamenu-section">
                  <h3>Latest FinTech News</h3>
                  <ul className="megamenu-articles">
                    {isLoading && <li>Loading...</li>}
                    {isError && <li>Error: {error.message}</li>}
                    {posts.map((post) => (
                      <li key={post._id}>
                        <Link
                          to={`/article/${post.slug}`}
                          className="megamenu-article">
                          <img
                            src={
                              post.featuredImage ||
                              "https://via.placeholder.com/300x200"
                            }
                            alt={post.title || "FinTech article"}
                          />
                          <div className="article-info">
                            <h4>{post.title}</h4>
                            <span className="article-date">
                              {formatDate(post.createdAt)}
                            </span>
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </li>

          <li className="has-megamenu">
            <Link to="/gaming">Gaming ▼</Link>
            <div className="megamenu">
              <div className="megamenu-content">
                <div className="megamenu-section">
                  <h3>Latest Gaming News</h3>
                  <ul className="megamenu-articles">
                    {isLoading && <li>Loading...</li>}
                    {isError && <li>Error: {error.message}</li>}
                    {posts.map((post) => (
                      <li key={post._id}>
                        <Link
                          to={`/article/${post.slug}`}
                          className="megamenu-article">
                          <img
                            src={
                              post.featuredImage ||
                              "https://via.placeholder.com/300x200"
                            }
                            alt={post.title || "Gaming article"}
                          />
                          <div className="article-info">
                            <h4>{post.title}</h4>
                            <span className="article-date">
                              {formatDate(post.createdAt)}
                            </span>
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </li>

          <li className="has-megamenu">
            <Link to="/partner">Partner Content ▼</Link>
            <div className="megamenu">
              <div className="megamenu-content">
                <div className="megamenu-section">
                  <h3>Latest Partner News</h3>
                  <ul className="megamenu-articles">
                    {isLoading && <li>Loading...</li>}
                    {isError && <li>Error: {error.message}</li>}
                    {posts.map((post) => (
                      <li key={post._id}>
                        <Link
                          to={`/article/${post.slug}`}
                          className="megamenu-article">
                          <img
                            src={
                              post.featuredImage ||
                              "https://via.placeholder.com/300x200"
                            }
                            alt={post.title || "Partner article"}
                          />
                          <div className="article-info">
                            <h4>{post.title}</h4>
                            <span className="article-date">
                              {formatDate(post.createdAt)}
                            </span>
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </li>

          <li className="has-megamenu">
            <Link to="/policy">Policy ▼</Link>
            <div className="megamenu">
              <div className="megamenu-content">
                <div className="megamenu-section">
                  <h3>Latest Policy News</h3>
                  <ul className="megamenu-articles">
                    {isLoading && <li>Loading...</li>}
                    {isError && <li>Error: {error.message}</li>}
                    {posts.map((post) => (
                      <li key={post._id}>
                        <Link
                          to={`/article/${post.slug}`}
                          className="megamenu-article">
                          <img
                            src={
                              post.featuredImage ||
                              "https://via.placeholder.com/300x200"
                            }
                            alt={post.title || "Policy article"}
                          />
                          <div className="article-info">
                            <h4>{post.title}</h4>
                            <span className="article-date">
                              {formatDate(post.createdAt)}
                            </span>
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </li>
        </ul>
        <button className="mobile-menu-btn">☰</button>
      </nav>
    </header>
  );
}
