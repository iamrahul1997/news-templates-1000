import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../../api/client";
import { extractAllLinkText } from "../../utils/extractLinks";
import { useState } from "react";

import { Link } from "react-router-dom";

// function Section_3() {
//   return (
//     <>
//       <section className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch mb-10">
//         {/* LEFT: Big Hot Topic feature */}
//         <div className="md:col-span-1 bg-white rounded shadow-sm p-6 flex flex-col">
//           <h3 className="text-2xl font-bold mb-4 border-l-4 border-red-600 pl-3">
//             Hot Topics
//           </h3>

//           <div className="flex flex-col md:flex-row gap-6 items-stretch">
//             <div className="flex-1 flex flex-col bg-white">
//               <img
//                 src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80"
//                 alt="travel"
//                 className="w-full h-44 md:h-56 object-cover rounded"
//               />
//               <div className="mt-4">
//                 <span className="inline-block text-xs font-bold uppercase bg-orange-500 text-white px-2 py-1 rounded">
//                   Travel
//                 </span>
//                 <h4 className="mt-3 text-xl font-semibold">
//                   They’re back! Kennedy Darling, named to return to
//                 </h4>
//                 <p className="mt-2 text-sm text-gray-600">
//                   Black farmers in the US’s South— faced with continued failure
//                   their efforts to run successful
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* MIDDLE: 4 cards (2 x 2) */}
//         <div className="md:col-span-1 bg-white rounded shadow-sm p-4 flex flex-col">
//           <div className="grid grid-cols-2 gap-4 flex-grow items-stretch">
//             {/* Card 1 */}
//             <article className="bg-white rounded overflow-hidden shadow-sm flex flex-col">
//               <img
//                 src="https://images.unsplash.com/photo-1492724441997-5dc865305da7?auto=format&fit=crop&w=800&q=80"
//                 alt="card1"
//                 className="w-full h-28 object-cover"
//               />
//               <div className="p-3 flex flex-col flex-grow">
//                 <h5 className="text-sm font-semibold mt-auto">
//                   The most Mid-South Farm on Gin...
//                 </h5>
//               </div>
//             </article>

//             {/* Card 2 */}
//             <article className="bg-white rounded overflow-hidden shadow-sm flex flex-col">
//               <img
//                 src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80"
//                 alt="card2"
//                 className="w-full h-28 object-cover"
//               />
//               <div className="p-3 flex flex-col flex-grow">
//                 <h5 className="text-sm font-semibold mt-auto">
//                   Why You Shouldn’t Ride Elephants In...
//                 </h5>
//               </div>
//             </article>

//             {/* Card 3 */}
//             <article className="bg-white rounded overflow-hidden shadow-sm flex flex-col">
//               <img
//                 src="https://images.unsplash.com/photo-1521335629791-ce4aec67dd47?auto=format&fit=crop&w=800&q=80"
//                 alt="card3"
//                 className="w-full h-28 object-cover"
//               />
//               <div className="p-3 flex flex-col flex-grow">
//                 <h5 className="text-sm font-semibold mt-auto">
//                   How to Find the Cheapest Flight...
//                 </h5>
//               </div>
//             </article>

//             {/* Card 4 */}
//             <article className="bg-white rounded overflow-hidden shadow-sm flex flex-col">
//               <img
//                 src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80"
//                 alt="card4"
//                 className="w-full h-28 object-cover"
//               />
//               <div className="p-3 flex flex-col flex-grow">
//                 <h5 className="text-sm font-semibold mt-auto">
//                   The Top 10 Best Computer Speakers...
//                 </h5>
//               </div>
//             </article>
//           </div>
//         </div>

//         {/* RIGHT: Small horizontal cards */}
//         <aside className="md:col-span-1 bg-white rounded shadow-sm p-6 flex flex-col">
//           <h4 className="text-lg font-semibold mb-4 border-b pb-3">Recent</h4>

//           <div className="space-y-4">
//             <article className="flex items-center gap-3">
//               <img
//                 src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=300&q=80"
//                 className="w-20 h-20 object-cover rounded"
//                 alt=""
//               />
//               <p className="text-sm font-medium">
//                 They’re back! Kennedy Darling, named...
//               </p>
//             </article>

//             <article className="flex items-center gap-3">
//               <img
//                 src="https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=300&q=80"
//                 className="w-20 h-20 object-cover rounded"
//                 alt=""
//               />
//               <p className="text-sm font-medium">
//                 10 critical points from epic...
//               </p>
//             </article>

//             <article className="flex items-center gap-3">
//               <img
//                 src="https://images.unsplash.com/photo-1492724441997-5dc865305da7?auto=format&fit=crop&w=300&q=80"
//                 className="w-20 h-20 object-cover rounded"
//                 alt=""
//               />
//               <p className="text-sm font-medium">
//                 The most Mid-South Farm on...
//               </p>
//             </article>

//             <article className="flex items-center gap-3">
//               <img
//                 src="https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=300&q=80"
//                 className="w-20 h-20 object-cover rounded"
//                 alt=""
//               />
//               <p className="text-sm font-medium">
//                 Success humble is good not teacher...
//               </p>
//             </article>
//           </div>
//         </aside>
//       </section>
//     </>
//   );
// }

// export default Section_3;

// export default function Section_3() {
//   const [page, setPage] = useState(3);

//   const { data, isLoading, isError, error } = useQuery({
//     queryKey: ["posts", page],
//     queryFn: () => getPosts(page),
//     keepPreviousData: true,
//   });

//   if (isLoading) return <p>Loading...</p>;
//   if (error) return <p>Error loading posts</p>;

//   const articles = data?.articles || [];
//   const mainArticle = articles[17];
//   const middleArticles = articles.slice(18, 22);
//   const recentArticles = articles.slice(23, 27);

//   return (
//     <section className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch mb-10">
//       {/* LEFT: Big Hot Topic */}
//       <div className="md:col-span-1 bg-white rounded shadow-sm p-6 flex flex-col">
//         <h3 className="text-2xl font-bold mb-4 border-l-4 border-red-600 pl-3">
//           Hot Topics
//         </h3>

//         {mainArticle && (
//           <div className="flex flex-col md:flex-row gap-6 items-stretch">
//             <div className="flex-1 flex flex-col bg-white">
//               <img
//                 src={
//                   mainArticle.featuredImage ||
//                   "https://via.placeholder.com/600x400"
//                 }
//                 alt={mainArticle.title}
//                 className="w-full h-44 md:h-56 object-cover rounded"
//               />
//               <div className="mt-4">
//                 <span className="inline-block text-xs font-bold uppercase bg-orange-500 text-white px-2 py-1 rounded">
//                   {mainArticle.category?.title || "Category"}
//                 </span>
//                 <h4 className="mt-3 text-xl font-semibold">
//                   {mainArticle.title}
//                 </h4>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* MIDDLE: 4 cards */}
//       <div className="md:col-span-1 bg-white rounded shadow-sm p-4 flex flex-col">
//         <div className="grid grid-cols-2 gap-4 flex-grow items-stretch">
//           {middleArticles.map((post, index) => (
//             <article
//               key={post._id || index}
//               className="bg-white rounded overflow-hidden shadow-sm flex flex-col">
//               <img
//                 src={
//                   post.featuredImage || "https://via.placeholder.com/400x200"
//                 }
//                 alt={post.title}
//                 className="w-full h-28 object-cover"
//               />
//               <div className="p-3 flex flex-col flex-grow">
//                 <h5 className="text-sm font-semibold mt-auto">{post.title}</h5>
//               </div>
//             </article>
//           ))}
//         </div>
//       </div>

//       {/* RIGHT: Small horizontal cards */}
//       <aside className="md:col-span-1 bg-white rounded shadow-sm p-6 flex flex-col">
//         <h4 className="text-lg font-semibold mb-4 border-b pb-3">Recent</h4>

//         <div className="space-y-4">
//           {recentArticles.map((post, index) => (
//             <article
//               key={post._id || index}
//               className="flex items-center gap-3">
//               <img
//                 src={post.featuredImage || "https://via.placeholder.com/80"}
//                 className="w-20 h-20 object-cover rounded"
//                 alt={post.title}
//               />
//               <p className="text-sm font-medium">{post.title}</p>
//             </article>
//           ))}
//         </div>
//       </aside>
//     </section>
//   );
// }

export default function Section_3() {
  const [page, setPage] = useState(3);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["posts", page],
    queryFn: () => getPosts(page),
    keepPreviousData: true,
  });

  if (isLoading) return <p className="p-6">Loading...</p>;
  if (isError) return <p className="p-6 text-red-500">Error loading posts</p>;

  const articles = data?.articles || [];
  const mainArticle = articles[17];
  const middleArticles = articles.slice(18, 22);
  const recentArticles = articles.slice(23, 27);

  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch mb-10">
      {/* LEFT: Big Hot Topic */}
      <div className="md:col-span-1 bg-white rounded shadow-sm p-6 flex flex-col">
        <h3 className="text-2xl font-bold mb-4 border-l-4 border-red-600 pl-3">
          Hot Topics
        </h3>

        {mainArticle && (
          <Link
            to={`/article/${mainArticle.slug}`}
            className="flex flex-col md:flex-row gap-6 items-stretch hover:shadow-lg transition-shadow">
            <div className="flex-1 flex flex-col bg-white">
              <img
                src={
                  mainArticle.featuredImage ||
                  "https://via.placeholder.com/600x400"
                }
                alt={mainArticle.title}
                className="w-full h-44 md:h-56 object-cover rounded"
              />
              <div className="mt-4">
                <span className="inline-block text-xs font-bold uppercase bg-orange-500 text-white px-2 py-1 rounded">
                  {mainArticle.category?.title || "Category"}
                </span>
                <h4 className="mt-3 text-xl font-semibold">
                  {mainArticle.title}
                </h4>
              </div>
            </div>
          </Link>
        )}
      </div>

      {/* MIDDLE: 4 cards */}
      <div className="md:col-span-1 bg-white rounded shadow-sm p-4 flex flex-col">
        <div className="grid grid-cols-2 gap-4 flex-grow items-stretch">
          {middleArticles.map((post, index) => (
            <Link
              key={post._id || index}
              to={`/article/${post.slug}`}
              className="bg-white rounded overflow-hidden shadow-sm flex flex-col hover:shadow-lg transition">
              <img
                src={
                  post.featuredImage || "https://via.placeholder.com/400x200"
                }
                alt={post.title}
                className="w-full h-28 object-cover"
              />
              <div className="p-3 flex flex-col flex-grow">
                <h5 className="text-sm font-semibold mt-auto">{post.title}</h5>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* RIGHT: Small horizontal cards */}
      <aside className="md:col-span-1 bg-white rounded shadow-sm p-6 flex flex-col">
        <h4 className="text-lg font-semibold mb-4 border-b pb-3">Recent</h4>

        <div className="space-y-4">
          {recentArticles.map((post, index) => (
            <Link
              key={post._id || index}
              to={`/article/${post.slug}`}
              className="flex items-center gap-3 hover:bg-gray-100 p-2 rounded transition">
              <img
                src={post.featuredImage || "https://via.placeholder.com/80"}
                className="w-20 h-20 object-cover rounded"
                alt={post.title}
              />
              <p className="text-sm font-medium">{post.title}</p>
            </Link>
          ))}
        </div>
      </aside>
    </section>
  );
}
