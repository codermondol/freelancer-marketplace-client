import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { Filter, LayoutGrid, List, SortAsc, SortDesc } from 'lucide-react';
import axiosInstance from '../../lib/axiosInstance';
import LoadingSpinner from '../../components/LoadingSpinner';
import JobCard from '../../components/JobCard';
import SectionHeader from '../../components/SectionHeader';
import jobCategories from './jobCategories';
import { Link } from 'react-router';
import { motion } from 'framer-motion';

const fetchJobs = async ({ sort, category }) => {
  const params = {};
  if (sort) params.sort = sort;
  if (category && category !== 'All') params.category = category;
  const { data } = await axiosInstance.get('/jobs', { params });
  return data;
};

const AllJobs = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [sort, setSort] = useState(searchParams.get('sort') || 'newest');
  const [category, setCategory] = useState(searchParams.get('category') || 'All');
  const [view, setView] = useState('grid');

  useEffect(() => {
    const params = {};
    if (sort && sort !== 'newest') params.sort = sort;
    if (category && category !== 'All') params.category = category;
    setSearchParams(params, { replace: true });
  }, [sort, category, setSearchParams]);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['jobs', { sort, category }],
    queryFn: () => fetchJobs({ sort, category }),
  });

  const allCategories = useMemo(() => ['All', ...jobCategories], []);

  return (
    <section className="container-fm py-10 sm:py-14">
      <SectionHeader
        eyebrow="Marketplace"
        title="Browse all open jobs"
        subtitle="Filter by category, search by keyword, and sort by date to find your perfect next gig."
      />

      <div className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-[280px_1fr]">
        <aside className="card-fm h-fit p-5">
          <div className="mb-5">
            <label className="mb-1.5 flex items-center gap-2 text-sm font-semibold">
              <Filter size={16} /> Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="input-fm"
            >
              {allCategories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1.5 flex items-center gap-2 text-sm font-semibold">
              {sort === 'newest' ? <SortDesc size={16} /> : <SortAsc size={16} />} Sort by date
            </label>
            <div className="flex flex-col gap-2">
              {[
                { value: 'newest', label: 'Highest (Newest first)' },
                { value: 'oldest', label: 'Lowest (Oldest first)' },
              ].map((opt) => (
                <label
                  key={opt.value}
                  className={`flex cursor-pointer items-center justify-between rounded-xl border border-app px-3 py-2 text-sm transition ${
                    sort === opt.value
                      ? 'border-[rgb(var(--fm-primary))] bg-[rgb(var(--fm-primary))]/10 text-[rgb(var(--fm-primary))]'
                      : 'hover:border-[rgb(var(--fm-primary))]/40'
                  }`}
                >
                  <span>{opt.label}</span>
                  <input
                    type="radio"
                    name="sort"
                    className="accent-[rgb(var(--fm-primary))]"
                    checked={sort === opt.value}
                    onChange={() => setSort(opt.value)}
                  />
                </label>
              ))}
            </div>
          </div>

          <div className="mt-5">
            <Link to="/addJob" className="btn-fm btn-fm-primary w-full">
              + Post a Job
            </Link>
          </div>
        </aside>

        <div>
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-muted">
              {isLoading ? 'Loading…' : `${data?.length || 0} jobs found`}
            </p>
            <div className="flex items-center gap-1 rounded-full border border-app bg-surface p-1 text-sm">
              <button
                type="button"
                onClick={() => setView('grid')}
                className={`flex items-center gap-1 rounded-full px-3 py-1.5 transition ${
                  view === 'grid'
                    ? 'bg-[rgb(var(--fm-primary))] text-white'
                    : 'text-muted hover:text-app'
                }`}
                aria-label="Grid view"
              >
                <LayoutGrid size={14} /> Grid
              </button>
              <button
                type="button"
                onClick={() => setView('list')}
                className={`flex items-center gap-1 rounded-full px-3 py-1.5 transition ${
                  view === 'list'
                    ? 'bg-[rgb(var(--fm-primary))] text-white'
                    : 'text-muted hover:text-app'
                }`}
                aria-label="List view"
              >
                <List size={14} /> List
              </button>
            </div>
          </div>

          {isLoading ? (
            <LoadingSpinner />
          ) : isError ? (
            <div className="rounded-2xl border border-dashed border-app bg-surface p-10 text-center text-sm text-red-500">
              {error?.message || 'Failed to load jobs.'}
            </div>
          ) : data && data.length > 0 ? (
            view === 'grid' ? (
              <motion.div
                initial="hidden"
                animate="show"
                variants={{
                  hidden: {},
                  show: { transition: { staggerChildren: 0.05 } },
                }}
                className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3"
              >
                {data.map((job) => (
                  <motion.div
                    key={job._id}
                    variants={{
                      hidden: { opacity: 0, y: 16 },
                      show: { opacity: 1, y: 0 },
                    }}
                  >
                    <JobCard job={job} />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <ul className="flex flex-col gap-4">
                {data.map((job) => (
                  <li key={job._id} className="card-fm flex flex-col gap-4 p-4 sm:flex-row sm:items-center">
                    <img
                      src={job.coverImage}
                      alt={job.title}
                      className="h-28 w-full rounded-xl object-cover sm:h-24 sm:w-32"
                    />
                    <div className="flex-1">
                      <div className="mb-1 flex flex-wrap items-center gap-2">
                        <span className="chip-fm">{job.category}</span>
                        {job.postedAt && (
                          <span className="text-xs text-muted">
                            {new Date(job.postedAt).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                      <h3 className="text-base font-bold">{job.title}</h3>
                      <p className="clamp-2 mt-1 text-sm text-muted">{job.summary}</p>
                      <p className="mt-2 text-xs text-muted">Posted by {job.postedBy}</p>
                    </div>
                    <Link to={`/allJobs/${job._id}`} className="btn-fm btn-fm-ghost shrink-0">
                      View Details
                    </Link>
                  </li>
                ))}
              </ul>
            )
          ) : (
            <div className="rounded-2xl border border-dashed border-app bg-surface p-10 text-center">
              <p className="text-base font-semibold">No jobs match your filters.</p>
              <p className="mt-1 text-sm text-muted">
                Try a different category or clear your search.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default AllJobs;
