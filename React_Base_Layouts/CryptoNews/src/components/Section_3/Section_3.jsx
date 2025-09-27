import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { getPosts } from "../../api/client";

export default function CategorySection() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["category-posts"],
    queryFn: () => getPosts(1), // use page if needed
  });

  if (isLoading) return <p className="p-6">Loading categories...</p>;
  if (isError)
    return <p className="p-6 text-red-500">Error: {error.message}</p>;

  const postsArray = Object.values(data?.articles || []);

  // Assign posts to categories
  const travelFeatured = postsArray[50];
  const travelArticles = postsArray.slice(51, 54);

  const musicFeatured = postsArray[55];
  const musicArticles = postsArray.slice(96, 99);

  const foodFeatured = postsArray[60];
  const foodArticles = postsArray.slice(61, 64);

  const renderCategoryColumn = (title, featured, articles) => (
    <div className="category-column">
      <h2 className="category-title">{title}</h2>

      {/* Featured Article */}
      {featured && (
        <article className="category-featured">
          <Link
            to={`/article/${featured.slug}`}
            className="category-featured__link">
            <div className="category-featured__image">
              <img src={featured.featuredImage} alt={featured.title} />
            </div>
            <h3 className="category-featured__title">{featured.title}</h3>
          </Link>
        </article>
      )}

      {/* Smaller Articles */}
      <div className="category-articles">
        {articles.map((post) => (
          <article key={post._id} className="category-article">
            <Link
              to={`/article/${post.slug}`}
              className="category-article__link">
              <div className="category-article__image">
                <img src={post.featuredImage} alt={post.title} />
              </div>
              <div className="category-article__content">
                <h4 className="category-article__title">{post.title}</h4>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </div>
  );

  return (
    <section className="category-section" id="category-section">
      <div className="category-grid">
        {renderCategoryColumn("Travel", travelFeatured, travelArticles)}
        {renderCategoryColumn("Music", musicFeatured, musicArticles)}
        {renderCategoryColumn("Food", foodFeatured, foodArticles)}
      </div>
    </section>
  );
}
