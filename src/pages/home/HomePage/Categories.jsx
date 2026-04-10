import React from 'react';

const Categories = () => {
    return (
        <div className='w-10/12 mx-auto'>
<div class="max-w-7xl mx-auto px-4 py-10">
  <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

    <div class="card image-full h-64 shadow-xl">
      <figure>
        <img src="https://i.ibb.co.com/d4MQ25MB/02-Developer-Hiring-and-Skills-1.png" alt="Digital Marketing" class="object-cover w-full h-full"/>
      </figure>
      <div class="card-body justify-end">
        <h2 class="card-title text-white">Digital Marketing</h2>
        <p class="text-sm text-gray-200">1 Job</p>
      </div>
    </div>

    <div class="card image-full h-64 shadow-xl">
      <figure>
        <img src="https://i.ibb.co/JR7sK7g/graphic-design.jpg" alt="Graphic Design" class="object-cover w-full h-full"/>
      </figure>
      <div class="card-body justify-end">
        <h2 class="card-title text-white">Graphic Design</h2>
        <p class="text-sm text-gray-200">3 Job</p>
      </div>
    </div>

    <div class="card image-full h-64 shadow-xl">
      <figure>
        <img src="https://i.ibb.co/Y3y0gZB/it-network.jpg" alt="IT & Networking" class="object-cover w-full h-full"/>
      </figure>
      <div class="card-body justify-end">
        <h2 class="card-title text-white">IT & Networking</h2>
        <p class="text-sm text-gray-200">2 Job</p>
      </div>
    </div>

    <div class="card image-full h-64 shadow-xl">
      <figure>
        <img src="https://i.ibb.co/Nr7fQjJ/business.jpg" alt="Business & Consulting" class="object-cover w-full h-full"/>
      </figure>
      <div class="card-body justify-end">
        <h2 class="card-title text-white">Business & Consulting</h2>
        <p class="text-sm text-gray-200">3 Job</p>
      </div>
    </div>

  </div>
</div>
        </div>
    );
};

export default Categories;