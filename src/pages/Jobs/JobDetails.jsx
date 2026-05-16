import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Link, useNavigate, useParams } from 'react-router';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  BadgeCheck,
  CalendarDays,
  Check,
  Loader2,
  Mail,
  Tag,
  UserRound,
} from 'lucide-react';
import axiosInstance from '../../lib/axiosInstance';
import LoadingSpinner from '../../components/LoadingSpinner';
import { useAuth } from '../../contexts/AuthContext';

const JobDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: job, isLoading, isError, error } = useQuery({
    queryKey: ['job', id],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/jobs/${id}`);
      return data;
    },
    enabled: !!id,
  });

  const acceptMutation = useMutation({
    mutationFn: async () => {
      const { data } = await axiosInstance.post('/accepted-tasks', {
        jobId: id,
        workerEmail: user.email,
        workerName: user.displayName,
      });
      return data;
    },
    onSuccess: () => {
      toast.success('Job accepted! Visit "My Accepted Tasks" to manage it.');
      queryClient.invalidateQueries({ queryKey: ['accepted-tasks'] });
      navigate('/my-accepted-tasks');
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || err?.message || 'Could not accept job.');
    },
  });

  if (isLoading) return <LoadingSpinner fullscreen />;
  if (isError) {
    return (
      <div className="container-fm py-16">
        <p className="text-center text-red-500">
          {error?.response?.data?.message || error?.message || 'Failed to load job.'}
        </p>
      </div>
    );
  }
  if (!job) return null;

  const isOwnJob =
    user?.email && job.userEmail && user.email.toLowerCase() === job.userEmail.toLowerCase();

  return (
    <section className="container-fm py-10">
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="mb-6 inline-flex items-center gap-1 text-sm text-muted transition hover:text-app"
      >
        <ArrowLeft size={16} /> Back
      </button>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_360px]"
      >
        <article className="card-fm overflow-hidden">
          <img
            src={job.coverImage}
            alt={job.title}
            className="h-72 w-full object-cover sm:h-96"
          />
          <div className="p-6 sm:p-8">
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <span className="chip-fm">
                <Tag size={12} /> {job.category}
              </span>
              {job.postedAt && (
                <span className="inline-flex items-center gap-1 text-xs text-muted">
                  <CalendarDays size={12} />
                  Posted {new Date(job.postedAt).toLocaleDateString('en-GB', {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric',
                  })}
                </span>
              )}
            </div>

            <h1 className="heading-fm text-3xl sm:text-4xl">{job.title}</h1>

            <div className="mt-6 grid grid-cols-1 gap-4 rounded-2xl border border-app bg-[rgb(var(--fm-bg))]/40 p-4 sm:grid-cols-2">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-[rgb(var(--fm-primary))]/15 text-[rgb(var(--fm-primary))]">
                  <UserRound size={18} />
                </span>
                <div>
                  <p className="text-xs text-muted">Posted by</p>
                  <p className="font-semibold">{job.postedBy}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-[rgb(var(--fm-primary))]/15 text-[rgb(var(--fm-primary))]">
                  <Mail size={18} />
                </span>
                <div>
                  <p className="text-xs text-muted">Contact</p>
                  <p className="break-all font-semibold">{job.userEmail}</p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h2 className="heading-fm text-xl">Project brief</h2>
              <p className="mt-2 whitespace-pre-line text-base leading-relaxed text-muted">
                {job.summary}
              </p>
            </div>
          </div>
        </article>

        <aside className="card-fm h-fit space-y-4 p-6">
          <div className="flex items-center gap-2">
            <BadgeCheck size={20} className="text-emerald-500" />
            <p className="font-semibold">Verified job posting</p>
          </div>
          <p className="text-sm text-muted">
            Once you accept, this project will appear in your{' '}
            <span className="font-semibold text-app">My Accepted Tasks</span> dashboard so you can
            track it through to delivery.
          </p>

          {isOwnJob ? (
            <div className="rounded-xl border border-amber-400/40 bg-amber-400/10 p-3 text-sm text-amber-700 dark:text-amber-300">
              You can't accept a job you posted yourself. View it in{' '}
              <Link to="/myAddedJobs" className="underline">
                My Added Jobs
              </Link>
              .
            </div>
          ) : (
            <button
              type="button"
              onClick={() => acceptMutation.mutate()}
              disabled={acceptMutation.isPending}
              className="btn-fm btn-fm-primary w-full"
            >
              {acceptMutation.isPending ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <Check size={16} />
              )}
              {acceptMutation.isPending ? 'Accepting…' : 'Accept this job'}
            </button>
          )}

          <Link to="/allJobs" className="btn-fm btn-fm-ghost w-full">
            Back to all jobs
          </Link>
        </aside>
      </motion.div>
    </section>
  );
};

export default JobDetails;
