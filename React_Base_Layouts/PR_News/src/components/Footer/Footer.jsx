import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  const footerData = [
    {
      title: "BITCOIN & ALTCOINS",
      articles: [
        {
          img: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=120&h=80&fit=crop",
          title: "Crypto markets jump on Trump 401k alternative plans",
          date: "August 12, 2025",
        },
        {
          img: "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=120&h=80&fit=crop",
          title: "Trump moves to expand 401k access to digital assets",
          date: "August 8, 2025",
        },
        {
          img: "https://images.unsplash.com/photo-1605792657660-596af9009e82?w=120&h=80&fit=crop",
          title: "Bitcoin remains rangebound as regulatory clarity emerges",
          date: "July 24, 2025",
        },
      ],
    },
    {
      title: "ETHEREUM & NFTS",
      articles: [
        {
          img: "https://images.unsplash.com/photo-1640833906651-6bd1af7aeea3?w=120&h=80&fit=crop",
          title: "Hong Kong ETF market makes waves with debut offerings",
          date: "April 30, 2024",
        },
        {
          img: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=120&h=80&fit=crop",
          title:
            "Manchester City and OKX launch digital collectibles partnership",
          date: "April 23, 2024",
        },
        {
          img: "https://images.unsplash.com/photo-1622630998477-20aa696ecb05?w=120&h=80&fit=crop",
          title:
            "Ethereum surges past $3,600 mark amidst strong institutional demand",
          date: "April 8, 2024",
        },
      ],
    },
    {
      title: "BLOCKCHAIN & DEFI",
      articles: [
        {
          img: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=120&h=80&fit=crop",
          title:
            "Bybit confirms $1.4 billion hack targeting Ethereum cold storage",
          date: "February 21, 2025",
        },
        {
          img: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=120&h=80&fit=crop",
          title:
            "Google Cloud's web3 portal launch sparks debate in crypto community",
          date: "April 28, 2024",
        },
        {
          img: "https://images.unsplash.com/photo-1639152201720-5e536d254d81?w=120&h=80&fit=crop",
          title: "Crypto trader Avi Eisenberg found guilty of $110m fraud",
          date: "April 18, 2024",
        },
      ],
    },
  ];

  return (
    <footer className="main-footer bg-gray-100 px-6 py-8">
      {/* Footer News Grid */}
      <div className="footer-news-grid grid lg:grid-cols-3 gap-8">
        {footerData.map((column, idx) => (
          <div key={idx} className="footer-column">
            <h2 className="footer-column-title font-bold text-lg mb-4">
              {column.title}
            </h2>

            {column.articles.map((article, i) => (
              <article key={i} className="footer-article flex gap-3 mb-4">
                <img
                  src={article.img}
                  alt={article.title}
                  className="w-28 h-20 object-cover rounded"
                />
                <div className="footer-article-content">
                  <h3 className="font-semibold text-sm">{article.title}</h3>
                  <span className="footer-date text-xs text-gray-500">
                    {article.date}
                  </span>
                </div>
              </article>
            ))}
          </div>
        ))}
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom flex flex-col lg:flex-row justify-between items-center mt-8 pt-4 border-t border-gray-300">
        <div className="footer-links flex gap-4 mb-2 lg:mb-0">
          <Link to="#home">Home</Link>
          <Link to="#contact">Contact Us</Link>
        </div>
        <p className="copyright text-sm text-gray-600">
          © 2025 | All Rights Reserved
        </p>
      </div>
    </footer>
  );
}
