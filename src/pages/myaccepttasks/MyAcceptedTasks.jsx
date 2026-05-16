import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Link } from 'react-router';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { Check, ClipboardList, X } from 'lucide-react';
import axiosInstance from '../../lib/axiosInstance';
import LoadingSpinner from '../../components/LoadingSpinner';
import { useAuth } from '../../contexts/AuthContext';
import SectionHeader from '../../components/SectionHeader';

const MyAcceptedTasks = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const queryKey = ['accepted-tasks', user?.email];

  const { data, isLoading, isError, error } = useQuery({
    queryKey,
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/accepted-tasks/${user.email}`);
      return data;
    },
    enabled: !!user?.email,
  });

  const removeMutation = useMutation({
    mutationFn: async ({ id }) => {
      const { data } = await axiosInstance.delete(`/accepted-tasks/${id}`);
      return data;
    },
    onMutate: async ({ id }) => {
      await queryClient.cancelQueries({ queryKey });
      const prev = queryClient.getQueryData(queryKey);
      queryClient.setQueryData(queryKey, (old) =>
        Array.isArray(old) ? old.filter((t) => t._id !== id) : old
      );
      return { prev };
    },
    onError: (err, _vars, ctx) => {
      if (ctx?.prev) queryClient.setQueryData(queryKey, ctx.prev);
      toast.error(err?.response?.data?.message || 'Could not update task.');
    },
    onSuccess: (_data, vars) => {
      if (vars.action === 'done') toast.success('Marked as done!');
      else toast.success('Task cancelled.');
    },
  });

  return (
    <section className="container-fm py-10">
      <SectionHeader
        eyebrow="My workspace"
        title="My accepted tasks"
        subtitle="Track the projects you've taken on. Mark them done when complete, or cancel if plans change."
      />

      <div className="mt-8">
        {isLoading ? (
          <LoadingSpinner />
        ) : isError ? (
          <p className="text-center text-red-500">
            {error?.message || 'Failed to load your tasks.'}
          </p>
        ) : data && data.length > 0 ? (
          <motion.div
            initial="hidden"
            animate="show"
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05 } } }}
            className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3"
          >
            {data.map((task) => (
              <motion.article
                key={task._id}
                variants={{
                  hidden: { opacity: 0, y: 14 },
                  show: { opacity: 1, y: 0 },
                }}
                className="card-fm flex h-full flex-col overflow-hidden"
              >
                <img
                  src={task.coverImage}
                  alt={task.jobTitle}
                  className="aspect-video w-full object-cover"
                />
                <div className="flex flex-1 flex-col gap-3 p-5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="chip-fm">{task.category}</span>
                    <span className="text-xs text-muted">
                      Accepted{' '}
                      {new Date(task.acceptedAt).toLocaleDateString('en-GB', {
                        day: '2-digit',
                        month: 'short',
                      })}
                    </span>
                  </div>
                  <h3 className="line-clamp-2 text-base font-bold">{task.jobTitle}</h3>
                  <p className="clamp-3 text-sm text-muted">{task.summary}</p>
                  <p className="text-xs text-muted">
                    Client: <span className="font-semibold text-app">{task.postedBy}</span>
                  </p>

                  <div className="mt-auto flex items-center gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() =>
                        removeMutation.mutate({ id: task._id, action: 'done' })
                      }
                      className="btn-fm btn-fm-primary flex-1"
                      title="Mark as done"
                    >
                      <Check size={14} /> Done
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        removeMutation.mutate({ id: task._id, action: 'cancel' })
                      }
                      className="btn-fm btn-fm-ghost flex-1"
                      title="Cancel task"
                    >
                      <X size={14} /> Cancel
                    </button>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        ) : (
          <div className="rounded-2xl border border-dashed border-app bg-surface p-10 text-center">
            <ClipboardList size={32} className="mx-auto text-muted" />
            <p className="mt-3 text-base font-semibold">You haven't accepted any tasks yet.</p>
            <p className="mt-1 text-sm text-muted">
              Find a project that excites you and start collaborating.
            </p>
            <Link to="/allJobs" className="btn-fm btn-fm-primary mx-auto mt-5">
              Browse jobs
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default MyAcceptedTasks;
