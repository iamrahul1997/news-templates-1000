import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../../api/client";
import { extractAllLinkText } from "../../utils/extractLinks";
import { Link } from "react-router-dom";

// function Section_7() {
//   return (
//     <>
//       <section className="max-w-7xl mx-auto px-4 py-16">
//         <div className="flex justify-between items-center mb-10">
//           <h2 className="text-3xl font-bold text-gray-800">
//             Latest Discoveries
//           </h2>
//         </div>

//         <div className="flex flex-wrap gap-6 pb-4">
//           <div className="bg-white shadow-md rounded-xl flex-1 min-w-[280px]">
//             <img
//               src="https://picsum.photos/300/200?random=41"
//               className="w-full h-40 object-cover rounded-t-xl"
//               alt="An abstract image representing a new discovery"
//             />
//             <div className="p-4">
//               <h3 className="font-semibold text-lg">New Insight</h3>
//               <p className="text-gray-500 text-sm">Short description here</p>
//             </div>
//           </div>

//           <div className="bg-white shadow-md rounded-xl flex-1 min-w-[280px]">
//             <img
//               src="https://picsum.photos/300/200?random=42"
//               className="w-full h-40 object-cover rounded-t-xl"
//               alt="An abstract image representing a fresh perspective"
//             />
//             <div className="p-4">
//               <h3 className="font-semibold text-lg">Fresh Perspective</h3>
//               <p className="text-gray-500 text-sm">Short description here</p>
//             </div>
//           </div>

//           <div className="bg-white shadow-md rounded-xl flex-1 min-w-[280px]">
//             <img
//               src="https://picsum.photos/300/200?random=43"
//               className="w-full h-40 object-cover rounded-t-xl"
//               alt="An abstract image representing a breaking idea"
//             />
//             <div className="p-4">
//               <h3 className="font-semibold text-lg">Breaking Idea</h3>
//               <p className="text-gray-500 text-sm">Short description here</p>
//             </div>
//           </div>

//           <div className="bg-white shadow-md rounded-xl flex-1 min-w-[280px]">
//             <img
//               src="https://picsum.photos/300/200?random=44"
//               className="w-full h-40 object-cover rounded-t-xl"
//               alt="An abstract image representing an exclusive piece"
//             />
//             <div className="p-4">
//               <h3 className="font-semibold text-lg">Exclusive Piece</h3>
//               <p className="text-gray-500 text-sm">Short description here</p>
//             </div>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// }

// export default Section_7;

// export default function Section_7() {
//   const { data, isLoading, error } = useQuery({
//     queryKey: ["posts-section7"],
//     queryFn: () => getPosts(7),
//   });

//   if (isLoading) return <p>Loading...</p>;
//   if (error) return <p>Error loading posts</p>;

//   const articles = data?.articles || [];
//   const displayArticles = articles.slice(66, 75);

//   return (
//     <section className="max-w-7xl mx-auto px-4 py-16">
//       <div className="flex justify-between items-center mb-10">
//         <h2 className="text-3xl font-bold text-gray-800">Latest Discoveries</h2>
//       </div>

//       <div className="flex flex-wrap gap-6 pb-4">
//         {displayArticles.map((post, index) => (
//           <div
//             key={post._id || index}
//             className="bg-white shadow-md rounded-xl flex-1 min-w-[280px]">
//             <img
//               src={
//                 post.featuredImage ||
//                 `https://picsum.photos/300/200?random=${41 + index}`
//               }
//               className="w-full h-40 object-cover rounded-t-xl"
//               alt={post.title}
//             />
//             <div className="p-4">
//               <h3 className="font-semibold text-lg">{post.title}</h3>
//               <p className="text-gray-500 text-sm">
//                 {post.excerpt || "Short description here"}
//               </p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }

export default function Section_7() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["posts-section7"],
    queryFn: () => getPosts(7),
  });

  if (isLoading) return <p className="p-6">Loading...</p>;
  if (error) return <p className="p-6 text-red-500">Error loading posts</p>;

  const articles = data?.articles || [];
  const displayArticles = articles.slice(66, 75);

  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-3xl font-bold text-gray-800">Latest Discoveries</h2>
      </div>

      <div className="flex flex-wrap gap-6 pb-4">
        {displayArticles.map((post, index) => (
          <Link
            key={post._id || index}
            to={`/article/${post.slug}`}
            className="bg-white shadow-md rounded-xl flex-1 min-w-[280px] hover:shadow-lg transition">
            <img
              src={
                post.featuredImage ||
                `https://picsum.photos/300/200?random=${41 + index}`
              }
              className="w-full h-40 object-cover rounded-t-xl"
              alt={post.title}
            />
            <div className="p-4">
              <h3 className="font-semibold text-lg">{post.title}</h3>
              <p className="text-gray-500 text-sm">
                {post.excerpt || "Short description here"}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
