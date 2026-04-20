import { Link, useLoaderData } from 'react-router';
import { MapPin, Calendar, Briefcase } from 'lucide-react';

const Jobs = () => {
  const jobData = useLoaderData();

  if (!jobData || jobData.length === 0) {
    return (
      <section className="py-16 bg-gray-50 min-h-screen">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">All Jobs</h2>
          <p className="text-gray-500">No jobs found at the moment. Check back soon!</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-4">

        {/* Header */}
        <div className="mb-10">
          <p className="text-teal-500 font-semibold text-sm uppercase tracking-widest mb-2">
            Browse Opportunities
          </p>
          <div className="flex items-end justify-between">
            <h2 className="text-3xl font-bold text-gray-900">All Featured Jobs</h2>
            <span className="text-sm text-gray-400">{jobData.length} jobs found</span>
          </div>
          <p className="text-gray-500 mt-1 text-sm">
            Navigate all the jobs that are a perfect match for you!
          </p>
        </div>

        {/* Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobData.map(job => (
            <JobCard key={job._id} job={job} />
          ))}
        </div>

      </div>
    </section>
  );
};

const JobCard = ({ job }) => (
  <Link to={`/jobs/${job._id}`} className="group block h-full">
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md hover:border-teal-200 transition-all duration-300 h-full flex flex-col">

      {/* Full-width cover image */}
      <div className="relative w-full h-44 bg-gray-100 shrink-0">
        <img
          src={job.companyLogo || job.coverImage}
          alt={job.company || job.category}
          className="w-full h-full object-cover"
          onError={e => { e.target.style.display = 'none'; }}
        />
        {/* Category badge overlay */}
        <span className="absolute top-3 right-3 px-3 py-1 bg-white/90 backdrop-blur-sm text-teal-600 text-xs font-semibold rounded-full shadow-sm">
          {job.category?.split(',')[0]?.trim() || 'General'}
        </span>
      </div>

      {/* Card body */}
      <div className="p-5 flex flex-col flex-1">
        {/* Title & Company */}
        <h3 className="text-gray-900 font-bold text-base mb-1 group-hover:text-teal-600 transition-colors leading-snug">
          {job.title || job.category}
        </h3>
        <p className="text-gray-500 text-sm mb-4">{job.company || 'Company'}</p>

        {/* Meta info */}
        <div className="space-y-2 mb-5 flex-1">
          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <MapPin size={13} className="shrink-0" />
            <span className="truncate">{job.jobLocation || job.location || 'Remote'}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <Calendar size={13} className="shrink-0" />
            <span>Deadline: {job.applicationDeadline || 'Open'}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <Briefcase size={13} className="shrink-0" />
            <span>{job.experience || 'Any level'} experience</span>
          </div>
        </div>

        {/* Salary + CTA */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div>
            <span className="text-gray-900 font-bold text-base">{job.salary || 'Negotiable'}</span>
            {job.salaryPeriod && (
              <span className="text-gray-400 text-xs"> /{job.salaryPeriod}</span>
            )}
          </div>
          <span className="px-4 py-1.5 bg-gray-900 text-white text-xs font-semibold rounded-lg group-hover:bg-teal-600 transition-colors duration-200">
            Bid Now
          </span>
        </div>
      </div>

    </div>
  </Link>
);

export default Jobs;
