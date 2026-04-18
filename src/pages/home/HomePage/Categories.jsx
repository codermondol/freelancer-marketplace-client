import React from "react";
import { Link } from "react-router";

const Categories = ({ categoriesData }) => {
  if (!categoriesData || categoriesData.length === 0) {
    return (
      <p className="text-center mt-10 text-gray-500">No categories found.</p>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-8 text-center">All Categories</h2>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {categoriesData.map((category) => (
          <Link key={category._id} to={`/categories/${category._id}`}>
            <div className="card image-full h-64 shadow-xl hover:scale-105 transition-transform duration-300 cursor-pointer">
              <figure>
                <img
                  src={category.companyLogo}
                  alt={category.category}
                  className="w-full h-full object-cover"
                />
              </figure>
              <div className="card-body justify-end">
                <h2 className="card-title text-white text-xl">
                  {category.category}
                </h2>
                {category.description && (
                  <p className="text-white/75 text-sm line-clamp-2">
                    {category.description}
                  </p>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Categories;
