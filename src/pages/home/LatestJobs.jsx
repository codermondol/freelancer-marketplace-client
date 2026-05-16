import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router';
import { motion } from 'framer-motion';
import axiosInstance from '../../lib/axiosInstance';
import JobCard from '../../components/JobCard';
import LoadingSpinner from '../../components/LoadingSpinner';
import SectionHeader from '../../components/SectionHeader';

const fetchLatest = async () => {
  const { data } = await axiosInstance.get('/jobs/latest');
  return data;
};

const LatestJobs = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['jobs', 'latest'],
    queryFn: fetchLatest,
  });

  return (
    <section className="container-fm py-16 sm:py-20">
      <SectionHeader
        eyebrow="Fresh on the platform"
        title="Latest jobs posted by clients"
        subtitle="Discover what people are building right now and start a conversation in minutes."
      />

      <div className="mt-10">
        {isLoading ? (
          <LoadingSpinner />
        ) : isError ? (
          <p className="text-center text-sm text-red-500">
            Unable to load jobs right now. Please try again later.
          </p>
        ) : data && data.length > 0 ? (
          <motion.div
            initial="hidden"
            animate="show"
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.08 } },
            }}
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {data.map((job) => (
              <motion.div
                key={job._id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0 },
                }}
              >
                <JobCard job={job} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="rounded-2xl border border-dashed border-app bg-surface p-10 text-center">
            <p className="text-base font-semibold">No jobs posted yet.</p>
            <p className="mt-1 text-sm text-muted">
              Be the first to put your project in front of skilled freelancers.
            </p>
            <Link to="/addJob" className="btn-fm btn-fm-primary mx-auto mt-5">
              Post the first job
            </Link>
          </div>
        )}
      </div>

      {data && data.length > 0 && (
        <div className="mt-10 flex justify-center">
          <Link to="/allJobs" className="btn-fm btn-fm-ghost">
            View all jobs
          </Link>
        </div>
      )}
    </section>
  );
};

export default LatestJobs;
