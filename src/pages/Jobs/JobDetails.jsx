import React, { useState } from "react";
import { useLoaderData } from "react-router";
import {
  MapPin,
  Folder,
  Share2,
  Heart,
  Zap,
  Calendar,
  Clock,
  DollarSign,
  BarChart3,
  IdCard,
  Star,
} from "lucide-react";

const JobDetails = () => {
  const jobData = useLoaderData();
  const [liked, setLiked] = useState(false);

  const {
    title = "Junior Graphic Designer",
    company = "Fusion Innovations",
    companyLogo,
    coverImage,
    location = "1637 Forest Ave #2229",
    category = "Graphic & design, Photography",
    skills = ["Figma", "Photoshop"],
    applicationDeadline = "September 16, 2032",
    salary = "$6.500",
    salaryPeriod = "year",
    postedDate = "September 13, 2024",
    experience = "5 Year",
    careerLevel = "Officer",
    jobLocation = "New York",
    description = "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores.",
    employer = {},
  } = jobData || {};


  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="bg-[#FDF1EC] py-10 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          {/* Left: Logo + Info */}
          <div className="flex items-start gap-5">
            {/* Company Logo */}
            <div className="w-24 h-24 rounded-2xl overflow-hidden bg-white flex items-center justify-center shrink-0 shadow-sm">
              <img
                src={companyLogo || coverImage}
                alt={company}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Info */}
            <div>
              <p className="text-teal-500 font-semibold text-sm mb-1">
                {company}
              </p>
              <div className="flex items-center gap-2 mb-2">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                  {title}
                </h1>
                <span className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center">
                  <Zap size={14} className="text-white fill-white" />
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-gray-500 text-sm mb-3">
                <span className="flex items-center gap-1.5">
                  <MapPin size={14} />
                  {location}
                </span>
                <span className="flex items-center gap-1.5">
                  <Folder size={14} />
                  {category}
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                {skills.map((skill, i) => (
                  <span
                    key={i}
                    className="px-4 py-1 bg-white border border-gray-200 text-gray-700 text-sm rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex flex-col items-end gap-3">
            <div className="flex gap-2">
              <button className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition">
                <Share2 size={16} className="text-gray-700" />
              </button>
              <button
                onClick={() => setLiked(!liked)}
                className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition"
              >
                <Heart
                  size={16}
                  className={
                    liked ? "fill-red-500 text-red-500" : "text-red-400"
                  }
                />
              </button>
            </div>

            <p className="text-gray-800 text-sm">
              Application ends:{" "}
              <span className="text-red-500 font-medium">
                {applicationDeadline}
              </span>
            </p>

            <button className="px-8 py-3 bg-teal-500 hover:bg-teal-600 text-white font-semibold rounded-lg transition-colors">
              Apply Now
            </button>

            <p className="text-gray-900 font-bold text-xl">
              {salary}
              <span className="text-gray-400 font-normal text-sm">
                {" "}
                / {salaryPeriod}
              </span>
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Job Overview + Description */}
        <div className="lg:col-span-2">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Job Overview</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10">
            <OverviewItem
              icon={<Calendar size={28} className="text-gray-700" />}
              label="Date Posted"
              value={postedDate}
            />
            <OverviewItem
              icon={<Clock size={28} className="text-gray-700" />}
              label="Expiration date"
              value={applicationDeadline}
            />
            <OverviewItem
              icon={<MapPin size={28} className="text-gray-700" />}
              label="Location"
              value={jobLocation}
            />
            <OverviewItem
              icon={<DollarSign size={28} className="text-gray-700" />}
              label="Min. Salary"
              value={`${salary} / ${salaryPeriod}`}
            />
            <OverviewItem
              icon={<BarChart3 size={28} className="text-gray-700" />}
              label="Experience"
              value={experience}
            />
            <OverviewItem
              icon={<IdCard size={28} className="text-gray-700" />}
              label="Career Level"
              value={careerLevel}
            />
          </div>

          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Full Job Description
          </h2>
          <p className="text-gray-600 leading-relaxed">{description}</p>
        </div>

       
      </section>
    </div>
  );
};

// Reusable item for the Job Overview grid
const OverviewItem = ({ icon, label, value }) => (
  <div className="flex items-start gap-3">
    <div className="shrink-0">{icon}</div>
    <div>
      <p className="text-gray-500 text-sm">{label}</p>
      <p className="text-gray-900 font-semibold">{value}</p>
    </div>
  </div>
);

// Reusable row for the About Employer card
const EmployerRow = ({ label, value, bold, isLast }) => (
  <div
    className={`flex justify-between items-center py-3 ${
      !isLast ? "border-b border-gray-100" : ""
    }`}
  >
    <span className="text-gray-500 text-sm">{label}</span>
    <span
      className={`text-sm text-gray-900 ${bold ? "font-semibold" : ""}`}
    >
      {value || ""}
    </span>
  </div>
);

export default JobDetails;