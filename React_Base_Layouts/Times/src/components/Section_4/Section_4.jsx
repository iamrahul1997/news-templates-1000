import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../../api/client";
import { extractAllLinkText } from "../../utils/extractLinks";
import { Link } from "react-router-dom";

// function Section_4() {
//   return (
//     <>
//       <section className="bg-transparent">
//         <h3 className="text-xl font-semibold mb-6 border-l-4 border-red-600 pl-3">
//           Travel
//         </h3>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
//           {/* big left feature */}
//           <article className="lg:col-span-2 bg-white rounded shadow-sm overflow-hidden flex flex-col">
//             <img
//               src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&q=80"
//               className="w-full h-72 object-cover"
//               alt=""
//             />
//             <div className="p-6 flex flex-col flex-grow">
//               <span className="inline-block text-xs font-bold uppercase bg-orange-500 text-white px-2 py-1 rounded">
//                 Travel
//               </span>
//               <h4 className="mt-4 text-2xl font-semibold">
//                 They’re back! Kennedy Darling, named to return to
//               </h4>
//               <p className="mt-3 text-gray-600 flex-grow">
//                 Black farmers in the US’s South— faced with continued failure
//                 their efforts to run successful farms...
//               </p>
//             </div>
//           </article>

//           {/* RIGHT: Small horizontal cards */}
//           <aside className="md:col-span-1 bg-white rounded shadow-sm p-6 flex flex-col">
//             <h4 className="text-lg font-semibold mb-4 border-b pb-3">Recent</h4>

//             <div className="space-y-4">
//               <article className="flex items-center gap-3">
//                 <img
//                   src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=300&q=80"
//                   className="w-20 h-20 object-cover rounded"
//                   alt=""
//                 />
//                 <p className="text-sm font-medium">
//                   They’re back! Kennedy Darling, named...
//                 </p>
//               </article>

//               <article className="flex items-center gap-3">
//                 <img
//                   src="https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=300&q=80"
//                   className="w-20 h-20 object-cover rounded"
//                   alt=""
//                 />
//                 <p className="text-sm font-medium">
//                   10 critical points from epic...
//                 </p>
//               </article>

//               <article className="flex items-center gap-3">
//                 <img
//                   src="https://images.unsplash.com/photo-1492724441997-5dc865305da7?auto=format&fit=crop&w=300&q=80"
//                   className="w-20 h-20 object-cover rounded"
//                   alt=""
//                 />
//                 <p className="text-sm font-medium">
//                   The most Mid-South Farm on...
//                 </p>
//               </article>

//               <article className="flex items-center gap-3">
//                 <img
//                   src="https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=300&q=80"
//                   className="w-20 h-20 object-cover rounded"
//                   alt=""
//                 />
//                 <p className="text-sm font-medium">
//                   Success humble is good not teacher...
//                 </p>
//               </article>
//             </div>
//           </aside>
//         </div>
//       </section>
//     </>
//   );
// }

// export default Section_4;

// export default function Section_4() {
//   const { data, isLoading, error } = useQuery({
//     queryKey: ["posts-section4"],
//     queryFn: () => getPosts(4),
//   });

//   if (isLoading) return <p>Loading...</p>;
//   if (error) return <p>Error loading posts</p>;

//   const articles = data?.articles || [];
//   const mainArticle = articles[28]; // Big left feature
//   const recentArticles = articles.slice(29, 33); // Right small cards

//   return (
//     <section className="bg-transparent">
//       <h3 className="text-xl font-semibold mb-6 border-l-4 border-red-600 pl-3">
//         Travel
//       </h3>

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
//         {/* Big left feature */}
//         {mainArticle && (
//           <article className="lg:col-span-2 bg-white rounded shadow-sm overflow-hidden flex flex-col">
//             <img
//               src={
//                 mainArticle.featuredImage ||
//                 "https://via.placeholder.com/1400x600"
//               }
//               className="w-full h-72 object-cover"
//               alt={mainArticle.title}
//             />
//             <div className="p-6 flex flex-col flex-grow">
//               <span className="inline-block text-xs font-bold uppercase bg-orange-500 text-white px-2 py-1 rounded">
//                 {mainArticle.category?.title || "Travel"}
//               </span>
//               <h4 className="mt-4 text-2xl font-semibold">
//                 {mainArticle.title}
//               </h4>
//               <p className="mt-3 text-gray-600 flex-grow">
//                 {mainArticle.excerpt || "No content available"}
//               </p>
//             </div>
//           </article>
//         )}

//         {/* Right small cards */}
//         <aside className="md:col-span-1 bg-white rounded shadow-sm p-6 flex flex-col">
//           <h4 className="text-lg font-semibold mb-4 border-b pb-3">Recent</h4>
//           <div className="space-y-4">
//             {recentArticles.map((post, index) => (
//               <article
//                 key={post._id || index}
//                 className="flex items-center gap-3">
//                 <img
//                   src={post.featuredImage || "https://via.placeholder.com/80"}
//                   className="w-20 h-20 object-cover rounded"
//                   alt={post.title}
//                 />
//                 <p className="text-sm font-medium">{post.title}</p>
//               </article>
//             ))}
//           </div>
//         </aside>
//       </div>
//     </section>
//   );
// }

export default function Section_4() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["posts-section4"],
    queryFn: () => getPosts(4),
  });

  if (isLoading) return <p className="p-6">Loading...</p>;
  if (error) return <p className="p-6 text-red-500">Error loading posts</p>;

  const articles = data?.articles || [];
  const mainArticle = articles[28]; // Big left feature
  const recentArticles = articles.slice(29, 33); // Right small cards

  return (
    <section className="bg-transparent">
      <h3 className="text-xl font-semibold mb-6 border-l-4 border-red-600 pl-3">
        Travel
      </h3>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
        {/* Big left feature */}
        {mainArticle && (
          <Link
            to={`/article/${mainArticle.slug}`}
            className="lg:col-span-2 bg-white rounded shadow-sm overflow-hidden flex flex-col hover:shadow-lg transition">
            <img
              src={
                mainArticle.featuredImage ||
                "https://via.placeholder.com/1400x600"
              }
              className="w-full h-72 object-cover"
              alt={mainArticle.title}
            />
            <div className="p-6 flex flex-col flex-grow">
              <span className="inline-block text-xs font-bold uppercase bg-orange-500 text-white px-2 py-1 rounded">
                {mainArticle.category?.title || "Travel"}
              </span>
              <h4 className="mt-4 text-2xl font-semibold">
                {mainArticle.title}
              </h4>
              <p className="mt-3 text-gray-600 flex-grow">
                {mainArticle.excerpt || "No content available"}
              </p>
            </div>
          </Link>
        )}

        {/* Right small cards */}
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
      </div>
    </section>
  );
}
