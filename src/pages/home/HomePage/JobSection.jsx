import React, { useState } from 'react';
import { Link } from 'react-router';
import { MapPin, Calendar, Heart } from 'lucide-react';

const JobSection = ({ jobData }) => {
  const [liked, setLiked] = useState({});

  const toggleLike = (id, e) => {
    e.preventDefault();
    setLiked(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold text-gray-900">Featured Jobs</h2>
        <p className="text-gray-500 mt-2 text-sm tracking-wide">
          Recruitment Made Easy in 100 seconds
        </p>
      </div>

      {/* Job List */}
      <div className="border border-gray-200 rounded-2xl overflow-hidden bg-white shadow-sm">
        {jobData.map((job, index) => (
          <div
            key={job._id}
            className={`flex items-center gap-5 px-6 py-5 hover:bg-gray-50 transition-colors duration-200 ${
              index !== jobData.length - 1 ? 'border-b border-gray-100' : ''
            }`}
          >
            {/* Company Logo */}
            <div className="shrink-0 w-14 h-14 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
              <img
                src={job.companyLogo || job.coverImage}
                alt={job.company || job.category}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Job Info */}
            <div className="min-w-[180px]">
              <p className="text-teal-500 font-semibold text-sm">
                {job.company || 'Company Name'}
              </p>
              <h3 className="text-gray-900 font-bold text-base mt-0.5">
                {job.title || job.category}
              </h3>
            </div>

            {/* Location & Date */}
            <div className="flex flex-col gap-1 text-gray-400 text-sm min-w-[160px]">
              <span className="flex items-center gap-1">
                <MapPin size={13} />
                {job.location || '123 Main Street'}
              </span>
              <span className="flex items-center gap-1">
                <Calendar size={13} />
                {job.postedAt || '2 years ago'}
              </span>
            </div>

            {/* Tags */}
            <div className="flex gap-2 flex-wrap min-w-[160px]">
              {(job.tags || [job.category, 'Full-time']).map((tag, i) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Salary */}
            <div className="ml-auto mr-6 whitespace-nowrap">
              <span className="text-gray-900 font-bold text-base">
                {job.salary || '$500'}
              </span>
              <span className="text-gray-400 text-sm"> / month</span>
            </div>

            {/* Like Button */}
            <button
              onClick={(e) => toggleLike(job._id, e)}
              className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center hover:border-red-300 transition-colors duration-200 shrink-0"
            >
              <Heart
                size={16}
                className={liked[job._id] ? 'fill-red-500 text-red-500' : 'text-gray-300'}
              />
            </button>

            {/* Bid Button */}
            <Link to={`/jobs/${job._id}`}>
              <button className="px-5 py-2 border-2 border-gray-800 text-gray-800 text-sm font-semibold rounded-lg hover:bg-gray-800 hover:text-white transition-colors duration-200 whitespace-nowrap">
                Bid Job
              </button>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default JobSection;