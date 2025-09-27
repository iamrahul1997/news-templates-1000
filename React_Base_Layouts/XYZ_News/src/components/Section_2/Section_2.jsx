// import React from "react";

// function Section_2() {
//   return (
//     <>
//       {/* Recommended For You Section */}
//       <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
//         <h2 className="font-bold text-2xl mb-8 uppercase tracking-wide">
//           Recommended For You
//         </h2>

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
//           <article className="flex flex-col h-full">
//             <img
//               src="https://picsum.photos/seed/reco1/400/280"
//               alt="rec1"
//               className="w-full h-56 sm:h-64 object-cover rounded mb-4"
//             />
//             <p className="text-sm text-gray-500 mb-1">
//               Business <span className="ml-1">June 7, 2022</span>
//             </p>
//             <h3 className="font-semibold text-lg leading-snug flex-1">
//               Stock Markets Rally Amid Economic Recovery Signs
//             </h3>
//           </article>

//           <article className="flex flex-col h-full">
//             <img
//               src="https://picsum.photos/seed/reco2/400/280"
//               alt="rec2"
//               className="w-full h-56 sm:h-64 object-cover rounded mb-4"
//             />
//             <p className="text-sm text-gray-500 mb-1">
//               Technology <span className="ml-1">June 7, 2022</span>
//             </p>
//             <h3 className="font-semibold text-lg leading-snug flex-1">
//               AI Tools Are Reshaping Creative Industries Worldwide
//             </h3>
//           </article>

//           <article className="flex flex-col h-full">
//             <img
//               src="https://picsum.photos/seed/reco3/400/280"
//               alt="rec3"
//               className="w-full h-56 sm:h-64 object-cover rounded mb-4"
//             />
//             <p className="text-sm text-gray-500 mb-1">
//               Travel <span className="ml-1">June 7, 2022</span>
//             </p>
//             <h3 className="font-semibold text-lg leading-snug flex-1">
//               Hidden European Gems To Visit This Autumn
//             </h3>
//           </article>

//           <article className="flex flex-col h-full">
//             <img
//               src="https://picsum.photos/seed/reco4/400/280"
//               alt="rec4"
//               className="w-full h-56 sm:h-64 object-cover rounded mb-4"
//             />
//             <p className="text-sm text-gray-500 mb-1">
//               Health <span className="ml-1">June 7, 2022</span>
//             </p>
//             <h3 className="font-semibold text-lg leading-snug flex-1">
//               Simple Habits For Improving Your Sleep Quality
//             </h3>
//           </article>
//         </div>
//       </section>
//     </>
//   );
// }

// export default Section_2;

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { getPosts } from "../../../api/client";

export default function Section_2() {
  const [page, setPage] = useState(1);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["recommended-posts", page],
    queryFn: () => getPosts(page),
    keepPreviousData: true,
  });

  if (isLoading) return <p className="p-6">Loading...</p>;
  if (isError)
    return <p className="p-6 text-red-500">Error: {error.message}</p>;

  const postsArray = Object.values(data?.articles || []);
  const recommendedPosts = postsArray.slice(10, 14); // Pick first 4 posts

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      <h2 className="font-bold text-2xl mb-8 uppercase tracking-wide">
        Recommended For You
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {recommendedPosts.map((post) => (
          <article key={post._id} className="flex flex-col h-full">
            <Link to={`/article/${post.slug}`}>
              <img
                src={post.featuredImage}
                alt={post.name}
                className="w-full h-56 sm:h-64 object-cover rounded mb-4"
              />
              <p className="text-sm text-gray-500 mb-1">
                {post.section} <span className="ml-1">{post.publishedAt}</span>
              </p>
              <h3 className="font-semibold text-lg leading-snug flex-1">
                {post.title}
              </h3>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
