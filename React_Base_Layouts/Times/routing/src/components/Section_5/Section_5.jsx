import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../../api/client";
import { extractAllLinkText } from "../../utils/extractLinks";
import { Link } from "react-router-dom";

// function Section_5() {
//   return (
//     <>
//       <section className="max-w-7xl mx-auto px-4 py-16">
//         <h2 className="text-3xl font-bold text-gray-800 mb-10">
//           Editor's Picks
//         </h2>

//         <div className="grid md:grid-cols-3 gap-8">
//           <div className="space-y-4">
//             <img
//               src="https://picsum.photos/500/300?random=21"
//               className="w-full rounded-xl"
//               alt=""
//             />
//             <h3 className="text-xl font-semibold">Headline One</h3>
//             <p className="text-gray-600 text-sm">
//               Brief description goes here for this article.
//             </p>
//           </div>

//           <div className="space-y-4">
//             <img
//               src="https://picsum.photos/500/350?random=22"
//               className="w-full rounded-xl"
//               alt=""
//             />
//             <h3 className="text-xl font-semibold">Headline Two</h3>
//             <p className="text-gray-600 text-sm">
//               Brief description goes here for this article.
//             </p>
//           </div>

//           <div className="space-y-4">
//             <img
//               src="https://picsum.photos/500/400?random=23"
//               className="w-full rounded-xl"
//               alt=""
//             />
//             <h3 className="text-xl font-semibold">Headline Three</h3>
//             <p className="text-gray-600 text-sm">
//               Brief description goes here for this article.
//             </p>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// }

// export default Section_5;

// export default function Section_5() {
//   const { data, isLoading, error } = useQuery({
//     queryKey: ["posts-section5"],
//     queryFn: () => getPosts(5),
//   });

//   if (isLoading) return <p>Loading...</p>;
//   if (error) return <p>Error loading posts</p>;

//   const articles = data?.articles || [];
//   const editorPicks = articles.slice(34, 40);

//   return (
//     <section className="max-w-7xl mx-auto px-4 py-16">
//       <h2 className="text-3xl font-bold text-gray-800 mb-10">Editor's Picks</h2>

//       <div className="grid md:grid-cols-3 gap-8">
//         {editorPicks.map((post, index) => (
//           <div key={post._id || index} className="space-y-4">
//             <img
//               src={
//                 post.featuredImage ||
//                 `https://picsum.photos/500/300?random=${index + 21}`
//               }
//               className="w-full rounded-xl"
//               alt={post.title}
//             />
//             <h3 className="text-xl font-semibold">{post.title}</h3>
//             <p className="text-gray-600 text-sm">
//               {post.excerpt || "No description available"}
//             </p>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }

export default function Section_5() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["posts-section5"],
    queryFn: () => getPosts(5),
  });

  if (isLoading) return <p className="p-6">Loading...</p>;
  if (error) return <p className="p-6 text-red-500">Error loading posts</p>;

  const articles = data?.articles || [];
  const editorPicks = articles.slice(34, 40);

  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold text-gray-800 mb-10">Editor's Picks</h2>

      <div className="grid md:grid-cols-3 gap-8">
        {editorPicks.map((post, index) => (
          <Link
            key={post._id || index}
            to={`/article/${post.slug}`}
            className="space-y-4 block hover:shadow-lg transition-shadow duration-200 rounded-xl overflow-hidden">
            <img
              src={
                post.featuredImage ||
                `https://picsum.photos/500/300?random=${index + 21}`
              }
              className="w-full h-48 object-cover rounded-xl"
              alt={post.title}
            />
            <h3 className="text-xl font-semibold">{post.title}</h3>
            <p className="text-gray-600 text-sm">
              {post.excerpt || "No description available"}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
