import React from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../../../api/client";

export default function ArticlePage() {
  const { slug } = useParams();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["allPosts"],
    queryFn: () => getPosts(10),
  });

  if (isLoading) return <p className="p-6">Loading article...</p>;
  if (isError)
    return <p className="p-6 text-red-500">Error: {error.message}</p>;

  const allPosts = data?.articles || [];
  const article = allPosts.find((post) => post.slug === slug);

  if (!article) return <p className="p-6">Article not found</p>;

  return (
    <div className="bg-white text-black font-sans mx-2 my-2">
      {/* Section 1: Hero / Intro */}
      <section className="max-w-6xl mx-auto py-10">
        {/* <img
          src={article.featuredImage || "https://via.placeholder.com/600x400"}
          alt={article.title}
          className="w-full md:w-1/3 md:float-left md:mr-6 mb-4 rounded-md shadow-md"
        /> */}
        <p className="font-bold text-lg mb-4">{article.title}</p>
        <div
          className="mb-4"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
        <div className="clear-both hidden md:block"></div>
      </section>

      {/* Section 2: Secondary Image & Description */}
      {article.secondaryImage && (
        <section className="max-w-6xl mx-auto py-12">
          <h2 className="text-2xl font-bold mb-6 text-center">
            {article.subtitle}
          </h2>
          <div className="flex flex-col items-center">
            <img
              src={article.secondaryImage}
              alt={article.title}
              className="w-full max-w-4xl rounded-md shadow-md mb-6"
            />
            <p className="text-center max-w-3xl">{article.description}</p>
          </div>
        </section>
      )}

      {/* Section 3: Related Cards */}
      {article.relatedPosts?.length > 0 && (
        <section className="max-w-6xl mx-auto py-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          {article.relatedPosts.map((post) => (
            <div key={post._id} className="flex gap-4">
              <img
                src={post.featuredImage}
                alt={post.title}
                className="w-40 h-28 object-cover rounded-md"
              />
              <div>
                <h3 className="font-bold text-lg mb-2">{post.title}</h3>
                <span className="text-sm bg-purple-500 text-white px-2 py-1 rounded">
                  {post.section}
                </span>
              </div>
            </div>
          ))}
        </section>
      )}

      {/* Section 4 & 5: Additional Images / More Related */}
      {article.images?.length > 0 && (
        <section className="max-w-6xl mx-auto py-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          {article.images.map((img, idx) => (
            <div key={idx} className="flex gap-4">
              <img
                src={img.url}
                alt={img.alt || "Related image"}
                className="w-40 h-28 object-cover rounded-md"
              />
              <div>
                <h3 className="font-bold text-lg mb-2">{img.title || ""}</h3>
                {img.section && (
                  <span className="text-sm bg-purple-500 text-white px-2 py-1 rounded">
                    {img.section}
                  </span>
                )}
              </div>
            </div>
          ))}
        </section>
      )}
    </div>
  );
}
