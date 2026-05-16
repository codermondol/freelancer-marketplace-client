import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Link } from 'react-router';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { ListPlus, Pencil, PlusCircle, Trash2 } from 'lucide-react';
import axiosInstance from '../../lib/axiosInstance';
import LoadingSpinner from '../../components/LoadingSpinner';
import { useAuth } from '../../contexts/AuthContext';
import SectionHeader from '../../components/SectionHeader';

const MyAddedJobs = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['jobs', 'mine', user?.email],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/jobs/mine/${user.email}`);
      return data;
    },
    enabled: !!user?.email,
  });

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const { data } = await axiosInstance.delete(`/jobs/${id}`);
      return data;
    },
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ['jobs', 'mine', user?.email] });
      const prev = queryClient.getQueryData(['jobs', 'mine', user?.email]);
      queryClient.setQueryData(['jobs', 'mine', user?.email], (old) =>
        Array.isArray(old) ? old.filter((j) => j._id !== id) : old
      );
      return { prev };
    },
    onError: (err, _id, ctx) => {
      if (ctx?.prev) {
        queryClient.setQueryData(['jobs', 'mine', user?.email], ctx.prev);
      }
      toast.error(err?.response?.data?.message || 'Delete failed.');
    },
    onSuccess: () => {
      toast.success('Job removed.');
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
    },
  });

  const handleDelete = (id, title) => {
    const confirmed = window.confirm(
      `Delete "${title}"? This action cannot be undone.`
    );
    if (!confirmed) return;
    deleteMutation.mutate(id);
  };

  return (
    <section className="container-fm py-10">
      <SectionHeader
        eyebrow="Dashboard"
        title="My added jobs"
        subtitle="Manage every project you've posted on SkillForge from one place."
      />

      <div className="mt-8 flex justify-end">
        <Link to="/addJob" className="btn-fm btn-fm-primary">
          <PlusCircle size={16} /> Post new job
        </Link>
      </div>

      <div className="mt-6">
        {isLoading ? (
          <LoadingSpinner />
        ) : isError ? (
          <p className="text-center text-red-500">
            {error?.message || 'Failed to load your jobs.'}
          </p>
        ) : data && data.length > 0 ? (
          <motion.div
            initial="hidden"
            animate="show"
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.05 } },
            }}
            className="overflow-x-auto rounded-2xl border border-app bg-surface"
          >
            <table className="min-w-full divide-y divide-[rgb(var(--fm-border))] text-sm">
              <thead className="bg-[rgb(var(--fm-bg))]/40 text-left text-xs uppercase tracking-wider text-muted">
                <tr>
                  <th className="px-4 py-3">Job</th>
                  <th className="px-4 py-3">Category</th>
                  <th className="hidden px-4 py-3 md:table-cell">Posted</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[rgb(var(--fm-border))]">
                {data.map((job) => (
                  <motion.tr
                    key={job._id}
                    variants={{
                      hidden: { opacity: 0, y: 12 },
                      show: { opacity: 1, y: 0 },
                    }}
                  >
                    <td className="px-4 py-3">
                      <Link to={`/allJobs/${job._id}`} className="flex items-center gap-3">
                        <img
                          src={job.coverImage}
                          alt={job.title}
                          className="h-12 w-16 rounded-lg object-cover"
                        />
                        <div>
                          <p className="line-clamp-1 font-semibold">{job.title}</p>
                          <p className="clamp-2 text-xs text-muted">{job.summary}</p>
                        </div>
                      </Link>
                    </td>
                    <td className="px-4 py-3">
                      <span className="chip-fm">{job.category}</span>
                    </td>
                    <td className="hidden px-4 py-3 text-muted md:table-cell">
                      {job.postedAt ? new Date(job.postedAt).toLocaleDateString() : '—'}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          to={`/updateJob/${job._id}`}
                          className="inline-flex items-center gap-1 rounded-lg border border-app px-3 py-1.5 text-xs font-semibold text-app transition hover:border-[rgb(var(--fm-primary))] hover:text-[rgb(var(--fm-primary))]"
                        >
                          <Pencil size={12} /> Edit
                        </Link>
                        <button
                          type="button"
                          onClick={() => handleDelete(job._id, job.title)}
                          className="inline-flex items-center gap-1 rounded-lg border border-red-300/50 bg-red-500/10 px-3 py-1.5 text-xs font-semibold text-red-500 transition hover:bg-red-500/20"
                        >
                          <Trash2 size={12} /> Delete
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        ) : (
          <div className="rounded-2xl border border-dashed border-app bg-surface p-10 text-center">
            <ListPlus size={32} className="mx-auto text-muted" />
            <p className="mt-3 text-base font-semibold">No jobs yet.</p>
            <p className="mt-1 text-sm text-muted">Post your first job to start receiving proposals.</p>
            <Link to="/addJob" className="btn-fm btn-fm-primary mx-auto mt-5">
              <PlusCircle size={16} /> Post a job
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default MyAddedJobs;
