// import React from "react";
// import { useParams, Link } from "react-router-dom";
// import { useQuery } from "@tanstack/react-query";
// import { getPosts } from "../../api/client";

// export default function Article() {
//   const { slug } = useParams(); // Get slug from URL

//   const { data, isLoading, isError, error } = useQuery({
//     queryKey: ["article", slug],
//     queryFn: async () => {
//       const allPosts = await getPosts(1); // Fetch all posts (you can change page if needed)
//       return allPosts.articles.find((post) => post.slug === slug);
//     },
//   });

//   if (isLoading) return <p>Loading article...</p>;
//   if (isError) return <p>Error: {error.message}</p>;
//   if (!data) return <p>Article not found</p>;

//   const article = data;

//   return (
//     <div className="max-w-7xl mx-auto px-8 py-8 md:py-16">
//       {/* Hero */}
//       <section className="mb-8">
//         <div className="aspect-video w-full rounded-lg overflow-hidden mb-6">
//           <img
//             src={
//               article.featuredImage || "https://via.placeholder.com/1200x600"
//             }
//             alt={article.title}
//             className="w-full h-full object-cover"
//           />
//         </div>
//         <div className="max-w-3xl mx-auto text-center">
//           <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
//             {article.title}
//           </h1>
//           <p className="text-gray-500">
//             {article.category?.title || "General"}
//           </p>
//         </div>
//       </section>

//       {/* Content */}
//       <section className="grid grid-cols-1 lg:grid-cols-3 gap-12 mt-12">
//         <article className="lg:col-span-2 prose max-w-none">
//           <p>{article.content}</p>

//           {/* Render images if any */}
//           {article.images?.map((img, idx) => (
//             <figure key={idx}>
//               <img
//                 src={img.url}
//                 alt={img.alt || "Article image"}
//                 className="w-full rounded-lg"
//               />
//               {img.caption && (
//                 <figcaption className="text-center text-sm text-gray-500 mt-2">
//                   {img.caption}
//                 </figcaption>
//               )}
//             </figure>
//           ))}
//         </article>

//         {/* Sidebar */}
//         <aside className="lg:col-span-1">
//           <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
//             <h3 className="font-bold text-xl mb-4">About the Author</h3>
//             <p className="text-sm text-gray-600">
//               {article.author?.bio || "No bio available"}
//             </p>
//           </div>

//           {article.related?.length > 0 && (
//             <div className="bg-white p-6 rounded-lg shadow-sm">
//               <h3 className="font-bold text-xl mb-4">Related Articles</h3>
//               <ul className="space-y-4">
//                 {article.related.map((rel) => (
//                   <li key={rel.slug}>
//                     <Link
//                       to={`/article/${rel.slug}`}
//                       className="block hover:bg-gray-100 p-2 rounded-lg">
//                       <p className="font-semibold">{rel.title}</p>
//                       <p className="text-sm text-gray-500">{rel.summary}</p>
//                     </Link>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           )}
//         </aside>
//       </section>
//     </div>
//   );
// }

// import React from "react";
// import { useParams, Link } from "react-router-dom";
// import { useQuery } from "@tanstack/react-query";
// import { getPosts } from "../../api/client";

// export default function Article() {
//   const { slug } = useParams();

//   // Fetch posts and find the one with the slug
//   const { data, isLoading, isError, error } = useQuery({
//     queryKey: ["article", slug],
//     queryFn: async () => {
//       const allPosts = await getPosts(1); // Adjust page if needed
//       return allPosts.articles.find((post) => post.slug === slug);
//     },
//   });

//   if (isLoading) return <p className="p-6">Loading article...</p>;
//   if (isError)
//     return <p className="p-6 text-red-500">Error: {error.message}</p>;
//   if (!data) return <p className="p-6">Article not found</p>;

//   const article = data;

//   // Mock "More Articles" if your API doesn't provide them
//   const moreArticles = Array(4)
//     .fill(null)
//     .map((_, i) => ({
//       title: `More Article ${i + 1}`,
//       summary: "Short description here",
//       featuredImage: `https://picsum.photos/300/200?random=${i + 41}`,
//       slug: `more-${i + 1}`,
//     }));

//   return (
//     <div className="max-w-7xl mx-auto px-8 py-8 md:py-16">
//       {/* Hero */}
//       <section className="mb-8">
//         <div className="aspect-video w-full rounded-lg overflow-hidden mb-6">
//           <img
//             src={
//               article.featuredImage || "https://via.placeholder.com/1200x600"
//             }
//             alt={article.title}
//             className="w-full h-full object-cover"
//           />
//         </div>
//         <div className="max-w-3xl mx-auto text-center">
//           <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
//             {article.title}
//           </h1>
//           <p className="text-gray-500">
//             {article.category?.title || "General"}
//           </p>
//         </div>
//       </section>

//       {/* Content + Sidebar */}
//       <section className="grid grid-cols-1 lg:grid-cols-3 gap-12 mt-12">
//         <article className="lg:col-span-2 prose max-w-none">
//           {/* Render content as text while keeping links */}
//           <div dangerouslySetInnerHTML={{ __html: article.content }} />

//           {article.images?.map((img, idx) => (
//             <figure key={idx}>
//               <img
//                 src={img.url}
//                 alt={img.alt || "Article image"}
//                 className="w-full rounded-lg"
//               />
//               {img.caption && (
//                 <figcaption className="text-center text-sm text-gray-500 mt-2">
//                   {img.caption}
//                 </figcaption>
//               )}
//             </figure>
//           ))}

//           {/* Example extra section from your HTML */}
//           <h2>The Journey into the Unknown</h2>
//           <p>
//             Sed ut perspiciatis unde omnis iste natus error sit voluptatem
//             accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
//             quae ab illo inventore veritatis et quasi architecto beatae vitae
//             dicta sunt explicabo.
//           </p>
//           <figure>
//             <img
//               src="https://picsum.photos/800/500?random=2"
//               alt="Extra Section Image"
//               className="w-full rounded-lg"
//             />
//             <figcaption className="text-center text-sm text-gray-500 mt-2">
//               A visually compelling image to break up the text.
//             </figcaption>
//           </figure>
//           <h3>Discovering New Horizons</h3>
//           <p>
//             At vero eos et accusamus et iusto odio dignissimos ducimus qui
//             blanditiis praesentium voluptatum deleniti atque corrupti quos
//             dolores et quas molestias excepturi sint occaecati cupiditate non
//             provident.
//           </p>
//         </article>

//         <aside className="lg:col-span-1">
//           {/* Author */}
//           <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
//             <h3 className="font-bold text-xl mb-4">About the Author</h3>
//             <p className="text-sm text-gray-600">
//               {article.author?.bio || "No bio available"}
//             </p>
//           </div>

//           {/* Related Articles */}
//           {article.related?.length > 0 && (
//             <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
//               <h3 className="font-bold text-xl mb-4">Related Articles</h3>
//               <ul className="space-y-4">
//                 {article.related.map((rel) => (
//                   <li key={rel.slug}>
//                     <Link
//                       to={`/article/${rel.slug}`}
//                       className="block hover:bg-gray-100 p-2 rounded-lg">
//                       <p className="font-semibold">{rel.title}</p>
//                       <p className="text-sm text-gray-500">{rel.summary}</p>
//                     </Link>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           )}
//         </aside>
//       </section>

//       {/* Section 3 / Cards */}

//       <section className="max-w-6xl mx-auto py-12 grid grid-cols-1 md:grid-cols-2 gap-6">
//         {moreArticles.map((card, idx) => (
//           <Link
//             key={idx}
//             to={`/article/${card.slug}`} // Use the slug for navigation
//             className="flex gap-4 hover:shadow-lg transition-shadow duration-200">
//             <img
//               src={card.featuredImage}
//               alt={card.title}
//               className="w-40 h-28 object-cover rounded-md"
//             />
//             <div>
//               <h3 className="font-bold text-lg mb-2">{card.title}</h3>
//               <span className="text-sm bg-purple-500 text-white px-2 py-1 rounded">
//                 Category
//               </span>
//             </div>
//           </Link>
//         ))}
//       </section>

//       {/* Section 5: More Articles */}
//       <section className="max-w-7xl mx-auto px-4 py-16">
//         <div className="flex justify-between items-center mb-10">
//           <h2 className="text-3xl font-bold text-gray-800">More Articles</h2>
//         </div>

//         <div className="flex flex-wrap gap-6 pb-4">
//           {moreArticles.map((article, idx) => (
//             <div
//               key={idx}
//               className="bg-white shadow-md rounded-xl flex-1 min-w-[280px]">
//               <img
//                 src={article.featuredImage}
//                 className="w-full h-40 object-cover rounded-t-xl"
//                 alt={article.title}
//               />
//               <div className="p-4">
//                 <h3 className="font-semibold text-lg">{article.title}</h3>
//                 <p className="text-gray-500 text-sm">{article.summary}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>
//     </div>
//   );
// }

import React from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../../api/client";

export default function Article() {
  const { slug } = useParams();

  // Fetch the main article
  const {
    data: allPostsData,
    isLoading: allPostsLoading,
    isError: allPostsError,
    error: allPostsErrorMsg,
  } = useQuery({
    queryKey: ["allPosts"],
    queryFn: () => getPosts(1), // fetch all posts
  });

  if (allPostsLoading) return <p className="p-6">Loading article...</p>;
  if (allPostsError)
    return (
      <p className="p-6 text-red-500">Error: {allPostsErrorMsg.message}</p>
    );

  const allPosts = allPostsData?.articles || [];
  const article = allPosts.find((post) => post.slug === slug);

  if (!article) return <p className="p-6">Article not found</p>;

  // Get "more articles" excluding the current one
  const moreArticles = allPosts
    .filter((post) => post.slug !== slug)
    .slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-8 py-8 md:py-16">
      {/* Hero */}
      <section className="mb-8">
        <div className="aspect-video w-full rounded-lg overflow-hidden mb-6">
          <img
            src={
              article.featuredImage || "https://via.placeholder.com/1200x600"
            }
            alt={article.title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            {article.title}
          </h1>
          <p className="text-gray-500">
            {article.category?.title || "General"}
          </p>
        </div>
      </section>

      {/* Content + Sidebar */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-12 mt-12">
        <article className="lg:col-span-2 prose max-w-none">
          {/* Render content with links */}
          <div dangerouslySetInnerHTML={{ __html: article.content }} />

          {article.images?.map((img, idx) => (
            <figure key={idx}>
              <img
                src={img.url}
                alt={img.alt || "Article image"}
                className="w-full rounded-lg"
              />
              {img.caption && (
                <figcaption className="text-center text-sm text-gray-500 mt-2">
                  {img.caption}
                </figcaption>
              )}
            </figure>
          ))}

          {/* Optional extra section */}
          <h2>The Journey into the Unknown</h2>
          <p>
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem
            accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
            quae ab illo inventore veritatis et quasi architecto beatae vitae
            dicta sunt explicabo.
          </p>
          <figure>
            <img
              src="https://picsum.photos/800/500?random=2"
              alt="Extra Section Image"
              className="w-full rounded-lg"
            />
            <figcaption className="text-center text-sm text-gray-500 mt-2">
              A visually compelling image to break up the text.
            </figcaption>
          </figure>
          <h3>Discovering New Horizons</h3>
          <p>
            At vero eos et accusamus et iusto odio dignissimos ducimus qui
            blanditiis praesentium voluptatum deleniti atque corrupti quos
            dolores et quas molestias excepturi sint occaecati cupiditate non
            provident.
          </p>
        </article>

        <aside className="lg:col-span-1">
          {/* Author */}
          <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
            <h3 className="font-bold text-xl mb-4">About the Author</h3>
            <p className="text-sm text-gray-600">
              {article.author?.bio || "No bio available"}
            </p>
          </div>

          {/* Related Articles */}
          {article.related?.length > 0 && (
            <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
              <h3 className="font-bold text-xl mb-4">Related Articles</h3>
              <ul className="space-y-4">
                {article.related.map((rel) => (
                  <li key={rel.slug}>
                    <Link
                      to={`/article/${rel.slug}`}
                      className="block hover:bg-gray-100 p-2 rounded-lg">
                      <p className="font-semibold">{rel.title}</p>
                      <p className="text-sm text-gray-500">{rel.summary}</p>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </aside>
      </section>

      {/* More Articles Section */}
      <section className="max-w-6xl mx-auto py-12 grid grid-cols-1 md:grid-cols-2 gap-6">
        {moreArticles.map((card) => (
          <Link
            key={card.slug}
            to={`/article/${card.slug}`} // Navigate to same Article page
            className="flex gap-4 hover:shadow-lg transition-shadow duration-200">
            <img
              src={card.featuredImage}
              alt={card.title}
              className="w-40 h-28 object-cover rounded-md"
            />
            <div>
              <h3 className="font-bold text-lg mb-2">{card.title}</h3>
              <span className="text-sm bg-purple-500 text-white px-2 py-1 rounded">
                Category
              </span>
            </div>
          </Link>
        ))}
      </section>

      {/* Section 5: More Articles Cards */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl font-bold text-gray-800">More Articles</h2>
        </div>

        <div className="flex flex-wrap gap-6 pb-4">
          {moreArticles.map((card) => (
            <Link
              key={card.slug}
              to={`/article/${card.slug}`}
              className="bg-white shadow-md rounded-xl flex-1 min-w-[280px] hover:shadow-lg transition-shadow duration-200">
              <img
                src={card.featuredImage}
                className="w-full h-40 object-cover rounded-t-xl"
                alt={card.title}
              />
              <div className="p-4">
                <h3 className="font-semibold text-lg">{card.title}</h3>
                <p className="text-gray-500 text-sm">{card.summary}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
