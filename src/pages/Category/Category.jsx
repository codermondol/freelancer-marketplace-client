import React from 'react';
import { useLoaderData } from 'react-router';

const Category = () => {
    const category = useLoaderData();

    if (!category) return <p className="text-center mt-10">No data found.</p>;

    return (
        <div className="max-w-4xl mx-auto px-4 py-10">
            {/* Cover Image */}
            <div className="relative h-72 rounded-2xl overflow-hidden shadow-xl">
                <img
                    src={category.category}
                    alt={category.category}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex items-end p-6">
                    <h2 className="text-4xl font-bold text-white">{category.category}</h2>
                </div>
            </div>

            {/* Description */}
            {category.description && (
                <p className="mt-6 text-gray-600 text-lg">{category.description}</p>
            )}

            {/* Products / Items List (if your API returns them) */}
            {category.items && category.items.length > 0 && (
                <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {category.items.map((item) => (
                        <div key={item._id} className="card bg-base-100 shadow-md">
                            <figure>
                                <img src={item.image} alt={item.name} className="h-40 w-full object-cover" />
                            </figure>
                            <div className="card-body">
                                <h3 className="card-title text-base">{item.name}</h3>
                                <p className="text-sm text-gray-500">{item.price}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Category;