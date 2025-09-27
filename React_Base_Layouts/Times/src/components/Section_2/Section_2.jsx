import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../../api/client";
import { extractAllLinkText } from "../../utils/extractLinks";
import { useState } from "react";

import { Link } from "react-router-dom";

// function Section_2() {
//   return (
//     <>
//       <section class="bg-transparent">
//         <h3 class="text-xl font-semibold mb-6 border-l-4 border-red-600 pl-3">
//           Travel
//         </h3>

//         <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
//           <article class="lg:col-span-2 bg-white rounded shadow-sm overflow-hidden flex flex-col">
//             <img
//               src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&amp;fit=crop&amp;w=1400&amp;q=80"
//               class="w-full h-72 object-cover"
//               alt=""
//             />
//             <div class="p-6 flex flex-col flex-grow">
//               <span class="inline-block text-xs font-bold uppercase bg-orange-500 text-white px-2 py-1 rounded">
//                 Travel
//               </span>
//               <h4 class="mt-4 text-2xl font-semibold">
//                 They’re back! Kennedy Darling, named to return to
//               </h4>
//               <p class="mt-3 text-gray-600 flex-grow">
//                 Black farmers in the US’s South— faced with continued failure
//                 their efforts to run successful farms...
//               </p>
//             </div>
//           </article>

//           <aside class="md:col-span-1 bg-white rounded shadow-sm p-6 flex flex-col">
//             <h4 class="text-lg font-semibold mb-4 border-b pb-3">Recent</h4>

//             <div class="space-y-4">
//               <article class="flex items-center gap-3">
//                 <img
//                   src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=300&q=80"
//                   class="w-20 h-20 object-cover rounded"
//                   alt=""
//                 />
//                 <p class="text-sm font-medium">
//                   They’re back! Kennedy Darling, named...
//                 </p>
//               </article>

//               <article class="flex items-center gap-3">
//                 <img
//                   src="https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=300&q=80"
//                   class="w-20 h-20 object-cover rounded"
//                   alt=""
//                 />
//                 <p class="text-sm font-medium">
//                   10 critical points from epic...
//                 </p>
//               </article>

//               <article class="flex items-center gap-3">
//                 <img
//                   src="https://images.unsplash.com/photo-1492724441997-5dc865305da7?auto=format&fit=crop&w=300&q=80"
//                   class="w-20 h-20 object-cover rounded"
//                   alt=""
//                 />
//                 <p class="text-sm font-medium">The most Mid-South Farm on...</p>
//               </article>

//               <article class="flex items-center gap-3">
//                 <img
//                   src="https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=300&q=80"
//                   class="w-20 h-20 object-cover rounded"
//                   alt=""
//                 />
//                 <p class="text-sm font-medium">
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

// export default Section_2;

// Function to extract all <a> tag texts

// export default function Section_2() {
//   const [page, setPage] = useState(2);

//   const { data, isLoading, isError, error } = useQuery({
//     queryKey: ["posts", page],
//     queryFn: () => getPosts(page),
//     keepPreviousData: true,
//   });

//   if (isLoading) return <p className="p-6">Loading...</p>;
//   if (isError)
//     return <p className="p-6 text-red-500">Error: {error.message}</p>;

//   const postsArray = Object.values(data?.articles || []);
//   const mainPost = postsArray[11];
//   const recentPosts = postsArray.slice(12, 16);

//   return (
//     <section className="bg-transparent">
//       <h3 className="text-xl font-semibold mb-6 border-l-4 border-red-600 pl-3">
//         Travel
//       </h3>

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
//         {mainPost && (
//           <article className="lg:col-span-2 bg-white rounded shadow-sm overflow-hidden flex flex-col">
//             <img
//               src={mainPost.featuredImage}
//               className="w-full h-72 object-cover"
//               alt={mainPost.name}
//             />
//             <div className="p-6 flex flex-col flex-grow">
//               <span className="inline-block text-xs font-bold uppercase bg-orange-500 text-white px-2 py-1 rounded">
//                 {mainPost.tags?.[0]?.name || "General"}
//               </span>
//               <h4 className="mt-4 text-2xl font-semibold">
//                 {mainPost.title || "No title"}
//               </h4>
//             </div>
//           </article>
//         )}

//         <aside className="md:col-span-1 bg-white rounded shadow-sm p-6 flex flex-col">
//           <h4 className="text-lg font-semibold mb-4 border-b pb-3">Recent</h4>

//           <div className="space-y-4">
//             {recentPosts.map((post) => (
//               <article key={post._id} className="flex items-center gap-3">
//                 <img
//                   src={post.featuredImage}
//                   className="w-20 h-20 object-cover rounded"
//                   alt={post.name}
//                 />
//                 <p className="text-sm font-medium">
//                   {post.title || "Untitled"}
//                 </p>
//               </article>
//             ))}
//           </div>
//         </aside>
//       </div>
//     </section>
//   );
// }

export default function Section_2() {
  const [page, setPage] = useState(2);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["posts", page],
    queryFn: () => getPosts(page),
    keepPreviousData: true,
  });

  if (isLoading) return <p className="p-6">Loading...</p>;
  if (isError)
    return <p className="p-6 text-red-500">Error: {error.message}</p>;

  const postsArray = Object.values(data?.articles || []);
  const mainPost = postsArray[11];
  const recentPosts = postsArray.slice(12, 16);

  return (
    <section className="bg-transparent">
      <h3 className="text-xl font-semibold mb-6 border-l-4 border-red-600 pl-3">
        Travel
      </h3>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
        {mainPost && (
          <Link
            to={`/article/${mainPost.slug}`} // Link to Article page
            className="lg:col-span-2 bg-white rounded shadow-sm overflow-hidden flex flex-col hover:shadow-lg transition-shadow">
            <img
              src={mainPost.featuredImage}
              className="w-full h-72 object-cover"
              alt={mainPost.title}
            />
            <div className="p-6 flex flex-col flex-grow">
              <span className="inline-block text-xs font-bold uppercase bg-orange-500 text-white px-2 py-1 rounded">
                {mainPost.tags?.[0]?.name || "General"}
              </span>
              <h4 className="mt-4 text-2xl font-semibold">
                {mainPost.title || "No title"}
              </h4>
            </div>
          </Link>
        )}

        <aside className="md:col-span-1 bg-white rounded shadow-sm p-6 flex flex-col">
          <h4 className="text-lg font-semibold mb-4 border-b pb-3">Recent</h4>

          <div className="space-y-4">
            {recentPosts.map((post) => (
              <Link
                key={post._id}
                to={`/article/${post.slug}`} // Link to Article page
                className="flex items-center gap-3 hover:bg-gray-100 p-2 rounded transition">
                <img
                  src={post.featuredImage}
                  className="w-20 h-20 object-cover rounded"
                  alt={post.title}
                />
                <p className="text-sm font-medium">
                  {post.title || "Untitled"}
                </p>
              </Link>
            ))}
          </div>
        </aside>
      </div>
    </section>
  );
}
